<template>
	<view class="content">
		<view class="my_help">
			
		</view>
		<!-- 标题 -->
		<view class="total_title">
			<view class="back">
				<image src="../../../../static/img/mine/back.png" alt="">
				<text @click="back_it()">返回</text>
			</view>
			<view class="ach_title">
				积分商城
			</view>
			<view class="wei">
				兑换规则
			</view>
		</view>
		
		<!-- nav -->
		<view class="nav">
			<view class="item" :class="{'current':current==1}" @click="change_current1()">全部</view>
			<view class="item" :class="{'current':current==2}" @click="change_current2()">推荐</view>
			<view class="item" :class="{'current':current==3}" @click="change_current3()">特色</view>
			<view class="item" :class="{'current':current==4}" @click="change_current4()">出行</view>
			<view class="item" :class="{'current':current==5}" @click="change_current5()">文娱</view>
			<view class="item" :class="{'current':current==6}" @click="change_current6()">美食</view>
			<view class="item" :class="{'current':current==7}" @click="change_current7()">日用</view>
		</view>
		
		<view class="jie">
		</view>
		
		<!-- 目录 -->
		<view class="cont">
			<view class="cont_first">
				<view class="cont_txt">默认排序</view>
				<image src="../../../../static/img/mine/show.png" alt="">
			</view>
			<view class="cont_second">
				<view class="cont_txt">全部积分</view>
				<image src="../../../../static/img/mine/show.png" alt="">
			</view>
			<view class="cont_third">
				<image src="../../../../static/img/mine/search.png" alt="">
				<view class="cont_txt spec">搜索</view>
			</view>
		</view>
		
		<!-- 列表 -->
		<view class="list" :class="{'hide_this':this.current!=1}">
			<view class="list-item">
				<image src="../../../../static/img/mine/egg.png" alt="">
				<view class="list_title">
					鲜鸡蛋
				</view>
				<view class="list_jf">
					99积分+3.9元
				</view>
				<view class="yue">
					月兑298710
				</view>
			</view>
			<view class="list-item">
				<image src="../../../../static/img/mine/egg.png" alt="">
				<view class="list_title">
					鲜鸡蛋
				</view>
				<view class="list_jf">
					99积分+3.9元
				</view>
				<view class="yue">
					月兑298710
				</view>
			</view>
		</view>
		
		<!-- 列表2 -->
		<view class="list" :class="{'hide_this':this.current!=2}">
			<view class="list-item">
				<image src="../../../../static/img/mine/shop/day.png" alt="">
				<view class="list_title">
					鲜鸡蛋
				</view>
				<view class="list_jf">
					99积分+3.9元
				</view>
				<view class="yue">
					月兑298710
				</view>
			</view>
			<view class="list-item">
				<image src="../../../../static/img/mine/shop/day.png" alt="">
				<view class="list_title">
					鲜鸡蛋
				</view>
				<view class="list_jf">
					99积分+3.9元
				</view>
				<view class="yue">
					月兑298710
				</view>
			</view>
		</view>
		
		<!-- 列表3 -->
		<view class="list" :class="{'hide_this':this.current!=3}">
			<view class="list-item">
				<image src="../../../../static/img/mine/shop/day.png" alt="">
				<view class="list_title">
					鲜鸡蛋
				</view>
				<view class="list_jf">
					99积分+3.9元
				</view>
				<view class="yue">
					月兑298710
				</view>
			</view>
			<view class="list-item">
				<image src="../../../../static/img/mine/egg.png" alt="">
				<view class="list_title">
					鲜鸡蛋
				</view>
				<view class="list_jf">
					99积分+3.9元
				</view>
				<view class="yue">
					月兑298710
				</view>
			</view>
		</view>
		
		<!-- 列表4 -->
		<view class="list" :class="{'hide_this':this.current!=4}">
			<view class="list-item">
				<image src="../../../../static/img/mine/shop/milk.png" alt="">
				<view class="list_title">
					鲜鸡蛋
				</view>
				<view class="list_jf">
					99积分+3.9元
				</view>
				<view class="yue">
					月兑298710
				</view>
			</view>
			<view class="list-item">
				<image src="../../../../static/img/mine/shop/trail.png" alt="">
				<view class="list_title">
					鲜鸡蛋
				</view>
				<view class="list_jf">
					99积分+3.9元
				</view>
				<view class="yue">
					月兑298710
				</view>
			</view>
		</view>
		
		<!-- 列表5 -->
		<view class="list" :class="{'hide_this':this.current!=5}">
			<view class="list-item">
				<image src="../../../../static/img/mine/shop/trail.png" alt="">
				<view class="list_title">
					鲜鸡蛋
				</view>
				<view class="list_jf">
					99积分+3.9元
				</view>
				<view class="yue">
					月兑298710
				</view>
			</view>
			<view class="list-item">
				<image src="../../../../static/img/mine/shop/milk.png" alt="">
				<view class="list_title">
					鲜鸡蛋
				</view>
				<view class="list_jf">
					99积分+3.9元
				</view>
				<view class="yue">
					月兑298710
				</view>
			</view>
		</view>
		
		<!-- 列表6 -->
		<view class="list" :class="{'hide_this':this.current!=6}">
			<view class="list-item">
				<image src="../../../../static/img/mine/shop/food.png" alt="">
				<view class="list_title">
					鲜鸡蛋
				</view>
				<view class="list_jf">
					99积分+3.9元
				</view>
				<view class="yue">
					月兑298710
				</view>
			</view>
			<view class="list-item">
				<image src="../../../../static/img/mine/shop/food.png" alt="">
				<view class="list_title">
					鲜鸡蛋
				</view>
				<view class="list_jf">
					99积分+3.9元
				</view>
				<view class="yue">
					月兑298710
				</view>
			</view>
		</view>
		
		<!-- 列表7 -->
		<view class="list" :class="{'hide_this':this.current!=7}">
			<view class="list-item">
				<image src="../../../../static/img/mine/shop/food.png" alt="">
				<view class="list_title">
					鲜鸡蛋
				</view>
				<view class="list_jf">
					99积分+3.9元
				</view>
				<view class="yue">
					月兑298710
				</view>
			</view>
			<view class="list-item">
				<image src="../../../../static/img/mine/egg.png" alt="">
				<view class="list_title">
					鲜鸡蛋
				</view>
				<view class="list_jf">
					99积分+3.9元
				</view>
				<view class="yue">
					月兑298710
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:1
			}
		},
		methods: {
			back_it(){
				uni.navigateBack(1)
			},
			change_current1(){
				this.current = 1
			},
			change_current2(){
				this.current = 2
			},
			change_current3(){
				this.current = 3
			},
			change_current4(){
				this.current = 4
			},
			change_current5(){
				this.current = 5
			},
			change_current6(){
				this.current = 6
			},
			change_current7(){
				this.current = 7
			}
		}
	}
</script>

<style>
	.my_help{
		width: 100%;
		height: 3rem;
		position: fixed;
		background-color: rgb(244,244,244);
		top:0;
		z-index: 10;
		}
		
	.hide_this{
		display: none !important;
	}
.content{
		width: 100%;
		height: 900px;
		background-color: rgb(244, 244, 244);
		font-size: 16px;
	}
	
	/* first */
.total_title{
		padding-left: 10px;
		width: 100%;
		height: 4rem;
		    top: 3rem;
		    position: fixed;
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
	
	/* 导航栏 */
	.nav{
		position: fixed;
		    height: 2.5rem;
		    background-color: rgb(244,244,244);
		    width: 100%;
		    top: 6.45rem;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    z-index: 10;
		}
	.item{
		width: 12%;
		height: 80%;
		text-align: center;
		margin: 0 0.3rem;
		line-height: 2rem;
	}
	.current{
		font-size: 1.1rem;
		border-bottom: 1px solid black;
	}
	.jie{
		width: 100%;
		border: 1px solid black;
		margin-top: 9rem;
	}
	
	/* 目录 */
	.cont {
		margin-top: 10px;
	}
	.cont_second,
	.cont_first{
		float: left;
		width: 80px;
		height: 35px;
		background-color: white;
		border-radius: 15px;
		text-align: center;
		margin-left: 20px;
		display: flex;
		align-items: center;
	}
	.cont_third{
		float: right;
		width: 80px;
		height: 35px;
		background-color: white;
		border-radius: 15px;
		text-align: center;
		margin-right: 20px;
		display: flex;
		align-items: center;
	}
	.cont_txt{
		font-size: 14px;
		height: 100%;
		line-height: 35px;
		margin-left: 5px;
	}
	.cont image{
		width: 15px;
		height: 15px;
	}
	.cont_third image{
		margin-left: 15px;
	}
	.list{
		margin-top: 50px;
		width: 90%;
		padding-left: 20px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}
	.list-item{
		width: 43%;
		height: 200px;
		background-color: white;
		margin-top: 20px;
		margin: 10px;
		border-radius: 10px;
		text-align: center;
	}
	.list-item image{
		margin-top: 10px;
		width: 7rem;
		height: 6rem;
	}
	.list-item view{
		width: 80%;
		padding-left: 15px;
		text-align: left;
	}
	.list_title{
		padding-top: 10px;
	}
	.list_jf{
		padding-top: 5px;
	}
	.yue{
		padding-top: 5px;
		font-size: 12px;
	}
</style>
