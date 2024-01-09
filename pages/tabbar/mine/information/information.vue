<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="content">
		<view>
			<!-- 分享示例 -->
			<uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
				<uni-popup-share></uni-popup-share>
			</uni-popup>
		</view>
		<view class="my_help">
			
		</view>
		<!-- 标题 -->
		<view class="total_title">
			<view class="back">
				<image src="../../../../static/img/mine/back.png" alt="">
				<text @click="back_it()">返回</text>
			</view>
			<view class="ach_title">
				个人信息
			</view>
			<view class="wei">
				
			</view>
		</view>
		<view class="my_body">
			<view class="item tx">
				<div class="item_txt">头像</div>
				<view class="item_img">
					<image src="https://beyondmyself.top/i/2023/04/07/5.png" mode=""></image>
				</view>
			</view>
			<view class="item nc">
				<div class="item_txt">昵称</div>
				<view class="item_img">
					{{username}}
				</view>
			</view>
			<view class="item id">
				<div class="item_txt">ID</div>
				<view class="item_img">
					{{userid}}
				</view>
			</view>
			<view class="item em">
				<div class="item_txt">邮箱</div>
				<view class="item_img">
					{{email}}
				</view>
			</view>
		</view>
		<button class="exit" @click="open">退出登录</button>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog cancelText="取消" confirmText="确定" title="提示" content="确定要退出登录吗？" @confirm="dialogConfirm"
				@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="message" type="message">
			<uni-popup-message type="success" message="退出登录" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
	
</template>

<script>
	let userInfo = ""
	import base from '@/static/base.js';
	export default {
		extends:base,
		data() {
			return {
				username:"2",
				email:'',
				userid:"",
			};
		},
		onLoad() {
			let self = this;
			var api = this.GLOBAL.baseApi
			this.get_mydate(self,api)
			
		},
		onShow() {
		},
		methods: {
			open(){
			        // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
			        this.$refs.alertDialog.open('center')
			      },
			dialogConfirm() {
				this.$refs.message.open()
					try {
						uni.removeStorageSync('token');
						uni.removeStorageSync('firstLoad')
						console.log("success")
						uni.reLaunch({
							url:"/pages/Login/Login"
						})
					} catch (e) {
						console.log("error")
					}
					
				
				},
						inputDialogToggle() {
							this.$refs.inputDialog.open()
						},
						dialogClose() {
							console.log('点击关闭')
						},
			back_it(){
				uni.navigateBack(1)
			},
			get_mydate(that,api){
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
										userInfo = req_res.data.data.userInfo
										console.log(req_res.data.data)
										let ledgerInfo = req_res.data.data.ledgerInfo
										uni.setStorageSync('userInfo', userInfo);
										console.log(userInfo)
										that.username = userInfo.userName
										if(that.username.length>5)
											that.username = that.username.substring(0,5)+"..."
										that.userid = userInfo.userId
										that.email = userInfo.email
				// 						uni.setStorageSync('ledgerInfo', ledgerInfo);
				
									} else {
									}
								},
								error: (e) => {
									console.log(e)
								}
							});
						}
					});
			}
		},
	}
	
</script>

<style>
	.exit{
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		width: 6rem;
		font-size: 0.8rem;
		height: 2rem;
	}
	.item{
		height: 3rem;
		border-bottom: 1px solid #ccc;
		width: 90%;
		position: absolute;
		top: 7.5em;
		line-height: 3rem;
	}
	.nc{
		top: 10.5rem;
	}
	.id{
		top: 13.5rem;
	}
	.em{
		top: 16.5rem;
	}
	.item_txt{
		float: left;
	}
	button{
		margin-top: 1rem;
		width: 10rem;
		height: 3rem;
		font-size: 16px;
		border: 1px solid royalblue;
	}
	.item_img{
		float: right;
	}
	.item_img image{
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		vertical-align: middle;
	}
	.my_body{
		position: relative;
		height: 20rem;
		margin: 0 0.5rem;
		background-color: white;
		display: flex;
		justify-content: center;
	}
	
	page{
		background-color: rgb(244,244,244);
	}
	.clear{
	clear: both;}
	.content{
		width: 100%;
		height: 1000px;
		background-color: rgb(244, 244, 244);
		font-size: 16px;
	}
	
	/* first */
	.my_help{
		width: 100%;
		height: 3rem;
		position: fixed;
		background-color: rgb(244,244,244);
		top:0;
		z-index: 10;
		}
.total_title{
	    position: fixed;
	    width: 100%;
	    height: 4rem;
	    padding-left: 10px;
	    top: 3rem;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    z-index: 10;
	    background-color: rgb(244,244,244);
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
		flex: 1;
		font-weight: 600;
		text-align: center;
		padding-right: 10px;
	}
	.wei{
		flex: 1;
		text-align: center;
	}
	

</style>
