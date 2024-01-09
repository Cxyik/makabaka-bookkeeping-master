<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view>
		<view style=" height: var(--status-bar-height);">
		</view>
		<view class="black">
			<uni-nav-bar left-icon="left" :title="title" @clickLeft="back" />
		</view>
		<view class="load" v-if="isLoad">
			<u-skeleton rows="5" :animate="true"  :loading="isLoad"></u-skeleton>
		</view>
		<view class="m-index" v-if="!isLoad">
			<view class="m-surplus-card">
				<view class="m-title">
					<!-- <text>{{title}}</text> -->
				</view>
				<view class="m-head">
					<view>
						<text>本月结余:</text>
						<text>{{headdata.balance}}</text>
					</view>
					<!-- 					<view class="charts-box">
						<qiun-data-charts type="mount" :opts="opts" :chartData="chartData" />
					</view> -->
					<view class="m-total">
						<view>
							<view>
								<image src="../../../../static/img/public/1.svg"></image>
								收入
							</view>
							<view>
								{{headdata.totalIncome}}
							</view>
						</view>
						<view>
							<view>
								<image src="../../../../static/img/public/2.svg"></image>
								支出
							</view>
							<view>
								{{headdata.totalExpenditure}}
							</view>
						</view>
						<view>
							<view>
								<image src="../../../../static/img/public/4.svg"></image>
								结余
							</view>
							<view>
								{{headdata.balance}}
							</view>
						</view>
					</view>
				</view>

			</view>
			<!-- 			<view class="pay-rank">
				<view class="p-head">
					<text>支出排行</text>

				</view>
				<view :class="['p-item',{'p-more':isShow}]" v-for="(item,index) in list">
					<view class="p-left">
						<text>{{index+1}}</text>
						<image style="height: 1.8rem;width: 1.8rem;" :src="item.path" mode=""></image>
						<view class="p-i-title">
							<text>{{item.category}}</text>
							<text>{{item.date}}</text>
						</view>
					</view>
					<view>
						<text>{{item.account}}</text>
					</view>
				</view>
				<view :class="['more', {'tranform':!isShow}]" @click="showAll">
					<image style="height: 0.8rem; width: 1rem;" src="https://beyondmyself.top/i/2023/03/07/more.png">
					</image>
				</view>
			</view> -->
			<view class="m-detaild">
				<view class="m-d-head">
					<view>
						<text>日</text>
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
				<view class="m-d-bill" v-for="(item,index) in monthData" :id="index+1" @click="jump">
					<view><text>{{item.date}}日</text></view>
					<view><text>￥{{item.income}}</text></view>
					<view><text>￥{{-item.expenditure}}</text></view>
					<view><text>￥{{item.balance}}</text></view>
					<view>
						<!-- <image style="width: 1rem; height: 1rem;" src="../../../../static/img/next.svg"></image> -->
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	// import jsonData from "./chart.json"
	import TypeIcon from '../../../../static/icon.json'
	import base from '@/static/base.js';
	export default {
		extends: base,
		data() {
			return {
				isLoad:true,
				title: '2023',
				list: '',
				isShow: true,
				headdata:{
					balance:0,
					totalExpenditure:0,
					totalIncome:0
					
				},
				chartData: {

				},
				monthData: '',
				opts: {
					color: ["#1890FF", "#91CB74"],
					padding: [15, 15, 0, 5],
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						data: [{
							min: 0
						}]
					},
					extra: {
						mount: {
							type: "mount",
							widthRatio: 1.5
						}
					}
				}
			};
		},

		// onReady() {
		// 	var list=[]
		// 	for(var i = 1;i<31;i++){
		// 		list.push({
		// 			date:i,
		// 			income:2,
		// 			expenditure:2,
		// 			balance:2
		// 		})
		// 	}
		// 	this.monthData=list
		// },

		onLoad(option) {

			var api = this.GLOBAL.baseApi
			var year = option.year
			var userId = this.GLOBAL.userId
			const selectledger=this.GLOBAL.selectledger
			this.title = year+"年" + option.id + "月"
			uni.request({
				url: api + '/ledger/bill/monthBill?userId=' + userId + '&year=' + year + '&month=' + option.id +'&ledgerId='+selectledger,

				success: (res) => {
					var initdata = res.data.data
					this.headdata.balance = initdata.balance
					this.headdata.totalExpenditure = initdata.totalExpenditure
					this.headdata.totalIncome = initdata.totalIncome
					this.monthData = initdata.monthDate
					this.isLoad=false
				}
			});

		},
		methods: {
			showAll() {
				this.isShow = !this.isShow
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4;
		color: #333333;
	}

	.m-chart {
		width: 100%;
		height: 20%;
		// transform: scale(0.9);
	}
.load{
		background: #fff;
		margin: 0.5rem;
		padding: 0.5rem;
		border-radius: 0.5rem;
	}
	.more {
		width: 100%;
		text-align: center;
	}

	.tranform {
		transform: rotate(180deg);
	}

	.pay-rank {
		background-color: white;
		margin-top: 0.6rem;
		border-radius: 0.5rem;
		padding: 0.3rem;



		.p-head {
			color: #999999;
			font-size: 14px;
			margin: 0.5rem 0 0.5rem 0;
		}

		.p-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #333333;
			padding: 0.3rem;
			border-bottom: #ebebeb solid 1px;

			// transition:  all 1s;
			.p-left {
				display: flex;
				align-items: center;
				justify-content: space-around;
				width: 36%;

				image: {
					height: 0.8rem;
					width: 0.8rem;
				}

				.p-i-title {
					font-size: 15px;
					display: flex;
					flex-direction: column;

					text:nth-child(2) {
						font-size: 12px;
						color: #999999;
					}
				}
			}
		}

		.p-more:nth-child(n+5) {
			display: none;
		}

	}

	.m-detaild {
		position: relative;
		margin: 1rem 0;
		background-color: white;
		border-radius: 0.5rem;
		padding: 1rem 0 0.5rem 0;
		width: 100%;

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
			margin: 0.1rem 0;

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

		.m-d-bill:hover {
			// background-color: #ebebeb;
		}
	}

	.m-index {
		padding: 0.5rem;
	}

	.m-surplus-card {
		padding: 0.3rem;
		background-color: white;
		border-radius: 0.5rem;

		.m-title {
			width: 100%;
			color: #666666;
			text-align: center;
		}

		.m-total {
			flex-direction: row !important;
			justify-content: space-around !important;
			image {
				width: 1rem;
				height: 1rem;
				
			}
			view {
				display: flex;
				justify-content: center;
				view {
					display: flex;
					flex-direction: row !important;
					align-items: center;
				}
			}
		}

		.m-head {
			view {
				display: flex;
				flex-direction: column;

				text:nth-child(1) {
					color: #999999;
					font-size: 13px;
				}

				text:nth-child(2) {
					margin: 0.3rem;
					font-weight: bold;
					font-size: 25px;
				}

			}
		}
	}
</style>
