/**
 * @Descripttion: android日历提醒
 * @Version: 1.0.0
 * @Author: lgen
 */

/* 在 manifest.json 文件中找到对应权限并勾选:
<uses-permission android:name="android.permission.READ_CALENDAR" />
<uses-permission android:name="android.permission.WRITE_CALENDAR" /> */

const calanderURL='content://com.android.calendar/calendars'
const calanderEventURL='content://com.android.calendar/events'
const calanderRemiderURL='content://com.android.calendar/reminders'

// 首先获取日历操作权限，再获取 app 对应的日历账号，如果不存在则调用方法创建日历账号，返回账号 id，然后通过账号id插入日历事件，返回事件 id，再通过事件id插入日历提醒
export default class CalendarEvent{
	constructor(){
		this.remindObj={}
		this.callback='' //操作成功回调函数
	}
	
	addRemind(obj,callback=''){
		this.remindObj={
			'name':obj.name, //日历账号名称
			'title':obj.title || '', //标题
			'subtitle':obj.subtitle || '', //副标题
			'description':obj.description || '', //描述
			'dtstart':obj.dtstart, //开始时间戳毫秒
			'dtend':obj.dtend || obj.dtstart, //结束时间戳毫秒
			'inAdvance':obj.inAdvance || 5, //多少分钟前提醒
			'storageKey':obj.storageKey, //缓存 key，以键值对形式缓存每个提醒时间
			'storageTime':obj.storageTime || obj.dtstart //缓存时间
		}
		this.callback=callback;
		this.getCalendarId()
	}
	
	// 获取日历权限
	getJurisdiction(){
		return new Promise((resolve,reject)=>{
			plus.android.requestPermissions(['android.permission.READ_CALENDAR','android.permission.WRITE_CALENDAR'],e=>{
				//权限被永久拒绝，弹出提示框解释为何需要定位权限，引导用户打开设置页面开启
				if(e.deniedAlways.length>0){
					reject({
						data:-1,
						msg:'权限被永久拒绝'
					})
				}
				//权限被临时拒绝，弹出提示框解释为何需要定位权限，可再次调用 plus.android.requestPermissions 申请权限
				if(e.deniedPresent.length>0){
					reject({
						data:0,
						msg:'权限被临时拒绝'
					})
				}
				//权限被允许
				if(e.granted.length>0){
					resolve({
						data:1,
						msg:'ok'
					})
				}
			})
		})
	}
	
	// 获取 app 对应的日历账号
	getCalendarId(){
		this.getJurisdiction().then(()=>{
			const { Cursor,Uri,Calendar,main }=this.getVariable()
			const calendarUri=Uri.parse(calanderURL)
			const accountList=plus.android.invoke(main.getContentResolver(),'query',calendarUri,null,null,null,null) //查询日历账号
			const accountCount=plus.android.invoke(accountList,'getCount') //查询账号条数，null 或者 数字
			let accountArr=[] //日历账号
			while(plus.android.invoke(accountList,'moveToNext')){
				let accountObj={}
				const keyLen=plus.android.invoke(accountList,'getColumnCount')
				for(let i=0;i<keyLen;i++){
					const objKey=plus.android.invoke(accountList,'getColumnName',i)
					const columnIndex=plus.android.invoke(accountList,'getColumnIndex',objKey)
					const objVal=plus.android.invoke(accountList,'getString',columnIndex)
					accountObj[objKey]=objVal
				}
				accountArr.push(accountObj)
			}
			// 判断是否有固定账号
			const calendar_id=accountArr.filter(item=>item.name==this.remindObj.name)._id || ''
			const calendarId=calendar_id?calendar_id:this.addCalendarId()
			this.addEvent(calendarId)
		}).catch(()=>{
			uni.showToast({
				title:'权限被拒绝',
				icon:'none'
			})
		})
	}
	
	// 添加日历账号
	addCalendarId(){
		const { TimeZone,time_zone,ContentValues,values }=this.getVariable(1)
		const Calendars=plus.android.importClass("android.provider.CalendarContract.Calendars")
		values.put("name",this.remindObj.name)
		values.put("account_name",this.remindObj.name)
		values.put("account_type","com.android.exchange")
		values.put("calendar_displayName",this.remindObj.name)
		values.put("visible",1)
		values.put("calendar_color","-9206951")
		values.put("calendar_access_level","700")
		values.put("sync_events",1)
		values.put("calendar_timezone",plus.android.invoke(time_zone,"getID"))
		values.put("ownerAccount",this.remindObj.name)
		values.put("canOrganizerRespond",0)
		
		const Uri=plus.android.importClass("android.net.Uri")
		let calendarUri=Uri.parse(calanderURL)
		const buildUpon=plus.android.invoke(calendarUri,"buildUpon")
		const CalendarContract=plus.android.importClass("android.provider.CalendarContract")
		plus.android.invoke(buildUpon,"appendQueryParameter",CalendarContract.CALLER_IS_SYNCADAPTER,"true")
		plus.android.invoke(buildUpon,"appendQueryParameter","account_name",this.remindObj.name)
		plus.android.invoke(buildUpon,"appendQueryParameter","account_type","com.android.exchange")
		calendarUri=plus.android.invoke(buildUpon,"build")
		const accountList=plus.android.invoke(plus.android.runtimeMainActivity().getContentResolver(),"insert",calendarUri,values)
		const calendar_id=plus.android.invoke(plus.android.invoke(accountList,"getPathSegments"),"get",1)
		return calendar_id
	}
	
	// 添加事件
	addEvent(calendarId){
		const { Cursor,Uri,Calendar,main }=this.getVariable()
		const { TimeZone,time_zone,ContentValues,values }=this.getVariable(1)
		values.put("calendar_id",calendarId)
		values.put("title",this.remindObj.title) //标题
		values.put("eventLocation",this.remindObj.subtitle) //副标题
		values.put("description",this.remindObj.description) //描述
		values.put("eventTimezone",plus.android.invoke(time_zone,"getID")) //时区，必须有
		values.put("dtstart",this.remindObj.dtstart) //开始时间戳毫秒
		values.put("dtend",this.remindObj.dtend) //结束时间戳毫秒
		values.put("hasAlarm",1) //是否闹钟提醒，默认提醒，大部分手机未实现此功能
		
		const mCalendar=Calendar.getInstance()
		plus.android.invoke(mCalendar,"set",Calendar.HOUR_OF_DAY,13) //设置小时制，此处为24小时制
		plus.android.invoke(mCalendar,"set",Calendar.MINUTE,0) //补0
		
		// 添加事件
		const newEvent=plus.android.invoke(main.getContentResolver(),'insert',Uri.parse(calanderEventURL),values)
		const eventId=plus.android.invoke(newEvent,'getLastPathSegment') //事件 id
		const remindersObj=new ContentValues()
		remindersObj.put('event_id',eventId)
		//事件提醒
		remindersObj.put('minutes',this.remindObj.inAdvance)
		remindersObj.put('method','1')
		plus.android.invoke(main.getContentResolver(),'insert',Uri.parse(calanderRemiderURL),remindersObj)
		this.recordRemind()
	}
	
	// 获取变量
	getVariable(type=0){
		if(!type){
			return{
				'Cursor':plus.android.importClass("android.database.Cursor"),
				'Uri':plus.android.importClass("android.net.Uri"),
				'Calendar':plus.android.importClass("java.util.Calendar"),
				'main':plus.android.runtimeMainActivity()
			}
		}else{
			const TimeZone=plus.android.importClass("java.util.TimeZone")
			const ContentValues=plus.android.importClass("android.content.ContentValues")
			return{
				'TimeZone':TimeZone,
				'time_zone':TimeZone.getDefault(),
				'ContentValues':ContentValues,
				'values':new ContentValues()
			}
		}
	}
	
	// 记录提醒
	recordRemind(){
		uni.getStorage({
			key:'remindRecord',
			complete:(res)=>{
				let remindRecord=res.data || {}
				remindRecord[this.remindObj.storageKey]=this.remindObj.storageTime
				uni.setStorage({
					key:'remindRecord',
					data:remindRecord
				})
			}
		})
		
		// uni.showToast({
		// 	title:'开始前'+this.remindObj.inAdvance+'分钟会提醒你',
		// 	icon:'none'
		// })
		
		if(this.callback){
			this.callback()
		}
	}
	
	// 页面初始化剔除过期数据
	handleRecord(callback=''){
		uni.getStorage({
			key:'remindRecord',
			complete:(res)=>{
				if(!res.data) return;
				const nowTime=new Date().getTime()
				let remindRecord={}
				for(let key in res.data){
					// 剔除过期数据
					if(nowTime<res.data[key]){
						remindRecord[key]=res.data[key]
					}
				}
				
				// 重新缓存未过期数据
				uni.setStorage({
					key:'remindRecord',
					data:remindRecord
				})
				
				if(callback){
					callback(remindRecord)
				}
			}
		})
	}
}