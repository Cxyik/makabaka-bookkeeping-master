<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="content">
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm">确定要删除改账本吗？</uni-popup-dialog>
		</uni-popup>
		<!-- 标题 -->
		<view class="total_title">
			<view class="back">
				<image src="../../../../static/img/mine/back.png" alt="">
				<text @click="back_it()">返回</text>
			</view>
			<view class="ach_title">
				记账提醒
			</view>
			<view class="wei">
				
			</view>
		</view>
		<view class="lock">
			<view class="title">记账提醒</view>
			<view class="confirm_ut">
				<view class="big_circle"  @click="openb()" :class="{'open':this.openm==1}">
					<view class="small_circle" :class="{'open_1':this.openm==1}">
						
					</view>
				</view>
			</view>
			
		</view>
		<view class="tip">
			开启后将在每天12：00提醒
		</view>
		<view class="my_wait" :class="{'show_set':in_setting==1}">
			
		</view>
		<view class="wait_ani" :class="{'show_set':in_setting==1}">
			<image src="../../../../static/img/mine/wait.gif" mode=""></image>
			<view class="">
				正在设定中...
			</view>
		</view>
		<!-- <view class="set_detail" :class="{'disp':openm==1}">
			<view class="lock my_typr">
				<view class="title">提醒时间</view>
				<view class="set_detail_1">
					<view class="uni-list-cell-db">
						<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
							<view class="uni-input">{{time}}</view>
						</picker>
									</view>
					<view class="set_detail_1_img">
						<image src="../../../../static/img/mine/remind/more.png" mode=""></image>
					</view>
				</view>
			</view>
		</view> -->
		
	</view>
	
</template>

<script>
	import remind from "../../../../static/json/rem.json"
	import CalendarEvent from '@/uni_modules/lgen-remind/js_sdk/index.js'
	import base from '@/static/base.js';
	let arr = []
	export default {
		extends:base,
		data() {
			return {
				openm:0,
				 remindFn:'',
				 time:"10:09",
				 in_setting:0
			}
		},
		onLoad(){
			this.openm = remind.remind
			
			 // #ifdef APP-PLUS
			        this.remindFn=new CalendarEvent()
			
			        this.remindFn.handleRecord((res)=>{
			            console.log(res)
			        })
			        // #endif
			// if()
			for(var i =1 ;i<=10;i++){
				arr[i] = 24*60*60*1000
			}
			console.log(arr)
		},
		onShow(){
			
		},
		methods: {
			 bindTimeChange: function(e) {
			            this.time = e.detail.value
			        },
			openb(){
				remind.remind = (remind.remind+1)%2
					this.openm = remind.remind
				if(this.openm == 1){
					this.openm = 0
					this.in_setting = 1
					// #ifdef APP-PLUS
						let osName = plus.os.name.toLowerCase();
						if(osName == 'ios'){
							let UIApplication = plus.ios.import("UIApplication");
							let app = UIApplication.sharedApplication();
							let enabledTypes = 0;
							if (app.currentUserNotificationSettings) {
								let settings = app.currentUserNotificationSettings();
								enabledTypes = settings.plusGetAttribute("types");
							} else {
								//针对低版本ios系统  
								enabledTypes = app.enabledRemoteNotificationTypes();
							}
							plus.ios.deleteObject(app);
							if (0 == enabledTypes) {
								// 未开启通知
								uni.$showModal({
									title: "提示",
									content: '开启通知权限后才能收到提示消息哦。',
									delCancel: false,
									confirmVal: '去开启',
									cancelVal: '取消',
								}).then(res => {
									let UIApplication = plus.ios.import("UIApplication");
									let NSURL = plus.ios.import("NSURL");
									let setting = NSURL.URLWithString("app-settings:");
									let application = UIApplication.sharedApplication();
									application.openURL(setting);
									plus.ios.deleteObject(setting);
									plus.ios.deleteObject(application);
								});
							}
						}else if(osName == 'android'){
							let main = plus.android.runtimeMainActivity();
							let NotificationManagerCompat = plus.android.importClass(
								"androidx.core.app.NotificationManagerCompat");
							let pkName = main.getPackageName();
							let packageNames = NotificationManagerCompat.from(main);
							let notificationEnabled = packageNames.areNotificationsEnabled();
							if(!notificationEnabled){
								// 未开启通知
								uni.$showModal({
									title: "提示",
									content: '开启通知权限后才能收到提示消息哦。',
									delCancel: false,
									confirmVal: '去开启',
									cancelVal: '取消',
								}).then(res => {
									let uid = main.getApplicationInfo().plusGetAttribute("uid");
									let Intent = plus.android.importClass('android.content.Intent');
									let Build = plus.android.importClass("android.os.Build");
									let intent = '';
									
									console.log("Androd SDK_INT:" + Build.VERSION.SDK_INT);
									
									if (Build.VERSION.SDK_INT >= 26) { // android 8.0引导
										intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
										intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
									} else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0
										intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
										intent.putExtra("app_package", pkName);
										intent.putExtra("app_uid", uid);
									} else { //(<21)其他--跳转到该应用管理的详情页
										let Settings = plus.android.importClass("android.provider.Settings");
										let Uri = plus.android.importClass("android.net.Uri");
										intent = new Intent();
										intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
										let uri = Uri.fromParts("package", main.getPackageName(), null);
										intent.setData(uri);
									}
									// 跳转
									main.startActivity(intent);
								});
							}
						}
						// #endif
					this.calendarRemind()
				}
			},
			back_it(){
				uni.navigateBack(1)
			},
			calendarRemind(){
				let now = new Date()
				let hour = now.getHours()
				let min = now.getMinutes()
				let sec = now.getSeconds()
				let total_sec = hour*60*60*1000+sec*1000+min*60*1000
			    let tomorrowTime=new Date().getTime()-total_sec+12*60*60*1000
						let entime=tomorrowTime+60*10000
						this.remindFn.addRemind({
						    'name':'记账',
						    'title':'记账提醒',
						    'subtitle':'今日还未记账噢',
						    'description':'',
						    'dtstart':tomorrowTime,
							'dtend':entime,
						    'storageKey':'aTime',
							// console.log(arr[i])
						},()=>{
						    this.remindFn.addRemind({
						        'name':'记账',
						        'title':'记账提醒',
						        'subtitle':'今日还未记账噢',
						        'description':'',
						        'dtstart':tomorrowTime+arr[1],
						    	'dtend':entime+arr[1],
						        'storageKey':'aTime',
						    	// console.log(arr[i])
						    },()=>{
						        this.remindFn.addRemind({
						            'name':'记账',
						            'title':'记账提醒',
						            'subtitle':'今日还未记账噢',
						            'description':'',
						            'dtstart':tomorrowTime+arr[1]*2,
						        	'dtend':entime+arr[1]*2,
						            'storageKey':'aTime',
						        	// console.log(arr[i])
						        },()=>{
						           this.remindFn.addRemind({
						               'name':'记账',
						               'title':'记账提醒',
						               'subtitle':'今日还未记账噢',
						               'description':'',
						               'dtstart':tomorrowTime+arr[1]*3,
						           	'dtend':entime+arr[1]*3,
						               'storageKey':'aTime',
						           },()=>{
						               this.remindFn.addRemind({
						                   'name':'记账',
						                   'title':'记账提醒',
						                   'subtitle':'今日还未记账噢',
						                   'description':'',
						                   'dtstart':tomorrowTime+arr[1]*4,
						               	'dtend':entime+arr[1]*4,
						                   'storageKey':'aTime',
						               },()=>{
						                   this.in_setting = 0
										this.openm = 1
						               })
						           })
						        })
						    })
						})
			            

			        }
					
			}
	}
</script>

<style>
	.show_set{
		display: block !important;
	}
	.wait_ani{
		text-align: center;
		margin-top: 5rem;
		display: none;
		color: rgb(50, 50, 50);
	}
	.wait_ani image{
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
	}
	.my_wait{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: black;
		top: 0;
		opacity: 0.2;
		display: none;
	}
	.tip{
		font-size: 0.8rem;
		margin: 0 2rem;
		border-top: 1px solid #ccc;
	}
	.set_detail_1_img{
		margin-left: 1rem;
	}
	.set_detail_1_img image{
		width: 1.4rem;
		height: 1.4rem;
		/* position: absolute; */
		vertical-align: middle;
	}
	.set_detail{
		display: none;
		border-bottom: 1px solid #ccc;
	}
	.disp{
		display: block;
	}
	.open{
		background-color: forestgreen !important;
	}
		
	.open_1{
		position: absolute;
		left: 2.2rem !important;
	}
	.title{
		width: 50%;
		height: 100%;
		line-height: 3rem;
		box-sizing: border-box;
		padding-left: 2rem;
	}
	.confirm_ut{
		width:50%;
		height: 100%;
	}
		
	.big_circle{
		width: 4rem;
		height: 1.8rem;
		background-color: darkgray;
		border-radius: 2rem;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 2rem;
	}
	.set_detail_1{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50%;
		padding-left: 7rem;
		/* background-color: pink; */
		/* background-color:rgb(244, 244, 244); */
	}
	.small_circle{
		transition: all 0.5s;
		width: 1.6rem;
		height: 1.6rem;
		background-color: white;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 0.1rem;
		transform: translateY(-50%);
	}
	.lock{
		position: relative;
		height: 3rem;
		margin-top: 0.3rem;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* border-top: 1px solid #ccc; */
	}
		
	/*  */
	.content{
		position: fixed;
		width: 100%;
		height: 1000px;
		background-color: rgb(244, 244, 244);
		font-size: 16px;
	}
	
	/* first */
.total_title{
		color:rgb(100, 100, 100);
		padding: 4rem 0.3rem 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.back{
		display: flex;
		align-items: center;
		color: dimgray;
		flex: 1;
	}
	.back image{
		width: 25px;
		height: 25px;
	}
	.ach_title{
		flex: 2;
		font-weight: 600;
		text-align: center;
		padding-right: 10px;
	}
	.wei{
		flex: 1;
		text-align: center;
	}
	.delete_it{
		position: absolute;
		right: 0;
	}
</style>
