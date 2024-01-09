<template>
	<view class="w-datetime-picker">
		<view class="input-box" @click="click">
			<text
				:class="(bindValue ? 'input-word text' : 'input-word placeholder') + ` align-${inputAlign}`">{{ bindValue ? bindValue : placeholder }}</text>
			<view class="input-icon">
				<u-icon :name="show ? 'arrow-up' : 'arrow-down'"></u-icon>
			</view>
		</view>
		<!-- 日期时间选择器 -->
		<u-datetime-picker v-if="isShow" ref="datetimePicker" :formatter="formatter" :show="show" v-model="datetime"
			:mode="mode" @confirm="confirm" @cancel="show = false;" @close="show = false;" closeOnClickOverlay>
		</u-datetime-picker>
	</view>
</template>

<script>
	import props from './props.js';
	export default {
		name: "w-datetime-picker",
		mixins: [props],
		data() {
			return {
				bindValue: "",
				show: false,
				isShow: false,
				datetime: Number(new Date()),
			}
		},
		created() {
			this.bindValue = this.value;
			this.datetime = Number(new Date(this.bindValue)) || Number(new Date());
		},
		methods: {
			click() {
				if (!this.readonly) {
					this.isShow = true;
					setTimeout(() => {
						this.show = true;
					}, 100)
				}
			},
			confirm(e) {
				this.bindValue = this.mode == "date" ? uni.$u.timeFormat(e.value, 'yyyy-mm-dd') : uni.$u.timeFormat(e
					.value, 'yyyy-mm-dd hh:MM');
				this.$emit("input", this.bindValue);
				this.$emit("change", this.bindValue);
				this.show = false;
				setTimeout(() => {
					this.isShow = false;
				}, 300)
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				if (type === 'hour') {
					return `${value}时`
				}
				if (type === 'minute') {
					return `${value}分`
				}
				return value;
			},
		},
		watch: {
			value: {
				handler(val) {
					this.$nextTick(() => {
						this.bindValue = val;
					})
				},
				immediate: true
			},
		}
	}
</script>
<style lang="scss">
	.w-datetime-picker {
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
		
		.u-popup {
			position: absolute !important;
		}
	}
</style>
