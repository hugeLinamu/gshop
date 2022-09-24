// 入口js
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueRouter from 'vue-router'
import store from './store/index.js'
// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
// 引入加载图片
import loading from './common/imgs/loading.gif' 
Vue.use(VueLazyload, {  // 内部产生了一个指令 lazy, 需要使用 v-lazy
  preLoad: 1.3,
  error: 'dist/error.png',
  loading,// 显示加载图片
  attempt: 1
})
// 引入外部组件
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
// 引入mock
import './mock/mockSever.js'
// 引入日期过滤器
import './filters'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Mint)




new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
