<template>
  <div id="app">
    <router-view></router-view>
    <!-- 展不展示, 看当前路由的meta值 -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  created(){
    // 异步获取address方式一
    // this.$store.dispatch('getAddress')

    // 异步获取address方式二
    this.getAddress();

    this.getUderInfo()
  },
  methods:{
    // 异步获取address方式二
    ...mapActions(['getAddress','getUderInfo'])
    
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
