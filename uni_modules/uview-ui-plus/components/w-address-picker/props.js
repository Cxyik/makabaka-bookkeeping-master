export default {
	props: {
		// 绑定的地址编码值，可传类似["330000", "330100", "330103"]
		value: {
			type: Array,
			default: () => {
				return [];
			}
		},
		// 绑定的地址label值，可传类似["河北省", "秦皇岛市", "北戴河区"]
		label: {
			type: Array,
			default: () => {
				return [];
			}
		},
		// 提示信息
		placeholder: {
			type: String,
			default: "请选择地址"
		},
		// 是否只读
		readonly: {
			type: Boolean,
			default: false
		},
		// 文本对齐方式
		inputAlign: {
			type: String,
			default: "right"
		}
	}
}