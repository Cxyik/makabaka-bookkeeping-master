<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="content">
		
		<!-- 标题 -->
		<view class="total_title">
			<view class="back">
				<image src="../../../../static/img/mine/back.png" alt="">
				<text @click="back_it()">返回</text>
			</view>
			<view class="ach_title">
				关爱模式
			</view>
			<view class="wei">
				
			</view>
		</view>
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
		<view class="photo_body">
			<image src="../../../../static/img/mine/introduction.jpg" mode=""></image>
		</view>
		<view class="explain"  :class="{'devtion_weather':this.in_open==0}">
			字大、图标大<br>使用更简单
		</view>
		<view class="bottom_btn">
			<button type="primary" @click="goto_devotion()" :class="{'show_btn':in_open==0}">开启关爱模式</button>
			<button type="primary" plain="true"  @click="goto_devotion()" :class="{'show_btn':in_open==1}">关闭关爱模式</button>
		</view>
	</view>
	
</template>

<script>
	import open_devotion from "../../../../static/json/devotion.json"
	import remind from "../../../../static/json/rem.json"
	import CalendarEvent from '@/uni_modules/lgen-remind/js_sdk/index.js'
	import base from '@/static/base.js';
	import sto from "../../../../static/json/sto_data.json"
	import mode from "../../../../static/json/temporary.json"
	const save_1 = (that, param) => {
		var api = that.GLOBAL.baseApi
		uni.request({
			url: api + "/userInfo/updateModule",
			method: "POST",
			header: {
				'content-type': 'application/json;charset:utf-8'
			},
			data: param,
			success: (res) => {
				console.log("seuuess")
			},
		})
	}
	const get_old = (that,index) => {
		var api = that.GLOBAL.baseApi
		console.log(that.GLOBAL.userId)
		uni.request({
			url: api + "/userInfo/old?userId="+that.GLOBAL.userId+"&isOld="+index,
			method: "POST",
			header: {
				'content-type': 'application/json;charset:utf-8'
			},
			success: (res) => {
				console.log("seuuess")
				let old_open = res.data.data
				console.log(old_open)
			},
		})
	}
	export default {
		extends:base,
		data() {
			return {
				openm:0,
				 remindFn:'',
				 in_open:0,
				 btn_txt:"开启关爱模式",
				 type: 'center',
				 msgType: 'success',
				 messageText: '成功打开关爱模式',
			}
		},
		onLoad(){
			this.in_open = open_devotion.open
			if(this.in_open==0){
				this.btn_txt = "关闭关爱模式"
			}
			else{
				this.btn_txt = "开启关爱模式"
			}
			this.openm = remind.remind
			
			 // #ifdef APP-PLUS
			        this.remindFn=new CalendarEvent()
			
			        this.remindFn.handleRecord((res)=>{
			            console.log(res)
			        })
			        // #endif
		},
		onShow(){
			console.log(open_devotion.open)
		},
		methods: {
			save(number){
				const {baseApi,userId}=this.GLOBAL
				uni.request({
					url: baseApi+"/userInfo/updateFont",
					method: "POST",
					data:{
						userId:userId,
						fontNum:number
					},
					success: (res) => {
						this.$forceUpdate()
					}
				});
			},
			save_1 (that, param) {
				var api = that.GLOBAL.baseApi
				uni.request({
					url: api + "/userInfo/updateModule",
					method: "POST",
					header: {
						'content-type': 'application/json;charset:utf-8'
					},
					data: param,
					success: (res) => {
						console.log("success")
					},
				})
			},
			back_it(){
				// uni.navigateBack(1)
				uni.reLaunch({
					url:"/pages/tabbar/mine/mine"
				})
			},
			goto_devotion(){
				this.in_open = (this.in_open+1)%2
				open_devotion.open = this.in_open
				if(this.in_open == 0){
					this.save(24)
					let self = this
					var api = this.GLOBAL.baseApi
					this.getInit(self, api)
					get_old(self,1)
					
					sto.stor.ischanging = 1
					var param = {
						"userId": this.GLOBAL.userId,
						"bill":0,
						"chart":0,
						"budget":0
					}
					this.save_1(self,param)
					this.messageText = "成功打开关爱模式"
					this.$refs.message.open()
				}
				else{
					this.save(16)
					let self = this
					var api = this.GLOBAL.baseApi
					this.getInit(self, api)
					get_old(self,0)
					sto.stor.ischanging = 1
					var param = {
						"userId": this.GLOBAL.userId,
						"bill":mode.bill,
						"chart":mode.chart,
						"budget":mode.budget
					}
					console.log(mode.bill+""+mode.chart+""+mode.budget)
					this.save_1(self,param)
					this.messageText = "成功关闭关爱模式"
					this.$refs.message.open()
				}
			},
				getInit(that, api){
					uni.getStorage({
						key: 'token',
						success: function(res) {
							console.log(res.data)
							uni.request({
								url: api + "/user/me", //仅为示例，并非真实接口地址。
								header: {
									'content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
									"Authorization": res.data
								},
								success: (req_res) => {
									if (req_res.data.code === 200) {
										let userInfo = req_res.data.data.userInfo
										let ledgerInfo = req_res.data.data.ledgerInfo
										let userInfoData = req_res.data.data.userInfoData
										console.log(userInfoData.isOld)
										if(userInfoData.moduleSelection.bill==0){
											uni.setTabBarItem({
												index:3,
												visible:false
											})
										}
										if(userInfoData.moduleSelection.chart==0){
											uni.setTabBarItem({
												index:2,
												visible:false
											})
										}
										if(userInfoData.moduleSelection.budget==0){
											uni.setTabBarItem({
												index:1,
												visible:false
											})
										}
										that.GLOBAL.SetuserInfoData(userInfoData)
										that.setRootFontSize(userInfoData.fontSetting + "px");
									} else {
										uni.reLaunch({
											url: "/pages/Login/Login",
											success: () => {
												// #ifdef APP-PLUS
												plus.navigator.closeSplashscreen();
												// #endif
											}
										})
									}
								},
								error: (e) => {
									console.log(e)
								}
							});
						}
					});
				
				}
		}
	}
</script>

<style>
	.show_btn{
		display: none;
	}
	.devtion_weather{
		font-size: 25px !important;
	}
	.btn_devotion{
		font-size: 20px !important;
	}
	.bottom_btn{
		margin: 0 1rem;
		font-size: 18px;
		/* margin-top: 2rem; */
	}
	.explain{
		text-align: center;
		font-size: 20px;
		font-weight: 550;
		margin: 10px;
	}
	.photo_body{
		text-align: center;
		height: 40%;
		margin-top: 1rem;
	}
	.photo_body image{
		height: 90%;
		width: 50%;
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
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
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