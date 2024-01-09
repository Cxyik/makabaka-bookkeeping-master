<template>
	<page-meta :root-font-size="getRootFontSize()"></page-meta>
	<view class="content">
		
		<!-- 标题 -->
		<view class="total_title">
			<view class="back">
				<image src="../../../../static/img/mine/back.png" alt="">
				<text @click="back_it()">返回</text>
			</view>
			<view class="ach_title">
				意见反馈
			</view>
			<view class="wei">
				
			</view>
		</view>
		<view class="first_content">
			<view class="text_area">
				<textarea name="" id="" cols="30" rows="8"
				placeholder="请输入您的描述..."></textarea>
			</view>
			<button type="primary" size="mini"
			 @click="submit()" style="margin: 1rem;">提交</button>
		</view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="center">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
	
</template>

<script>
	import base from '@/static/base.js';
	export default {
		extends:base,
		data() {
			return {
				type: 'center',
				msgType: 'success',
				messageText: '提交成功',
				txt:"ssss"
			}
		},
		onLoad(){
			
		},
		onShow(){
			console.log(open_devotion.open)
		},
		methods: {
			back_it(){
				uni.navigateBack(1)
			},
			submit(){
				 // const page = program.currentPage()
				 // const element = page.$('.text_area')
				 
				this.$refs.message.open()
			}
		}
	}
</script>

<style>
	.first_content{
		padding-top: 6rem;
		margin: 0 1rem;
		/* background-color: white; */
		/* width: 100%; */
		height: 20rem;
		/* margin-top: 1rem; */
		text-align: center;
		border-radius: 0.5rem;
	}
	.text_area{
		background-color: white;
		height: 10rem;
		border-radius: 0.5rem;
		margin-top: 1rem;
	}
	.text_area{
		padding: 1rem 1rem;
		text-align: left;
	}
	
	
	
	.title{
		width: 50%;
		height: 100%;
		line-height: 3rem;
		box-sizing: border-box;
		padding-left: 2rem;
	}
	/*  */
	.content{
		/* position: fixed; */
		width: 100%;
		height: 50rem;
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
		position: fixed;
		width: 100%;
		height: 3rem;
		background-color: rgb(244, 244, 244);
		z-index: 11;
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