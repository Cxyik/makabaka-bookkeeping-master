<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="m-index">
		<view style=" height: var(--status-bar-height);">

		</view>
		<view class="black">
			<uni-nav-bar left-icon="left" title="识别结果" @clickLeft="back" />
		</view>

		<uni-popup ref="popup" :is-mask-click="false" >
			<view style="background-color: white;padding: 1rem; border-radius: 99px;">
				<u-loading-icon :text="text" textSize="14" :show="true"></u-loading-icon>
			</view>
		</uni-popup>
		<uni-popup ref="chooseType" type="bottom">
			<view class="poptype">
				<view v-for="item in popIcon" @click="selectType(item.name)">
					<image :src="item.path"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</uni-popup>
		<view class="load" v-if="isLoad">
			<u-skeleton rows="5" :animate="true"  :loading="isLoad"></u-skeleton>
		</view>
		<view class="m-main" v-if="!isLoad">
			<view class="m-res" style="color: #333;">
				<view>
					<text>类型:</text>
					<text style="margin-left: 1rem;" @click="openType(data.category)">{{data.category}}</text>
				</view>
				<view>
					<text>金额:</text>
					<uni-easyinput type="number" :inputBorder="false" :value="data.amount" placeholder="金额">
					</uni-easyinput>
				</view>
				<view>
					<text>时间:</text>
					<uni-easyinput :inputBorder="false" :value="data.expenditureDate" placeholder="时间">
					</uni-easyinput>
				</view>


				<view>
					<text style="margin-top: 0.5rem">备注:</text>
					<uni-easyinput type="textarea" :value="data.comment" :autoHeight="true" placeholder="备注">
					</uni-easyinput>
				</view>

			</view>
			<view class="button">
				<u-button size="small" @click="save">确定</u-button>
			</view>
			<view class="history-res">

			</view>
		</view>
	</view>
</template>


<script>
	import TypeIcon from '../../../static/icon.json'
	import base from '@/static/base.js';
	export default {
		extends: base,
		data() {
			return {
				isLoad: true,
				date: '2023-02-27',
				data: {
					amount: "59.40",
					category: "食品餐饮",
					comment: "BHG(华联超市)",
					expenditureDate: "2022-11-28",
					subcategory: "生鲜食品",
				},
				popIcon: '',
				text:'正在识别'

			};
		},
		onReady() {
			var that = this
			this.$refs.popup.open()
			// this.$refs.ReadError.open()
			uploadImg(that)
		},
		methods: {
			back() {
				uni.reLaunch({
					url: '/pages/tabbar/account_book/account_book',
				})
			},
			selectType(e) {
				this.data.category = e
				this.$refs.chooseType.close()
			},
			openType() {
				var icon = TypeIcon.icon
				var listIcon = []
				icon.map((item) => {
					if (item.type === "支出") {
						listIcon.push({
							path: item.path,
							name: item.name,
						})
					}
				})
				this.popIcon = listIcon
				this.$refs.chooseType.open()
			},
			save() {
				const {
					userId,
					selectledger
				} = this.GLOBAL
				console.log(selectledger)
				var that = this
				var param = this.data
				param.creatorId = userId
				param.ledgerId = selectledger
				param.amount = -Math.abs(param.amount)
				save(that, param, "expenditure")
			}
		},

	};
	const save = (that, param, type) => {
		var api = that.GLOBAL.baseApi
		uni.request({
			url: api + "/" + type + "/save",
			method: "POST",
			header: {
				'content-type': 'application/json;charset:utf-8'
			},
			data: param,
			success: (res) => {
				console.log("seuuess")
				uni.reLaunch({
					url: '/pages/tabbar/account_book/account_book',
				})
			}
		})
	}
	const uploadImg = (that) => {
		uni.chooseImage({
			count: 6, //默认9
			sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['camera'], //
			success: (chooseImageRes) => {
				const tempFilePaths = chooseImageRes.tempFilePaths;

				const uploadTask = uni.uploadFile({
					url: 'http://43.143.3.149:4321/keepAccounts/image', //仅为示例，非真实的接口地址
					filePath: tempFilePaths[0],
					name: 'files',
					success: (uploadFileRes) => {
						const {
							code,
							data
						} = JSON.parse(uploadFileRes.data)
						if (code === 200) {
							console.log(data)
							that.data = data
							that.isLoad = false
							that.$refs.popup.close()
						}
						else
						{
							
								that.text="识别失败请重试"
								setTimeout(()=>{
									uni.reLaunch({
										url:'/pages/tabbar/account_book/account_book'
									})
								},500)
							
						}
						
					},
					fail:(e)=>{
						that.text="识别失败请重试"
								setTimeout(()=>{
									uni.reLaunch({
										url:'/pages/tabbar/account_book/account_book'
									})
							},500)
					}
				});
			}
		});
	}
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4
	}
	.load{
		background: #fff;
		margin: 0.5rem;
		padding: 0.5rem;
		border-radius: 0.5rem;
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

	.m-main {
		margin: 1rem 0.5rem 0 0.5rem;
		background-color: white;
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #666666;
	}

	.m-res {

		// padding: 0.1rem;
		width: 95%;

		view {
			// margin: 4rem 0;
			margin: 0.3rem;
			display: flex;
			align-items: center;

			text {
				margin: 0 .2rem 0 0;
			}
		}


	}

	.button {
		margin: 0.5rem;
	}
</style>
