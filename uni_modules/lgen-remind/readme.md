# lgen-remind

> uni-app 开发 android 平台设置日历提醒，可用于列表或单个事件   
>> 对设置的提醒时间以键值对形式缓存，方便页面处理   
>>   
>> 可调用方法更新缓存，清理过期数据   

### 使用介绍

1. 使用 HBuilderx 导入插件，在相关文件中引入

```
import CalendarEvent from '@/uni_modules/lgen-remind/js_sdk/index.js'
export default {
	data() {
		return {
			remindFn:''
		}
	},
	onLoad() {
		// #ifdef APP-PLUS
		this.remindFn=new CalendarEvent()
		
		this.remindFn.handleRecord((res)=>{
			console.log(res)
		})
		// #endif
	},
	methods: {
		calendarRemind(){
			// #ifdef APP-PLUS
			const tomorrowTime=new Date().getTime()+24*60*60*1000
			
			this.remindFn.addRemind({
				'name':'hello',
				'title':'我是标题',
				'subtitle':'我是副标题',
				'description':'我是描述呀',
				'dtstart':tomorrowTime,
				'storageKey':'aTime'
			},()=>{
				console.log('ok')
			})
			// #endif
		}
	}
}
```

2. 方法说明

```
	handleRecord //更新缓存，清理过期数据，接收一个回调函数，返回未过期缓存数据
	
	addRemind //添加提醒事件，接收一个传值对象和一个成功后的回调函数
```

3. addRemind 参数一对象值说明

|字段|描述|默认值|是否必填|
|--|:--|--|--|
|name|日历账号名称| |是|
|title|事件标题| |否|
|subtitle|事件副标题| |否|
|description|事件描述| |否|
|dtstart|事件开始时间戳毫秒| |是|
|dtend|事件结束时间戳毫秒|开始时间|否|
|inAdvance|多少分钟前提醒|5|否|
|storageKey|缓存对象键名| |是|
|storageTime|缓存时间|开始时间|否|

4. 在 manifest.json 文件中找到对应权限并勾选:

```
<uses-permission android:name="android.permission.READ_CALENDAR" />
<uses-permission android:name="android.permission.WRITE_CALENDAR" />
```

### 鼓励作者
如果你觉得该插件方便实用，并且解决了你的问题。可以小小的赞赏一下作者，你的鼓励会更有动力，加油，一起努力。

![微信赞赏](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-de498d81-6ba8-44eb-9a21-3062faeabf5d/90aa9c82-484d-4915-a4e8-1f3335ddce9f.png)