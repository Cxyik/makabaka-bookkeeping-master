<template>
	<view class="container">
		<swiper :indicator-dots="true" @change="onSwiperChange" style="height: 100%">
			<swiper-item v-for="(item, index) in items" :key="index">
				<view class="swiper">
					<view class="swiper-item">
						<image style="height: 100%; width: 100%;" :src="item.srcLogo"></image>
					</view>
				</view>
				<view v-if="isLastSlide(index)" class="button" @tap="redirectToMainPage">立即体验</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				items: [{
						srcLogo: '../../static/nav/1.png',
					},
					{
						srcLogo: '../../static/nav/2.png',
					},
					{
						srcLogo: '../../static/nav/3.png',
					},
					{
						srcLogo: '../../static/nav/4.png',
					},
				]
			}
		},
		methods: {
			isLastSlide(index) {
				return index === this.items.length - 1
			},
			redirectToMainPage() {
				uni.reLaunch({
					url: '/pages/Login/Login'
				})
			},
			onSwiperChange(event) {
				// 如果滑动到最后一页，可以显示“立即体验”按钮
				if (this.isLastSlide(event.detail.current)) {
					// 标记用户已经看过引导页，在下一次打开应用时不再展示
					uni.setStorageSync('hasViewedGuide', true)
				}
			}
		},
		onLoad() {
			// 检查本地存储中是否已经标记为看过引导页
			const hasViewedGuide = uni.getStorageSync('hasViewedGuide')
			if (hasViewedGuide) {
				uni.reLaunch({
					url: '/pages/Login/Login'
				})
			}
		}
	}
</script>

<style>
	.container {
		height: 100vh;
	}

	.swiper {
		width: 100%;
		height: 100%;
		background-color: #007aff;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
	}

	.button {
		position: absolute;
		bottom: 30px;
		left: 50%;
		transform: translateX(-50%);
		color: #fff;
		background-color: #271A16;
		border-radius: 20px;
		padding: 10px 30px;
	}
</style>
