<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="page m-index">
		<u-datetime-picker :show="showDate" v-model="dateNub" @cancel="isShowDate" mode="year-month"
			@confirm='confirmDate'></u-datetime-picker>
		<u-picker :show="showType" :columns="ledgerInfo" keyName="name" @cancel="isShowType" @confirm='confirm'>
		</u-picker>
		<u-toast ref="uToast"></u-toast>
		<uni-popup ref="edit" type="bottom">
			<form @submit="formSubmit">
				<view class="popup">
					<view style="display: flex; justify-content: center; border-bottom: none;">
						<text>编辑</text>
					</view>
					<view @click="openType">
						<text>类型</text>
						<text>{{editData.type+"-"+editData.name}}</text></text>
					</view>
					<view @click="openDate">
						<text>时间</text>
						<text>
							{{editData.date}}
						</text>
					</view>
					<view>
						<text>金额</text>
						<input type="number" name="account" :value="Math.abs(editData.account)">
					</view>
					<view>
						<text>备注</text>
						<input type="text" name="comment" :value="editData.comment">
					</view>
					<view style="border: none; margin-top: 2rem;">
						<view>
							<u-button icon="checkbox-mark" type="primary" size="small" form-type="submit" text="确定">
							</u-button>
						</view>
						<view>
							<u-button icon="cut" type="primary" size="small" @click="deleteItem" text="删除"></u-button>
						</view>
						<view>
							<u-button icon="close" type="primary" size="small" @click="isSave(0)" text="取消"></u-button>
						</view>
					</view>
				</view>
			</form>
		</uni-popup>
		<uni-popup ref="chooseType" type="bottom">
			<view class="poptype">
				<view v-for="item in popIcon" @click="selectType(item.name,item.type)">
					<image :src="item.path"></image>
					<text>{{item.name+"-"+item.type}}</text>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="voicepop" type="bottom">
			<view class="poptype">
				{{voicedata}}
			</view>
		</uni-popup>
		<uni-popup ref="photo" type="bottom">
			<view class="poptype">
				{{voicedata}}
			</view>
		</uni-popup>

		<view :class="{'dis_no_index':oppen==0}" class="add" @click="isAdd">
			<image style="width: 3.5rem; height:3.5rem;position: absolute;right: 0.5rem;bottom: 1.5rem;"
				src="https://beyondmyself.top/i/2023/03/10/组-234.png" alt="">
		</view>

		<u-transition :show="isShowAdd" mode="fade">
			<view class="add-nav" :class="{'dis_no_index':oppen==0}">
				<image class="x_photo" src="../../../static/img/public/12.svg" alt=""
					:class="{'x_position':isShowAdd==false,'select_hide':write!=1}"
					@click="changePage('tabbar-detial-writeBill')">
					<image class="x_import" src="../../../static/img/public/10.svg" alt="" @click="open('bottom')"
						:class="{'x_position':isShowAdd==false,'select_hide':sound!=1}">
						<image class="x_sound" src="../../../static/img/public/11.svg" alt=""
							@click="changePage('tabbar-detial-import')"
							:class="{'x_position':isShowAdd==false,'select_hide':this.import!=1}">
							<image class="x_write" src="../../../static/img/public/9.svg" alt=""
								@click="changePage('tabbar-detial-photo')"
								:class="{'x_position':isShowAdd==false,'select_hide':phone!=1}">
			</view>
		</u-transition>
		<view class="head">
			<view class="m-head">
				<view>
					<view @click="isShowType">
						<text :class="{'in_old':this.oppen==0}">{{billType}}</text>
						<u-icon name="arrow-down-fill" color="#333333" size="20"></u-icon>
					</view>
					<view @click="isShowDate">
						<text :class="{'in_old_yue':this.oppen==0}">{{date}}</text>
						<u-icon name="arrow-down-fill" color="#333333" size="14"></u-icon>
					</view>

				</view>
			</view>
			<view class="m-total">
				<uni-popup ref="voice" background-color="#fff">
					<view class="popup-content">
						<text class="text">点击说话</text>
						<text style="font-size: 13px; color: #666666;">{{voiceText}}</text>
						<view @touchstart.prevent="voicestart()" @touchend.prevent="voicestop()">
							<image style="height: 8rem; width: 8rem; margin: 3rem;" :src="voiceP"></image>
						</view>

					</view>
				</uni-popup>
				<view>
					<view>
						<view style="display: flex; flex-direction: row;">
							<image style="width: 1rem;height: 1rem;" src="../../../static/img/public/1.svg" alt="图标">
								<text style="margin-left: 0.2rem;">收入</text>
						</view>
					</view>
					<view>
						<text>{{"￥"+headTotal.totalIncome}}</text>
					</view>
				</view>
				<view>
					<view>
						<view style="display: flex; flex-direction: row;">
							<image style="width: 1rem;height: 1rem;" src="../../../static/img/public/2.svg" alt="图标">
								<text style="margin-left: 0.2rem;">支出</text>
						</view>
					</view>
					<view>
						<text>{{"￥"+headTotal.totalExpenditure}}</text>
					</view>
				</view>
				<view v-if="!isOld">
					<view>
						<view style="display: flex; flex-direction: row;">
							<image style="width: 1rem;height: 1rem;" src="../../../static/img/public/3.svg" alt="图标">
								<text style="margin-left: 0.2rem;">预算</text>
						</view>
					</view>
					<view>
						<text>{{"￥"+headTotal.budget}}</text>
					</view>
				</view>

			</view>
			<view :class="{'dis_no':oppen==1}" class="devotion">
				<image style="border-right: 1px solid #ccc;" class="x_photo_1" src="../../../static/img/public/12.svg"
					alt="" @click="changePage('tabbar-detial-writeBill')">
					<image style="border-right: 1px solid #ccc;" class="x_import_1"
						src="../../../static/img/public/10.svg" alt="" @click="open('bottom')">
						<image style="border-right: 1px solid #ccc;" class="x_sound_1"
							src="../../../static/img/public/11.svg" alt="" @click="changePage('tabbar-detial-import')">
							<image class="x_write_1" src="../../../static/img/public/9.svg" alt=""
								@click="changePage('tabbar-detial-photo')">
			</view>
		</view>

		<view class="m-main" :class="{'dis_margin':oppen==0}">
			<u-empty v-if="!isEmpy" mode="data" icon="https://cdn.uviewui.com/uview/empty/data.png">
			</u-empty>
			<view class="m-bill" v-for="(item ,index) in billDetaild" :key="index" v-if="isEmpy">
				<view class="m-b-date">
					<text :class="{'in_old_tip':oppen==0}">{{item.date}}</text>
					<view>
						<text :class="{'in_old_tip':oppen==0}" v-show="item.pay">{{"支出:"+item.pay}}</text>
						<text :class="{'in_old_tip':oppen==0}" v-show="item.income">{{"收入:"+item.income}}</text>
					</view>

				</view>
				<view class="m-b-detaild">
					<view class="hover" v-for="(i,subindex) in item.detaild" style="border-bottom: #f4f4f4 solid 0.1rem"
						@click="edit(index,subindex,i.id)">

						<view style="display: flex; align-items: center;">
							<image style="width: 2rem;height: 2rem;" :src=i.icon alt="" width="30px">
								<view style="display: flex; flex-direction: column;">
									<text>{{i.name}}</text>
									<text style="font-size: 0.9rem; color: #666666;">{{i.comment}}</text>
								</view>
						</view>
						<view>
							<text style="height: 2rem; line-height: 2rem;">{{i.rmb}}</text>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 5rem;"></view>
		</view>
		<uni-calendar ref="calendar" class="uni-calendar--hook" :clear-date="true" :date="info.date"
			:insert="info.insert" :lunar="info.lunar" :startDate="info.startDate" :endDate="info.endDate"
			:range="info.range" @confirm="seleteDate" @close="close" />
	</view>
</template>

<script>
	import mode from "../../../static/json/temporary.json"
	import opden from "../../../static/json/devotion.json"
	import init from "../../../static/json/init.json"
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	import apdata from '../../../static/json/way.json'
	import TypeIcon from '../../../static/icon.json'
	import icon from '../../../uni_modules/uview-ui/libs/config/props/icon';
	import base from '@/static/base.js';
	import {
		onLoad
	} from "../../../uni_modules/uview-ui/libs/mixin/mixin";
	export default {
		extends: base,
		data() {

			return {
				isEmpy: 0,
				first_comeinto: 1,
				xxv: 0,
				oppen: 1,
				bill: 0,
				chart: 0,
				budget: 0,
				info: {
					lunar: false,
					range: false,
					insert: false,
				},
				voicedata: '',
				title: '',
				isVoiceShow: false,
				typeicon: TypeIcon.icon,
				phone: 1,
				sound: 1,
				write: 1,
				import: 1,
				ledgerInfo: [
					[{
						name: 'a'
					}]

				],

				isShowAdd: false,
				showType: false,
				showDate: false,
				showShowType: false,
				headTotal: {
					totalIncome: 0,
					totalExpenditure: 0,
					budget: 0

				},
				billType: '生活账本',
				date: '202年2月',
				month: '4',
				dateNub: Number(new Date()),
				tes5: 1,
				billDetaild: '',
				editData: {
					name: '',
					type: '',
					date: '',
					id: '',
					comment: '',
					account: '',
				},
				isvoice: true,
				popIcon: [{
					path: '',
					name: '',
					type: ''
				}],
				voicePath: '',
				userId: '',
				voiceText: "按住说话今天午餐20元",
				voiceP: 'https://beyondmyself.top/i/2023/02/28/voice.png',
				isOld: 1,
				loop: '',

			};
		},
		onLoad() {
			let self = this;
			var api = this.GLOBAL.baseApi
			getInit(self, api)
			this.billType = this.GLOBAL.bill
			var baseTime = new Date()
			
			this.date = baseTime.getFullYear() + "年" + (this.GLOBAL.month) + "月"
			this.month = baseTime.getMonth() + 1
			recorderManager.onStop(function(res) {
				self.$refs.uToast.show({
					type: 'success',
					message: "正在识别请稍后",
				})
				uni.uploadFile({
					url: 'http://43.143.3.149:4321/keepAccounts/wav', //仅为示例，非真实的接口地址
					name: 'file',
					filePath: res.tempFilePath,
					success: (uploadFileRes) => {
						var {
							code,
							data
						} = JSON.parse(uploadFileRes.data)
						uni.navigateTo({
							url: `/pages/tabbar-detial/tabbar-detial-writeBill/tabbar-detial-writeBill`,
							success: function(res) {
								// 通过eventChannel向被打开页面传送数据
								res.eventChannel.emit('value', data)
							}
						})
					},

				});
			});
			console.log("重新加载")
		},
		onShow() {
			let self = this;
			var api = this.GLOBAL.baseApi
			// this.getInit(self, api)
			getInit(self, api)
			console.log("onshow")
			this.oppen = opden.open
			this.phone = apdata.show_which.phone
			this.sound = apdata.show_which.sound
			this.write = apdata.show_which.write
			this.import = apdata.show_which.import
			var l = uni.getStorageSync('ledgerInfo')
			this.ledgerInfo = [l]


		},

		methods: {
			formSubmit(e) {
				var that = this
				var api = this.GLOBAL.baseApi
				var param2 = "income"

				var {
					account,
					comment
				} = e.detail.value
				const {
					type,
					name,
					date,
					id
				} = this.editData
				if (type === "支出") {
					param2 = "expenditure"
					account = -account
				}
				var pream = {
					id: id,
					amount: account,
					category: name,
					comment: comment,
					expenditureDate: date,
				}
				var code = update(pream, param2, "update", api, that)

			},
			isSave(flag) {
				this.$refs.edit.close()
			},
			seleteDate(e) {
				console.log(e, "设置日期")
				this.editData.date = e.year + "-" + e.month + "-" + e.date
			},
			close() {
				// this.$refs.calendar.close()
			},
			deleteItem() {
				var that = this
				var api = this.GLOBAL.baseApi
				var param2 = "expenditure"
				const {
					id,
					type
				} = this.editData
				console.log(id, type)
				if (type === "收入") {
					param2 = "income"
				}
				var code = deleteByid(api, id, param2, that)

			},
			save(number) {
				const {
					baseApi,
					userId
				} = this.GLOBAL
				const requestData = {
					userId,
					fontNum: number
				}
				uni.request({
					url: baseApi + "/userInfo/updateFont",
					method: "POST",
					data: requestData,
					success: (res) => {
						console.log(res.data)
						this.$forceUpdate()
					}
				});
			},
			voicestart() {
				this.voiceText = "松开保存"
				var parem = {
					format: 'wav'
				}
				console.log("start")
				recorderManager.start(parem)
			},
			voicestop() {
				this.voiceText = "长按说今天午餐20元"
				console.log("stop")
				recorderManager.stop()


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
			changePage(name) {
				uni.redirectTo({
					url: `/pages/tabbar-detial/${name}/${name}`,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			selectType(name, type) {
				this.editData.name = name
				this.editData.type = type
				this.$refs.chooseType.close()
			},
			openDate() {
				this.$refs.calendar.open()

			},
			dialogInputConfirm(e) {
				console.log(e)
				this.editData.account = e
			},
			openType() {
				this.$refs.chooseType.open()
			},
			edit(index, subindex) {
				var icon = TypeIcon.icon
				var list = this.billDetaild
				const {
					date
				} = list[index]
				const {
					id,
					type,
					rmb,
					name,
					comment
				} = list[index].detaild[subindex]
				var listIcon = []
				icon.map((item) => {
					if (item.type === type) {
						listIcon.push({
							path: item.path,
							name: item.name,
							type
						})
					}
				})
				this.popIcon = listIcon

				console.log(listIcon)



				this.editData = {
					date: date.substr(0, 10),
					id: id,
					type: type,
					name: name,
					account: rmb,
					comment: comment
				}
				this.$refs.edit.open()
			},
			open(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.voice.open(type)
			},
			jumpCalendar() {
				uni.navigateTo({
					url: '/pages/tabbar/account_book/account_book_calendar/account_book_calendar'
				})
			},
			isAdd() {
				this.isShowAdd = !this.isShowAdd
			},
			isShowType() {
				this.showType = !this.showType
			},
			isShowDate() {
				this.showDate = !this.showDate
			},
			isShowshowType(e) {
				console.log(e)
				this.showShowType = !this.showShowType
			},
			confirm(e) {
				var api = this.GLOBAL.baseApi
				var year = this.GLOBAL.year
				var that = this
				var month = this.month
				this.GLOBAL.SetSelect(e.value[0].id)
				this.GLOBAL.setBill(e.value[0].name)
				this.billType = e.value[0].name
				getdata(that, api, year, month)
				this.showType = !this.showType
			},
			confirmDate(e) {
				var date = this.FormatDate(e)
				this.date = date.name
				this.GLOBAL.SetYear(date.year)
				this.GLOBAL.setMonth(date.month)
				this.month = date.month
				var api = this.GLOBAL.baseApi
				var year = this.GLOBAL.year
				var that = this
				var month = this.month
				getdata(that, api, year, month)
				this.showDate = !this.showDate

			},
			FormatDate(e) {
				var date = new Date(e.value)
				return {
					name: `${date.getFullYear()}年${(date.getMonth()+1)}月`,
					year: date.getFullYear(),
					month: date.getMonth() + 1
				}
			},
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.ShowTypes[index])
				}
			},

		},


	}
	const getdata = (that, api, year, month) => {
		const url =
			`${api}/ledger?ledgerId=${that.GLOBAL.selectledger}&year=${year}&month=${month}&userId=${that.GLOBAL.userId}`
		uni.request({
			url, //仅为示例，并非真实接口地址。
			success: (res) => {
				res.data.data[0]
				that.headTotal = res.data.data[0]
				that.billDetaild = tarnAccount(res.data.data)
				that.isEmpy = res.data.data.length
				
				console.log(res)

			},
			fail: (err) => {
				// 请求失败处理
				uni.showToast({
					title: '获取数据失败',
					icon: 'none'
				});
				console.error(err);
			}

		});
	}
	const getInit = (that, api) => {
		const token = uni.getStorageSync('token');
		const firstLoad = uni.getStorageSync('firstLoad');
		if (token) {
			uni.request({
				url: api + "/user/me", //仅为示例，并非真实接口地址。
				header: {
					'content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
					"Authorization": token
				},
				success: (req_res) => {
					if (req_res.data.code === 200) {
						const {
							userInfo,
							ledgerInfo,
							userInfoData
						} = req_res.data.data
						init.total.b = userInfoData.moduleSelection.bill
						init.total.bu = userInfoData.moduleSelection.budget
						init.total.c = userInfoData.moduleSelection.chart
						uni.setStorageSync('userInfo', userInfo);
						uni.setStorageSync('ledgerInfo', ledgerInfo);
						uni.setStorageSync('userInfoData', userInfoData)
						that.GLOBAL.SetuserInfoData(userInfoData)
						that.GLOBAL.setBill(ledgerInfo[0].name)
						that.GLOBAL.SetUserId(userInfo.userId)
						if (!firstLoad) {
							that.GLOBAL.SetSelect(ledgerInfo[0].id)
							uni.setStorageSync('firstLoad', true)
						}
						that.setRootFontSize(userInfoData.fontSetting + "px");
						that.ledgerInfo = [ledgerInfo]
						var year = that.GLOBAL.year 
						var month = that.GLOBAL.month
						getdata(that, api, year, month)
						const is_old = userInfoData.isOld
						that.isOld = is_old
						opden.open = (userInfoData.isOld + 1) % 2
						apdata.show_which.phone = userInfoData.bookkeepingMethod.photograph
						apdata.show_which.write = userInfoData.bookkeepingMethod.hand
						apdata.show_which.sound = userInfoData.bookkeepingMethod.wav
						apdata.show_which.import = userInfoData.bookkeepingMethod.vxzfb
						that.phone = apdata.show_which.phone
						that.sound = apdata.show_which.sound
						that.write = apdata.show_which.write
						that.import = apdata.show_which.import
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




	}
	const update = (param, param2, param3, api, that) => {
		const year = that.GLOBAL.year
		const month = that.month
		 const url = `${api}/${param2}/${param3}`
		uni.request({
			url,

			method: "POST",
			header: {
				'content-type': 'application/json;charset:utf-8'
			},
			data: param,
			success: (res) => {
				console.log(res.data)
				if (res.data.code === 200) {
					showSuccessMessage(that, "保存成功")
					getdata(that, api, year, month)
					that.$refs.edit.close()

				}
			},
			fail: (err) => {
				// 请求失败处理
				showErrorMessage(that,"保存失败")
				console.error(err);
			}
		});
	}
	const deleteByid = (api, id, param, that) => {
		const year = that.GLOBAL.year;
		const month = that.month;
		const url = `${api}/${param}/delete?id=${id}`;

		uni.request({
			url,
			method: 'POST',
			header: {
				'content-type': 'application/json;charset:utf-8',
			},
			success: (res) => {
				console.log(res.data);
				if (res.data.code === 200) {
					showSuccessMessage(that, '删除成功');
					getdata(that, api, year, month);
					that.$refs.edit.close();
				}
			}
		})
	};

	const showSuccessMessage = (that, message) => {
		that.$refs.uToast.show({
			duration: '500',
			type: 'success',
			message,
		});
	};

	const showErrorMessage = (that, message) => {
		that.$refs.uToast.show({
			duration: '500',
			type: 'error',
			message,
		});
	};

	const tarnAccount = (data) => {
		const icon = TypeIcon.icon;

		return data.slice(1).map((item) => {
			const detaild = item.dayData.map((item2) => {
				const {
					path,
					type
				} = icon.find(i => i.name === item2.category) || {};
				return {
					icon: path || "",
					type: type || "",
					name: item2.category,
					rmb: item2.amount,
					comment: item2.comment,
					id: item2.id
				};
			});
			return {
				date: `${item.date} ${item.week}`,
				pay: -item.dayExpenditure,
				income: item.dayIncome,
				detaild
			};
		});
	};
</script>

<style lang="scss">
	.in_old {
		font-size: 30px !important;
	}

	.in_old_yue {
		margin-top: 5px;
		font-size: 20px !important;
	}

	.in_old_tip {
		font-size: 20px !important;
	}

	.dis_no_index {
		display: none;
	}

	.dis_no {
		display: none !important;
	}

	.x_position {
		bottom: 0.5em !important;
		right: -0.1rem !important;

	}

	// 过渡
	.x_photo {
		width: 3rem;
		height: 3rem;
		position: absolute;
		bottom: 4.8em;
		right: -0.2rem;
		transition: all 1s;
	}

	.devotion {
		height: 5rem;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.x_photo_1,
	.x_import_1,
	.x_write_1,
	.x_sound_1 {
		flex: 1;

		width: 3rem;
		height: 3rem;
	}

	.x_import {
		width: 3rem;
		height: 3rem;
		position: absolute;
		bottom: 3.3rem;
		right: 3.1rem;
		transition: all 1s;
	}

	.x_sound {
		width: 3rem;
		height: 3rem;
		position: absolute;
		bottom: -0.1rem;
		right: 3.8rem;
		transition: all 1s;
	}

	.x_write {
		width: 3rem;
		height: 3rem;
		position: absolute;
		bottom: -3.2rem;
		right: 1.8rem;
		transition: all 1s;
	}

	.select_hide {
		display: none !important;
	}

	.m-voice {
		transform: scale(0.8);
	}

	.poptype {
		background-color: white;
		padding: 1rem 1rem 5rem 1rem;
		margin: 0.5rem 0.5rem 0 0.5rem;
		border-radius: 0.5rem 0.5rem 0 0;
		height: 20rem;
		overflow: auto;

		view {
			display: flex;
			align-items: center;
			padding: 0.5rem;
			border-bottom: #ededed solid 1px;

			image {
				width: 2rem;
				height: 2rem;
				margin-right: 0.5rem;
			}

		}
	}

	.popup {
		padding: 1rem 1rem 1rem 1rem;
		margin: 0.5rem 0.5rem 0 0.5rem;
		// width: 16rem;
		border-radius: 0.5rem 0.5rem 0 0;
		background-color: white;
		color: #333333;
		font-size: 15px;

		view {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 0.1rem;
			margin: 0.8rem 0;
			border-bottom: #d4d4d4 solid 1px;

			view {
				border-bottom: none;
				box-sizing: border-box;
				width: 30%;
			}

			text:nth-child(2) {
				font-size: 13px;
				// color: #666666;
			}

			input {
				text-align: right;
			}
		}


	}

	.page {
		height: 100%;
	}

	page {
		background-color: #F4F4F4;


	}

	.popup-content {
		height: 20rem;
	}

	.text {
		margin: 1rem;
	}

	.m-main {
		// height: 32rem;
		// overflow: auto;

		padding-top: 9rem;
	}

	.dis_margin {
		margin-top: 4rem;
	}

	.m-index {
		color: #333333;
		width: 95%;
		padding: 0 0.5rem;


	}

	.add {
		bottom: 6rem;
		right: 2rem;
		position: fixed;

	}

	.add-nav {
		bottom: 7rem;
		right: 3rem;
		position: fixed;
	}

	.head {
		width: 96%;
		position: fixed;
		background-color: #F4F4F4;
		z-index: 2;
		// top: 2.5rem;
	}

	.m-head {
		display: flex;
		justify-content: space-between;

		view:nth-child(1) {
			display: flex;
			flex-direction: column;
			font-weight: bold;

			view {
				display: flex;
				flex-direction: row;
			}

			view:nth-child(1) {

				font-size: 24px;
			}

			view:nth-child(2) {
				font-size: 13px;
			}
		}

		view:nth-child(2) {

			view {
				display: flex;
				color: #666666;
			}
		}

	}

	.m-total {
		font-size: 1rem;
		display: flex;
		background-color: white;
		border-radius: 0.5rem;
		padding: 1rem 0 1rem 0;
		margin-top: 0.5rem;
		justify-content: space-around;
		box-shadow: 0.1rem 0.1rem 0.1rem #d4d4d4;

		view {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}

	.m-bill {
		margin-top: 0.6rem;

		.m-b-date {
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			color: #666666;
			margin-bottom: 0.1rem;


			view {
				text {
					margin: 0.1rem;
				}
			}
		}

		.m-b-detaild {
			background-color: white;
			border-radius: 0.4rem;
			margin-top: 0.2rem;

			view {
				display: flex;
				padding: 0.2rem 0.5rem 0.1rem 0.5rem;
				justify-content: space-between;

			}

		}
	}
</style>
