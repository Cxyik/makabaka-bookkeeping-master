<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view>
		<view style=" height: var(--status-bar-height);">

		</view>
		<view class="black">
			<uni-nav-bar left-icon="left" title="调整字体大小" @clickLeft="back" />
		</view>
		<view style="margin: 3rem; font-size: 1.05rem;">
			<text>
				最是那一低头的温柔，
				
				像一朵水莲花不胜凉风的娇羞，
				
				道一声珍重，道一声珍重，
				
				那一声珍重里有蜜甜的忧愁
				
				沙扬娜拉！
			</text>
		</view>
		<view class="m-bottom">
			<view class="uni-padding-wrap uni-common-mt" style="margin-top: 50upx;">
				<view class="titleBox">
					<view style="font-size:25upx">A</view>
					<view style="font-size:30upx">标准</view>
					<view style="font-size:35upx">A</view>
					<view style="font-size:40upx">A</view>
				</view>

				<view>
					<slider min="15" max="18 " :value="fontValue" @change="sliderChange" show-value step="1" />
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
				fontValue: 16,
				rootFontSize: '14upx',
				fontStart: uni.getStorageSync('root_font_size') + '',
				fontEnd: uni.getStorageSync('root_font_size') + ''
			}
		},
		onLoad() {
			const self = this;
			//当前字体大小
			self.fontValue = parseInt(self.getRootFontSize().split('px')[0]);
			console.log(self.fontValue)
		},
		methods: {
			back() {
				uni.reLaunch({
					url: '/pages/tabbar/mine/mine',
				})
				// uni.navigateBack(1)
			},
			sliderChange(e) {
				console.log('value 发生变化：' + e.detail.value)
				const self = this;
				let nowFontSize = e.detail.value + 'px';
				console.log(nowFontSize)
				self.fontEnd = nowFontSize;
				console.log(nowFontSize)
				self.setRootFontSize(nowFontSize);
				this.save(e.detail.value)
		
			},
			//这里设置一个事件，使用uni.reLaunch跳转到某个页面，并关闭所有页面
			/*onNavigationBarButtonTap() {
				uni.reLaunch({
					url:"../tabbar-4"
				})
			}*/
			save(number){
				const {baseApi,userId}=this.GLOBAL
				uni.request({
					url: baseApi+"/userInfo/updateFont",
					method: "POST",
					data:{
						userId:userId,
						fontNum:number
					},
					success: (res) => {
						console.log(res.data)
						this.$forceUpdate()
					}
				});
			}
		}
	}
</script>
<style>
	.titleBox {
		width: 80%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 30upx 0;
		margin-left: 5%;
	}
	.m-bottom{
		position: fixed;
		bottom: 10%;
		width: 100%;
	}
</style>
