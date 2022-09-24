<template>
    <div class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
            <router-link class="header_search" slot="left" to="/search">
                <i class="iconfont icon-sousuo"></i>
            </router-link>
            <router-link class="header_login" slot="right" :to="userInfo._id? '/userinfo': '/login'" >
                <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
                <span class="header_login_text" v-else>
                    <i class="iconfont icon-person"></i>
                </span>
            </router-link>
        </HeaderTop>
        <!--首页分类导航-->
        <nav class="msite_nav border-1px">
            <div class="swiper-container" v-if="categorys.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(categoryList, index ) in categorysArr" :key="index">
                        <a href="javascript:" class="link_to_food" v-for="(catagory, index) in categoryList"
                            :key="index">
                            <div class="food_container"> 
                                <!-- 图片懒加载 -->
                                <img v-lazy='baseURL+catagory.image_url'>
                            </div>
                            <span>{{catagory.title}}</span>
                        </a>
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
            <img src="./images/msite_back.svg" alt="back" v-else>
        </nav>
        <!--首页附近商家-->
        <ShopList></ShopList>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css' // 注意这里的引入
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue';
import ShopList from '../../components/ShopList/ShopList.vue';
export default {
    name: 'Msite',
    components: { HeaderTop, ShopList },
    data() {
        return {
            baseURL: 'https://fuss10.elemecdn.com'
        }
    },
    mounted() {
        this.$store.dispatch('getCategorys');
        this.$store.dispatch('getShops');
    },
    computed: {
        ...mapState(['address', 'categorys','userInfo']),
        /*
            根据categorys一维数组生成一个二位数组
        */
        categorysArr() {
            let bigArr = []
            let smallArr = []
            const { categorys } = this
            categorys.forEach(item => {
                // 如果当前小数组已经满了, 创建一个新的
                if (smallArr.length === 8) {
                    smallArr = []
                }
                // 如果小数组是空的, 大数组保存小数组的地址
                if (smallArr.length === 0) {
                    bigArr.push(smallArr)
                }
                smallArr.push(item)
            })
            return bigArr
        }
    },
    watch: {
        categorys(value) {   // categorys 中有数据了,一开始是空的 , 如果直接new Swiper在异步更新界面之前就创建了Swiper实例对象
            // 一完成界面更新,立即调用此生命周期 , 此条语句需要卸载数据更新之后
            this.$nextTick(() => {  // 获取数据后,在异步更新界面之后,马上创建Swiper实例对象
                // 创建一个Swiper实例对象,来实现轮播图
                 new Swiper('.swiper-container', {
                    loop: true,
                    // direction: 'vertical', // 垂直切换选项
                    // 分页器
                    pagination: {
                        el: '.swiper-pagination',
                    },
                })
            })
        }
    }
}
</script>
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
        .msite  
          width 100%
          .msite_header
            background-color #02a774
            position fixed
            z-index 100
            left 0
            top 0
            width 100%
            height 45px
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
           .header_search
              position absolute
              left 15px
              top 50%
              transform translateY(-50%)
              width 10%
              height 50%
              .icon-sousuo
                font-size 25px
                color #fff
            .header_title
              position absolute
              top 50%
              left 50%
              transform translate(-50%, -50%)
              width 50%
              color #fff
              text-align center
              .header_title_text
                font-size 20px
                color #fff
                display block
            .header_login
              font-size 14px
              color #fff
              position absolute
              right 15px
              top 50%
              transform translateY(-50%)
              .header_login_text
                color #fff
</style>






