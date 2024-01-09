export default {
	props: {
		// 绑定的value值
		value: {
			type: String,
			default: ""
		},
		// 提示信息
		placeholder: {
			type: String,
			default: ""
		},
		// 是否只读
		readonly: {
			type: Boolean,
			default: false
		},
		// 绑定的选项值
		options: {
			type: Array,
			default () {
				return ["选项一"]
			}
		},
		// 文本对齐方式
		inputAlign: {
			type: String,
			default: "right"
		},
		// 是否允许为空
		allowNull: {
			type: Boolean,
			default: true
		},
		// 是否显示搜索框
		showSearch: {
			type: Boolean,
			default: true
		}
	}
}
