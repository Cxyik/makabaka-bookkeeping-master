import App from './App.vue'

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import global from './static/config.js'
Vue.prototype.GLOBAL = global
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})

const app = new Vue({
	...App
})
app.$mount()
                      
// #endif

// #ifdef VUE3
import {
	createSSRApp                             
} from 'vue'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts                                            
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})

export function createApp() {                                                                                                                                                                                                   
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif