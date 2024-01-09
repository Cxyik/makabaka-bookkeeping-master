export default {
	props: {
		// 绑定的id值
		value: {
			type: String,
			default: ""
		},
		// 提示信息
		placeholder: {
			type: String,
			default: "请选择"
		},
		// 是否只读
		readonly: {
			type: Boolean,
			default: false
		},
		// 选项列表数据
		options: {
			type: Array,
			default () {
				return [{
					id: "1",
					name: "选项一"
				}, {
					id: "2",
					name: "选项二"
				}, {
					id: "3",
					name: "选项三"
				}]
			}
		},
		// 输入框文本对齐方式
		inputAlign: {
			type: String,
			default: "right"
		},
		// key字段名
		keyName: {
			type: String,
			default: "id"
		},
		// label字段名
		labelName: {
			type: String,
			default: "name"
		},
		// 是否显示搜索框
		showSearch: {
			type: Boolean,
			default: true
		},
	}
}
