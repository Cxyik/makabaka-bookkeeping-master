<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
</style>
<script>
	import base from '@/static/base.js';
	export default {
		data() {
			return {
				fsize: '110%'
			};
		},
		onLaunch: function() {
			let token = uni.getStorageSync('token');
			if (token) {
				//存在则关闭启动页进入首页
				// #ifdef APP-PLUS
				plus.navigator.closeSplashscreen();
				// #endif
			} else {
				const hasViewedGuide = uni.getStorageSync('hasViewedGuide')
				if(hasViewedGuide)
				uni.reLaunch({
					url: "/pages/Login/Login",
					success: () => {
						// #ifdef APP-PLUS
						plus.navigator.closeSplashscreen();
						// #endif
						this.$isResolve()
					}
				})
				else{
					setTimeout(()=>{
					uni.reLaunch({
						url: '/pages/Guide/Guide'
					})
					}, 100);
				}

			}
		},


		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
			uni.removeStorageSync('firstLoad')
		},
	
	};
</script>

<style>
	@import "@/static/icon/iconfont.css";

	.hover:active {
		background-color: #ededed;
	}

	uni-page-body,
	html,
	body {
		height: 100%;
		/* font-size: 110%; */
	}
</style>
