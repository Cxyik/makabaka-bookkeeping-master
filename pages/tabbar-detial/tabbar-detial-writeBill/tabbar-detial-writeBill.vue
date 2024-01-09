<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="page">
		<view style=" height: var(--status-bar-height);">

		</view>
		<u-toast ref="uToast"></u-toast>
		<uni-calendar ref="calendar" class="uni-calendar--hook" :clear-date="true" :date="info.date"
			:insert="info.insert" :lunar="info.lunar" :startDate="info.startDate" :endDate="info.endDate"
			:range="info.range" @confirm="confirm" @close="close" />
		<uni-popup ref="popup" type="bottom">
			<view class="popup">
				<view class="hover" v-for="item in subIcon" :id=item.value
					@click="selectType(item.name,item.value,item.path,item.fistName)">
					<image :src="item.path" mode=""></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</uni-popup>
		<view class="nav">
			<uni-row class="demo-uni-row">
				<uni-col :span="8">
					<view style="width: 3rem; height: 2rem;" @click="back">取消</view>
				</uni-col>
				<uni-col :span="8">
					<view class="m-choose">
						<text :class="[{ 'isChose': isPay}]" @click="change(0)">支出</text>
						<text :class="[{ 'isChose': isIncome }]" @click="change(1)">收入</text>
					</view>
				</uni-col>
				<uni-col :span="8">
					<view style="float: right; color:#3579E8" @click="rewrite">保存再记</view>
				</uni-col>
			</uni-row>
		</view>
		<!-- 		<view class="m-search">
			<uni-easyinput prefixIcon="mic-filled" placeholder="试试说今日收入20元" />
			<button class="mini-btn" type="primary">识别</button>
		</view> -->
		<view class="m-body">
			<view>
				<view v-for="item in iconList" :id=item.value @click="showDetial" style="position:relative;">
					<image :src="item.path" mode=""></image>
					<image style="
								position: absolute; 
								width: 0.8rem; 
								height: 0.8rem;
								bottom: 1.8rem; 
								right: 1.3rem;
								border-radius: 99rem;
					 " src="https://beyondmyself.top/i/2023/03/09/组-233.png"></image>
					<text style="font-size: 1rem;">{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="m-bottom">
			<view class="m-select">
				<image style="height: 0.8rem; width: 0.8rem; margin-right: 0.2rem;" :src="type.path"></image>
				<text @click="selectFistType">{{type.name}}</text>

			</view>
			<view class="input">
				<view class="m-RMB" :style="fontcolor">
					<text @click="p">￥{{res}}</text>
				</view>
				<view class="b-input">
					<view class="m-clock" @click="open">
						<image src="https://beyondmyself.top/i/2023/03/01/时钟.png">
						</image>
						<text>{{date}}</text>
					</view>
					<view class="m-more">
						<input type="text" v-model="value" placeholder="备注">
						<image src="https://beyondmyself.top/i/2023/03/01/more.png"></image>
					</view>

				</view>
			</view>
			<view class="m-number">
				<view v-for="v in number" class="put-column">
					<view v-for="x in v" class="btn-nub" @click="isClick" :id=x><text>{{x}}</text></view>
				</view>
				<view class="put-column">
					<view class="btn-nub" id="+">
						<text>+</text>
					</view>
					<view class="btn-nub" id="-">
						<text>-</text>
					</view>
					<view class="btn-nub btn-submit" :style="bgcolor" @click="submit">
						<text>{{ValueSubmit}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TypeIcon from '../../../static/icon.json'
	import icon from '../../../uni_modules/uview-ui/libs/config/props/icon';
	import base from '@/static/base.js';
	export default {
		extends:base,
		data() {
			return {
				type: {
					name: "未选择",
					path: '',
					value: "",
					fistName: ''
				},
				showCalendar: false,
				info: {
					lunar: false,
					range: false,
					insert: false,
				},
				date: "今天",
				isIncome: false,
				isPay: true,
				res: '0.00',
				value: '',
				ValueSubmit: '完成',
				isFirstadd: true,
				isFirstsub: true,
				TempValue: '',
				leftValue: '',
				operateA: '',
				isLeft: true,
				bgcolor: "background-color: #DD634E;",
				fontcolor: 'color: #DD634E;',
				number: [
					[1, 4, 7, "."],
					[2, 5, 8, 0],
					[3, 6, 9, "删除"]
				],
				incomeIcon: '',
				payIcon: '',
				iconList: TypeIcon.icon,
				subIcon: '',
				whatType: "expenditure",
				creatorId: '',
				ledgerId: "",
				voideData: '',

			};
		},

		onReady() {
			var icon = TypeIcon.icon
			this.payIcon = icon.slice(0, icon.length - 3)
			this.incomeIcon = icon.slice(icon.length - 3, icon.length)
			this.iconList = this.payIcon
			uni.getStorage({
				key: "userId",
				success(res) {
					this.creatorId = res.data
					console.log(res)
				}
			})
		},
		onLoad(e) {
			var that = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('value', function(data) {
				var {
					amount,
					comment,
					category,
					subcategory,
					expenditureDate
				} = data
				that.date = expenditureDate.slice(5)
				that.value = comment
				that.res = amount
				var icon = TypeIcon.icon
				icon.forEach((item) => {
					if (item.name === category) {
						item.subIcon.forEach((i)=>{
							if(i.name===subcategory)
							that.type={
								name: i.name,
								path: i.path,
								value:item.value,
								fistName:i.fistName
							}
						})
					}
				})
				console.log(expenditureDate)
			})
		},

		methods: {
			close() {

			},
			reload() {
				location.reload()
			},
			rewrite() {
				var userId = uni.getStorageSync('userInfo').userId
				var ledgerId = this.GLOBAL.selectledger
				var api = this.GLOBAL.baseApi
				var year = '2023-'
				var time = new Date()
				var whatType = this.whatType
				var {
					res,
					date,
					value,
					type
				} = this
				if (date === "今天") {
					date = (time.getMonth() + 1) + "-" + time.getDate()
				}
				date = year + date
				res = parseFloat(res)
				var parem = {
					creatorId: this.creatorId,
					ledgerId: ledgerId,
					amount: res,
					category: type.fistName,
					subcategory: type.name,
					comment: value,
					incomeDate: date
				}
				if (whatType === "expenditure") {
					parem = {
						creatorId: userId,
						ledgerId: ledgerId,
						amount: -res,
						category: type.fistName,
						subcategory: type.name,
						comment: value,
						expenditureDate: date
					}
				}
				console.log(parem)
				var that = this
				if (verification(that)) {
					save(parem, whatType, api, that, true)
				}
			},
			submit() {
				var userId = uni.getStorageSync('userInfo').userId
				var ledgerId = this.GLOBAL.selectledger
				var api = this.GLOBAL.baseApi
				var year = '2023-'
				var time = new Date()
				var whatType = this.whatType
				var {
					date,
					value,
					res,
					type
				} = this

				if (date === "今天") {
					date = (time.getMonth() + 1) + "-" + time.getDate()
				}
				date = year + date
				res = parseFloat(res)
				var parem = {
					creatorId: userId,
					ledgerId: ledgerId,
					amount: res,
					category: type.fistName,
					subcategory: type.name,
					comment: value,
					incomeDate: date
				}
				if (whatType === "expenditure") {
					parem = {
						creatorId: userId,
						ledgerId: ledgerId,
						amount: -res,
						category: type.fistName,
						subcategory: type.name,
						comment: value,
						expenditureDate: date
					}
				}
				console.log(parem)
				var that = this
				if (verification(that)) {
					save(parem, whatType, api, that, false)
				}

			},
			selectFistType() {
				var icon = TypeIcon.icon
				icon.forEach((item) => {
					if (item.value === this.type.value) {
						this.subIcon = item.subIcon
					}
				})
				if (this.type.value)
					this.$refs.popup.open()
			},
			selectType(name, value, path, fistName) {
				this.type.name = name
				this.type.value = value
				this.type.path = path
				this.type.fistName = fistName
				this.$refs.popup.close()
			},
			open() {
				this.$refs.calendar.open()
			},
			confirm(e) {
				this.date = e.month + "-" + e.date
				console.log(e)
			},
			showDetial(e) {
				var id = e.currentTarget.id
				var icon = TypeIcon.icon
				icon.forEach((item) => {
					if (item.value === id) {
						this.subIcon = item.subIcon
					}
				})
				this.$refs.popup.open()
			},
			back() {
				uni.reLaunch({
					url: '/pages/tabbar/account_book/account_book',
				})
			},
			change(e) {
				var icon = TypeIcon.icon
				this.isIncome = !this.isIncome,
					this.isPay = !this.isPay
				if (e) {
					this.bgcolor = "background-color: #79C789;"
					this.fontcolor = "color:#79C789"
					this.iconList = this.incomeIcon
					this.whatType = "income"
				} else {
					this.bgcolor = "background-color: #DD634E;"
					this.fontcolor = 'color: #DD634E;'
					this.iconList = this.payIcon
					this.whatType = "expenditure"
				}
			},
			isClick(e) {
				var temp = this.TempValue;
				var selectValue = e.currentTarget.id
				if (selectValue == "删除") {
					this.res = this.res.substr(0, this.res.length - 1)
					this.TempValue = this.res
					console.log("s")
				} else {
					this.res = temp + selectValue
					if (this.isLeft) {
						this.leftValue = this.res
					}
					// console.log(this.TempValue)
					this.TempValue = this.res
					console.log(this.res)

				}

			},
			operate(e) {
				this.operateA = e.currentTarget.id
			},
		}

	}
	const verification = (that) => {
		var isres = 0
		var {
			type
		} = that
		if (type.name === "未选择") {
			popmsg(that, "请选择类型")
		} else {
			isres = 1
		}
		return isres
	}
	const popmsg = (that, msg) => {
		that.$refs.uToast.show({
			message: msg,
		})
	}
	const save = (param, type, api, that, rewrite) => {
		uni.request({
			url: api + "/" + type + "/save",
			method: "POST",
			header: {
				'content-type': 'application/json;charset:utf-8'
			},
			data: param,
			success: (res) => {
				console.log(res.data)

				if (rewrite) {
					that.$refs.uToast.show({
						type: 'success',
						message: "保存成功",
					})
					setTimeout(() => {
						location.reload()
					}, 300)
				} else {
					that.$refs.uToast.show({
						type: 'success',
						message: "保存成功",
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/tabbar/account_book/account_book',
						})
					}, 300)

				}
			}
		});
	}
</script>

<style lang="scss">
	.page {
		height: 100%;
	}
	
	

	.m-select {
		font-size: 14px;
		color: #666666;
		background-color: white;
		padding: 0.3rem;
		margin: 0.3rem;
		width: 5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 99rem;
	}

	.m-bottom {
		width: 100%;
		position: fixed;
		bottom: 0.5rem;
	}

	.popup {
		display: flex;
		flex-wrap: wrap;
		background-color: white;
		border-radius: 0.5rem .5rem 0 0;
		padding-bottom: 10rem;

		view {
			width: 25%;
			color: #666666;
			font-size: 13px;
			padding: 0.5rem;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			// background-color: #d5d5d5;

			image {
				width: 2.0rem;
				height: 2.0rem;
				padding: 0.5rem;
				background-color: #ededed;
				border-radius: 99rem;
				overflow: auto;

			}

			text {
				margin-top: 0.3rem;
			}

		}
	}


	.m-body {
		view {
			display: flex;
			flex-wrap: wrap;

			view {
				width: 25%;
				color: #666666;
				font-size: 13px;
				padding: 0.5rem;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 2.8rem;
					height: 2.8rem;
				}

				text {
					margin-top: 0.3rem;
				}

			}
		}
	}

	.btn-nub {
		height: 2.5rem;
		width: 5.1rem;
		background-color: white;
		margin: 0.2rem;
		line-height: 2.5rem;
		text-align: center;
		border-radius: 0.3rem;
		font-size: larger;
	}
	.btn-nub:active{
		background-color: #ededed;
	}

	.m-more {
		display: flex;
		align-items: center;

		input {
			width: 15rem;
		}

		image {
			height: 1rem;
			width: 1rem;
			transform: rotate(-90deg);

		}
	}

	page {
		background-color: #f4f4f4;
		color: #666666;
	}

	.demo-uni-row {
		height: 3rem;
		padding: 0 1rem 0 1rem;
	}

	.put-column {
		display: flex;
		flex-direction: column;
	}

	.btn-submit {
		color: white;
		height: 5.5rem;
		line-height: 5.5rem;
	}

	.m-choose {
		display: flex;
		justify-content: space-around;
		background-color: #d5d5d5;
		color: #666666;
		border-radius: 0.3rem;
		margin: 0 0.5rem 0 0.5rem;
		padding: 0.1rem 0 0.1rem 0;

		.isChose {
			background-color: white;
			padding: 0 0.2rem 0 0.2rem;
			border-radius: 0.3rem;
		}
	}

	.m-search {
		margin-top: -1rem;
		padding: 0 0.3rem 0 0.3rem;
		display: flex;
		align-items: center;

		.mini-btn {
			height: 2rem;
			line-height: 2rem;
			margin-left: 0.5rem;
		}
	}

	.m-number {
		display: flex;
		justify-content: center;
	}

	.input {
		height: 4rem;

		background-color: white;
		margin: 0.3rem;
		padding: 0.3rem 0.3rem 1rem 0.3rem;
		border-radius: 0.5rem;

		.b-input {
			display: flex;
			padding-top: 5px;

		}

		.m-RMB {
			font-size: 2rem;
			font-weight: bold;
			border-bottom: #f4f4f4 solid 1px;
		}

		.m-clock {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: small;
			color: #666666;
			background-color: #d8d8d8;
			border-radius: 4rem;
			padding: 0.1rem 0.5rem 0.1rem 0.5rem;
			margin-right: 0.3rem;

			image {
				width: 1.1rem;
				height: 1.1rem;
				margin: 0 0.1rem;
			}

		}


	}
</style>
