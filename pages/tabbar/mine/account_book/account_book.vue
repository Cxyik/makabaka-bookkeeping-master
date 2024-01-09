<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="content">
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm">确定要删除改账本吗？</uni-popup-dialog>
		</uni-popup>
		<!-- 标题 -->
		<view class="total_title">
			<view class="back">
				<image src="../../../../static/img/mine/back.png" alt="">
				<text @click="back_it()">返回</text>
			</view>
			<view class="ach_title">
				我的账本
			</view>
			<view class="wei" @click="editf()">
				{{this.show_title}}
			</view>
		</view>
		
		<view class="account_book">
			<view class="father_item" v-for="(item_info,index) in account_infor" :class="{'hide_this':arr[0]==1}">
				<view class="item" :class="{'edit_status':edit==1}">
					<image src="../../../../static/img/mine/account_book/home.svg" mode=""></image>
					<view class="">
						{{item_info}}
					</view>
					<span class="delete" :class="{'in_edit':edit==1}"  @click="de(index)">删除</span>
				</view>
			</view>
			
			
			<button @click="open1">添加</button>
			<uni-popup ref="popup1" type="dialog">
				<uni-popup-dialog mode="input" message="成功消息" placeholder="请输入账本名称" :duration="2000" :before-close="true" @close="close1" @confirm="confirm1"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
	
</template>

<script>
	let userInfo = ""
	import apdata from '../../../../static/json/way.json'
	import base from '@/static/base.js';
	export default {
		extends:base,
		data() {
			return {
				edit:0,
				show_title:"编辑",
				arr:[apdata.account.home,apdata.account.life,apdata.account.company],
				msgType: 'success',
				iindex:1,
				account_infor:[
				],
				account_id:[]
			}
		},
		onReady(){
		},
		onShow(){
			
		},
		onLoad(){
			let self = this;
			var api = this.GLOBAL.baseApi
			this.get_mydate(self,api)
		},
		methods: {
			
			open1() {
						this.$refs.popup1.open()
					},
					/**
					 * 点击取消按钮触发
					 * @param {Object} done
					 */
					close1() {
						// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
						// ...
						this.$refs.popup1.close()
					},
					/**
					 * 点击确认按钮触发
					 * @param {Object} done
					 * @param {Object} value
					 */
					confirm1(value) {
						this.$refs.popup1.close()
						
						var idd 
						if(this.account_id.length<1){
							idd = 0
						}
						else{
							idd = this.account_id[this.account_id.length-1].id+1
						}
						var param = {
							"userId":this.GLOBAL.userId,
							    "id":idd,
							    "name":value
						}
						var api = this.GLOBAL.baseApi
						var self = this
						uni.request({
							url: api+"/ledger/save",
							method: "POST",
							header: {
								'content-type': 'application/json;charset:utf-8'
							},
							data:param,
							success: (res) => {
								console.log(res.data)
								
								this.get_mydate(self,api)
							}
						});
						
						console.log(this.account_infor)
						
					},
			
			
			back_it(){
				uni.navigateBack(1)
			},
			onshow(){
				this.arr[0] = apdata.account.home
				this.arr[1] = apdata.account.life
				this.arr[2] = apdata.account.company
			},
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			confirm() {
				this.$refs.popup.close()
				var api = this.GLOBAL.baseApi
				var self = this
				uni.request({
					url: api+"/ledger/delete?userId="+this.GLOBAL.userId+"&ledgerId="+this.account_id[this.iindex],
					method: "POST",
					header: {
						'content-type': 'application/json;charset:utf-8'
					},
					success: (res) => {
						console.log(res.data)
						this.get_mydate(self,api)
					}
				});
			
				console.log(this.account_infor)
				this.edit = 0;
				this.show_title = "编辑"
			},
			goto_shop(){
				uni.navigateTo({
					url:"/pages/tabbar/mine/shop/shop"
				})
			},
			

			editf(){
				if(this.edit == 0){
					this.edit = 1;
					this.show_title = "完成"
				}
				else{
					this.edit = 0;
					this.show_title = "编辑"
				}
				
			},
			de(index){
				this.iindex = index
				console.log(index)
				this.open()
			},
			get_mydate(that,api){
				const token = uni.getStorageSync('token')
				uni.request({
					url: api + "/user/me", //仅为示例，并非真实接口地址。
					header: {
						'content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
						"Authorization": token
					},
					success: (req_res) => {
						if (req_res.data.code === 200) {
							userInfo = req_res.data.data.userInfo
							let ledgerInfo = req_res.data.data.ledgerInfo
							uni.setStorageSync('ledgerInfo', ledgerInfo);
							console.log(ledgerInfo)
							that.account_infor = []
							that.account_id = []
							ledgerInfo.forEach(item => {that.account_infor.push(item.name)})
							ledgerInfo.forEach(item => {that.account_id.push(item.id)})
							
							console.log(that.account_id)
						} else {
						}
					},
					error: (e) => {
						console.log(e)
					}
				});
			}
		}
	}
</script>

<style>
	.hide_this{
		display: none !important;
	}
	.delete{
		border-radius: 1rem;
		display: inline-block;
		width: 25%;
		height: 3rem;
		background-color: antiquewhite;
		position: absolute;
		right: -51%;
		text-align: center;
		line-height: 3rem;
		transition: all 0.5s;
	}
	.in_edit{
		right: -25%;
	}
	/* second */
	.account_book{
		height: 30rem;
		margin: 1rem 0.3rem 0;
	}
	.item{
		height: 3rem;
		background-color: white;
		border-radius: 1rem;
		margin: 1rem 0;
		position: relative;
		width: 100%;
		transition: all 0.5s;
	}
	.item image{
		position: absolute;
		left: 1rem;
		top: 50%;
		transform: translateY(-50%);
		width: 2rem;
		height: 2rem;
	}
	.item view{
		color: rgb(100, 100, 100);
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
	}
	.edit_status{
		width: 80%;
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
