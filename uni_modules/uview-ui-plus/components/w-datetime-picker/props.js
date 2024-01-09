export default {
	props: {
		// 绑定的日期值
		value: {
			type: String,
			default: ""
		},
		// 提示信息
		placeholder: {
			type: String,
			default: "请选择日期"
		},
		// 是否只读
		readonly: {
			type: Boolean,
			default: false
		},
		// 模式（data: 日期，datetime: 日期时间）
		mode: {
			type: String,
			default: "datetime"
		},
		// 文本对齐方式
		inputAlign: {
			type: String,
			default: "right"
		}
	},
}