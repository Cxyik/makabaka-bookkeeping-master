<h1 align="center" style="margin: 30px 0 30px;font-weight: bold;font-size:40px;">uview-ui-plus</h1>
<h1 align="center">基于uView2.0封装的组件库</h1>

## 说明

uview-ui-plus是基于uView2.0封装的组件库，在uView2.0的基础上，提供更加方便的模板组件，支持H5，APP，APP-NVUE，微信小程序等应用。

## 组件列表

* [**w-radio-picker**](#w-radio-picker)：单项选择器
* [**w-checkbox-picker**](#w-checkbox-picker)：多项选择器
* [**w-datetime-picker**](#w-datetime-picker)：日期时间选择器
* [**w-select-or-input**](#w-select-or-input)：输入或选择组件
* [**w-address-picker**](#w-address-picker)：省市区三级联动选择组件

## 注意

使用uview-ui-plus前，你必须先安装uView2.0框架，具体安装步骤请参考[uView2.0文档](https://www.uviewui.com/)

## 快速上手

1、从插件市场导入`uview-ui-plus`插件

2、`pages.json`配置easycom规则(按需引入)

```js
// pages.json
{
    "easycom": {
        "^w-(.*)": "@/uni_modules/uview-ui-plus/components/w-$1/w-$1.vue"
    },
    // 此为本身已有的内容
    "pages": [
        // ......
    ]
}
```

## 使用方法

配置easycom规则后，自动按需引入，无需`import`组件，直接引用即可。

### <a name="w-radio-picker">w-radio-picker</a>

| 参数名          | 类型             | 默认值                    | 说明                                   |
|:------------:|:--------------:|:----------------------:|:------------------------------------:|
| value        | String, Number | ""                     | 绑定的id值                               |
| options      | Array          | [{id: 1, name: "选项一"}] | 选项列表数据                               |
| placeholder  | String         | "请选择"                  | placeholder提示信息                      |
| readonly     | Boolean        | false                  | 是否只读                                 |
| allowNull    | Boolean        | true                   | 是否显示暂不选择                             |
| inputAlign   | String         | right                  | 文本对齐方式(left,center,right)            |
| keyName      | String         | id                     | options对应的key字段名                     |
| labelName    | String         | name                   | options对应的label字段名                   |
| showSearch   | Boolean        | true                   | 是否开启搜索功能                             |
| linkData     | String, Number | null                   | 需要通过其它下拉关联查询时，将关联数据的value赋值给linkData |
| linkDataTips | String         | "请先选择关联查询数据"           | 需要关联的数据未选择时提示信息                      |
| @input       | 自定义事件          |                        | 返回选择的value值                          |
| @change      | 自定义事件          |                        | 返回选择的value和label值                    |

```html
<template>
    <!-- u-radio-picker为表单组件，结合u--form表单使用 -->
    <u--form labelWidth="100" labelPosition="left" :model="form" :rules="rules" ref="form">
        <u-form-item required label="用户名" prop="userId" borderBottom>
            <u-radio-picker v-model="form.userId" placeholder="请选择用户名" :options="optionsList" inputAlign="right" />
        </u-form-item>
    </u--form>
</template>
```

### <a name="w-checkbox-picker">w-checkbox-picker</a>

| 参数名         | 类型      | 默认值                    | 说明                        |
|:-----------:|:-------:|:----------------------:|:-------------------------:|
| value       | String  | ""                     | 绑定的value值，多个值用英文逗号隔开      |
| options     | Array   | [{id: 1, name: "选项一"}] | 选项列表数据                    |
| placeholder | String  | "请选择"                  | placeholder提示信息           |
| readonly    | Boolean | false                  | 是否只读                      |
| allowNull   | Boolean | true                   | 是否显示暂不选择                  |
| inputAlign  | String  | right                  | 文本对齐方式(left,center,right) |
| keyName     | String  | id                     | options对应的key字段名          |
| labelName   | String  | name                   | options对应的label字段名        |
| showSearch  | Boolean | true                   | 是否开启搜索功能                  |
| @input      | 自定义事件   |                        | 返回选择的value值               |
| @change     | 自定义事件   |                        | 返回选择的value和label值         |

```html
<template>
    <!-- u-checkbox-picker为表单组件，结合u--form表单使用 -->
    <u--form labelWidth="100" labelPosition="left" :model="form" :rules="rules" ref="form">
        <u-form-item required label="用户名" prop="userId" borderBottom>
            <u-checkbox-picker v-model="form.userId" placeholder="请选择用户名" :options="optionsList" inputAlign="right" />
        </u-form-item>
    </u--form>
</template>
```

### <a name="w-datetime-picker">w-datetime-picker</a>

| 参数名         | 类型      | 默认值      | 说明                          |
|:-----------:|:-------:|:--------:|:---------------------------:|
| value       | String  | ""       | 绑定的日期值                      |
| placeholder | String  | "请选择日期"  | placeholder提示信息             |
| readonly    | Boolean | false    | 是否只读                        |
| mode        | String  | datetime | 模式（data: 日期，datetime: 日期时间） |
| inputAlign  | String  | right    | 文本对齐方式(left,center,right)   |
| @input      | 自定义事件   |          | 返回选择的日期时间                   |
| @change     | 自定义事件   |          | 返回选择的日期时间                   |

```html
<template>
    <!-- w-datetime-picker为表单组件，结合u--form表单使用 -->
    <u--form labelWidth="100" labelPosition="left" :model="form" :rules="rules" ref="form">
        <u-form-item required label="开始时间" prop="beginDate" borderBottom>
            <w-datetime-picker v-model="form.beginDate" placeholder="请选择开始时间" mode="date" inputAlign="right" />
        </u-form-item>
    </u--form>
</template>
```

### <a name="w-select-or-input">w-select-or-input</a>

| 参数名         | 类型      | 默认值     | 说明                        |
|:-----------:|:-------:|:-------:|:-------------------------:|
| value       | String  | ""      | 绑定的value值                 |
| placeholder | String  | "请选择日期" | placeholder提示信息           |
| readonly    | Boolean | false   | 是否只读                      |
| options     | Array   | ["选项一"] | 选项列表数据                    |
| inputAlign  | String  | right   | 文本对齐方式(left,center,right) |
| allowNull   | Boolean | true    | 是否显示暂不选择                  |
| showSearch  | Boolean | true    | 是否开启搜索功能                  |
| @input      | 自定义事件   |         | 返回选择的value值               |
| @change     | 自定义事件   |         | 返回选择的value值               |

```html
<template>
    <!-- w-select-or-input为表单组件，结合u--form表单使用 -->
    <u--form labelWidth="100" labelPosition="left" :model="form" :rules="rules" ref="form">
        <u-form-item required label="所属公司" prop="orgName" borderBottom>
            <w-select-or-input v-model="form.orgName" placeholder="请选择所属公司" :options="orgList" inputAlign="right" />
        </u-form-item>
    </u--form>
</template>
```

### <a name="w-address-picker">w-address-picker</a>

| 参数名           | 类型      | 默认值     | 说明                                                                               |
|:-------------:|:-------:|:-------:|:--------------------------------------------------------------------------------:|
| value         | Array   | []      | 绑定的地址编码值，例：["330000", "330100", "330103"]<br />value和label同时传入时，value的优先级高于label |
| label         | Array   | []      | 绑定的地址文本值，例：["江西省", "宜春市", "万载县"]<br />value和label同时传入时，value的优先级高于label          |
| placeholder   | String  | "请选择日期" | placeholder提示信息                                                                  |
| readonly      | Boolean | false   | 是否只读                                                                             |
| inputAlign    | String  | right   | 文本对齐方式(left,center,right)                                                        |
| @input        | 自定义事件   |         | 返回选择的地址编码值                                                                       |
| @update:value | 自定义事件   |         | 返回选择的地址编码值                                                                       |
| @update:label | 自定义事件   |         | 返回选择的地址文本值                                                                       |
| @change       | 自定义事件   |         | 返回选择的地址编码值和文本值                                                                   |

```html
<template>
    <!-- w-address-picker为表单组件，结合u--form表单使用 -->
    <u--form labelWidth="100" labelPosition="left" :model="form" :rules="rules" ref="form">
        <u-form-item required label="省市区" prop="address" borderBottom>
            <!-- 注意，v-model默认是value的双向绑定，此处也可使用:value和@update:value实现双向绑定 -->
            <w-address-picker :value="form.addressCode" @update:value="form.addressCode=$event" :value="form.addressLabel" @update:value="form.addressLabel=$event" placeholder="请选择所属省市区" inputAlign="right" />
        </u-form-item>
    </u--form>
</template>
```
