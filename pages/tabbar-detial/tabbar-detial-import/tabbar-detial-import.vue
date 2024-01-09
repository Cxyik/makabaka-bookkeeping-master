<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="m-index">
		<u-toast ref="uToast"></u-toast>
		<view style=" height: var(--status-bar-height);">

		</view>

		<uni-popup ref="popup">
			<view style="background-color: white;padding: 1rem; border-radius: 99px;">
				<u-loading-icon :text="text" textSize="18" :show="true"></u-loading-icon>
			</view>
		</uni-popup>

		<uni-popup ref="xiaopiao" type="bottom">

			<form @submit="formSubmit">

				<view class="popup">
					<view style="display: flex; justify-content: center; border-bottom: none;">
						<text>详情</text>

					</view>
					<view style="height: 25rem; overflow: auto;">
						<view v-for="(item,index) in editData" style="margin-top: 2rem;">
							<view style="border: none; position: relative;">
								<u-icon name="close" style="position: absolute; right: -5rem; margin-bottom: 1rem;" size="18" @click="deleteItem(index)"></u-icon>
							</view>
							<view @click="openType(item.category,index)">
								<text>类型</text>
								<text>{{item.category}}</text></text>
							</view>
							<view>
								<text>时间</text>

								<input type="text" name="comment" :value="item.expenditureDate">
							</view>
							<view>
								<text>金额</text>
								<input type="number" name="account" :value="Math.abs(item.amount)">
							</view>
							<view>
								<text>备注</text>
								<input type="text" name="comment" :value="item.comment">
							</view>
						</view>
						
						<view v-for="(item,index) in income_editData" style="margin-top: 2rem;">
							<view style="border: none; position: relative;">
								<u-icon name="close" style="position: absolute; right: -5rem; margin-bottom: 1rem;" size="18" @click="deleteItem(index)"></u-icon>
							</view>
							<view @click="openType_1(item.category,index)">
								<text>类型</text>
								<text>{{item.category}}</text></text>
							</view>
							<view>
								<text>时间</text>
						
								<input type="text" name="comment" :value="item.expenditureDate">
							</view>
							<view>
								<text>金额</text>
								<input type="number" name="account" :value="Math.abs(item.amount)">
							</view>
							<view>
								<text>备注</text>
								<input type="text" name="comment" :value="item.comment">
							</view>
						</view>
					</view>
					<view class="save_btn">
						<button class="mini-btn" type="primary" size="mini" @click="save_message()">保存</button>
					</view>

				</view>
			</form>
		</uni-popup>
		<uni-popup ref="chooseType" type="bottom">
			<view class="poptype">
				<view v-for="item in popIcon" @click="selectType(item.name)">
					<image :src="item.path"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</uni-popup>
		<view class="black">
			<uni-nav-bar left-icon="left" title="导入" @clickLeft="back" />
		</view>
		<view class="m-head">
			<view style="display: flex; flex-direction: column;align-items: center;" @click="upload(1)">
				<u-icon name="zhifubao-circle-fill" color="#2979ff" size="50"></u-icon>
				<text style="margin-top: 0.3rem;">支付宝导入</text>
			</view>
			<view style="display: flex; flex-direction: column;align-items: center;" @click="upload(2)">
				<u-icon name="weixin-circle-fill" color="#00C800" size="50"></u-icon>
				<text style="margin-top: 0.3rem;">微信导入</text>
			</view>
			<view style="display: flex; flex-direction: column;align-items: center;" @click="upload(3)">
				<u-icon name="moments-circel-fill" color="orange" size="50"></u-icon>
				<text style="margin-top: 0.3rem;">小票导入</text>
			</view>
		</view>
		<view class="m-foot">
			<image style="height: 35rem;width: 100%;" src="https://beyondmyself.top/i/2023/03/19/组-233.png"
				alt="组 240" />
		</view>
	</view>
</template>

<script>
	import TypeIcon from '../../../static/icon.json'
	import base from '@/static/base.js';
	export default {
		extends:base,
		data() {
			return {
				now_type:1,//判断当前收入支出类型 1为支出 2为收入
				title: 'Hello',
				text: '正在识别',
				editData: [{
						amount: "16.20",
						category: "食品餐饮",
						comment: "YummyMummy(糕点)",
						expenditureDate: "2023-02-22",
						subcategory: "生鲜食品",
					},
					{
						amount: "16.20",
						category: "食品餐饮",
						comment: "YummyMummy(糕点)",
						expenditureDate: "2023-02-22",
						subcategory: "生鲜食品",
					},
					{
						amount: "16.20",
						category: "食品餐饮",
						comment: "YummyMummy(糕点)",
						expenditureDate: "2023-02-22",
						subcategory: "生鲜食品",
					},
					{
						amount: "16.20",
						category: "食品餐饮",
						comment: "YummyMummy(糕点)",
						expenditureDate: "2023-02-22",
						subcategory: "生鲜食品",
					}
				],
				income_editData: [{
						amount: "16.20",
						category: "食品餐饮",
						comment: "YummyMummy(糕点)",
						expenditureDate: "2023-02-22",
						subcategory: "生鲜食品",
					},
					{
						amount: "16.20",
						category: "食品餐饮",
						comment: "YummyMummy(糕点)",
						expenditureDate: "2023-02-22",
						subcategory: "生鲜食品",
					},
					{
						amount: "16.20",
						category: "食品餐饮",
						comment: "YummyMummy(糕点)",
						expenditureDate: "2023-02-22",
						subcategory: "生鲜食品",
					},
					{
						amount: "16.20",
						category: "食品餐饮",
						comment: "YummyMummy(糕点)",
						expenditureDate: "2023-02-22",
						subcategory: "生鲜食品",
					}
				],
				showDate: false,
				popIcon: '',
				index: 0,

				data: {
					amount: "59.40",
					category: "食品餐饮",
					comment: "BHG(华联超市)",
					expenditureDate: "2022-11-28",
					subcategory: "生鲜食品",
				}
			}
		},
		onLoad() {

		},
		methods: {
			deleteItem(e){
				var {editData}=this
				var list=[]
				editData.forEach((item,i)=>{
					if(i!=e){
						list.push(item)
					}
				})
				this.$refs.uToast.show({
					type: 'success',
					message: "删除成功",
				})
				this.editData=list
			},
			selectType(e) {
				
				var index = this.index
				if(this.now_type){
					this.editData[index].category = e
				}
				else{
					this.income_editData[index].category = e
				}
				this.$refs.chooseType.close()
			},
			openType(e, i) {
				this.now_type = 1
				this.index = i
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
			openType_1(e, i) {
				this.now_type = 0
				this.index = i
				var icon = TypeIcon.icon
				var listIcon = []
				icon.map((item) => {
					if (item.type === "收入") {
						listIcon.push({
							path: item.path,
							name: item.name,
						})
					}
				})
				this.popIcon = listIcon
				this.$refs.chooseType.open()
			},
			back() {
				uni.reLaunch({
					url: '/pages/tabbar/account_book/account_book',
				})
			},
			openDate(e, i) {
				this.date = e
				this.index = i
				this.showDate = true

			},
			isShowDate() {
				this.showDate = false
			},
			FormatDate(e) {
				var date = new Date(e.value)
				return {
					name: `${date.getFullYear()}年${(date.getMonth()+1)}月${date.getDay()}日`,
				}
			},
			confirmDate(e) {
				var {
					date,
					index
				} = this
				date = this.FormatDate(e).name
				this.date = date.name
				this.editData[index].expenditureDate = date
				console.log(e)
				this.showDate = false
			},
			upload(e) {

				var that = this

				// that.$refs.xiaopiao.open()
				const {
					userId,
					selectledger
				} = this.GLOBAL
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(res.tempFilePaths);
						var tempFilePaths = res.tempFilePaths
						that.$refs.popup.open()
						upload(tempFilePaths, e, that).then((value) => {

							if (e != 3) {
								value.forEach((item) => {
									if (item.data.expenditureData)
									{
										item.data.expenditureData.forEach((exitem) => {
											exitem.creatorId = userId
											exitem.ledgerId = selectledger
										})
										that.editData = item.data.expenditureData
									}	
									if (item.data.incomeData) {
										item.data.incomeData.forEach((initem) => {
											initem.creatorId = userId
											initem.ledgerId = selectledger
										})
										that.income_editData = item.data.incomeData
									}
								})
								console.log(that.editData)
								that.$refs.xiaopiao.open()
							} else {
								var list = []
								that.editData = []
								that.income_editData = []
								value.forEach(item => {
									list.push(item.data)
								})
								that.editData = list
								console.log(that.editData)
								that.$refs.xiaopiao.open()
							}
							
						})
					}
				});
			},
			save_message() {
				var that = this
				var list = this.editData
				const {
					userId,
					selectledger
				} = this.GLOBAL
				list.forEach((item) => {
					if(item.account!=0){
						item.creatorId=userId
						item.ledgerId=selectledger
						save(that, item,"expenditure")
					}
				})
				list = this.income_editData
				list.forEach((item) => {
					if(item.account!=0){
						save(that, item, "income")
					}
				})
				that.$refs.uToast.show({
					type: 'success',
					message: "保存成功",
				})
				that.$refs.xiaopiao.close()
			}
		}
	}
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
			},
		})
	}

	const upload = (filesPath, e, that) => {
		var str = ''
		if (e === 2) {
			str = '/vx'
		}
		if (e === 1) {
			str = '/zfb'
		}
		var returnList = []
		var api  = that.GLOBAL.baseApi
		return new Promise((resolve, reject) => {
			let timer = null //
			let len = filesPath.length // 获取图片地址的数量
			for (let i = 0; i < filesPath.length; i++) {
				uni.uploadFile({
					url: api+'/keepAccounts/image' + str, //仅为示例，非真实的接口地址
					filePath: filesPath[i],
					name: 'files',
					success: (uploadFileRes) => {
						const {
							code,
							data
						} = JSON.parse(uploadFileRes.data)
						if (code === 200) {
							returnList.push({
								data
							})
						}
					},
					complete: (X) => {
						that.text = "还有" + len + "张"
						len--;
					}
				});
			}
			timer = setInterval(() => {
				if (!len || len < -5000) { // 只要len结束，将定时器清除
					console.log("同步结束");
					that.$refs.popup.close()
					resolve(returnList)
					clearInterval(timer) // 上传操作完成，消除阻塞
				}
			}, 1)
		}, 50)
	}
</script>

<style lang="scss">
	page {
		background-color: #F4F4F4;
	}

	.save_btn {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
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
		height: 30rem;
		overflow: auto;
		padding: 1rem 1rem 1rem 1rem;
		margin: 0.5rem 0.5rem 0 0.5rem;
		// width: 16rem;
		border-radius: 0.5rem 0.5rem 0 0;
		background-color: white;
		color: #333333;
		font-size: 15px;
		border: #d4d4d4 solid 1px;

		view {
			view {
				view {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-bottom: 0.1rem;
					margin: 0.5rem 0;
					border-bottom: #d4d4d4 solid 1px;

					view {
						border-bottom: none;
						box-sizing: border-box;
						width: 30%;
					}
				}
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

	.m-img {
		height: 3rem;
		width: 3rem;
	}

	.m-head {
		margin: 0.8rem;
		background-color: white;
		border-radius: 0.5rem;
		padding: 0.8rem;
		display: flex;
		justify-content: space-around;
		font-weight: bold;
	}

	.m-foot {

		margin: 0.8rem;
		margin-top: 1rem;
	}

	.black {
		margin: 0 0 0.5rem 0;
		color: #337AEE;
	}
</style>
