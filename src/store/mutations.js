import {
    RECEIVE_ADDRESS, RECEIVE_SHOPS, RECEIVE_CATEGORYS,
    RECEIVE_USER_INFO, RESET_USER_INFO, RECEIVE_GOODS,
    RECEIVE_RATINGS, RECEIVE_INFO , INCREASE ,DECREASE , CLEAR_CART
} from './mutation-type'
import Vue from 'vue'
export default {
    // 获取地址
    [RECEIVE_ADDRESS](state, { address }) {
        state.address = address
    },
    // 获取商家列表
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
    // 获取分类
    [RECEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },
    // 获取用户信息
    [RECEIVE_USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo
    },
    // 重置用户信息
    [RESET_USER_INFO](state) {
        state.userInfo = {}
    },
    // 获取商家信息
    [RECEIVE_INFO](state, { info }) {
        state.info = info
    },
    // 获取评论
    [RECEIVE_RATINGS](state, { ratings }) {
        state.ratings = ratings
    },
    // 获取商品
    [RECEIVE_GOODS](state, { goods }) {
        state.goods = goods
    },
    // 增加
    [INCREASE](state, {food}) {
        if(!food.count) { // 第一次增加
          // food.count = 1  新增属性(没有数据绑定)
          /*  对象 属性名 属性值   */
          Vue.set(food, 'count', 1) // 让新增的属性也有数据绑定
          // 往购物车里面添加对应的食物
          state.cartFoods.push(food)
        } else {
            // count++ 的时候, 购物车也会对应加1 ,因为push的是一个对象
          food.count++
        }
      },
    // 减少
    [DECREASE](state , {food}){
        if(food.count){
             // count-- 的时候, 购物车也会对应加1 ,因为push的是一个对象
            food.count--;       
            // 当取消加购的时候, 把对应的食物从购物车中删除
             if(food.count === 0){
                state.cartFoods.splice( state.cartFoods.indexOf(food),1 )
            }
        }
    },

    // 清空购物车
    [CLEAR_CART]( state ){
        // 先让购物车里面的food.count 清零,不然购物车的
        state.cartFoods.forEach(food => {
            food.count = 0
        });
        // 购物车指向空对象
        state.cartFoods = []
    }

}