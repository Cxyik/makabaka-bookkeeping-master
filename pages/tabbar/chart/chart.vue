<template>
	<view class="total" :style="{'height':this.myheight+'rem'}">
		<view class="m-head">
			<text>统计</text>
		</view>
		<!-- 日期 -->
		<view class="my_position" :style="{'height':this.rtj_height_1+'rem'}">
			<ul class="date_title">
				<li><button class="mini-btn" :type="btn_type1" size="mini" @click="r_change_date()">日统计</button></li>
				<li><button class="mini-btn" :type="btn_type2" size="mini" @click="y_change_date()">月统计</button></li>
				<li><button class="mini-btn" :type="btn_type3" size="mini" @click="n_change_date()">年统计</button></li>
				<li><button class="mini-btn" :type="btn_type4" size="mini" @click="z_change_date()">自定义</button></li>
			</ul>
			<!-- 选择日期 -->
			<view class="contentn fix_it" :class="{'dis_block':is_dis==0}">
				<view class="item" :class="{'select_item':select_month_item==4}" @click="change_month(4)">4月</view>
				<view class="item" :class="{'select_item':select_month_item==1}" @click="change_month(1)">3月</view>
				<view class="item" :class="{'select_item':select_month_item==2}" @click="change_month(2)">2月</view>
				<view class="item" :class="{'select_item':select_month_item==3}" @click="change_month(3)">1月</view>
			</view>
			<!-- 选择日期 -->
			<view class="contentn fix_it" :class="{'dis_block':n_is_dis==0}">
				<view class="item" :class="{'select_item':select_year_item==1}" @click="change_year(1)">2023年</view>
				<view class="item" :class="{'select_item':select_year_item==2}" @click="change_year(2)">2022年</view>
				<view class="item" :class="{'select_item':select_year_item==3}" @click="change_year(3)">2021年</view>
				<view class="item" :class="{'select_item':select_year_item==4}" @click="change_year(4)">2020年</view>
				<view class="item" :class="{'select_item':select_year_item==5}" @click="change_year(5)">2019年</view>
				<view class="item" :class="{'select_item':select_year_item==6}" @click="change_year(6)">2018年</view>
				<view class="item" :class="{'select_item':select_year_item==7}" @click="change_year(7)">2017年</view>
				<view class="item" :class="{'select_item':select_year_item==8}" @click="change_year(8)">2016年</view>
			</view>
			
			
			<!-- 选择日期 -->
			<view class="contentn_z fix_it" :class="{'dis_block':z_is_dis==0}">
				<view class="son_z" style="z-index: 100;">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db uni_item">
								<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
									<view class="uni-input uni_item">{{date}}</view>
								</picker>
							</view>
							<view class="uni_item">
								至
							</view>
							<view class="uni-list-cell-db uni_item">
								<picker mode="date" :value="date_1" :start="startDate_1" :end="endDate_1" @change="bindDateChange_1">
									<view class="uni-input uni_item">{{date_1}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="my_help_1" :style="{'height':this.rtj_height_2+'rem'}">
			
		</view>
		<!-- 日统计内容 -->
		<view class="r_content">
			
			
			<!-- 收支总览 -->
			<view class="total_see">
				<view class="first_see">收支总览</view>
				<view class="in_and_out">
					<view class="sec_title">
						<view class="item_see">
							<view class="position_img">
								<image src="../../../static/img/public/1.svg"></image>
							</view>
							<view class="position_text">收入</view>
						</view>
						<view class="item_see">
							<view class="position_img">
								<image src="../../../static/img/public/2.svg"></image>
							</view>
							<view class="position_text">支出</view>
						</view>
						<view class="item_see">
							<view class="position_img special_img">
								<image src="../../../static/img/public/lag.svg"></image>
							</view>
							<view class="position_text">结余</view>
						</view>
					</view>
					<view class="sec_content">
						<view class="item_show0">
							￥{{json_totalIncome}}
						</view>
						<view class="item_show0">
							￥{{json_totalExpenditure}}
						</view>
						<view class="item_show0">
							￥{{json_totalBalance}}
						</view>
					</view>
				</view>
			</view>
			<!-- 折线图 -->
			<view class="recent">
				<div class="switch_sz">
				</div>
				<div class="title_margin"></div>
				<div class="zx_title">收支统计</div>
				<view class="echarts" :prop="option" :change:prop="echarts.updateEcharts"
				    id="echart">
				</view>
				<view class="improve">
					<button class="mini-btn" :type="my_type1" size="mini" @click="switchzx()">折线图</button>
					<button class="mini-btn" :type="my_type2" size="mini" @click="switchzz()">柱状图</button>
				</view>
			</view>
			<!-- 分类报表 -->
			<view class="recong">
				<div class="my_margin"></div>
				<div class="my_container">
					<div class="bz_title">分类统计</div>
					<div class="switch_sz">
						<view class="my_switch_btn">
							<view class="btn_01" @click="switchbz_z()"
							 v-bind:class="{'select_it1': cost_and_income1==0}">
								支出
							</view>
							<view class="btn_02" @click="switchyh_s()"
							v-bind:class="{'select_it1': cost_and_income1==1}">
								收入
							</view>
						</view>
					</div>
				</div>
				<div class="fa_improve2">
					<view class="echarts2" :prop="option1" :change:prop="echarts.updateEcharts_1"
					    id="mychart2">
					</view>
					<view class="tips">
						点击类别可控制其占比情况的显示与隐藏
					</view>
					<view class="improve2">
						<button class="mini-btn" :type="my_type3" size="mini" @click="switchbz()">饼状图</button>
						<button class="mini-btn" :type="my_type4" size="mini" @click="switchyh()">圆环图</button>
					</view>
				</div>
				<view class="index_margin">
					
				</view>
				<view :class="{'my_cost':cost_or_income==1}">
					<view class="items" @click="change_item1()">
						<view class="detail">
							<view class="d_left">
								<image src="../../../static/img/chart/1.png" alt="">
							</view>
							<view class="d_right">
								<view class="d_right_total">
									<text class="le">{{this.total_data[0].name}}</text>
									<text class="ri">￥-{{vue_detail[0].value}}</text>
								</view>
								<view class="zhanbi">
									<view class="zhanbi_t sp_color" :style="{'width':proportion_arr_expenditure[0]*100/proportion_expenditure+'% !important'}"></view>
								</view>
								<view class="suggest">
									<image src="../../../static/img/chart/more.png" :class="{'transfer':item1==0}"></image>
								</view>
							</view>
							
							<view v-bind:class="{'item_show': item1==0, 'item_hide': !item1==0}">
								<view class="de_bo b_mar new_mar">
									<view class="de_bo_le">{{this.vue_double[0].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[0].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[1].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[1].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[2].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[2].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[3].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[3].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[4].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[4].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[5].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[5].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[6].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[6].value}}</view>
								</view>
							</view>
							
						</view>
						<view class="clear"></view>
					</view>	
					<view class="items" @click="change_item2()">
						<view class="detail">
							<view class="d_left">
								<image src="../../../static/img/chart/2.png" alt="">
							</view>
							<view class="d_right">
								<view class="d_right_total">
									<text class="le">{{this.total_data[1].name}}</text>
									<text class="ri">￥-{{this.vue_detail[1].value}}</text>
								</view>
								<view class="zhanbi">
									<view class="zhanbi_t xc_color" :style="{'width':proportion_arr_expenditure[1]*100/proportion_expenditure+'% !important'}"></view>
								</view>
								<view class="suggest">
									<image src="../../../static/img/chart/more.png" :class="{'transfer':item2==0}"></image>
								</view>
							</view>
							<view v-bind:class="{'item_show': item2==0, 'item_hide': !item2==0}">
								<view class="de_bo b_mar new_mar">
									<view class="de_bo_le">{{this.vue_double[7].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[7].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[8].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[8].value}}</view>
								</view>
								<view class="de_bo b_mar">
									<view class="de_bo_le">{{this.vue_double[9].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[9].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[10].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[10].value}}</view>
								</view>
								<view class="de_bo b_mar">
									<view class="de_bo_le">{{this.vue_double[11].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[11].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[12].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[12].value}}</view>
								</view>
								<view class="de_bo b_mar">
									<view class="de_bo_le">{{this.vue_double[13].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[13].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[14].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[14].value}}</view>
								</view>
							</view>
						</view>
						<view class="clear"></view>
					</view>
					<view class="items" @click="change_item3()">
						<view class="detail">
							<view class="d_left">
								<image src="../../../static/img/chart/3.png" alt="">
							</view>
							<view class="d_right">
								<view class="d_right_total">
									<text class="le">{{this.total_data[2].name}}</text>
									<text class="ri">￥-{{this.vue_detail[2].value}}</text>
								</view>
								<view class="zhanbi">
									<view class="zhanbi_t jj_color" :style="{'width':proportion_arr_expenditure[2]*100/proportion_expenditure+'% !important'}"></view>
								</view>
								<view class="suggest">
									<image src="../../../static/img/chart/more.png" :class="{'transfer':item3==0}"></image>
								</view>
							</view>
							<view v-bind:class="{'item_show': item3==0, 'item_hide': !item3==0}">
								<view class="de_bo b_mar new_mar">
									<view class="de_bo_le">{{this.vue_double[15].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[15].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[16].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[16].value}}</view>
								</view>
								<view class="de_bo b_mar">
									<view class="de_bo_le">{{this.vue_double[17].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[17].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[18].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[18].value}}</view>
								</view>
								<view class="de_bo b_mar">
									<view class="de_bo_le">{{this.vue_double[19].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[19].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[20].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[20].value}}</view>
								</view>
								<view class="de_bo b_mar">
									<view class="de_bo_le">{{this.vue_double[21].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[21].value}}</view>
								</view>
							</view>
						</view>
						<view class="clear"></view>
					</view>
					<view class="items" @click="change_item4()">
						<view class="detail">
							<view class="d_left">
								<image src="../../../static/img/chart/4.png" alt="">
							</view>
							<view class="d_right">
								<view class="d_right_total">
									<text class="le">{{this.total_data[3].name}}</text>
									<text class="ri">￥-{{this.vue_detail[3].value}}</text>
								</view>
								<view class="zhanbi">
									<view class="zhanbi_t jl_color" :style="{'width':proportion_arr_expenditure[3]*100/proportion_expenditure+'% !important'}"></view>
								</view>
								<view class="suggest">
									<image src="../../../static/img/chart/more.png" :class="{'transfer':item4==0}"></image>
								</view>
							</view>
							<view v-bind:class="{'item_show': item4==0, 'item_hide': !item4==0}">
								<view class="de_bo b_mar new_mar">
									<view class="de_bo_le">{{this.vue_double[22].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[22].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[23].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[23].value}}</view>
								</view>
								<view class="de_bo b_mar">
									<view class="de_bo_le">{{this.vue_double[24].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[24].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[25].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[25].value}}</view>
								</view>
								<view class="de_bo b_mar">
									<view class="de_bo_le">{{this.vue_double[26].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[26].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[27].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[27].value}}</view>
								</view>
							</view>
						</view>
						<view class="clear"></view>
					</view>
					<view class="items" @click="change_item5()">
						<view class="detail">
							<view class="d_left">
								<image src="../../../static/img/chart/5.png" alt="">
							</view>
							<view class="d_right">
								<view class="d_right_total">
									<text class="le">{{this.total_data[4].name}}</text>
									<text class="ri">￥-{{this.vue_detail[4].value}}</text>
								</view>
								<view class="zhanbi">
									<view class="zhanbi_t yl_color" :style="{'width':proportion_arr_expenditure[4]*100/proportion_expenditure+'% !important'}"></view>
								</view>
								<view class="suggest">
									<image src="../../../static/img/chart/more.png" :class="{'transfer':item5==0}"></image>
								</view>
							</view>
							<view v-bind:class="{'item_show': item5==0, 'item_hide': !item5==0}">
								<view class="de_bo b_mar new_mar">
									<view class="de_bo_le">{{this.vue_double[28].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[28].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[29].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[29].value}}</view>
								</view>
								<view class="de_bo b_mar">
									<view class="de_bo_le">{{this.vue_double[30].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[30].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[31].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[31].value}}</view>
								</view>
								<view class="de_bo b_mar">
									<view class="de_bo_le">{{this.vue_double[32].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[32].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[33].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[33].value}}</view>
								</view>
								<view class="de_bo b_mar">
									<view class="de_bo_le">{{this.vue_double[34].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[34].value}}</view>
								</view>
							</view>
						</view>
						<view class="clear"></view>
					</view>
					<view class="items" @click="change_item6()">
						<view class="detail">
							<view class="d_left">
								<image src="../../../static/img/chart/6.png" alt="">
							</view>
							<view class="d_right">
								<view class="d_right_total">
									<text class="le">{{this.total_data[5].name}}</text>
									<text class="ri">￥-{{this.vue_detail[5].value}}</text>
								</view>
								<view class="zhanbi">
									<view class="zhanbi_t rq_color" :style="{'width':proportion_arr_expenditure[5]*100/proportion_expenditure+'% !important'}"></view>
								</view>
								<view class="suggest">
									<image src="../../../static/img/chart/more.png" :class="{'transfer':item6==0}"></image>
								</view>
							</view>
							<view v-bind:class="{'item_show': item6==0, 'item_hide': !item6==0}">
								<view class="de_bo b_mar new_mar">
									<view class="de_bo_le">{{this.vue_double[35].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[35].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[36].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[36].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[37].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[37].value}}</view>
								</view>
							</view>
						</view>
						<view class="clear"></view>
					</view>
					<view class="items" @click="change_item7()">
						<view class="detail">
							<view class="d_left">
								<image src="../../../static/img/chart/7.png" alt="">
							</view>
							<view class="d_right">
								<view class="d_right_total">
									<text class="le">{{this.total_data[6].name}}</text>
									<text class="ri">￥-{{this.vue_detail[6].value}}</text>
								</view>
								<view class="zhanbi">
									<view class="zhanbi_t yf_color" :style="{'width':proportion_arr_expenditure[6]*100/proportion_expenditure+'% !important'}"></view>
								</view>
								<view class="suggest">
									<image src="../../../static/img/chart/more.png" :class="{'transfer':item7==0}"></image>
								</view>
							</view>
							<view v-bind:class="{'item_show': item7==0, 'item_hide': !item7==0}">
								<view class="de_bo b_mar new_mar">
									<view class="de_bo_le">{{this.vue_double[38].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[38].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[39].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[39].value}}</view>
								</view>
							</view>
						</view>
						<view class="clear"></view>
					</view>
					<view class="items" @click="change_item8()">
						<view class="detail">
							<view class="d_left">
								<image src="../../../static/img/chart/8.png" alt="">
							</view>
							<view class="d_right">
								<view class="d_right_total">
									<text class="le">{{this.total_data[7].name}}</text>
									<text class="ri">￥-{{this.vue_detail[7].value}}</text>
								</view>
								<view class="zhanbi">
									<view class="zhanbi_t xx_color" :style="{'width':proportion_arr_expenditure[7]*100/proportion_expenditure+'% !important'}"></view>
								</view>
								<view class="suggest">
									<image src="../../../static/img/chart/more.png" :class="{'transfer':item8==0}"></image>
								</view>
							</view>
							<view v-bind:class="{'item_show': item8==0, 'item_hide': !item8==0}">
								<view class="de_bo b_mar new_mar">
									<view class="de_bo_le">{{this.vue_double[40].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[40].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[41].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[41].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[42].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[42].value}}</view>
								</view>
							</view>
						</view>
						<view class="clear"></view>
					</view>
					<view class="items" @click="change_item9()">
						<view class="detail">
							<view class="d_left">
								<image src="../../../static/img/chart/9.png" alt="">
							</view>
							<view class="d_right">
								<view class="d_right_total">
									<text class="le">{{this.total_data[8].name}}</text>
									<text class="ri">￥-{{this.vue_detail[8].value}}</text>
								</view>
								<view class="zhanbi">
									<view class="zhanbi_t xxj_color" :style="{'width':proportion_arr_expenditure[8]*100/proportion_expenditure+'% !important'}"></view>
								</view>
								<view class="suggest">
									<image src="../../../static/img/chart/more.png" :class="{'transfer':item9==0}"></image>
								</view>
							</view>
							<view v-bind:class="{'item_show': item9==0, 'item_hide': !item9==0}">
								<view class="de_bo b_mar new_mar">
									<view class="de_bo_le">{{this.vue_double[43].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[43].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double[44].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double[44].value}}</view>
								</view>
							</view>
						</view>
						<view class="clear"></view>
					</view>
				</view>
				<view :class="{'my_cost':cost_or_income==0}">
					<view class="items" @click="change_item10()">
						<view class="detail">
							<view class="d_left">
								<image src="../../../static/img/chart/professional.png" alt="">
							</view>
							<view class="d_right">
								<view class="d_right_total">
									<text class="le">{{this.income[0].name}}</text>
									<text class="ri">￥{{this.vue_income_detail[0].value}}</text>
								</view>
								<view class="zhanbi">
									<view class="zhanbi_t sp_color" :style="{'width':proportion_arr_income[0]*100/proportion_income+'% !important'}"></view>
								</view>
								<view class="suggest">
									<image src="../../../static/img/chart/more.png" :class="{'transfer':item10==0}"></image>
								</view>
							</view>
							<view v-bind:class="{'item_show': item10==0, 'item_hide': !item10==0}">
								<view class="de_bo b_mar new_mar">
									<view class="de_bo_le">{{this.vue_double_income[0].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double_income[0].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double_income[1].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double_income[1].value}}</view>
								</view>
							</view>
						</view>
						<view class="clear"></view>
					</view>	
					<view class="items no_height" @click="change_item11()">
						<view class="detail">
							<view class="d_left">
								<image src="../../../static/img/chart/9.png" alt="">
							</view>
							<view class="d_right">
								<view class="d_right_total">
									<text class="le">{{this.vue_double_income[1].item}}</text>
									<text class="ri">￥{{this.vue_income_detail[1].value}}</text>
								</view>
								<view class="zhanbi">
									<view class="zhanbi_t xc_color" :style="{'width':proportion_arr_income[1]*100/proportion_income+'% !important'}"></view>
								</view>
								<view class="suggest">
									<image src="../../../static/img/chart/more.png" :class="{'transfer':item11==0}"></image>
								</view>
							</view>
							<view v-bind:class="{'item_show': item11==0, 'item_hide': !item11==0}">
								<view class="de_bo b_mar new_mar">
									<view class="de_bo_le">{{this.vue_double_income[2].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double_income[2].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double_income[3].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double_income[3].value}}</view>
								</view>
							</view>
						</view>
						<view class="clear"></view>
					</view>
					<view class="items no_height" @click="change_item12()">
						<view class="detail">
							<view class="d_left">
								<image src="../../../static/img/chart/9.png" alt="">
							</view>
							<view class="d_right">
								<view class="d_right_total">
									<text class="le">{{this.income[1].name}}</text>
									<text class="ri">￥{{this.vue_income_detail[2].value}}</text>
								</view>
								<view class="zhanbi">
									<view class="zhanbi_t xc_color" :style="{'width':proportion_arr_income[2]*100/proportion_income+'% !important'}"></view>
								</view>
								<view class="suggest">
									<image src="../../../static/img/chart/more.png" :class="{'transfer':item12==0}"></image>
								</view>
							</view>
							<view v-bind:class="{'item_show': item12==0, 'item_hide': !item12==0}">
								<view class="de_bo b_mar new_mar">
									<view class="de_bo_le">{{this.vue_double_income[4].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double_income[4].value}}</view>
								</view>
								<view class="de_bo">
									<view class="de_bo_le">{{this.vue_double_income[5].item}}</view>
									<view class="de_bo_ri">￥{{this.vue_double_income[5].value}}</view>
								</view>
							</view>
						</view>
						<view class="clear"></view>
					</view>
				</view>
				<view style="height: 1rem;width: 100%;">
					
				</view>
			</view>
			
		</view>
			<!-- 个性健康管理专家 -->
			
			<div class="healthy_admin">
				<view class="zhanwei">
					小合建议
				</view>
				
				<view class="ad_img">
					<image src="../../../static/img/chart/admin.png" alt="">
				</view>
				<view class="ad_txt">
					{{this.advice}}
				</view>
			</div>
			<!-- 界 -->
			<div class="bor"></div>
		</view>
		
		</view>
		
	</view>
	
</template> 

<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
var _self; //用于全局使用this
var canvaLineA = null; //uCharts实例
import jsonData from "./chart.json"

import day_date from '../../../static/json/day.json'
import month_data from '../../../static/json/month.json'
import year_date from "../../../static/json/year.json"
import zdy_date from '../../../static/json/zdy.json'
var my_chart_date = day_date
var json_income_data = my_chart_date.data.incomeData
var json_expenditure_data = my_chart_date.data.expenditureData

// 收入
// 纵坐标
var json_income_y_data = []
json_income_data.forEach(item => {json_income_y_data.push(item.account)})
// 横坐标
var json_income_x_data = []
json_income_data.forEach(item => {json_income_x_data.push(item.date)})

// 支出
// 纵坐标
var json_expenditure_y_data = []
json_expenditure_data.forEach(item => {json_expenditure_y_data.push(-1*(item.account))})
// 横坐标
var json_expenditure_x_data = []
json_expenditure_data.forEach(item => {json_expenditure_x_data.push(item.date)})


// 收入详细
var json_incomecat_data = my_chart_date.data.incomeCatData
// 支出详细
var json_expendcat_data =my_chart_date.data.expenditureCatData
var json_detail = [
	{name:"食品餐饮",value:"0"},{name:"购物消费",value:"0"},{name:"出行交通",value:"0"},{name:"休闲娱乐",value:"0"},
	{name:"服务缴费",value:"0"},{name:"学习教育",value:"0"},{name:"人情往来",value:"0"},{name:"健康医疗",value:"0"},
	{name:"金融理财",value:"0"},
]
var json_double = [
		{item:"中式餐食",value:"0"},
		{item:"西式餐食",value:"0"},
		{item:"日韩料理",value:"0"},
		{item:"饮料烟酒",value:"0"},
		{item:"水果零食",value:"0"},
		{item:"柴米油盐",value:"0"},
		{item:"生鲜食品",value:"0"},
		{item:"日用家居",value:"0"},
		{item:"个护美妆",value:"0"},
		{item:"数码电器",value:"0"},
		{item:"虚拟充值",value:"0"},
		{item:"服饰衣帽",value:"0"},
		{item:"母婴玩具",value:"0"},
		{item:"宠物用品",value:"0"},
		{item:"办公文具",value:"0"},
		{item:"专车打的",value:"0"},
		{item:"公共交通",value:"0"},
		{item:"动车高铁",value:"0"},
		{item:"飞机出行",value:"0"},
		{item:"停车过路",value:"0"},
		{item:"车辆加油",value:"0"},
		{item:"保养维修",value:"0"},
		{item:"旅游度假",value:"0"},
		{item:"电影演出",value:"0"},
		{item:"运动健身",value:"0"},
		{item:"美容美发",value:"0"},
		{item:"洗浴按摩",value:"0"},
		{item:"聚会玩乐",value:"0"},
		{item:"话费宽带",value:"0"},
		{item:"水电燃气",value:"0"},
		{item:"房租还贷",value:"0"},
		{item:"物业车位",value:"0"},
		{item:"家政清洁",value:"0"},
		{item:"快递跑腿",value:"0"},
		{item:"各类税费",value:"0"},
		{item:"学费支出",value:"0"},
		{item:"书报杂志",value:"0"},
		{item:"培训考试",value:"0"},
		{item:"礼物红包",value:"0"},
		{item:"请客做东",value:"0"},
		{item:"医院诊疗",value:"0"},
		{item:"药品制剂",value:"0"},
		{item:"保健器具",value:"0"},
		{item:"理财投资",value:"0"},
		{item:"金融保险",value:"0"}
]
var temporary = [
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
]
var j = 0
for(let index in json_expendcat_data){
	switch(json_expendcat_data[index].category){
		case "出行交通":
			json_detail[2].value = json_expendcat_data[index].account*-1
			break;
		case "购物消费":
			json_detail[1].value = json_expendcat_data[index].account*-1
			break;
		case "食品餐饮":
			json_detail[0].value = json_expendcat_data[index].account*-1
			break;
		case "休闲娱乐":
			json_detail[3].value = json_expendcat_data[index].account*-1
			break;
		case "服务缴费":
			json_detail[4].value = json_expendcat_data[index].account*-1
			break;
		case "健康医疗":
			json_detail[7].value = json_expendcat_data[index].account*-1
			break;
		case "金融理财":
			json_detail[8].value = json_expendcat_data[index].account*-1
			break;
		case "学习教育":
			json_detail[5].value = json_expendcat_data[index].account*-1
			break;
		case "人情往来":
			json_detail[6].value = json_expendcat_data[index].account*-1
			break;
	}
	var flag = 1
	for(let i in json_expendcat_data[index].subcategoryData){
		flag = 1;
		for(var xyy in temporary){
			if(json_expendcat_data[index].subcategoryData[i].subcategory == temporary[xyy].name){
				temporary[xyy].value = json_expendcat_data[index].subcategoryData[i].account+temporary[xyy].value
				flag = 0
				break
			}
		}
		if(!flag){
			continue
		}
		temporary[j].name = json_expendcat_data[index].subcategoryData[i].subcategory
		temporary[j++].value = json_expendcat_data[index].subcategoryData[i].account
	}
}
	
for(let i in temporary){
	for(let t in json_double){
		if(json_double[t].item == temporary[i].name){
			json_double[t].value = temporary[i].value
			break;
		}
	}
}
var json_double_income = [
	{"item":"工资奖金","value":0},
	{"item":"兼职外快","value":0},
	{"item":"理财收益","value":0},
	{"item":"保险理赔","value":0},
	{"item":"二手闲置","value":0},
	{"item":"报销补贴","value":0},
	{"item":"红包礼金","value":0}
]
var temporary_income = [
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
	{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
]
var jj = 0
var json_income_detail = [
	{name:"工作兼职",value:"0"},{name:"金融投资",value:"0"},{name:"其他收入",value:"0"}
]
for(let index in json_incomecat_data){
	switch(json_incomecat_data[index].category){
		case "其他收入":
			json_income_detail[2].value = json_incomecat_data[index].account
			break;
		case "金融投资":
			json_income_detail[1].value = json_incomecat_data[index].account
			break;
		case "工作兼职":
			json_income_detail[0].value = json_incomecat_data[index].account
			break;
	}
	
	var flag = 1
	for(let i in json_incomecat_data[index].subcategoryData){
		flag = 1;
		for(var xyy in temporary_income){
			if(json_incomecat_data[index].subcategoryData[i].subcategory == temporary_income[xyy].name){
				temporary_income[xyy].value = json_incomecat_data[index].subcategoryData[i].account+temporary_income[xyy].value
				flag = 0
				break
			}
		}
		if(!flag){
			continue
		}
		temporary_income[jj].name = json_incomecat_data[index].subcategoryData[i].subcategory
		temporary_income[jj++].value = json_incomecat_data[index].subcategoryData[i].account
	}
}
for(let i in temporary_income){
	switch(temporary_income[i].name){
		case "奖金":
		case "工资":
			json_double_income[0].value =parseFloat(temporary_income[i].value) +parseFloat(json_double_income[0].value)
			break;
		case "兼职":
			json_double_income[1].value =parseFloat(temporary_income[i].value) +parseFloat(json_double_income[1].value)
			break;
		case "理财":
			json_double_income[2].value =parseFloat(temporary_income[i].value) +parseFloat(json_double_income[2].value)
			break;
		case "保险理赔":
			json_double_income[3].value =parseFloat(temporary_income[i].value) +parseFloat(json_double_income[3].value)
			break;
		case "二手闲置":
			json_double_income[4].value =parseFloat(temporary_income[i].value) +parseFloat(json_double_income[4].value)
			break;
		case "报销补贴":
			json_double_income[5].value =parseFloat(temporary_income[i].value) +parseFloat(json_double_income[5].value)
			break;
		case "红包礼金":
			json_double_income[6].value =parseFloat(temporary_income[i].value) +parseFloat(json_double_income[6].value)
			break;
	}
}


var xData= jsonData.recent_x
var yData= jsonData.recent_y
var yData_in = jsonData.recent_y_income

var pieData = json_detail
var ech_type1 = 'line'
var ech_type2 = '40%'
export default {
	components: {
	    MxDatePicker
	},
	data() {
		return {
			advice:"12",
			rtj_height_1:3,
			rtj_height_2:4,
			date: '2023-01-01',
			date_1:'2023-01-10',
			// 占比
			proportion_arr_expenditure:[0.1,0,0,0,0,0,0,0,0],
			proportion_arr_income:[0,0,0],
			proportion_income:1,
			proportion_expenditure:1,
			
			// 收支总览
			// 收入 支出 预算
			json_totalIncome:my_chart_date.data.totalIncome,
			json_totalExpenditure:my_chart_date.data.totalExpenditure,
			json_totalBalance:my_chart_date.data.balance,
			
			// 支出
			vue_detail:[],
			// 收入
			vue_income_detail:[],
			
			vue_double:[],
			vue_double_income:[],
			
			in_page:1,
			// 折线图标题
			total_data:jsonData.r_total,
			pieData: this.vue_detail,
			pieName: [],
			myheight:125,
			// 折线图坐标
			sta:jsonData.statistics,
			xm:jsonData.xm,
			item:jsonData.recent_detail,
			income:jsonData.day_income,
			income_detail:jsonData.day_income_detail,
			detail_day_income:jsonData.day_income,
			detail_month_income:"",
			detail_year_income:"",
			detail_zdy_income:"",
			my_height:{"height":"1000px"},
			btn_type1:"primary",
			btn_type2:"default",
			btn_type3:"default",
			btn_type4:"default",
			// 导航按钮
			btn_ye_type:"primary",
			btn_nu_type:"default",
			// 支出收入
			my_type1_z:"primary",
			my_type2_s:"default",
			
			my_type_01:"primary",
			my_type_02:"default",
			myChart2: {},
			item1:1,item2:1,item3:1,item4:1,item5:1,
			item6:1,item7:1,item8:1,item9:1,item10:1,
			item11:1,item12:1,
			myChartStyle: { float: "left", width: "100%", height: "300px"} ,
			my_type1:"primary",
			my_type2:"default",
			my_type3:"primary",
			my_type4:"default",seen:true,
			isvisited:0,active: false,is_dis:0,
			n_is_dis:0,z_is_dis:0,
			cost_or_income:0,
			cost_and_income:0,
			cost_and_income1:0,
			select_month_item:2,
			select_year_item:1,
			data: { //数据
				
			},
			list: [],
			myChartStyle: { float: "left", width: "100%", height: "400px" },
			option : {
			  tooltip: {
			    trigger: 'axis'
			  },
			  grid:{
			        containLabel:true
			  },
			  legend: {
				  top:"5%",
			    data: ['支出', '收入'],
				z:-1
			  },
			  tooltip:{
				trigger:'axis',
					  
				  axisPointer:{
					  type:'cross'
				  },
				  extraCssText:'z-index:2'
			  },
			  calculable: true,
			  xAxis: [{type: 'category',data: json_income_x_data}],
			  yAxis: [ { type: 'value'}],
			  series: [
			    {name: '支出',type: 'line',data: json_income_y_data,smooth:true,symbolSize: 1},
			    {name: '收入',type: 'line',data: json_expenditure_y_data,smooth:true,symbolSize: 1}
			  ]
			},
			option1 : {
				legend: {
				  orient: "horization",
				  top: "80%",
				},
			    series : [{name: '访问来源',type: 'pie',radius: ech_type2,data:pieData}]
			},
			title: 'picker',
			            array: ['中国', '美国', '巴西', '日本'],
			            index: 0,
		};

	},
	computed: {
	        startDate() {
	            return this.getDate('start');
	        },
	        endDate() {
	            return this.getDate('end');
	        },
			startDate_1() {
			    return this.getDate('start');
			},
			endDate_1() {
			    return this.getDate('end');
			}
	    },
	onReady(){
		this.vue_detail = json_detail
		this.vue_income_detail = json_income_detail
		this.vue_double = json_double
		this.vue_double_income = json_double_income
		this.load_data(1,0,0,0)
		
	},
	mounted() {
	},
	onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			if(option.id == 123){
				this.y_change_date()
			}
		},
	onShow() {
		this.active = true;
		let self = this;
		var api = this.GLOBAL.baseApi
		
		this.get_advice(self,"day")
		
		this.r_change_date()
		
	},
	onHide() {
		this.active = false;
	},
	
	methods: {
		get_advice(that,index){
			var op = '/user/advice?ledgerId='+this.GLOBAL.selectledger+'&userId='+this.GLOBAL.userId+'&date='+index
			var api = this.GLOBAL.baseApi
			uni.request({
				url:api+op,
				success(res) {
					console.log(res.data.data)
					that.advice = res.data.data
				}
			})
		},
		load_data(index,month,year,day){
			var op = ''
			var ledgerid = this.GLOBAL.selectledger
			switch(index){
				case 1:
					op = '/ledger/chart?userId='+this.GLOBAL.userId+'&date=day&key&ledgerId='+ledgerid
					break;
				case 2:
					op = '/ledger/chart?userId='+this.GLOBAL.userId+'&date=month&key='+month+"&ledgerId="+ledgerid
					break;
				case 3:
					op = '/ledger/chart?userId='+this.GLOBAL.userId+'&date=year&key='+year+"&ledgerId="+ledgerid
					break;
				case 4:
					op = '/ledger/chart?userId='+this.GLOBAL.userId+'&date='+this.date+'to'+this.date_1+'&key=0'+"&ledgerId="+ledgerid
					break;
			}
			var api = this.GLOBAL.baseApi
			uni.request({
				url: api + op, //仅为示例，并非真实接口地址。
				success: (res) => {
					my_chart_date = res.data
					console.log(my_chart_date.data)
					// 收入 支出 预算
					this.json_totalIncome=my_chart_date.data.totalIncome
					this.json_totalExpenditure = my_chart_date.data.totalExpenditure
					this.json_totalBalance = my_chart_date.data.balance
					
					json_income_data = my_chart_date.data.incomeData
					json_expenditure_data = my_chart_date.data.expenditureData
					
					console.log(json_income_data)
					// 收入
					// 纵坐标
					json_income_y_data = []
					json_income_data.forEach(item => {json_income_y_data.push(item.account)})
					// 横坐标
					json_income_x_data = []
					json_income_data.forEach(item => {json_income_x_data.push(item.date)})
					
					// 支出
					// 纵坐标
					json_expenditure_y_data = []
					json_expenditure_data.forEach(item => {json_expenditure_y_data.push(-1*(item.account))})
					// 横坐标
					json_expenditure_x_data = []
					json_expenditure_data.forEach(item => {json_expenditure_x_data.push(item.date)})
					
					
					
					// 收入详细
					json_incomecat_data = my_chart_date.data.incomeCatData
					// 支出详细
					json_expendcat_data =my_chart_date.data.expenditureCatData
					json_detail = [
						{name:"食品餐饮",value:"0"},{name:"购物消费",value:"0"},{name:"出行交通",value:"0"},{name:"休闲娱乐",value:"0"},
						{name:"服务缴费",value:"0"},{name:"学习教育",value:"0"},{name:"人情往来",value:"0"},{name:"健康医疗",value:"0"},
						{name:"金融理财",value:"0"},
					]
					temporary = [
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
					]
					json_double = [
							{item:"中式餐食",value:"0"},
							{item:"西式餐食",value:"0"},
							{item:"日韩料理",value:"0"},
							{item:"饮料烟酒",value:"0"},
							{item:"水果零食",value:"0"},
							{item:"柴米油盐",value:"0"},
							{item:"生鲜食品",value:"0"},
							{item:"日用家居",value:"0"},
							{item:"个护美妆",value:"0"},
							{item:"数码电器",value:"0"},
							{item:"虚拟充值",value:"0"},
							{item:"服饰衣帽",value:"0"},
							{item:"母婴玩具",value:"0"},
							{item:"宠物用品",value:"0"},
							{item:"办公文具",value:"0"},
							{item:"专车打的",value:"0"},
							{item:"公共交通",value:"0"},
							{item:"动车高铁",value:"0"},
							{item:"飞机出行",value:"0"},
							{item:"停车过路",value:"0"},
							{item:"车辆加油",value:"0"},
							{item:"保养维修",value:"0"},
							{item:"旅游度假",value:"0"},
							{item:"电影演出",value:"0"},
							{item:"运动健身",value:"0"},
							{item:"美容美发",value:"0"},
							{item:"洗浴按摩",value:"0"},
							{item:"聚会玩乐",value:"0"},
							{item:"话费宽带",value:"0"},
							{item:"水电燃气",value:"0"},
							{item:"房租还贷",value:"0"},
							{item:"物业车位",value:"0"},
							{item:"家政清洁",value:"0"},
							{item:"快递跑腿",value:"0"},
							{item:"各类税费",value:"0"},
							{item:"学费支出",value:"0"},
							{item:"书报杂志",value:"0"},
							{item:"培训考试",value:"0"},
							{item:"礼物红包",value:"0"},
							{item:"请客做东",value:"0"},
							{item:"医院诊疗",value:"0"},
							{item:"药品制剂",value:"0"},
							{item:"保健器具",value:"0"},
							{item:"理财投资",value:"0"},
							{item:"金融保险",value:"0"}
					]
					var xxy = 0
					for(let index in json_expendcat_data){
						switch(json_expendcat_data[index].category){
							case "出行交通":
								json_detail[2].value = json_expendcat_data[index].account*-1
								break;
							case "购物消费":
								json_detail[1].value = json_expendcat_data[index].account*-1
								break;
							case "食品餐饮":
								json_detail[0].value = json_expendcat_data[index].account*-1
								break;
							case "休闲娱乐":
								json_detail[3].value = json_expendcat_data[index].account*-1
								break;
							case "服务缴费":
								json_detail[4].value = json_expendcat_data[index].account*-1
								break;
							case "健康医疗":
								json_detail[7].value = json_expendcat_data[index].account*-1
								break;
							case "金融理财":
								json_detail[8].value = json_expendcat_data[index].account*-1
								break;
							case "学习教育":
								json_detail[5].value = json_expendcat_data[index].account*-1
								break;
							case "人情往来":
								json_detail[6].value = json_expendcat_data[index].account*-1
								break;
						}
						var flag1 = 1
						for(var p in json_expendcat_data[index].subcategoryData){
							flag1 = 1
							for(var xyc in temporary){
								if(json_expendcat_data[index].subcategoryData[p].subcategory == temporary[xyc].name){
									temporary[xyc].value=json_expendcat_data[index].subcategoryData[p].account+temporary[xyc].value
									flag1 = 0
									break;
								}
							}
							if(!flag1){
								continue
							}
							temporary[xxy].name = json_expendcat_data[index].subcategoryData[p].subcategory
							temporary[xxy++].value = json_expendcat_data[index].subcategoryData[p].account
						}
					}
					for(let i in temporary){
						temporary[i].value = parseFloat(temporary[i].value).toFixed(2)
						for(let t in json_double){
							if(json_double[t].item == temporary[i].name){
								json_double[t].value = temporary[i].value
								break
							}
						}
					}
					this.vue_double = json_double
					json_double_income = [
						{"item":"工资奖金","value":0},
						{"item":"兼职外快","value":0},
						{"item":"理财收益","value":0},
						{"item":"保险理赔","value":0},
						{"item":"二手闲置","value":0},
						{"item":"报销补贴","value":0},
						{"item":"红包礼金","value":0}
					]
					temporary_income = [
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
						{name:"",value:""},{name:"",value:""},{name:"",value:""},{name:"",value:""},
					]
					jj = 0
					json_income_detail = [
						{name:"工作兼职",value:"0"},{name:"金融投资",value:"0"},{name:"其他收入",value:"0"}
					]
					for(let index in json_incomecat_data){
						switch(json_incomecat_data[index].category){
							case "其他收入":
								json_income_detail[2].value = json_incomecat_data[index].account
								break;
							case "金融投资":
								json_income_detail[1].value = json_incomecat_data[index].account
								break;
							case "工作兼职":
								json_income_detail[0].value = json_incomecat_data[index].account
								break;
						}
						
						flag = 1
						for(let i in json_incomecat_data[index].subcategoryData){
							flag = 1;
							for(var xyy in temporary_income){
								if(json_incomecat_data[index].subcategoryData[i].subcategory == temporary_income[xyy].name){
									temporary_income[xyy].value = json_incomecat_data[index].subcategoryData[i].account+temporary_income[xyy].value
									flag = 0
									break
								}
							}
							if(!flag){
								continue
							}
							temporary_income[jj].name = json_incomecat_data[index].subcategoryData[i].subcategory
							temporary_income[jj++].value = json_incomecat_data[index].subcategoryData[i].account
						}
					}
					for(let i in temporary_income){
						switch(temporary_income[i].name){
							case "奖金":
							case "工资":
								json_double_income[0].value =parseFloat(temporary_income[i].value) +parseFloat(json_double_income[0].value)
								break;
							case "兼职":
								json_double_income[1].value =parseFloat(temporary_income[i].value) +parseFloat(json_double_income[1].value)
								break;
							case "理财":
								json_double_income[2].value =parseFloat(temporary_income[i].value) +parseFloat(json_double_income[2].value)
								break;
							case "保险理赔":
								json_double_income[3].value =parseFloat(temporary_income[i].value) +parseFloat(json_double_income[3].value)
								break;
							case "二手闲置":
								json_double_income[4].value =parseFloat(temporary_income[i].value) +parseFloat(json_double_income[4].value)
								break;
							case "报销补贴":
								json_double_income[5].value =parseFloat(temporary_income[i].value) +parseFloat(json_double_income[5].value)
								break;
							case "红包礼金":
								json_double_income[6].value =parseFloat(temporary_income[i].value) +parseFloat(json_double_income[6].value)
								break;
						}
					}
					
					this.vue_double_income = json_double_income
					this.vue_detail = json_detail
					
					this.proportion_expenditure = 0
					this.proportion_income = 0
					
					for(let po in this.vue_detail){
						this.proportion_arr_expenditure[po] = parseFloat(this.vue_detail[po].value)
						this.proportion_expenditure = this.proportion_expenditure +parseFloat(this.vue_detail[po].value)
						
						if(this.proportion_expenditure<0.0000005)
						{
							this.proportion_expenditure = 1
						}
					}
					this.vue_income_detail = json_income_detail
					for(let po in this.vue_income_detail){
						this.proportion_arr_income[po] = parseFloat(this.vue_income_detail[po].value)
						this.proportion_income = this.proportion_income +parseFloat(this.vue_income_detail[po].value)
					}
					pieData = this.vue_detail
					this.json_switch_zx()
					this.switchbz()
				}
			});
			
		},
		
		// 重置展开项
		reset_item(){
			this.myheight = 140
			this.item1 = 1;this.item2 = 1;
			this.item3 = 1;this.item4 = 1;
			this.item5 = 1;this.item6 = 1;
			this.item7 = 1;this.item8 = 1;
			this.item9 = 1;this.item10 = 1;
			this.item11 = 1;this.item12 = 1;
			
		},
		
		change_month(index){
			if(index<4){
				this.select_month_item = index
				this.load_data(2,4-index,0,0)
				this.get_advice(this,4-index)
			}
			else{
				this.select_month_item = index
				this.load_data(2,index,0,0)
				this.get_advice(this,index)
			}
		},
		change_year(index){
			this.select_year_item = index
			this.load_data(3,0,2024-index,0)
			console.log(2024-index)
			this.get_advice(this,2024-index)
		},
		change(e) {
			this.single = e;
			console.log("-change事件:", e);
		},
		change_item1(){this.item1 = (this.item1+1)%2;
		if(this.item1 == 0) this.myheight=this.myheight+11
		else this.myheight=this.myheight-11},
		change_item2(){this.item2 = (this.item2+1)%2
		if(this.item2 == 0) this.myheight=this.myheight+13
		else this.myheight=this.myheight-13},
		change_item3(){this.item3 = (this.item3+1)%2
		if(this.item3 == 0) this.myheight=this.myheight+11
		else this.myheight=this.myheight-11},
		change_item4(){this.item4 = (this.item4+1)%2
		if(this.item4 == 0) this.myheight=this.myheight+10
		else this.myheight=this.myheight-10},
		change_item5(){this.item5 = (this.item5+1)%2
		if(this.item5 == 0) this.myheight=this.myheight+10
		else this.myheight=this.myheight-10},
		change_item6(){this.item6 = (this.item6+1)%2
		if(this.item6 == 0) this.myheight=this.myheight+4
		else this.myheight=this.myheight-4},
		change_item7(){this.item7 = (this.item7+1)%2
		if(this.item7 == 0) this.myheight=this.myheight+4
		else this.myheight=this.myheight-4},
		change_item8(){this.item8 = (this.item8+1)%2
		if(this.item8 == 0) this.myheight=this.myheight+4
		else this.myheight=this.myheight-4},
		change_item9(){this.item9 = (this.item9+1)%2
		if(this.item9 == 0) this.myheight=this.myheight+4
		else this.myheight=this.myheight-4},
		change_item10(){this.item10 = (this.item10+1)%2
		if(this.item10 == 0) this.myheight=this.myheight+5
		else this.myheight=this.myheight-5},
		change_item11(){this.item11 = (this.item11+1)%2
		if(this.item11 == 0) this.myheight=this.myheight+4
		else this.myheight=this.myheight-4},
		change_item12(){this.item12 = (this.item12+1)%2
		if(this.item12 == 0) this.myheight=this.myheight+4
		else this.myheight=this.myheight-4},
		json_switch_zz(){
			this.option ={tooltip: {trigger: 'axis'},
			grid:{
			      containLabel:true
			},
			  legend: {top:"5%",data: ['支出', '收入'],z:-1},
			  tooltip:{
			  				trigger:'axis',
			  				  axisPointer:{
			  					  type:'cross'
			  				  },
			  				  extraCssText:'z-index:2'
			  },
			  calculable: true,
			  xAxis: [{type: 'category',data: json_income_x_data}],
			  yAxis: [ { type: 'value'},],
			  series: [ {name: '收入',type: 'bar',data: json_income_y_data},
			    {name: '支出',type: 'bar',data: json_expenditure_y_data}]}
		},
		json_switch_zx(){
			this.option ={tooltip: {trigger: 'axis'},
			grid:{
			      containLabel:true
			},
			  legend: {top:"5%",data: ['支出', '收入']},
			  tooltip:{trigger:'axis',
			  				  axisPointer:{
			  					  type:'cross'
			  				  },
			  				  extraCssText:'z-index:2'
			  },
			  calculable: true,
			  xAxis: [{type: 'category',data: json_income_x_data}],
			  yAxis: [ { type: 'value'}],
			  series: [ {name: '收入',type: 'line',data: json_income_y_data,smooth:true},
			    {name: '支出',type: 'line',data: json_expenditure_y_data,smooth:true}]}
		},
		json_switch_yh(){
			this.option1={
				legend: {orient: "horization",top: "80%",},
				labelLine: {show: true, },
				label: {show: true, },
			    series : [{name: '访问来源',type: 'pie',radius: ["20%","40%"],data:pieData}]
			}
		},
		json_switch_bz(){
			this.option1={
				legend: {orient: "horization",top: "80%",},
				labelLine: {show: true, },
				label: {show: true, },
			    series : [{name: '访问来源',type: 'pie',radius: ["0%","40%"],data:pieData}]
			}
		},
		r_change_date(){
			this.reset_item()
			this.load_data(1,0,0,0)
			this.switchbz_z()
			this.my_type1="primary";
			this.my_type2="default";
			this.my_type3="primary";
			this.my_type4="default";
			this.in_page = 1
			this.cost_and_income1 = 0
			this.total_data = jsonData.r_total
			this.item = jsonData.recent_detail
			this.title = this.day_title
			this.cost_or_income = 0
			this.btn_type1 = this.btn_ye_type;
			this.btn_type2 = this.btn_nu_type;
			this.btn_type3 = this.btn_nu_type;
			this.btn_type4 = this.btn_nu_type;
			this.is_dis=0;
			this.n_is_dis=0;
			this.z_is_dis=0;
			this.rtj_height_1 = 3
			this.rtj_height_2 = 4
			this.myheight = 125
			this.get_advice(this,"day")
		},
		y_change_date(){
			this.reset_item()
			this.load_data(2,2,0,0)
			this.switchbz_z()
			this.in_page = 2
			this.cost_and_income1 = 0
			this.total_data = jsonData.y_total
			this.item = jsonData.month_detail
			this.cost_or_income = 0
			this.myheight = 128
			this.my_type1="primary";
			this.my_type2="default";
			this.my_type3="primary";
			this.my_type4="default";
			this.title = this.month_title
			this.btn_type1 = this.btn_nu_type
			this.btn_type2 = this.btn_ye_type
			this.btn_type3 = this.btn_nu_type
			this.btn_type4 = this.btn_nu_type
			this.is_dis=1;
			this.n_is_dis=0;
			this.z_is_dis=0;
			this.rtj_height_1 = 7
			this.rtj_height_2 = 7.5
			this.change_month(4)
			this.get_advice(this,4)
		},
		n_change_date(){
			this.reset_item()
			this.load_data(3,0,this.GLOBAL.year,0)
			this.switchbz_z()
			this.myheight = 128
			this.total_data = jsonData.n_total
			this.item = jsonData.year_detail
			this.cost_or_income = 0
			this.cost_and_income1 = 0
			this.my_type1="primary";
			this.my_type2="default";
			this.my_type3="primary";
			this.my_type4="default";
			this.in_page = 3;
			this.title = this.year_title
			this.btn_type1 = this.btn_nu_type
			this.btn_type2 = this.btn_nu_type
			this.btn_type3 = this.btn_ye_type
			this.btn_type4 = this.btn_nu_type
			this.is_dis=0;
			this.n_is_dis=1;
			this.z_is_dis=0;
			this.rtj_height_1 = 7
			this.rtj_height_2 = 7.5
			this.get_advice(this,2023)
		},
		z_change_date(){
			this.reset_item()
			my_chart_date = zdy_date
			this.load_data(4,0,0,0)
			this.switchbz_z()
			this.myheight = 130
			this.total_data = jsonData.z_total
			this.item = jsonData.zdy_detail
			this.cost_or_income = 0
			this.cost_and_income1 = 0
			this.my_type1="primary";
			this.my_type2="default";
			this.my_type3="primary";
			this.my_type4="default";
			this.in_page = 4;
			this.title = this.person_title
			this.btn_type1 = this.btn_nu_type
			this.btn_type2 = this.btn_nu_type
			this.btn_type3 = this.btn_nu_type
			this.btn_type4 = this.btn_ye_type
			this.is_dis=0;
			this.n_is_dis=0;
			this.z_is_dis=1;
			this.rtj_height_1 = 7
			this.rtj_height_2 = 7.5
			var str = this.date+"to"+this.date_1
			this.get_advice(this,str)
		},
		switchzz(){//折线转柱状
			this.json_switch_zz()
			this.my_type2="primary";
			this.my_type1="default";
		},
		switchzx(){//柱状转折线
			this.json_switch_zx()
			this.my_type1="primary";
			this.my_type2="default";
		},
		switchbz(){
			this.json_switch_bz()
			this.my_type3="primary";
			this.my_type4="default";
		},
		switchyh(){
			this.json_switch_yh()
			this.my_type4="primary";
			this.my_type3="default";
		},
		switchbz_z(){
			pieData = this.vue_detail
			this.cost_or_income = 0
			this.cost_and_income1 = 0
			this.json_switch_bz()
			this.myheight = 130
			this.my_type3="primary";
			this.my_type4="default";
		},
		switchyh_s(){
			pieData = this.vue_income_detail
			this.cost_and_income1 = 1
			this.cost_or_income = 1
			this.json_switch_bz()
			this.myheight = 105
			this.my_type3="primary";
			this.my_type4="default";
		},
		switch_date(){
			var date_2 = new Date(Date.parse(this.date.replace(/-/g,"/")))
			var date_3 = new Date(Date.parse(this.date_1.replace(/-/g,"/")))
			if(date_2>date_3){
				var str = this.date
				this.date = this.date_1
				this.date_1 = str
			}
			var str = this.date+"to"+this.date_1
			this.get_advice(this,str)
		},
		        bindDateChange: function(e) {
		            this.date = e.detail.value
					this.switch_date()
					this.load_data(4,0,0,0)
		        },
				bindDateChange_1: function(e) {
				    this.date_1 = e.detail.value
					this.switch_date()
					this.load_data(4,0,0,0)
				},
		        getDate(type) {
		            const date = new Date();
		            let year = date.getFullYear();
		            let month = date.getMonth() + 1;
		            let day = date.getDate();
		
		            if (type === 'start') {
		                year = year - 60;
		            } else if (type === 'end') {
		                year = year + 2;
		            }
		            month = month > 9 ? month : '0' + month;
		            day = day > 9 ? day : '0' + day;
		            return `${year}-${month}-${day}`;
		        },
	},
	
};
</script>

<script module="echarts" lang="renderjs">
    // 将npm方式下载的echarts插件引入进来
    import * as echarts from 'echarts';
 
    export default {
        mounted() {
            let that = this;
            // 通过nextTick异步画图
            this.$nextTick(() => {
                that.initEcharts()
            });
 
        },
        methods: {
            // 初始化
            initEcharts() {
                this.myChart = echarts.init(document.getElementById('echart'))
				this.myChart1 = echarts.init(document.getElementById('mychart2'))
                this.myChart.setOption(this.option);
				this.myChart1.setOption(this.option1)
                // 这里是用于窗口变化时的自适应，利用的是echarts自带的resize方法
                window.addEventListener('resize', () => {
                    this.myChart.resize()
					this.myChart1.resize()
                });
            },
 
            // 监听配置数据变化，并重新渲染
            updateEcharts(newValue, oldValue, ownerInstance, instance) {
                if (this.myChart) {
                    this.myChart.setOption(newValue);
                }
            },
			// 监听配置数据变化，并重新渲染
			updateEcharts_1(newValue, oldValue, ownerInstance, instance) {
			    if (this.myChart1) {
			        this.myChart1.setOption(newValue);
			    }
			},
        },
    }
</script>




<style lang="scss" scoped>
	.zhanwei{
		position: absolute;
		left: 3%;
		font-weight: 700;
		top: 1rem;
	}
	.special_txt{
		// left: 46% !important;
	}
	.special_img image{
		width: 1.7rem !important;
		height: 1.7rem !important;
	}
	.transfer{
		transform: rotateZ(180deg);
	}
	.suggest{
		width: 100%;
		height: 2rem;
		position: relative;
		
	}
	.suggest image{
		width: 1rem;
		height: 0.7rem;
		position: absolute;
		right: 0;
		top: 90%;
		transition: all 0.5s;
	}
	.item_show0{
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.item_show{
		background-color: lemonchiffon;
		display: block;
	}
	.item_hide{
		display: none;
	}
	// 
	.in_and_out{
		width: 100%;
		height: 4rem;
	}
	.sec_title{
		height: 50%;
		width: 100%;
		display: flex;
	}
	.item_see{
		width: 30%;
		height: 100%;
		position: relative;
		margin: 0 1rem 0;
	}
	.position_img{
		position: absolute;
		top: 50%;
		left: 10%;
		transform: translateY(-50%);
		image{
			width: 1.5rem;
			height: 1.5rem;
			vertical-align: middle;
		}
	}
	.position_text{
		position: absolute;
		left: 45%;
		top: 50%;
		transform: translateY(-50%);
		color: #333;
	}
	.sec_content{
		width: 100%;
		height: 28%;
		color: #333;
		display:flex;
	}
	// 
	.m-head {
		position: fixed;
		    color: #333333;
		    font-size: 24px;
		    font-weight: bold;
		    display: flex;
		    background-color: rgb(244,244,244);
		    z-index: 1000;
		    flex-direction: column;
		    width: 95%;
		    padding: 0 0.5rem;
	}
	.my_cost{
		display: none !important; 
	}
	.tomato1 {
	  width: 100%;
	  height: 100%;
	  .title {
	    background: #eee;
	    padding: 40px 0 100px;
	    text-align: center;
	  }
	
	  .pie-chart {
	    width: 100%;
	    height: 600px;
	  }
	}
	.pie-chart {
	  width: 100%;
	  height: 600px;
	}
	.uni-date {
	    width: 100%;
		height: 50px;
	    flex: 1;
	}
	.margin_fix{
		height: 50px;
	}
	.bagc{
		position: fixed;
		width: 97.5%;
		border-radius: 5px;
		background-color: #6accbe;
		z-index:10;
	}
	.select_color{
		color: darkcyan;
	}
	.r_content{
		display: block;
		z-index: 1002;
	}
	.dis_block{
		display: none;
	}
	.clear{
		clear: both;
	}
	*{
		margin: 0;
		padding: 0;
		
	}
	.total{
		font-size: 16px !important;
		font-weight: 400;
		height: 200rem;
		background-color:#F4F4F4;
	}
	.my_help_1{
		height: 7.5rem;
	}
	.my_position{
		background-color: rgb(244, 244, 244);
		padding-top: 1rem;
		margin-top: 1.9rem;
		height: 7rem;
		width: 100%;
		position: fixed;
		z-index: 1001;
	}
	.visited{
		
		transform: rotate(180deg);
	}
	.title{
		display: flex;
		vertical-align: middle;
		padding-left: 10px;
		height: 50px;
		line-height: 50px;
		padding-top: 5px;
		& text:nth-child(1){
			font-size: 20px;
		}
		.image{
			background-color: #6accbe;
			margin-top: 8px;
			margin-left: 5px;
			image{
				width: 30px;
				height: 30px;
				transition: all 1s; 
			}
		}
		.zs_title{
			background-color: #6accbe;
			text{
				font-size: 16px;
			}
			margin-left: 10px;
		}
		
		
	}
	// 日期
	.date_title{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.date_title li{
		width: 25%;
		text-align: center;
		text{
			display: inline-block;
			height: 30px;
			
		}
	}
	.date_visited{
		border-bottom: 1px solid #3e3e3e;
		color: darkcyan;
	}
	.contentn {
	  margin: 1rem 10px 0;
	  border-radius: 12px;
	  overflow: hidden;
	  overflow-x: auto;
	  white-space: nowrap;
	  background-color: #fff;
	}
	.contentn_xy{
		margin: 5px 10px 0;
		border-radius: 12px;
		white-space: nowrap;
		height: 40px;
		background-color: #fff;
	}
	.item {
	  display: inline-block;
	  margin: 10px;
	  width: 20%;
	  height: 100%;
	  text-align: center;
	  
	}
.total_see{
	margin: 2rem 10px 0;
	border-radius: 12px;
	background-color: #fff;
	color: rgb(100,100,100);
	.first_see{
		color: black;
		padding-top: 10px;
		text-align: center;
		font-weight: 700;
		
	}
	
}
.recent{
	position: relative;
	height: 30rem;
	margin: 20px 10px 0;
	border-radius: 12px;
	background-color: #fff;
	text-align: center;
	.recent_title{
		padding-top: 10px;
		font-weight: 700;
	}

}
.recong{
	position: relative;
	margin: 20px 10px 0;
	border-radius: 12px;
	background-color: #fff;
	text-align: center;
	.bz{
		image{
			width: 100%;
			height: 200px;
		}
	}
	.yh{
		image{
			width: 100%;
			height: 200px;
		}
	}
}

.detail{
	padding-left: 20px;
	padding-top: 10px;
	.b_mar{
		width: 80%;
		    float: right;
		    margin-right: 1rem;
	}
	.d_left{
		float: left;
		margin-top: 5px;
		image{
			width: 25px;
			height: 25px;
		}
	}
	.d_right{
		float: right;
		width: 80%;
		margin-right: 1rem;
		.d_right_total{
			width: 100%;
			font-weight: 400;
			.le{
				float: left;
			}
			.ri{
				float: right;
			}
		}
		.zhanbi{
			float: left;
			margin-top: 2px;
			width: 100%;
			height: 5px;
			border-radius: 30px;
			background-color:#dadada;
		}
		.zhanbi_t{
			width: 27%;
			height: 5px;
			border-radius: 30px;
			background-color:red;
		}
		.xc_color{
			width: 17%;
			background-color: #20ce2c;
		}
		.jj_color{
			width: 13%;
			background-color: #d4237a;
		}
		.jl_color{
			width: 28%;
			background-color: powderblue;
		}
		.yl_color{
			width: 7%;
			background-color: indianred		
		}
		.rq_color{
			width: 19%;
			background-color: deepskyblue;
		}
		.yf_color{
			width: 3%;
			background-color: salmon;
		}
		.xx_color{
			width: 5%;
			background-color: turquoise;
		}
		.xxj__color{
			background-color: hotpink;
		}
	}
}
.de_bo{
	float: right;
	width: 80%;
	color: #3e3e3e;
	margin-right: 1rem;
	.de_bo_le{
		float: left;
	}
	.de_bo_ri{
		float: right;
	}
	
}
.items{
	padding: 0 0.5rem 0;
	    margin: 1rem 0;
	    border-radius: 1rem;
		transition: all 1s;
}

// 个性管家
	.healthy_admin{
		margin: 20px 10px 0;
		height: 10rem;
		border-radius: 12px;
		background-color: #fff;
		position: relative;
		padding-top: 10px;
		image{
			width: 6rem;
			height: 6rem;
			margin-left: 2.3rem;
		}
		
	}
	.ad_img{
		position: absolute;
		left:0;
		top: 55%;
		transform: translateY(-50%);
	}
	.ad_txt{
		position: absolute;
		top: 55%;
		transform: translateY(-50%);
		right: 0;
		width: 55%;
		padding: 0.5rem 0.7rem;
	}
	.ad_image{
		float: left;
		width: 50%;
		text-align: center;
		
		image{
			width: 100px;
			height: 100px;
		}
	}
	.ad_sub{
		padding-top: 10px;
		width: 50%;
		float: left;
		text-align: center;
	}
	#text_col{
		width: 90%;
	}
	.bor{
		height: 10px;
	}
	.xc_color{
		background-color: #ddd540;
	}
.jj_color{
	color: mediumpurple;
}
.myheight1{
	height: 126rem;
}
.myheight2{
	height: 51rem;
}
.my_margin{
	height: 34px;
}













	// end
.content {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	/* #ifdef H5 */
	height: calc(100vh - var(--window-bottom) - var(--window-top));
	/* #endif */
	/* #ifndef H5 */
	height: 100vh;
	/* #endif */
	transition: opacity 0.3s;
	background: rgb(244, 244, 244);
	opacity: 0;
	&.active {
		opacity: 1;
	}
	.logo {
		position: relative;
		margin-top: -400upx;
		width: 200upx;
		height: 200upx;
		// z-index: -1;
		opacity: 0;
		transition: opacity 0.3s;
		&.active {
			opacity: 1;
		}
	}
}
.tabbar-box-wrap {
	position: absolute;
	width: 100%;
	padding: 50upx;
	box-sizing: border-box;
	bottom: 0;
	left: 0;
	.tabbar-box {
		position: relative;
		display: flex;
		width: 100%;
		background: #fff;
		border-radius: 20upx;
		padding: 15upx 20upx;
		box-sizing: border-box;
		z-index: 2;
		box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1);
		&:after {
			content: '';
			position: absolute;
			bottom: -16upx;
			left: 0;
			right: 0;
			margin: auto;
			width: 50upx;
			height: 50upx;
			transform: rotate(45deg);
			background: #fff;
			z-index: 1;
			box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1);
			border-radius: 2px;
		}
		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: #ffffff;
			border-radius: 20upx;
			z-index: 2;
		}
		.tabbar-box-item {
			// position: relative;
			width: 100%;
			z-index: 3;
			margin: 10upx;
			color: $uni-color-subtitle;
			text-align: center;
			font-size: $uni-font-size-base;
			.box-image {
				width: 100%;
				height: $uni-img-size-lg;
			}
		}
	}
}
li{
	list-style: none;
}
.charts {
		width: 100%;
		height: 500upx;
	}
	.recent_zx{
		text-align: center;
	}
.echart{
	height: 350px !important;
}
.my_maigin{
	height: 30px;
	width: 100%;
}
// 按钮位置调整
.improve{
	    position: absolute;
	    bottom: 4%;
	    left: 50%;
	    transform: translateX(-50%);
}
.fa_improve2{
	height: 400px;
	position: relative;
}
.tips{
	width: 60%;
	border-top: 1px solid black;
	font-size: 0.5rem;
	color: #666666;
	position: absolute;
	left: 16%;
}
.improve2{
	position: absolute;
	bottom: -16.5%;
	left: 50%;
	transform: translateX(-50%);
}
.select_item{
	color: #007aff;
}
.son_z{
	border-radius: 1rem;
	line-height: 3rem;
	height: 3rem;
	background-color: white;
	margin-top: 0.5rem;
}
.uni-list{
	
}
.uni_item{
	margin: 0 1rem;
	// border-bottom: 1px solid #ccc;
}
.uni-list-cell{
	display: flex;
	justify-content: center;
	align-items: center;
}
.contentn_z{
	margin: 1rem 0 0;
	width: 100%;
}
.switch_sz{
	z-index: 10;
	position: absolute;
	top: 7%;
	right: 2%;
}
.title_margin{
	height: 30px;
	width: 100%;
}
.adjust_it{
	width: 50px;
	height: 25px;
	font-size: 5px;
}
.zx_title{
	position: absolute;
	left: 3%;
	top: 7%;
	font-weight: 700;
}
.bz_title{
	position: absolute;
	left: 3%;
	top: 2.5%;
	font-weight: 700;
}
.my_container{
	position: relative;
}
.echarts {
        width: 100%;
        height: 400px;
    }
	.echarts2 {
	        width: 100%;
	        height: 400px;
	    }
	.index_margin{
		height: 3rem;
		width: 100%;
	}
	.new_mar{
		padding-top: 1rem;
	}
	.my_switch_btn{
		font-size: 0.8rem;
		width: 5rem;
		height: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
		.btn_01{
			border-radius: 0.5rem;
			width: 50%;
			height: 100%;
			line-height: 1.2rem;
			padding-left: 0.2rem;
			color:#333333;
		}
		.btn_02{
			border-radius: 0.5rem;
			width: 50%;
			height: 100%;
			line-height: 1.2rem;
			padding-right: 0.2rem;
			color: #333333;
		}
	}
	.select_it1{
		background-color: #007aff;
		color: #fff !important;
	}
	.select_it2{
		color: #333333;
	}
	.test{
	    text-align: center;
	    padding: 10px 0;
	}
	.button_select{
	    margin: 20upx;
	    font-size: 28upx;
	}
</style>
