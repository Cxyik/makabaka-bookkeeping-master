export default {
	props: {
		// 绑定的id值
		value: {
			type: [String, Number],
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
		// 是否允许为空
		allowNull: {
			type: Boolean,
			default: true
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
		// 关联查询的数据
		linkData: {
			type: [String, Number],
			default: null
		},
		// 关联查询数据提示
		linkDataTips: {
			type: String,
			default: "请先选择关联查询数据"
		}
	}
}
