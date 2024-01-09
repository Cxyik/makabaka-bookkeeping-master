<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="m-index">
		<u-picker :show="chageYear" :columns="yearList" keyName="year" @cancel="closeYear" @confirm="selectYear">
		</u-picker>
		<view style="position: fixed; width: 100%; z-index: 99; background-color: #f4f4f4;">
			<view class="m-head">
				<text>账单</text>
				<view style="display: flex; font-size: 1rem;" @click="changeYear()">
					<text >{{date}}</text>
					<u-icon name="arrow-down-fill" color="#333333" size="20"></u-icon>
				</view>
				<!-- <text >{{date}}</text> -->
			</view>
			<view class="m-total">
				<view v-for="(item,index) in billName">
					<view>
						<view style="display: flex; flex-direction: row;">
							<image style="width: 1rem;height: 1rem;" :src=icon[index].icon alt="图标">
								<text style="margin-left: 0.2rem;">{{item.name}}</text>
						</view>
					</view>
					<view>
						<text>{{"￥"+billRmb[index].rmb}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="m-detaild">
			<view class="m-d-head">
				<view>
					<text>月份</text>
				</view>
				<view>
					<text>收入</text>
				</view>
				<view>
					<text>支出</text>
				</view>
				<view>
					<text>结余</text>
				</view>
				<view>
					<text></text>
				</view>
			</view>
			<view class="hover m-d-bill" v-for="(item,index) in monthData" :id="index+1" @click="jump">
				<view><text>{{item.date}}</text></view>
				<view><text>￥{{item.income}}</text></view>
				<view><text>￥{{-item.expenditure}}</text></view>
				<view><text>￥{{item.balance}}</text></view>
				<view>
					<image style="width: 1rem; height: 1rem;" src="../../../static/img/next.svg"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import base from '@/static/base.js';
	export default {
		extends: base,
		data() {
			return {
				icon: [{
						icon: '../../../static/img/public/1.svg'
					},
					{
						icon: '../../../static/img/public/2.svg'
					},
					{
						icon: '../../../static/img/public/4.svg'
					},
				],
				date: "2023年",
				chageYear: false,
				billName: [{
						name: '收入'
					},
					{
						name: '支出'
					},
					{
						name: '结余'
					}
				],
				billRmb: [{
						rmb: 200
					},
					{
						rmb: 300
					},
					{
						rmb: 400
					}
				],
				monthData: '',
				year: 2023,
				yearList: [
					[{
							year: 2022
						},
						{
							year: 2022
						},
						{
							year: 2022
						}
					]
				]
			}

		},
		onLoad() {
			var list = []
			for (var i = 2020; i < 2030; i++) {
				list.push({
					year: i
				})
			}
			this.yearList = [list]
		},
		onShow() {
			this.year = this.GLOBAL.year
			const that = this
			gedata(that)

		},
		methods: {
			jump(e) {
				var key = e.currentTarget.id
				uni.navigateTo({
					url: `/pages/tabbar/bill/bill-month/bill-month?id=${key}&year=${this.year}`
				});
			},
			changeYear() {
				this.chageYear = !this.chageYear
			},
			closeYear() {
				this.chageYear = !this.chageYear
			},
			selectYear(e) {
				var year = e.value[0].year
				this.year = year
				const that = this
				gedata(that)
				this.chageYear = !this.chageYear
			}

		}
	}
	const transitionBill = (data) => {
		var list = []
		list[0] = {
			rmb: data.totalIncome
		}
		list[1] = {
			rmb: -data.totalExpenditure
		}
		list[2] = {
			rmb: data.balance
		}
		return list
	}
	const gedata = (that) => {
		const api = that.GLOBAL.baseApi
		const userId = that.GLOBAL.userId
		const selectledger = that.GLOBAL.selectledger
		const year = that.year
		uni.request({
			url: api + `/ledger/bill?userId=${userId}&year=${year}&ledgerId=${selectledger}`,
			success: (res) => {
				that.billRmb = transitionBill(res.data.data)
				that.monthData = res.data.data.monthData
				that.date = year + "年"
			}
		});
	}
</script>

<style lang="scss">
	page {
		background-color: #F4F4F4;

	}

	.m-index {
		position: absolute;
		color: #333333;
		width: 95%;
		padding: 0 0.5rem;
		height: 100%;


	}

	.m-head {
		font-size: 24px;
		font-weight: bold;
		display: flex;
		flex-direction: column;

		text:nth-child(2) {
			font-size: 14px;
		}
	}


	.m-detaild {
		position: relative;
		margin: 9.5rem 0;
		background-color: white;
		border-radius: 0.5rem;
		padding: 1rem 0 0.5rem 0;
		width: 100%;
		margin-bottom: 40rem;

		view {
			display: flex;
			width: 100%;
		}

		.m-d-head {
			border-bottom: #ebebeb solid 1px;
			background-color: white;
			color: #999999;
			font-size: 14px;

			view {
				width: 40%;
				display: flex;
				justify-content: center;
			}

			view:nth-last-child(1) {
				width: 5%;
			}
		}

		.m-d-bill {
			color: #666666;
			margin: 0.5rem 0;

			// background-color: white;
			view {
				width: 40%;
				display: flex;
				height: 2rem;
				justify-content: center;
				box-sizing: border-box;
				border-bottom: #ebebeb solid 1px;
			}

			view:nth-last-child(1) {
				width: 12%;
			}

		}

		.m-d-bill:nth-last-child(1) {
			// background-color: #ebebeb;
			margin-bottom: 2rem;
		}
	}

	.m-budget {
		margin-top: 1rem;
		background-color: white;
		padding: 0.5rem 1rem;

		.m-b-body {
			view:nth-child(2) {
				margin-top: 0.5rem;
				display: flex;
				justify-content: space-around;

				li {
					list-style: none;
					display: flex;
					flex-direction: column;
					align-items: center;
				}
			}
		}

	}

	.m-total {
		width: 96%;
		// font-weight: bold;
		display: flex;
		background-color: white;
		border-radius: 0.5rem;
		padding: 1rem 0 1rem 0;
		margin-top: 1rem;
		justify-content: space-around;
		box-shadow: 0.1rem 0.1rem 0.1rem #d4d4d4;

		view {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
</style>
