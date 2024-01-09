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
				我的积分
			</view>
			<view class="wei">
				积分规则
			</view>
		</view>
		
		<!-- second -->
		<view class="second_container">
			<view class="second_count">
				<image src="../../../../static/img/mine/jf.png" alt="">
				<view>2053</view>
			</view>
			<view class="second_shop" @click="goto_shop()">
				<view class="view_shop">
					进入积分商城兑好物
				</view>
				<image src="../../../../static/img/mine/more.png" alt="">
			</view>
			<div class="clear"></div>
		</view>
		
		<!-- third 打卡-->
		<view class="playcard">
			<view class="tx">
				<view class="tx_img">
					<image src="https://beyondmyself.top/i/2023/04/07/5.png" alt="">
				</view>
				<view class="tx_play">
					<view class="paly_top">
						已连续打卡<text>{{this.punchDays}}</text>天
					</view>
					<view class="play_bottom">
						<view>我要补签</view>
						<image src="../../../../static/img/mine/more.png" alt="">
					</view>
				</view>
				<view class="tx_exit">
					签到提醒
				</view>
			</view>
			
			<view class="img_border">
				<view class="kuang">
					<view :class="{'show_it':countday>=3}" style="display: none;">
						<image src="../../../../static/img/mine/finish.png" alt="">
					</view>
					<view :class="{'show_it':countday<3}" style="display: none;">
						补
					</view>
				</view>
				<view class="kuang">
					<view :class="{'show_it':countday>=2}" style="display: none;">
						<image src="../../../../static/img/mine/finish.png" alt="">
					</view>
					<view :class="{'show_it':countday<2}" style="display: none;">
						补
					</view>
				</view>
				<view class="kuang">
					<view :class="{'show_it':countday>=1}" style="display: none;">
						<image src="../../../../static/img/mine/finish.png" alt="">
					</view>
					<view :class="{'show_it':countday<1}" style="display: none;">
						补
					</view>
				</view>
				<view class="kuang">
					<view :class="{'show_it':ischeck==1}" style="display: none;">
						<image src="../../../../static/img/mine/finish.png" alt="">
					</view>
					<view :class="{'show_it':ischeck==0}" style="display: none;">
						签
					</view>
				</view>
				<view class="kuang">
					待
				</view>
			</view>
			<view class="text_border">
				<view class="txt_border">
					{{this.date_1}}
				</view>
				<view class="txt_border">
					{{this.date_2}}
				</view>
				<view class="txt_border">
					{{this.date_3}}
				</view>
				<view class="txt_border">
					今天
				</view>
				<view class="txt_border">
					{{this.date_5}}
				</view>
				
			</view>
		</view>
		
		<!-- 挑战 -->
		<view class="hard">
			<view class="tx">
				<view class="tx_img tz_img">
					<image src="../../../../static/img/mine/present.png" alt="">
				</view>
				<view class="tx_play">
					<view class="paly_top">
						已连续打卡<text>{{this.punchDays}}</text>天
					</view>
					<view class="play_bottom">
						<view>我要补签</view>
						<image src="../../../../static/img/mine/more.png" alt="">
					</view>
				</view>
				<view class="tx_exit">
					开启挑战
				</view>
			</view>
		</view>
		
		<!-- task -->
		<view class="task">
			<view class="task_title">做任务赚积分</view>
			<view class="items">
				<view class="it_lef">
					<text>今日打卡</text>
					<view class="it_detail">
						<image src="../../../../static/img/mine/jf.png" alt="">
						<text>+3</text>
					</view>
				</view>
				<view class="it_right">已完成</view>
			</view>
			
			<view class="items marign_to1">
				<view class="it_lef">
					<text>查看当月收支情况</text>
					<view class="it_detail">
						<image src="../../../../static/img/mine/jf.png" alt="">
						<text>+3</text>
					</view>
				</view>
				<view class="it_right" @click="goto_month()">去完成</view>
			</view>
			
			<view class="items margin_to2" @click="shareToggle()">
				<view class="it_lef">
					<text>与朋友分享自己的账单</text>
					<view class="it_detail">
						<image src="../../../../static/img/mine/jf.png" alt="">
						<text>+3</text>
					</view>
				</view>
				<view class="it_right">去完成</view>
			</view>
			
			<view class="items margin_to3" @click="goto_write()">
				<view class="it_lef">
					<text>当日完成记账三笔</text>
					<view class="it_detail">
						<image src="../../../../static/img/mine/jf.png" alt="">
						<text>+3</text>
					</view>
				</view>
				<view class="it_right">去完成</view>
			</view>
			
			<view class="items margin_to4" @click="goto_write()">
				<view class="it_lef">
					<text>当日完成记账五笔</text>
					<view class="it_detail">
						<image src="../../../../static/img/mine/jf.png" alt="">
						<text>+3</text>
					</view>
				</view>
				<view class="it_right">去完成</view>
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
				ischeck:0,
				punchDays:0,
				date_1:"",
				date_2:"",
				date_3:"",
				date_4:"",
				date_5:"",
				countday:0
			}
		},
		onLoad(){
			this.ischeck = init.ischeck
			this.punchDays = init.punchDays
			
			// 今天
			var today = new Date().getTime()
			var month = new Date().getMonth()+1
			var day = new Date().getDate()
			
			//昨天
			var yestoday = today - 24*60*60*1000
			var date_yes = new Date(yestoday)
			month = date_yes.getMonth()+1
			day = date_yes.getDate()
			this.date_3 = month+"."+day
			
			//前天
			yestoday = today - 24*60*60*1000*2
			date_yes = new Date(yestoday)
			month = date_yes.getMonth()+1
			day = date_yes.getDate()
			this.date_2 = month+"."+day
			
			// 上前天
			yestoday = today - 24*60*60*1000*3
			date_yes = new Date(yestoday)
			month = date_yes.getMonth()+1
			day = date_yes.getDate()
			this.date_1 = month+"."+day
			
			// 明天
			yestoday = today + 24*60*60*1000
			date_yes = new Date(yestoday)
			month = date_yes.getMonth()+1
			day = date_yes.getDate()
			this.date_5 = month+"."+day
			console.log(this.date_5)
			
			if(this.ischeck==1){
				this.countday = this.punchDays - 1
			}
			else{
				this.countday = this.punchDays
			}
		},
		methods: {
			back_it(){
				uni.navigateBack(1)
			},
			goto_shop(){
				uni.navigateTo({
					url:"/pages/tabbar/mine/shop/shop"
				})
			},
			goto_month(){
				uni.reLaunch({
					url:"/pages/tabbar/chart/chart?id=123"
				})
			},
			shareToggle() {
				this.$refs.share.open()
			},
				
			goto_write(){
				uni.navigateTo({
					url:"/pages/tabbar-detial/tabbar-detial-writeBill/tabbar-detial-writeBill"
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: rgb(244,244,244);
	}
	.show_it{
		display: block !important;
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
	
	/* second */
	.second_container{
		width: 90%;
		padding-left: 20px;
	}
	.second_count{
		float: left;
		width: 80px;
		height: 30px;
		background-color: white;
		border-radius: 13px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		position: relative;
		    top: 7rem;
	}
	.second_count image{
		width: 21px;
		height: 21px;
	}
	.second_count view{
		height: 100%;
		line-height: 30px;
	}
	.second_count image:nth-child(3){
		width: 15px;
	}
	.second_shop{
		float: right;
		width: 130px;
		height: 30px;
		background-color: white;
		border-radius: 13px;
		font-size: 12px;
		display: flex;
		align-items: center;
		position: relative;
		    top: 7rem;
	}
	.view_shop{
		height: 100%;
		line-height: 30px;
		padding-left: 5px;
	}
	.second_shop image{
		width: 10px;
		height: 10px;
	}
	
	/* third 打卡 */
	.playcard{
		width: 90%;
		height: 240px;
		background-color: white;
		margin-left: 20px;
		margin-top: 8rem;
		border-radius: 10px;
	}
	.tx{
		width: 90%;
		padding-left: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 30px;
	}
	.tx_exit{
		flex: 1;
		font-size: 12px;
		border: 1px solid #ccc;
		text-align: center;
		height: 25px;
		line-height: 25px;
		border-radius: 10px;
	}
	.tx_play{
		flex: 3;
		margin-left: 0.4rem;
	}
	.tx_image{
		flex: 1;
	}
	.tx_img image{
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
	.play_bottom{
		display: flex;
		margin-top: 5px;
		font-size: 10px;
		align-items: center;
	}
	.play_bottom view{
		height: 100%;
		line-height: 20px;
	}
	.play_bottom image{
		width: 12px;
		height: 12px;
	}
	.img_border{
		display: flex;
		margin-top: 30px;
		/* padding: 0 10px 0; */
	}
	.kuang{
		flex: 1;
		margin: 0 12px 0;
		/* width: 17%; */

		border-radius: 10px;
		height: 60px;
		border: 1px solid #ccc;
		text-align: center;
		line-height: 60px;
	}
	.kuang image{
		width: 20px;
		height: 20px;
	}
	.text_border{
		display: flex;
		align-items: center;
		margin-top: 10px;
		font-size: 12px;
	}
	.txt_border{
		flex: 1;
		text-align: center;
	}
	
	/* 挑战 */
	.hard{
		position: absolute;
		margin-top: 30px;
		left: 50%;
		width: 90%;
		height: 110px;
		background-color: white;
		transform: translateX(-50%);
		border-radius: 13px;
	}
	.tz_img image{
		border-radius: 20%;
	}
	
	/* task */
	.task{
		position: absolute;
		margin-top: 170px;
		left: 50%;
		width: 90%;
		height: 350px;
		background-color: white;
		transform: translateX(-50%);
		border-radius: 13px;
	}
	.task_title{
		width: 100%;
		margin-top: 15px;
		text-align: center;
	}
	.items{
		width: 90%;
		margin-top: 10px;
		background-color: coral;
		padding-left: 20px;
	}
	.it_lef{
		float: left;
	}
	.it_right{
		float: right;
		border: 1px solid #bbb;
		width: 60px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		border-radius: 13px;
		font-size: 12px;
	}
	.it_detail{
		display: flex;
		align-items: center;
	}
	.it_detail image{
		width: 15px;
		height: 15px;
	}
	.it_detail text{
		font-size: 12px;
		margin-left: 10px;
	}
	.marign_to1{
		margin-top: 65px;
	}
	.margin_to2{
		margin-top: 120px;
	}
	.margin_to3{
		margin-top: 175px;
	}
	.margin_to4{
		margin-top: 230px;
	}
</style>
