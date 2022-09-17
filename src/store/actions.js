import { RECEIVE_ADDRESS, RECEIVE_SHOPS, RECEIVE_CATEGORYS, RECEIVE_USER_INFO , RESET_USER_INFO } from './mutation-type'
import { reqAddress, reqFoodCategorys, reqShops, reqUserInfo ,reqLogout} from '../api'


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

    // async getUserInfo(){
    //     let result = await reqUserInfo()
    //     commit(RECEIVE_USERINFO , {result})
    // },

    //记录用户信息
    recordUserInfo({commit}, userInfo) {
        commit(RECEIVE_USER_INFO, {userInfo})
    },  

    // 获取用户信息, 自动登录
    async getUderInfo({commit}){
        let result = await reqUserInfo();
        if(result.code === 0){
            commit(RECEIVE_USER_INFO, {userInfo:result.data})
        }else {
            console.log('请求用户信息失败了');
            console.log(result.msg);
        }

    },
   async logout({commit}){
        const result = await reqLogout()
        if(result.code === 0){
            commit(RESET_USER_INFO)
        }
    }
}