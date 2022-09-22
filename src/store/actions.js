import {
    RECEIVE_ADDRESS, RECEIVE_SHOPS, RECEIVE_CATEGORYS,
    RECEIVE_USER_INFO, RESET_USER_INFO, RECEIVE_INFO,
    RECEIVE_RATINGS, RECEIVE_GOODS, INCREASE, DECREASE , CLEAR_CART
} from './mutation-type'
import { reqAddress, reqFoodCategorys, reqShops, reqUserInfo, reqLogout, reqShopInfo, reqShopRatings, reqShopGoods } from '../api'

export default {
    // 异步获取地址
    async getAddress({ commit, state }) {
        const geohash = state.latitude + ',' + state.longitude
        let result = await reqAddress(geohash)
        commit(RECEIVE_ADDRESS, { address: result.data })
        // console.log(result.data);
    },

    // src="https://fuss10.elemecdn.com"
    // 异步获取分类
    async getCategorys({ commit }) {
        let result = await reqFoodCategorys()
        commit(RECEIVE_CATEGORYS, { categorys: result.data })
        // console.log(result.data);
    },

    // 异步获取商家列表
    async getShops({ commit, state }) {
        let result = await reqShops(state.latitude, state.longitude)
        commit(RECEIVE_SHOPS, { shops: result.data })
        // console.log(result.data);
    },

    //记录用户信息
    recordUserInfo({ commit }, userInfo) {
        commit(RECEIVE_USER_INFO, { userInfo })
    },

    // 获取用户信息, 自动登录
    async getUderInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code === 0) {
            commit(RECEIVE_USER_INFO, { userInfo: result.data })
        } else {
            console.log('请求用户信息失败了');
            console.log(result.msg);
        }

    },
    // 登出
    async logout({ commit }) {
        const result = await reqLogout()
        if (result.code === 0) {
            commit(RESET_USER_INFO)
        }
    },
    // 异步获取商家信息
    async getShopInfo({ commit }) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const info = result.data
            commit(RECEIVE_INFO, { info })
        }
    },

    // 异步获取商家评价列表
    async getShopRatings({ commit } , cb) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, { ratings })
            cb && cb()
        }
    },
    // 异步获取商家商品列表
    async getShopGoods({ commit }, callback) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, { goods })
            // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
            callback && callback()
        }
    },
    // 增加或减少食物
    updateFoodCount({ commit }, { isAdd, food }) {
        if (isAdd) {
            commit(INCREASE, {food} )
            console.log('INCREASE');
        } else {
            commit(DECREASE, {food} )
        }
    },

    // 清空购物车
    clearCart({commit}){
        commit(CLEAR_CART)
    }

}