<template>
	<view class="u-radio-picker">
		<view class="input-box" @click="click">
			<text
				:class="(bindLabel ? 'input-word text' : 'input-word placeholder') + ` align-${inputAlign}`">{{ bindLabel ? bindLabel : placeholder }}</text>
			<view class="input-icon">
				<u-icon :name="show ? 'arrow-up' : 'arrow-down'"></u-icon>
			</view>
		</view>
		<u-popup class="picker-box" :show="show" mode="bottom" @close="show = false">
			<view class='check-view'>
				<view class='check-btn'>
					<text class="cancel-btn" @click="show = false">取消</text>
					<text class="check-btn" @click="confirm">确定</text>
				</view>
				<view class="search">
					<u-search v-model="keyword" v-if="showSearch" placeholder="请输入关键字" height="34px" :showAction="false"
						:clearabled="false"></u-search>
				</view>
				<scroll-view class='scroll-view' scroll-y>
					<u-empty
						v-if="(!getOptions.length && !allowNull) || (getOptions.length == 1 && allowNull && !keyword)"
						mode="data" text="暂无选项数据" :customStyle="{ height: '100%', background: '#FFFFFF' }" />
					<view v-else class="radio-box" v-for='(item, index) in getOptions' :key='index'
						@click="radioClick(item[keyName])">
						<text class="radio-item u-line-1">{{ item[labelName] }}</text>
						<view :class="checked === item[keyName] ? 'radio-icon active' : 'radio-icon'">
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
		name: "u-radio-picker",
		mixins: [props],
		data() {
			return {
				bindValue: "",
				bindLabel: "",
				bindOptions: [],
				show: false,
				keyword: "",
				checked: ""
			}
		},
		computed: {
			// 筛选选项
			getOptions() {
				if (this.keyword) {
					return this.bindOptions.filter(item => {
						return item[this.labelName].indexOf(this.keyword) != -1;
					})
				} else {
					return this.bindOptions;
				}
			},
		},
		created() {
			this.bindValue = this.value === undefined || this.value === null ? "" : this.value;
			if (this.allowNull) {
				this.bindOptions = [{
					id: ""
				}];
				this.bindOptions[0][this.labelName] = "暂不选择";
			} else {
				this.bindOptions = [];
			}
			this.bindOptions.push(...this.options);
			this.checked = this.bindValue;
			this.getLabelValue();
		},
		methods: {
			// 点击输入框弹出
			click() {
				if (!this.readonly) {
					if (this.linkData !== null && !this.linkData) {
						uni.showToast({
							title: this.linkDataTips,
							icon: "none"
						})
						return false;
					}
					this.show = true;
				}
			},
			// 点击确认选择
			confirm() {
				this.bindValue = this.checked;
				this.getLabelValue();
				this.$emit("input", this.bindValue);
				this.$emit("change", this.bindValue, this.bindLabel);
				this.show = false;
			},
			// 点击选项
			radioClick(id) {
				this.checked = id;
			},
			// 获取label值
			getLabelValue() {
				if (this.checked !== "" && this.checked !== undefined && this.checked !== null) {
					this.bindOptions.forEach(item => {
						if (item[this.keyName] === this.bindValue) {
							this.bindLabel = item[this.labelName];
						}
					})
				} else {
					this.bindLabel = "";
				}
			}
		},
		watch: {
			value: {
				// 监听value变化
				handler(val) {
					this.$nextTick(() => {
						this.bindValue = val;
						this.radio = this.bindValue;
						this.checked = this.bindValue;
						this.getLabelValue();
					})
				},
				immediate: true
			},
			options: {
				// 监听options变化
				handler(val) {
					if (this.allowNull) {
						this.bindOptions = [{}];
						this.bindOptions[0][this.keyName] = "";
						this.bindOptions[0][this.labelName] = "暂不选择";
					} else {
						this.bindOptions = [];
					}
					this.bindOptions.push(...val);
					this.$nextTick(() => {
						this.radio = this.bindValue;
						this.checked = this.bindValue;
						this.getLabelValue();
					})
				},
				immediate: true
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-radio-picker {
		flex: 1;
		// #ifndef APP-PLUS-NVUE
		display: block;
		// #endif

		.input-box {
			flex: 1;
			display: flex;
			flex-direction: row;

			.input-word {
				flex: 1;
				font-size: 16px;
				line-height: 24px;
			}

			.align-left {
				text-align: left;
			}

			.align-center {
				text-align: center;
			}

			.align-right {
				text-align: right;
			}

			.text {
				color: inherit;
				line-height: 24px;
			}

			.placeholder {
				color: #C0C4CC;
			}

			.input-icon {
				width: 20px;
				display: flex;
				justify-content: flex-end;
				align-items: center;
			}
		}

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
