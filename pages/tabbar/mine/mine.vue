<template>
	<view class="content" :style="{'font-size':this.Font+'px'}" :class="{'content_hei':open_de==0}">
		<view class="m-head">
			<text>我的</text>
		</view>
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
		<!-- 头像昵称 -->
		<view class="tx">
			<view  @click="information()" class="headImg">
				<view class="tx_img">
					<image src="https://beyondmyself.top/i/2023/04/07/5.png" alt="">
				</view>
				<text style="margin: 0 0.5rem 0 0.5rem;">{{username}}</text>
				<image style="height: 1rem; width: 1rem;" src="../../../static/img/mine/more.png" alt="">
			</view>
			<view class="playcard_text" @click="check()">
				<text>{{userInfoData.isChecked? "已打卡":"未打卡"}}</text>
			</view>
		</view>

		<!-- 打卡计数 -->
		<view class="count margin_count">
			<text>{{userInfoData.punchDays}}</text>
			<text>{{userInfoData.totalDays}}</text>
			<text @click="to_acchivement()">{{userInfoData.medals}}</text>
		</view>
		<view class="count">
			<text>已连续打卡</text>
			<text>记账总天数</text>
			<text>获得勋章数</text>
		</view>

		<!-- 我的积分 -->
		<view class="my_sorce">
			<view class="my_sorce_img" :style="{'font-size':this.Font+'px'}" @click="goto_integral()">
				<image src="../../../static/img/mine/sorce.png" alt="">
					<text>我的积分</text>
					<view class="test">
						<image src="../../../static/img/mine/more.png" alt="" id="test_01">
					</view>
			</view>
			<view class="clear">

			</view>
		</view>

		<!-- 我的账本 -->
		<view class="hover my_zhangben" :style="{'font-size':this.fontValue+'px !important'}">
			<view class="my_sorce_img" :style="{'font-size':this.Font+'px'}" @click="goto_account_book()">
				<image src="../../../static/img/mine/my_2.png" alt="">
					<text>我的账本</text>
					<view class="test">
						<image src="../../../static/img/mine/more.png" alt="" id="test_01">
					</view>
			</view>
		</view>

		<!-- 我的记账提醒 -->
		<view class="my_jiz" @click="goto_remind()">
			<view class="my_sorce_img" :style="{'font-size':this.Font+'px'}">
				<image src="../../../static/img/mine/my_4.png" alt="">
					<text>记账提醒</text>
					<view class="test">
						<image src="../../../static/img/mine/more.png" alt="" id="test_01">
					</view>
			</view>
		</view>

		<!-- 记账方式选择 -->
		<view class="my_wayre" @click="select_way()" :class="{'hide_it':open_de==0}">
			<view class="my_sorce_img way" :style="{'font-size':this.Font+'px'}">
				<image src="../../../static/img/mine/my_7.png" alt="">
					<view class="rl">
						<text>记账方式选择</text>
					</view>
					<view class="spe less_spe"></view>
					<view class="test3">
						<image src="../../../static/img/mine/more.png" alt="" id="test_01">
					</view>
			</view>
		</view>

		<!-- 模块选择 -->
		<view class="my_mod" @click="select_mod()" :class="{'hide_it':open_de==0}">
			<view class="my_sorce_img mod" :style="{'font-size':this.Font+'px'}">
				<image src="../../../static/img/mine/my_8.png" alt="">
					<view class="rl">
						<text>模块选择</text>
					</view>
					<view class="spe less_spe"></view>
					<view class="test3">
						<image src="../../../static/img/mine/more.png" alt="" id="test_01">
					</view>
			</view>
		</view>

		<!-- 设置字号 -->
		<view class="my_font" @click="set_font()" :class="{'modify_1':open_de==0}">
			<view class="my_sorce_img" :style="{'font-size':this.Font+'px'}">
				<image src="../../../static/img/mine/my_9.png" alt="">
					<text>设置字号</text>
					<view class="test">
						<image src="../../../static/img/mine/more.png" alt="" id="test_01">
					</view>
			</view>
		</view>

		<!-- 帮助文档 -->
		<view class="my_font my_help" @click="goto_love()" :class="{'modify_2':open_de==0}">
			<view class="my_sorce_img" :style="{'font-size':this.Font+'px'}">
				<image src="../../../static/img/mine/family.png" alt="">
					<text>关爱模式</text>
					<view class="brand" :class="{'brand_vis':open_de==0}">
						已开启
					</view>
					<view class="test">
						<image src="../../../static/img/mine/more.png" alt="" id="test_01">
					</view>
			</view>
		</view>

		<!-- 意见反馈 -->
		<view class="my_font my_sugg" :class="{'modify_3':open_de==0}" @click="goto_help()">
			<view class="my_sorce_img" :style="{'font-size':this.Font+'px'}">
				<image src="../../../static/img/mine/my_10.png" alt="">
					<text>帮助文档</text>
					<view class="test">
						<image src="../../../static/img/mine/more.png" alt="" id="test_01">
					</view>
			</view>
		</view>
		<!-- 关于我们 -->
		<view class="my_font my_ab" :class="{'modify_4':open_de==0}" @click="goto_feed()">
			<view class="my_sorce_img" :style="{'font-size':this.Font+'px'}">
				<image src="../../../static/img/mine/my_11.png" alt="">
					<text>意见反馈</text>
					<view class="test">
						<image src="../../../static/img/mine/more.png" alt="" id="test_01">
					</view>
			</view>
		</view>

		<view class="my_font my_love" :class="{'modify_5':open_de==0}" @click="goto_about()">
			<view class="my_sorce_img" :style="{'font-size':this.Font+'px'}">
				<image src="../../../static/img/mine/my_12.png" alt="">
					<text>关于我们</text>
					<view class="test">
						<image src="../../../static/img/mine/more.png" alt="" id="test_01">
					</view>
			</view>
		</view>

		<!-- 记账方式选择 -->
		<view class="un_select_way" :class="{'bacg_show':is_select!=0}">
		</view>
		<view class="select_border" :class="{'select_way':is_select==1}">
			<view class="select_title">记账方式选择</view>
			<view class="select_stitle">设置首页记账方式的显示/隐藏</view>
			<view class="way_one">
				<view class="way_name">语音记账</view>
				<view class="checkbox" @click="change_sound()">
					<view class="select" :class="{'select_show':sound==1}">
						<image src="../../../static/img/mine/select.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="way_one margin_top">
				<view class="way_name">拍照记账</view>
				<view class="checkbox" @click="change_phone()">
					<view class="select" :class="{'select_show':phone==1}">
						<image src="../../../static/img/mine/select.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="way_one margin_top1">
				<view class="way_name">手动记账</view>
				<view class="checkbox" @click="change_write()">
					<view class="select" :class="{'select_show':write==1}">
						<image src="../../../static/img/mine/select.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="way_one margin_top2">
				<view class="way_name">导入记账</view>
				<view class="checkbox" @click="change_import()">
					<view class="select" :class="{'select_show':this.import==1}">
						<image src="../../../static/img/mine/select.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="btn_select">
				<view class="can" @click="close_it()">
					取消
				</view>
				<view class="ye" @click="change_it()">
					确定
				</view>
			</view>
		</view>
		<view class="select_border height0" :class="{'select_way':is_select==2}">
			<view class="select_title">模块选择</view>
			<view class="select_stitle">设置导航栏模块的显示/隐藏</view>
			<view class="way_one">
				<view class="way_name">预算</view>
				<view class="checkbox" @click="change_budget()">
					<view class="select" :class="{'select_show':budget==1}">
						<image src="../../../static/img/mine/select.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="way_one margin_top">
				<view class="way_name">统计</view>
				<view class="checkbox" @click="change_chart()">
					<view class="select" :class="{'select_show':chart==1}">
						<image src="../../../static/img/mine/select.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="way_one margin_top1">
				<view class="way_name">账单</view>
				<view class="checkbox" @click="change_bill()">
					<view class="select" :class="{'select_show':bill==1}">
						<image src="../../../static/img/mine/select.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="btn_select margin_top0">
				<view class="can" @click="close_it()">
					取消
				</view>
				<view class="ye" @click="change_it1()">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import init from "../../../static/json/init.json"
	import open_devotion from "../../../static/json/devotion.json"
	import user from "../../../static/json/information.json"
	import apdata from '../../../static/json/way.json'
	import appdata from '../../../pages.json'
	import base from '@/static/base.js';
	import sto from "../../../static/json/sto_data.json"
	import mode from "../../../static/json/temporary.json"
	// import init from "../../../static/json/init.json"
	let userInfo = ""

	const save = (that, param) => {
		var api = that.GLOBAL.baseApi
		uni.request({
			url: api + "/userInfo/updateMethod",
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
	const save_check = (that) => {
		var api = that.GLOBAL.baseApi
		console.log(that.GLOBAL.userId)
		uni.request({
			url: api + "/userInfo/check?userId=" + that.GLOBAL.userId,
			method: "POST",
			header: {
				'content-type': 'application/json;charset:utf-8'
			},
			success: (res) => {
				console.log("seuuess")
			},
		})
	}

	export default {
		extends: base,
		data() {
			return {
				first_comeinto: 1,
				title: 'Hello',
				is_select: 0,
				phone: 1,
				sound: 1,
				import: 1,
				write: 1,
				bill: 0,
				chart: 0,
				budget: 0,
				username: "",
				Font: 16,
				userInfoData: '',
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				value: '',
				open_de: 0
			}
		},
		onShow() {
			console.log(this.open_de)
			var api = this.GLOBAL.baseApi
			// this.getInit(self,api)
			if (sto.stor.ischanging == 1) {
				// var self = this
				let thh = this
				this.getInit(thh, api)
				sto.stor.ischanging = 0
			}

			const {
				userInfoData
			} = this.GLOBAL
			this.userInfoData = userInfoData
			init.punchDays = userInfoData.punchDays

			const self = this
			self.fontValue = parseInt(self.getRootFontSize().split('px')[0]);
			this.Font = self.fontValue



			this.sound = apdata.show_which.sound
			this.phone = apdata.show_which.phone
			this.write = apdata.show_which.write
			this.import = apdata.show_which.import

			var mode = userInfoData.moduleSelection
			this.bill = mode.bill
			this.chart = mode.chart
			this.budget = mode.budget
			this.change_nav()
		},
		onReady() {
			const {
				userInfoData
			} = this.GLOBAL
			this.userInfoData = userInfoData
			apdata.show_which.import = userInfoData.bookkeepingMethod.vxzfb
			apdata.show_which.write = userInfoData.bookkeepingMethod.hand
			apdata.show_which.phone = userInfoData.bookkeepingMethod.photograph
			apdata.show_which.sound = userInfoData.bookkeepingMethod.wav
			apdata.show_which1.bill = userInfoData.moduleSelection.bill
			apdata.show_which1.write = userInfoData.moduleSelection.budget
			apdata.show_which1.phone = userInfoData.moduleSelection.chart

			init.ischeck = this.userInfoData.isChecked

		},
		onLoad() {
			let self = this;
			var api = this.GLOBAL.baseApi
			this.get_mydate(self, api)
			this.getInit(self, api)
			this.username = user.user.name

			self.fontValue = parseInt(self.getRootFontSize().split('px')[0]);
			this.Font = self.fontValue
			self.open_de = open_devotion.open


		},
		methods: {
			goto_about() {
				uni.navigateTo({
					url: "/pages/tabbar/mine/about/about"
				})
			},
			goto_help() {
				uni.navigateTo({
					url: "/pages/tabbar/mine/help_word/help_word"
				})
			},
			goto_feed() {
				uni.navigateTo({
					url: "/pages/tabbar/mine/feedback/feedback"
				})
			},
			test() {
				uni.clearStorage();
			},
			select_way() {
				this.is_select = 1
			},
			close_it() {
				this.phone = apdata.show_which.phone
				this.sound = apdata.show_which.sound
				this.write = apdata.show_which.write
				this.import = apdata.show_which.import

				this.bill = apdata.show_which1.bill
				this.chart = apdata.show_which1.chart
				this.budget = apdata.show_which1.budget

				this.is_select = 0
			},
			select_mod() {
				this.is_select = 2
				console.log(apdata.show_which1.budget)
			},
			to_acchivement() {
				uni.navigateTo({
					url: "/pages/tabbar/mine/achivement/achivement"
				})
			},
			set_font() {
				uni.navigateTo({
					url: "/pages/tabbar/mine/set_font/set_font"
				})
			},
			get_mydate(that, api) {
				uni.getStorage({
					key: 'token',
					success: function(res) {
						uni.request({
							url: api + "/user/me", //仅为示例，并非真实接口地址。
							header: {
								'content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
								"Authorization": res.data
							},
							success: (req_res) => {
								if (req_res.data.code === 200) {
									userInfo = req_res.data.data.userInfo
									let ledgerInfo = req_res.data.data.ledgerInfo
									let userInfoData = req_res.data.data.userInfoData
									var db_mode = userInfoData.moduleSelection
									console.log(userInfoData)
									var in_old = userInfoData.isOld
									if (in_old == 0) {
										mode.bill = db_mode.bill
										mode.chart = db_mode.chart
										mode.budget = db_mode.budget
										console.log(mode)
									}
									uni.setStorageSync('userInfo', userInfo);
									that.userInfoData = userInfoData
									that.username = userInfo.userName

									user.user.name = that.username
									if (that.username.length > 5)
										that.username = that.username.substring(0, 5) + "..."
									that.userid = userInfo.userId
									that.email = userInfo.email


								} else {}
							},
							error: (e) => {
								console.log(e)
							}
						});
					}
				});
			},
			goto_integral() {
				uni.navigateTo({
					url: "/pages/tabbar/mine/integral/integral"
				})
			},
			goto_account_book() {
				uni.navigateTo({
					url: "/pages/tabbar/mine/account_book/account_book"
				})
			},
			goto_love() {
				uni.navigateTo({
					url: "/pages/tabbar/mine/devotion/devotion"
				})
			},
			change_phone() {
				this.phone = (this.phone + 1) % 2
			},
			change_sound() {
				this.sound = (this.sound + 1) % 2
			},
			change_write() {
				this.write = (this.write + 1) % 2
			},
			change_import() {
				this.import = (this.import+1) % 2
			},
			change_it() {
				apdata.show_which.phone = this.phone
				apdata.show_which.sound = this.sound
				apdata.show_which.write = this.write
				apdata.show_which.import = this.import
				this.close_it()

				var that = this
				var param = {
					"userId": this.GLOBAL.userId,
					"photograph": this.phone,
					"vxzfb": this.import,
					"wav": this.sound,
					"hand": this.write
				}
				save(that, param)
			},
			change_budget() {
				this.budget = (this.budget + 1) % 2
			},
			change_bill() {
				this.bill = (this.bill + 1) % 2
			},
			change_chart() {
				this.chart = (this.chart + 1) % 2
			},
			change_it1() {
				var that = this
				var param = {
					"userId": that.GLOBAL.userId,
					"bill": that.bill,
					"chart": that.chart,
					"budget": that.budget
				}

				mode.bill = that.bill
				mode.chart = that.chart
				mode.budget = that.budget

				let self = this;
				var api = this.GLOBAL.baseApi
				this.getInit(self, api)

				const {
					userInfoData
				} = this.GLOBAL
				this.userInfoData = userInfoData
				console.log(this.userInfoData.moduleSelection)

				apdata.show_which1.chart = this.chart
				apdata.show_which1.bill = this.bill
				apdata.show_which1.budget = this.budget

				this.change_nav()
				this.close_it()
				save_1(self, param)
				this.getInit(self, api)
			},
			change_which(i, val) {
				uni.setTabBarItem({
					index: i,
					visible: val
				})
			},
			change_nav() {
				if (this.budget == 1) this.change_which(1, true)
				else this.change_which(1, false)
				if (this.chart == 1) this.change_which(2, true)
				else this.change_which(2, false)
				if (this.bill == 1) this.change_which(3, true)
				else this.change_which(3, false)
			},
			goto_remind() {
				uni.navigateTo({
					url: "/pages/tabbar/mine/remind/remind"
				})
			},
			information() {
				uni.navigateTo({
					url: "/pages/tabbar/mine/information/information"
				})
			},
			check() {
				const {
					userInfoData
				} = this.GLOBAL
				this.userInfoData = userInfoData

				if (userInfoData.isChecked == 0) {
					var that = this
					userInfoData.isChecked = 1

					var type = "success"
					that.msgType = type
					that.messageText = `打卡成功`
					that.$refs.message.open()

					userInfoData.punchDays += 1

					save_check(that)
				}
			},
			getInit(that, api) {
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

									if (userInfoData.moduleSelection.bill == 0) {
										uni.setTabBarItem({
											index: 3,
											visible: false
										})
									}
									if (userInfoData.moduleSelection.chart == 0) {
										uni.setTabBarItem({
											index: 2,
											visible: false
										})
									}
									if (userInfoData.moduleSelection.budget == 0) {
										uni.setTabBarItem({
											index: 1,
											visible: false
										})
									}
									uni.setStorageSync('userInfo', userInfo);
									uni.setStorageSync('ledgerInfo', ledgerInfo);
									that.GLOBAL.SetuserInfoData(userInfoData)
									that.GLOBAL.SetUserId(userInfo.userId)
									that.GLOBAL.SetSelect(ledgerInfo[0].id)
									that.setRootFontSize(userInfoData.fontSetting + "px");

									const is_old = userInfoData.isOld
									if (is_old == 1) {
										uni.setTabBarStyle({
											"fontSize": "17px"
										})
									} else {
										uni.setTabBarStyle({
											"fontSize": "14px"
										})
									}

									open_devotion.open = (is_old + 1) % 2

									var tab_item = userInfoData.moduleSelection
									if (tab_item.bill == "0") {
										uni.setTabBarItem({
											index: 3,
											visible: false
										})
									} else {
										uni.setTabBarItem({
											index: 3,
											visible: true
										})
									}
									if (tab_item.chart == "0") {
										uni.setTabBarItem({
											index: 2,
											visible: false
										})
									} else {
										uni.setTabBarItem({
											index: 2,
											visible: true
										})
									}
									if (tab_item.budget == "0") {
										uni.setTabBarItem({
											index: 1,
											visible: false
										})
									} else {
										uni.setTabBarItem({
											index: 1,
											visible: true
										})
									}
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
	/*  */
	.hide_it {
		display: none;
	}

	.brand {
		position: absolute;
		height: 100%;
		line-height: 3rem;
		right: 2rem;
		display: none;
	}

	.brand_vis {
		display: block;
	}

	.select {
		width: 100%;
		height: 100%;
		text-align: center;
		position: relative;
		display: none;
	}

	.select image {
		width: 1.2rem;
		height: 1.2rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.select_show {
		display: block;
	}

	/*  */
	.m-head {
		color: #333333;
		font-size: 24px;
		font-weight: bold;
		display: flex;
		flex-direction: column;
		width: 95%;
		padding: 0 0.5rem;

		text:nth-child(2) {
			font-size: 14px;
		}
	}

	.un_select_way {
		display: none;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: black;
		opacity: 0.2;
	}

	.bacg_show {
		display: block;
	}

	.select_border {
		display: none;
		box-sizing: border-box;
		padding-top: 20px;
		width: 80%;
		height: 350px;
		background-color: white;
		opacity: 1;
		position: fixed;
		top: 10rem;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 10px;
		padding-left: 20px;
	}

	.height0 {
		height: 300px;
	}

	.select_way {
		display: block;
	}

	.select_title {
		font-size: 20px;
		font-weight: 600;
	}

	.select_stitle {
		margin-top: 5px;
		font-size: 16px;
		color: rgb(150, 150, 150);
	}

	.way_one {
		width: 90%;
		margin-top: 30px;
		position: relative;
	}

	.way_name {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.way_one .checkbox {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 2rem;
		height: 2rem;
		border: 1px solid #ccc;
	}

	.margin_top {
		margin-top: 80px;
	}

	.margin_top1 {
		margin-top: 130px;
	}

	.margin_top2 {
		margin-top: 180px;
	}

	.btn_select {
		width: 88%;
		margin-top: 230px;
	}

	.margin_top0 {
		margin-top: 180px;
	}

	.can {
		float: left;
	}

	.ye {
		float: right;
	}

	.content {
		color: #666666;
		position: relative;
		width:100%;
		height: 48rem;
		font-size: 16px;
		background-color: rgb(244, 244, 244);
		box-sizing: border-box;
	}

	.content_hei {
		height: 42rem;
	}

	.title {
		font-size: 20px;
		font-weight: 700;
		padding-left: 10px;
		padding-top: 5px;
	}

	.tx {
		display: flex;
		padding: 10px 10px 0;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		/* margin: 10px; */
		
		height: 50px;
		width: 98%;
	}

	.tx_img {
		width: 50px;
		height: 50px;
		background-color: pink;
		border-radius: 50%;
	}

	.tx_img image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.more,
	.nc {
		height: 100%;
		line-height: 50px;
	}

	.nc {
		padding-left: 10px;
	}

	.more {
		padding-top: 3px;
	}

	.more image {
		width: 1rem;
		height: 1rem;
	}

	.playcard {
		position: relative;
		width: 60%;
		height: 100%;
	}
	.headImg{
		display: flex;
		align-items: center;
	}
	.playcard_text {
		font-size: 12px;
		line-height: 30px;
		text-align: center;


		height: 30px;
		width: 60px;
		background-color: #fff;
		border-radius: 18px;

		.card_more {
			width: 10px;
		}

		image {
			width: 1rem;
			height: 1rem;
		}
	}

	/* 打卡计数 */
	.count {
		width: 100%;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.count text {
		display: block;
		flex: 1;
		text-align: center;
	}

	.margin_count {
		margin-top: 10px;
	}

	.my_sorce {
		width: 100%;
		position: relative;
	}

	.my_zhangben {
		margin-top: 55px;
		width: 100%;
		position: relative;
	}

	.my_jiz {
		margin-top: 6.9rem;
		width: 100%;
		position: relative;
	}

	.my_wayre {
		margin-top: 10.4rem;
		width: 100%;
		position: relative;
	}

	.my_mod {
		margin-top: 13.9rem;
		width: 100%;
		position: relative;
	}

	.my_font {
		margin-top: 17.4rem;
		width: 100%;
		position: relative;
	}

	.modify_1 {
		margin-top: 10.4rem !important;
	}

	.modify_2 {
		margin-top: 13.9rem !important;
	}

	.modify_3 {
		margin-top: 17.4rem !important;
	}

	.modify_4 {
		margin-top: 20.9rem !important;
	}

	.modify_5 {
		margin-top: 24.4rem !important;
	}

	.my_help {
		margin-top: 20.9rem;
		width: 100%;
		position: relative;
	}

	.my_sugg {
		margin-top: 24.4rem;
		width: 100%;
		position: relative;
	}

	.my_ab {
		margin-top: 27.9rem;
		width: 100%;
		position: relative;
	}

	.my_love {
		margin-top: 31.4rem;
		width: 100%;
		position: relative;
	}

	.my_sorce_img {
		border-radius: 13px;
		position: absolute;
		left: 50%;
		top: 1rem;
		transform: translateX(-50%);
		width: 96%;
		height: 50px;
		background-color: #fff;
		display: flex;
		align-items: center;
	}

	.my_sorce_img image {
		width: 3rem;
		height: 2rem;
		margin-left: 30px;
	}

	.my_sorce_img text {
		margin-left: 10px;
		width: 40%;
	}

	.my_sorce_img image:nth-child(3) {
		width: 20px;
		height: 20px;
	}

	.my_sorce_img image:nth-child(4) {
		/* float: right; */
		width: 20px;
		height: 20px;
	}

	.rl view:nth-child(2) {
		font-size: 10px;
		white-space: normal;
		margin-left: 10px;

	}

	.right_img {
		/* margin: 0; */
		background-color: hotpink;
	}

	.right_img image {
		width: 20px;
		height: 20px;
	}

	.spe {
		transform: translateX(30px);
		font-size: 10px;
		position: absolute;
		right: 2rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.less_spe {
		margin-left: 16px;
	}

	.way image:nth-child(4) {
		margin-left: 80px;
	}

	.mod image:nth-child(4) {
		margin-left: 91px;
	}

	.more_card {
		width: 1rem;
		height: 1rem;
	}

	.test {
		height: 100%;
		width: 70%;
		position: relative;
	}

	.test #test_01 {
		width: 1rem;
		height: 1rem;
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.test1 {
		height: 100%;
		width: 47.5%;
		position: relative;
	}

	.test1 #test_01 {
		width: 1rem;
		height: 1rem;
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.test2 {
		height: 100%;
		width: 43.5%;
		position: relative;
	}

	.test2 #test_01 {
		width: 1rem;
		height: 1rem;
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.test3 {
		height: 100%;
		width: 49%;
		position: relative;
	}

	.test3 #test_01 {
		width: 1rem;
		height: 1rem;
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.rl {
		width: 70%;
	}
</style>
