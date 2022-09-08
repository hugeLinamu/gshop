<template>
    <!--
        使用 编程式路由导航: 作用: 不借助<router-link>实现路由跳转, 让路由跳转更灵活
        :class="{on:$route.path === item.path}"  对象写法：适合应用于 类名确定 决定加不加这个/些类名的情况,当为true时加 
        $route.path表示当前路由的路径,点击不同图标的时候,$route会变化
        @click="togo(`${item.path}`)"   点击更改路径
    -->

    <div class="footer_guide border-1px">
        <a href="javascript:;" 
        class="guide_item" 
        :class="{on: isCurrent(item.path) }"
        v-for="(item , index) in navName" 
        :key="index" 
        @click="goTo(`${item.path}`)"
        >
            <span class="item_icon">
                <i :class="`iconfont icon-${item.icon}`"></i>
            </span>
            <span>
                {{item.name}}
            </span>
        </a>
    </div>
</template>

<script>
export default {
    name:'FooterGuide',
    data() {
        return {
            navName:[
                {name:'外卖',icon:'waimai',path:'/msite'},
                {name:'搜索',icon:'sousuo',path:'/search'},
                {name:'订单',icon:'dingdan',path:'/order'},
                {name:'我的',icon:'geren',path:'/profile'}
            ]
        }
    },
    methods:{
        goTo(path){
            this.$router.replace(path)
        },
        isCurrent(path){
            //  当前item的路径 是否等于 请求的路径
            return  path === this.$route.path
        },
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
   @import "../../common/stylus/mixins.styl"
   .footer_guide
     top-border-1px(#e4e4e4)
     position fixed
     left 0
     right 0
     bottom 0
     width 100%
     height 50px
     z-index 100
     display flex
     background-color #fff
     .guide_item
       display flex
       flex:1
       text-align center
       flex-direction column
       align-items center
       margin 5px
       color #999
       &.on 
         color #02a774
       span 
         font-size 12px
         margin-top 2px
         margin-bottom 2px
         .iconfont
           font-size 22px
</style>