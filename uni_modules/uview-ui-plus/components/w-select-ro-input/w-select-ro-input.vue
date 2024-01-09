<template>
	<view class="w-select-ro-input">
		<!-- #ifndef APP-PLUS-NVUE -->
		<u-input :value="bindValue" border="none" :inputAlign="inputAlign" :placeholder="placeholder"
			:readonly="readonly" customStyle="height: 100%" @input="onInput">
			<template slot="suffix">
				<u-icon name="list-dot" size="20" @click="click"></u-icon>
			</template>
		</u-input>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS-NVUE -->
		<u--input :value="bindValue" border="none" :inputAlign="inputAlign" :placeholder="placeholder"
			:readonly="readonly" customStyle="height: 100%" @input="onInput">
			<template slot="suffix">
				<u-icon name="list-dot" size="20" @click="click"></u-icon>
			</template>
		</u--input>
		<!-- #endif -->
		<u-popup :show="show" mode="bottom" @close="show = false">
			<view class='check-view'>
				<view class='check-btn'>
					<span class="cancel-btn" @click="show = false">取消</span>
					<span class="check-btn" @click="confirm">确定</span>
				</view>
				<view class="search">
					<u-search v-model="keyword" v-if="showSearch" placeholder="请输入关键字" height="34px" :showAction="false"
						:clearabled="false"></u-search>
				</view>
				<scroll-view class='scroll-view' scroll-y="true">
					<u-empty
						v-if="(!getOptions.length && !allowNull) || (getOptions.length === 1 && allowNull && !keyword)"
						mode="data" text="暂无数据" :customStyle="{ height: '100%', background: '#FFFFFF' }" />
					<view v-else class="radio-box" v-for='(item,index) in getOptions' :key='index'
						@click="radioClick(item)">
						<view class="radio-item">{{ item }}</view>
						<view :class="radio == item ? 'radio-icon active' : 'radio-icon'">
							<u-icon name="checkbox-mark" color="#FFFFFF"></u-icon>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import props from './props.js';
	export default {
		name: "w-select-ro-input",
		mixins: [props],
		data() {
			return {
				bindValue: "",
				bindOptions: [],
				show: false,
				keyword: "",
				radio: ""
			}
		},
		created() {
			this.bindValue = this.value;
			if (!this.bindValue) {
				this.radio = "暂不选择";
			} else {
				this.radio = this.bindValue;
			}
			if (this.allowNull) {
				this.bindOptions[0] = "暂不选择";
			} else {
				this.bindOptions = [];
			}
			this.bindOptions.push(...this.options);
		},
		methods: {
			click() {
				if (!this.readonly) {
					this.show = true;
				}
			},
			confirm() {
				if (this.radio == "暂不选择") {
					this.bindValue = "";
				} else {
					this.bindValue = this.radio;
				}
				this.$emit("input", this.bindValue);
				this.$emit("change", this.bindValue);
				this.show = false;
			},
			radioClick(item) {
				this.radio = item;
			},
			onInput(value) {
				this.$emit("input", value);
			}
		},
		computed: {
			getOptions() {
				if (this.keyword) {
					return this.bindOptions.filter(item => {
						return item.indexOf(this.keyword) != -1;
					})
				} else {
					return this.bindOptions;
				}
			},
		},
		watch: {
			value: {
				handler(val) {
					this.bindValue = val;
					this.$nextTick(() => {
						if (!this.bindValue) {
							this.radio = "暂不选择";
						} else {
							this.radio = this.bindValue;
						}
					})
				},
				immediate: true
			},
			options: {
				handler(val) {
					if (this.allowNull) {
						this.bindOptions[0] = "暂不选择";
					} else {
						this.bindOptions = [];
					}
					this.bindOptions.push(...val);
					this.$nextTick(() => {
						if (!this.bindValue) {
							this.radio = "暂不选择";
						} else {
							this.radio = this.bindValue;
						}
					})
				},
				immediate: true
			}
		}
	}
</script>
<style scoped lang="scss">
	.w-select-ro-input {
		flex: 1;
		// #ifndef APP-PLUS-NVUE
		display: block;
		// #endif

		.check-btn {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.cancel-btn {
				font-size: 16px;
				color: #909193;
				padding: 10px 15px;
			}

			.check-btn {
				font-size: 16px;
				color: #3c9cff;
				padding: 10px 15px;
			}
		}

		.search {
			margin: 0 15px 10px;
		}

		.scroll-view {
			width: 750rpx;
			height: 250px;
			padding: 0 15px;
			// #ifndef APP-PLUS-NVUE
			box-sizing: border-box;
			// #endif

			.radio-box {
				border-bottom: 1px solid #dadbde;
				padding: 10px 0;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.radio-item {
					flex: 1;
					font-size: 14px !important;
				}

				.radio-icon {
					width: 16px;
					height: 16px;
					border-radius: 50%;
					border: 1px solid #c8c9cc;
					background-color: #FFFFFF;
				}

				.radio-icon.active {
					background-color: $u-primary;
					border-color: $u-primary;
				}
			}
		}
	}
</style>
