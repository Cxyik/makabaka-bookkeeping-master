<template>
	<view class="m-index">
		<u-toast ref="uToast"></u-toast>
		<view class="m-center">
			<image src="../../static/img/login/logo.svg" alt="图标">
				<u-icon name="arrow-left" color="#666666" size="" v-show="isShowForgetPwd" @click="ifpwdShow"></u-icon>
				<view v-show="!isShowForgetPwd">
					<u-icon name="arrow-left" color="#666666" size="" v-show="isShow" @click="ifShow"></u-icon>
					<form @submit="formSubmit">
						<view>
							<input class="uni-input" v-model="form.username" name="email" placeholder="邮箱" />
						</view>
						<view>
							<input class="uni-input" type="password" name="password" placeholder="密码" />
						</view>
						<view v-show="isShow">
							<input class="uni-input" name="repassword" type="password" placeholder="确认密码" />
						</view>
						<view class="m-button" v-show="isShow">
							<input class="uni-input" name="code" placeholder="验证码"  style="width: 300%;" />
							<u-button type="primary" @click="sendCode" :text="codeText" :disabled="Iscode" color="#E26E59" />
						</view>
						<view>
							<u-button class="custom-style" type="primary" text="确定" color="#E26E59"
								form-type="submit" />
						</view>
					</form>
					<u-row style="color: #707070;" v-show="!isShow">
						<u-col span="4">
							<!-- <view style="font-size: 13px;" @click="ifpwdShow">忘记密码?</view> -->
						</u-col>
						<u-col span="4">
						</u-col>
						<u-col span="4">
							<view style="text-align: right; font-size: 13px;" @click="ifShow">注册账号</view>
						</u-col>
					</u-row>
					<view class="m-icon" v-if="!isShow">
						<view>
							<!-- <u-icon name="weixin-circle-fill" color="#00C800" size="50"></u-icon> -->
						</view>
						<view>
							<!-- <u-icon name="apple-fill" color="#000000" size="50"></u-icon> -->
						</view>
						<view>
							<!-- <u-icon name="zhifubao-circle-fill" color="#2979ff" size="50"></u-icon> -->
						</view>
					</view>
				</view>
		</view>
		<view v-show="isChangePwd">
			<form>
				<view>
					<input class="uni-input" placeholder="密码" />
				</view>
				<view>
					<input class="uni-input" placeholder="确认密码" />
				</view>
			</form>
			<u-button class="custom-style" type="primary" text="确定" color="#E26E59" @click="">
			</u-button>
		</view>
	</view>
	</view>
	</view>
</template>

<script>
	var to_time = "发送验证码"
	var flag = 1
	export default {
	
		data() {
			return {
				form: {
					username: '',
					pwd: '',
					code: '',
					repwd: ''
				},
				isShow: false,
				isShowForgetPwd: false,
				isChangePwd: false,
				codeText:'发送验证码',
				Iscode:false
			};
		},
		onShow(){
			setInterval(()=>{
				this.codeText = to_time
			},1000)
		},
		
		methods: {
			// submit() {
				change_txt(index){
					this.codeText = index + 's'
				},
			// },
			sendCode() {
				if(flag){
					flag = 0
					var that =this
					var api = this.GLOBAL.baseApi
					console.log(this.form.username)
					getCode(api, this.form.username,that)
					
					
					var m_timr = 30
					let timeee = setInterval(function(){
						m_timr = m_timr -1
						to_time = m_timr + 's'
						console.log(to_time)
						if(m_timr == 0){
							to_time = "发送验证码"
							clearInterval(timeee)
							flag = 1
						}
					},1000)
				}
				
				
			},
			formSubmit(e) {
				var api = this.GLOBAL.baseApi
				var that = this
				const {
					email,
					password,
					repassword,
					code
				} = e.detail.value
				if (this.isShow) {
					if (repassword === password) {
						var data = {
							email,
							password,
							code,
						}
						post(api, "register", that, data, "注册成功", "注册失败")
						
					} else {
						that.$refs.uToast.show({
							type: 'error',
							message: "请检查密码是否一致",
						})
					}
				} else {
					var data = {
						email,
						password
					}
					post(api, "login", that, data, "登录成功", "请检查账号或者密码")
				}

			},
			ifShow() {
				this.$data.isShow = !this.$data.isShow
			},
			ifpwdShow() {
				this.$data.isShowForgetPwd = !this.$data.isShowForgetPwd
			},
			ifchangePwd() {
				this.$data.isChangePwd = !this.$data.isChangePwd
			},

		}
	}
	const getCode = (api, email,that) => {
		uni.request({
			url: api + "/user/code?email=" + email,
			method: "POST",
			header: {
				'content-type': 'application/json;charset:utf-8'
			},
			success: (res) => {
				console.log(res.data)
				that.$refs.uToast.show({
					type: 'success',
					message: "发送成功",
				})
			}
		})
	}
	const post = (api, type, that, pream, susccess, error) => {
		uni.request({
			url: api + "/user/" + type,
			method: "POST",
			header: {
				'content-type': 'application/json;charset:utf-8'
			},
			data: pream,
			success: (res) => {
				console.log(res.data)
				const {
					code,
					data,
				} = res.data
				if (code === 200) {
					uni.setStorage({
						key: 'token',
						data: data,
						success: function () {
							console.log('success');
						}
					});

					that.GLOBAL.SetToken(data)
					that.$refs.uToast.show({
						type: 'success',
						message: susccess,
					})
					if (type == "login") {
						uni.switchTab({
							url: '/pages/tabbar/account_book/account_book'
						});
					}
				} else {
					that.$refs.uToast.show({
						type: 'error',
						message: error,
					})
				}
			},
			fail:(e)=> {
				that.$refs.uToast.show({
					type: 'error',
					message:"登陆失败",
				})
			}
		});
	}
</script>

<style lang="less">
	page {
		background-color: #F4F4F4;

	}

	.m-button {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.forgetPwd {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-bottom: 3rem;

	}

	.isShow {
		display: none;
	}

	.m-index {
		width: 100%;
		display: flex;
		margin-top: 3rem;
		justify-content: center;
	}

	.m-center {
		width: 90%;
		background-color: white;
		padding: 1rem 1rem;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 0.8rem;
		margin-top: 2rem;

		image {
			height: 6rem;
			width: 6rem;
			margin-top: -4rem;
		}

		view {
			padding-top: 0.5em;
			width: 100%;
		}

		.m-cloum {
			margin-top: 0.5rem;
		}

		.m-icon {
			display: flex;
			justify-content: space-around;
			margin-top: 5rem;

			view {
				display: flex;
				justify-content: space-around;
			}
		}

		input {
			padding: 0.5rem;
			border-radius: 0.3rem;
			background-color: #F4F4F4;
		}
	}

	.custom-style {
		margin-top: 1rem;
	}
</style>
