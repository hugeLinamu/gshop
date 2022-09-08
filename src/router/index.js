import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

// 声明使用插件
Vue.use(VueRouter)

// 解决重复点报错的问题
const originalreplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalreplace.call(this, location).catch(err => err)
}


export default new VueRouter({
    // 配置所有路由
    routes:[
        {
            path:'/msite',
            component:Msite,
            meta:{
                showFooter: true
            }
        },
        {
            path:'/search',
            component:Search,
            meta:{
                showFooter: true
            }
        },
        {
            path:'/order',
            component:Order,
            meta:{
                showFooter: true
            }
        },
        {
            path:'/profile',
            component:Profile,
            meta:{
                showFooter: true
            }
        },
        {
            path:'/login',
            component:Login
        },
        // 默认展示
        {
            path:'/',
            redirect:'/msite'
        },
    ]
})