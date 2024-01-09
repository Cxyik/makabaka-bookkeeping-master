<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="index">
		<view style=" height: var(--status-bar-height);">

		</view>
		<view class="black">
			<uni-nav-bar left-icon="left" title="勋章" @clickLeft="back" />
		</view>
		<view class="main">
			<view class="title">
				<text>
					记账数量
				</text>
				<text>
					已获得{{number}}枚
				</text>
			</view>
			<view class="achivement">
				<view v-for="item in achivement">
					<image :src="item.path"></image>
					{{item.text}}
				</view>
			</view>
		</view>
		<view class="main">
			<view class="title">
				<text>
					连续打卡
				</text>
				<text>
					已获得{{number}}枚
				</text>
			</view>
			<view class="achivement">
				<view v-for="item in day">
					<image :src="item.path"></image>
					{{item.text}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import init from "../../../../static/json/init.json"
	import base from '@/static/base.js';
	export default {
		extends:base,
		data() {
			return {
				achivement:'',
				day:'',
				number:0,
				ischeck:0
			}
		},
		
		onReady() {
			var list=[]
			var list2=[]
			// var fornt=["100","200","500","1250","1500","1750","2000","2000","2000"]
			for(var i=1;i<=9;i++){
				list.push({
					path:'../../../../static/img/mine/achivement0.png',
					text:'记账'+i*100+"笔"
				})
			}
			for(var i=1;i<=9;i++){
				list2.push({
					path:'../../../../static/img/mine/achivement0.png',
					text:'连续打卡'+i*100+"天"
				})
			}
			this.achivement=list
			this.day=list2
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 2
				});
			},
		}
	}
</script>

<style lang="scss">
	.index {
		background-color: #f4f4f4;
		height: 100%;
	}

	.main {
		color: #666666;
		padding: 0.5rem;
		margin: 0.7rem;
		background-color: white;
		border-radius: 0.5rem;

		text:nth-child(2) {
			font-size: 0.6rem;
			margin-left: 1rem;
		}
	}

	.achivement {
		width: 100%;
		display: flex;
		// justify-content: space-between;
		flex-wrap: wrap;
		font-size: 0.6rem;
		margin-top: 0.5rem;
		view{
			width: 33.33%;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			
			image{
				align-self: center;
				
				height: 4rem;
				width: 4rem;
				margin: 0.2rem;
			}
			
		}
	}
</style>
