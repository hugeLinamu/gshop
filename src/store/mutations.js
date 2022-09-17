import {RECEIVE_ADDRESS,RECEIVE_SHOPS,RECEIVE_CATEGORYS, RECEIVE_USER_INFO , RESET_USER_INFO} from './mutation-type'


export default {
    // 获取地址
    [RECEIVE_ADDRESS](state,{address}){
        state.address = address
    },
    // 获取商家列表
    [RECEIVE_SHOPS](state,{shops}){
        state.shops = shops
    },
    // 获取分类
    [RECEIVE_CATEGORYS](state,{categorys}){
        state.categorys = categorys
    },

    // 获取用户信息
    [RECEIVE_USER_INFO](state , {userInfo}){
        state.userInfo = userInfo
    },

    [RESET_USER_INFO](state){
        state.userInfo = {}
    }

}