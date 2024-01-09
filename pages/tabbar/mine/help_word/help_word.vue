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
				帮助文档
			</view>
			<view class="wei">
				
			</view>
		</view>
		<view class="first_content">
			<view class="logo">
				<image src="../../../../static/img/mine/help/help.png" mode=""></image>
			</view>
			<view class="name">
				记账全能王
			</view>
			<view class="question_1">
				<span class="name">1.登录注册<br></span>
				<view class="data_p">
					<image src="../../../../static/img/mine/intro/1.jpg" mode=""></image>
				</view>
				您可以根据自身情况选择登录、注册。
			</view>
			<view class="question_1">
				<span class="name">2.记账功能<br></span>
				<view class="data_p">
					<image src="../../../../static/img/mine/intro/2.jpg" mode=""></image>
				</view>
				在主页可以查看所选账本的流水记录，也可以根据不同的场景及需求选择对应的
				记账方式进行记账。
			</view>
			<view class="question_1">
				<span class="name">3.预算设置<br></span>
				<view class="data_p">
					<image src="../../../../static/img/mine/intro/3.jpg" mode=""></image>
				</view>
				您可在预算页设置全年各月的预算，系统将为您计算出剩余预算。
			</view>
			<view class="question_1">
				<span class="name">4.阶段统计<br></span>
				<view class="data_p">
					<image src="../../../../static/img/mine/intro/4.jpg" mode=""></image>
					<image src="../../../../static/img/mine/intro/5.jpg" mode=""></image>
				</view>
				进入统计页面，可根据所需查看需要进行统计，系统将给出不同的图形展示
				您的收支情况，并根据您的收支情况给出建议。
			</view>
			<view class="question_1">
				<span class="name">5.账单流水<br></span>
				<view class="data_p">
					<image src="../../../../static/img/mine/intro/6.jpg" mode=""></image>
				</view>
				您可以查看本年度各月份的收支情况。
			</view>
			<view class="question_1">
				<span class="name">6.个性设置<br></span>
				<view class="data_p">
					<image src="../../../../static/img/mine/intro/7.jpg" mode=""></image>
				</view>
				您可以在“我的”页面设置字体、选择记账方式、设置模块显示隐藏等个性化操作。
			</view>
			<view class="question_1">
				<span class="name">7.打卡签到<br></span>
				<view class="data_p">
					<image src="../../../../static/img/mine/intro/8.jpg" mode=""></image>
				</view>
				参与每天的打卡、记账可获取相应的积分和勋章。
			</view>
			<view class="question_1">
				<span class="name">8.积分商城<br></span>
				<view class="data_p">
					<image src="../../../../static/img/mine/intro/9.jpg" mode=""></image>
				</view>
				您积累的积分可以在积分商城兑换与之等价的商品。
			</view>
			<view class="question_1">
				<span class="name">9.关爱模式<br></span>
				<view class="data_p">
					<image src="../../../../static/img/mine/intro/10.jpg" mode=""></image>
				</view>
				系统为部分用户推出了关爱模式，方便用户使用。
			</view>
			<view class="question_1">
				<span class="name">10.意见反馈<br></span>
				<view class="data_p">
					<image src="../../../../static/img/mine/intro/11.jpg" mode=""></image>
				</view>
				如果您在使用的过程中遇到了问题，可以在此处反馈给工作人员噢。
			</view>
		</view>
	</view>
	
</template>

<script>
	import base from '@/static/base.js';
	export default {
		extends:base,
		data() {
			return {
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
		}
	}
</script>

<style>
	.first_content{
		padding-top: 6rem;
		margin: 0 1rem;
		background-color: white;
		/* width: 100%; */
		height: 235rem;
		text-align: center;
		border-radius: 2rem;
	}
	
	.logo image{
		width: 8rem;
		height: 8rem;
		padding-right: 0.5rem;
	}
	
	.name{
		color: rgb(100, 100, 100)-;
		font-weight: 600;
	}
	
	.question_1{
		padding: 1rem;
		text-align: left;
	}
	.advice_p,
	.select_p,
	.data_p,
	.way_p{
		width: 100%;
		/* background-color: pink; */
		text-align: center;
		margin-top: 0.3rem;
	}
	.way_p image{
		width: 100%;
		height: 3.5rem;
	}
	.data_p image{
		width: 40%;
		height: 15rem;
		padding: 0.5rem 0.5rem;
	}
	.select_p image{
		width: 40%;
		height: 9rem;
		padding: 0.5rem 0.5rem;
	}
	.advice_p image{
		width: 80%;
		height: 8rem;
		padding: 0.5rem 0.5rem;
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
		height: 245rem;
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