// 入口js
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueRouter from 'vue-router'
import store from './store/index.js'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Mint)




new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
