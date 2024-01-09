<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="m-index">
		<view class="m-head">
			<text>预算</text>
			<u-toast ref="uToast"></u-toast>
		</view>
		<view style="=background-color: #f4f4f4;">
			<view class=" m-budget" style="margin-top: 3rem;">
				<view class="m-b-head">
					<text style="font-weight: bold;">本年度预算</text>
					<!-- <text @click="toggle('center',0)">编辑</text> -->
				</view>
				<view class="m-b-body">
					<view style="height: 4rem; width: 20%;">
						<!-- <text>{{item.chartData.series[0].data*100}}%</text> -->
						<qiun-data-charts type="arcbar" :opts="opts" :chartData="yearlyBudget.chartData" />
					</view>
					<view style="width: 80%;">
						<li>
							<text>剩余预算</text>
							<text>￥{{yearlyBudget.totalBalance}}</text>
						</li>
						<li>
							<text>总预算</text>
							<text>￥{{yearlyBudget.totalBudget}}</text>
						</li>
						<li>
							<text>总支出</text>
							<text>￥{{yearlyBudget.totalExpenditure}}</text>
						</li>
					</view>
				</view>
			</view>
			<view class=" m-budget" v-for="(item ,index) in Indata">
				<view class="m-b-head">
					<text style="font-weight: bold;">{{item.date+1}}月</text>
					<text @click="toggle('center',index+1)">编辑</text>
				</view>
				<view class="m-b-body">
					<view style="height: 4rem; width: 20%;">
						<qiun-data-charts type="arcbar" :opts="opts" :chartData="item.chartData" />
					</view>
					<view style="width: 80%;">
						<li>
							<text>剩余预算</text>
							<text>￥{{item.balance}}</text>
						</li>
						<li>
							<text>总预算</text>
							<text>￥{{item.budget}}</text>
						</li>
						<li>
							<text>总支出</text>
							<text>￥{{item.expenditure}}</text>
						</li>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 4rem;"></view>
		<!-- 		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content">
				<text style="margin-bottom: 0.5rem;">设置</text>
				<u-icon style="position: fixed; right: -14rem;" name="close" @click="cancle(1)" color="#666666" size="20"></u-icon>
				<view>
					<view>
						<view class="section">
							<view></view>
							<view>
								<text>年度预算</text>
								<text style="font-size: 13px;color: #999999;">设置年度预算，每月预算将会均分</text>
							</view>
						</view>
						<uni-easyinput type="number" placeholder="单位为元" :value="yearlyBudget.RemainingBudget2">
						</uni-easyinput>
					</view>

				</view>
				<view style="margin-top: 0.5rem;">
					<u-button style="margin-top: 0.5rem;" @click="setBudget">确定</u-button>
				</view>
			</view>
		</uni-popup> -->
		<uni-popup ref="popup1" background-color="#fff">
			<view class="popup-content">
				<text style="margin-bottom: 0.5rem;">设置</text>
				<u-icon style="position: fixed; right: -14rem;" name="close" @click="cancle(0)" color="#666666"
					size="20"></u-icon>
				<view>
					<view>
						<view class="section">
							<view></view>
							<view>
								<text>预算</text>
							</view>
						</view>
						<uni-easyinput type="number" v-model="totalbudet" placeholder="单位为元">
						</uni-easyinput>
					</view>
				</view>
				<view style="margin-top: 0.5rem;">
					<u-button style="margin-top: 0.5rem;" @click="set(id)">确定</u-button>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

//监听年的值的变化


<script>
	import base from '@/static/base.js';
import { init } from 'echarts';
	export default {
		extends:base,
		data() {
			return {
				id: '',
				totalbudet: '',
				monthBudget: 0,
				date: 'ads',
				chartData: {
					series: [{
						color: "#E26E59",
						data: 0.8
					}]
				},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['arcbar'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					title: {
						name: "结余",
						fontSize: 12,
						color: "#E26E59"
					},
					subtitle: {
						name: "",
						fontSize: 0,
						color: "#666666"
					},
					extra: {
						arcbar: {
							type: "circle",
							width: 6,
							backgroundColor: "#E9E9E9",
							startAngle: 1.5,
							endAngle: 0.25,
							gap: 2
						}
					}
				},
				yearlyBudget: {},
				Indata: [],


			};
		},
		onShow() {
			var api = this.GLOBAL.baseApi
			var that = this
			getdata(api, that)
		},
		methods: {
			cancle(flag) {
				this.$refs.popup1.close()
			},
			toggle(type, id) {
				this.type = type
				this.$refs.popup1.open(type)
				this.totalbudet = this.Indata[id - 1].budget
				this.id = id

			},
			// 下一年预算可能会报错
			set(id) {
				var that=this
				var {baseApi,userId,year,selectledger}=this.GLOBAL
				var param = {
					userId: userId,
					budget: this.totalbudet,
					month: id,
					year: year,
					ledgerId:selectledger
				}
				
				console.log(param)
				update(baseApi,that,param)
				
				this.$refs.popup1.close()
			},

		}
	};
	const getdata = (api, that) => {
		const {userId,year,selectledger}=that.GLOBAL
		uni.request({
			url: api + `/budget?userId=${userId}&year=${year}&ledgerId=${selectledger}`, //仅为示例，并非真实接口地址。
			success: (req_res) => {
				const budgetData= req_res.data.data.budgetData
				const Indata = budgetData.map(item => ({
			        ...item,
			        chartData: { series: [{ color: "#E26E59", data: item.proportion }] }
			      }));
				that.Indata = Indata
				
				
				const {
					totalBalance,
					totalBudget,
					totalExpenditure,
					proportion
				} = req_res.data.data
				
				
				that.yearlyBudget = {
					totalBalance,
					totalBudget,
					totalExpenditure,
					chartData: {
						series: [{
							color: "#E26E59",
							data:proportion
						}]
					},
				}

			}
		});
		
		
	}
	const update = (api, that, param) => {
		uni.request({
			url: api + "/budget/update",
			method: "POST",
			header: {
				'content-type': 'application/json;charset:utf-8'
			},
			data: param,
			success: (res) => {
				that.$refs.uToast.show({
					type: 'success',
					message: "更新成功",
				})
				getdata(api,that)
			},
			
		})
		}
	
</script>

<style lang="scss">
	page {
		background-color: #F4F4F4;
	}

	.section {
		display: flex;
		align-items: center;
		margin: 0.5rem 0 0.5rem 0;

		view:nth-child(1) {
			background-color: #E26E59;
			width: 0.3rem;
			height: 2rem;
			margin-right: 0.5rem;
			border-radius: 9rem;
		}

		text {
			display: block;
		}

	}

	.popup-content {
		width: 20rem;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0.5rem 0;
		color: #333333;

		view {
			width: 18rem
		}
	}

	.m-index {
		color: #333333;
		width: 95%;
		padding: 0 0.5rem;


	}

	.m-b-head {
		display: flex;
		justify-content: space-between;

		text:nth-child(2) {
			right: 2rem;
			color: #666666;
			font-size: 13px;
		}
	}

	.m-head {
		font-size: 24px;
		font-weight: bold;
		display: flex;
		flex-direction: column;
		position: fixed;
		background-color: #F4F4F4;
		width: 100%;
		z-index: 99;
		margin-top: -3rem;
	}

	.m-budget {

		background-color: white;
		padding: 0.5rem 1rem;
		border-radius: 0.4rem;
		margin-top: 1rem;

		.m-b-body {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			// align-items: center;
			margin-top: 0.5rem;
			font-size: 1rem;

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
</style>
