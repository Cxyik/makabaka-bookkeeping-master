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
				关于我们
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
				<span class="name">1.何为记账全能王<br></span>
				“记账全能王”是一款通过技术内容创新，具备在个人财务管理中的多场景可用性
				，给用户以清晰的消费管理目标，需根据不同年龄段使用情况进行
				产品应用 创新，使用户能够高效利用个人财务健康应用的应用。
			</view>
			<view class="question_1">
				<span class="name">2.记账方式多样<br></span>
				<view class="way_p">
					<image src="../../../../static/img/mine/help/way.png" mode=""></image>
				</view>
				“记账全能王”支持四种记账方式，包括传统记账、语言记账、导入记账、
				拍照记账等四种方式，用户根据自身及使用场景选择合适的记账方式。
			</view>
			<view class="question_1">
				<span class="name">3.个人财务数据一览无余<br></span>
				<view class="data_p">
					<image src="../../../../static/img/mine/help/budget.png" mode=""></image>
					<image src="../../../../static/img/mine/help/chart.png" mode=""></image>
				</view>
				支持用户设置年、月预算并查看剩余预算，多维度展示用户限定日、月、
				年内的个人财务数据。
			</view>
			<view class="question_1">
				<span class="name">4.个性化模块及方式选择<br></span>
				<view class="select_p">
					<image src="../../../../static/img/mine/help/select_way.jpg" mode=""></image>
					<image src="../../../../static/img/mine/help/mode.png" mode=""></image>
				</view>
				用户根据个人喜好，设置记账方式及各类数据展示模块的显示与否。
			</view>
			<view class="question_1">
				<span class="name">5.个性化健康管理建议<br></span>
				<view class="advice_p">
					<image src="../../../../static/img/mine/help/advice.png" mode=""></image>
				</view>
				系统根据用户的消费类型及数据分析给出建议。
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
		height: 90rem;
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
		height: 100rem;
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