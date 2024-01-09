<template>
	<view class="w-address-picker">
		<view class="input-box" @click="click">
			<text
				:class="(bindLabel ? 'input-word text' : 'input-word placeholder') + ` align-${inputAlign}`">{{ bindLabel ? bindLabel : placeholder }}</text>
			<view class="input-icon">
				<u-icon :name="show ? 'arrow-up' : 'arrow-down'"></u-icon>
			</view>
		</view>
		<u-popup class="picker-box" :show="show" closeable mode="bottom" @close="show = false">
			<u-tabs v-if="show" :list="genTabsList" :current="tabsIndex" @change="tabsChange" ref="tabs"></u-tabs>
			<view class="area-box">
				<view class="u-flex" :class="{ 'change':isChange }">
					<scroll-view class="scroll-view" scroll-y>
						<u-cell v-for="(item,index) in provinces" :title="item.label" :key="index" :name="index"
							@click="provinceChange">
							<template slot="right-icon">
								<u-icon v-if="isChooseP && province === index" size="20" name="checkbox-mark"></u-icon>
							</template>
						</u-cell>
					</scroll-view>
					<scroll-view class="scroll-view" scroll-y v-if="isChooseP">
						<u-cell v-for="(item, index) in citys" :title="item.label" :key="index" :name="index"
							@click="cityChange">
							<template slot="right-icon">
								<u-icon v-if="isChooseC && city === index" size="20" name="checkbox-mark"></u-icon>
							</template>
						</u-cell>
					</scroll-view>
					<scroll-view class="scroll-view" scroll-y v-if="isChooseC">
						<u-cell v-for="(item,index) in areas" :title="item.label" :key="index" :name="index"
							@click="areaChange">
							<template slot="right-icon">
								<u-icon v-if="isChooseA && area === index" size="20" name="checkbox-mark"></u-icon>
							</template>
						</u-cell>
					</scroll-view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import props from './props.js';
	import provinces from "./data/province";
	import citys from "./data/city";
	import areas from "./data/area";
	export default {
		name: "w-address-picker",
		mixins: [props],
		data() {
			return {
				bindValue: "",
				bindLabel: "",
				show: false,
				tabsIndex: 0,
				province: 0,
				provinces: provinces,
				isChooseP: false,
				city: 0,
				citys: citys[0],
				isChooseC: false,
				area: 0,
				areas: areas[0][0],
				isChooseA: false
			}
		},
		computed: {
			isChange() {
				return this.tabsIndex > 1;
			},
			genTabsList() {
				let tabsList = [{
					name: "请选择"
				}];
				if (this.isChooseP) {
					tabsList[0]['name'] = this.provinces[this.province]['label'];
					tabsList[1] = {
						name: "请选择"
					};
				}
				if (this.isChooseC) {
					tabsList[1]['name'] = this.citys[this.city]['label'];
					tabsList[2] = {
						name: "请选择"
					};
				}
				if (this.isChooseA) {
					tabsList[2]['name'] = this.areas[this.area]['label'];
				}
				return tabsList;
			},
		},
		created() {
			this.init();
		},
		methods: {
			click() {
				if (!this.readonly) {
					this.show = true;
				}
			},
			init() {
				if (this.value.length == 3) {
					this.setProvince("", this.value[0]);
					this.setCity("", this.value[1]);
					this.setArea("", this.value[2]);
				} else if (this.label.length == 3) {
					this.setProvince(this.label[0], "");
					this.setCity(this.label[1], "");
					this.setArea(this.label[2], "");
				};
				if (this.value.length == 3 || this.label.length == 3) {
					let result = {};
					result.province = this.provinces[this.province];
					result.city = this.citys[this.city];
					result.area = this.areas[this.area];
					this.bindValue = [result.province.value, result.city.value, result.area.value];
					this.bindLabel = result.province.label + '-' + result.city.label + '-' + result.area.label;
				}
			},
			setProvince(label = "", value = "") {
				this.provinces.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.provinceChange({
							name: k
						});
					}
				})
			},
			setCity(label = "", value = "") {
				this.citys.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.cityChange({
							name: k
						});
					}
				})
			},
			setArea(label = "", value = "") {
				this.areas.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.isChooseA = true;
						this.area = k;
					}
				})
			},
			tabsChange(e) {
				this.tabsIndex = e.index;
			},
			provinceChange(e) {
				this.isChooseP = true;
				this.isChooseC = false;
				this.isChooseA = false;
				this.province = e.name;
				this.citys = citys[e.name];
				this.tabsIndex = 1;
			},
			cityChange(e) {
				this.isChooseC = true;
				this.isChooseA = false;
				this.city = e.name;
				if(!areas[this.province]) {
					let result = {};
					result.province = this.provinces[this.province];
					result.city = this.citys[this.city];
					result.area = {};
					this.bindValue = [result.province.value, result.city.value, ""];
					this.bindLabel = result.province.label + '-' + result.city.label;
					this.$emit("input", this.bindValue);
					this.$emit("update:value", this.bindValue);
					this.$emit("update:label", [result.province.label, result.city.label, ""]);
					this.$emit('change', this.bindValue, [result.province.label, result.city.label, ""]);
					this.show = false;
					return false;
				}
				this.areas = areas[this.province][e.name];
				this.tabsIndex = 2;
			},
			areaChange(e) {
				this.isChooseA = true;
				this.area = e.name;
				let result = {};
				result.province = this.provinces[this.province];
				result.city = this.citys[this.city];
				result.area = this.areas[this.area];
				this.bindValue = [result.province.value, result.city.value, result.area.value];
				this.bindLabel = result.province.label + '-' + result.city.label + '-' + result.area.label;
				this.$emit("input", this.bindValue);
				this.$emit("update:value", this.bindValue);
				this.$emit("update:label", [result.province.label, result.city.label, result.area.label]);
				this.$emit('change', this.bindValue, [result.province.label, result.city.label, result.area.label]);
				this.show = false;
			}
		},
		watch: {
			value: {
				handler(val) {
					this.init();
				}
			},
			label: {
				handler(val) {
					this.init();
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.w-address-picker {
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

		.area-box {
			width: 750rpx;
			height: 300px;

			.u-flex {
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				width: 1125rpx;
				height: 300px;
				transition: transform 0.3s ease-in-out 0s;
				transform: translateX(0);

				&.change {
					transform: translateX(-375rpx);
				}

				.scroll-view {
					width: 375rpx;
					height: 300px;
				}
			}
		}
	}
</style>
