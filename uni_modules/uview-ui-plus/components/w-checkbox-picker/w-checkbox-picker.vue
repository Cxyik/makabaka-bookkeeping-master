<template>
	<view class="u-checkbox-picker">
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
					<u-empty v-if="!getOptions.length" mode="data" text="暂无选项数据"
						:customStyle="{ height: '100%', background: '#FFFFFF' }" />
					<view class="checkbox-box" v-for='(item,index) in getOptions' :key='index'
						@click="checkboxClick(index)">
						<view class="checkbox-item">{{ item[labelName] }}</view>
						<view :class="item.checked ? 'checkbox-icon active' : 'checkbox-icon'">
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
				checkboxs: {}
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
			this.bindValue = this.value;
			this.bindOptions = this.options;
			this.getCheckboxs();
		},
		methods: {
			// 点击输入框弹出
			click() {
				if (!this.readonly) {
					this.show = true;
				}
			},
			// 点击确认选择
			confirm() {
				let checkboxs = [];
				for (let key in this.checkboxs) {
					checkboxs.push(this.checkboxs[key]);
				}
				this.bindValue = checkboxs.join(",");
				this.bindLabel = "";
				let arr = [];
				checkboxs.forEach(item => {
					this.bindOptions.forEach(option => {
						if (option.id == item) {
							arr.push(option[this.labelName]);
						}
					})
				})
				this.bindLabel = arr.join(",");
				this.$emit("input", this.bindValue);
				this.$emit("change", this.bindValue, this.bindLabel);
				this.show = false;
			},
			// 点击选项
			checkboxClick(index) {
				this.$set(this.getOptions[index], "checked", !this.getOptions[index].checked);
				if (this.getOptions[index].checked) {
					this.$set(this.checkboxs, this.getOptions[index].id, this.getOptions[index].id);
				} else {
					this.$delete(this.checkboxs, this.getOptions[index].id);
				}
			},
			// 获取checkboxs值
			getCheckboxs() {
				if (this.bindValue) {
					let checkboxs = this.bindValue.split(",");
					this.bindLabel = "";
					let arr = [];
					this.checkboxs = {};
					this.bindOptions.forEach(option => {
						this.$set(option, "checked", false);
					})
					checkboxs.forEach(item => {
						this.$set(this.checkboxs, item, item);
						this.bindOptions.forEach(option => {
							if (option[this.keyName] == item) {
								this.$set(option, "checked", true);
								arr.push(option[this.labelName]);
							}
						})
					})
					this.bindLabel = arr.join(",");
				}
			},
		},
		watch: {
			// 监听value变化
			value: {
				handler(val) {
					this.bindValue = val;
					this.$nextTick(() => {
						this.getCheckboxs();
					})
				},
				immediate: true
			},
			// 监听options变化
			options: {
				handler(val) {
					this.bindOptions = val;
					this.$nextTick(() => {
						this.getCheckboxs();
					})
				},
				immediate: true
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-checkbox-picker {
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

			.checkbox-box {
				border-bottom: 1px solid #dadbde;
				padding: 10px 0;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.checkbox-item {
					flex: 1;
					font-size: 14px !important;
				}

				.checkbox-icon {
					width: 16px;
					height: 16px;
					border-radius: 3px;
					border: 1px solid #c8c9cc;
					background-color: #FFFFFF;
				}

				.checkbox-icon.active {
					background-color: $u-primary;
					border-color: $u-primary;
				}
			}
		}
	}
</style>
