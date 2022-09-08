<template>
  <div id="app">
    <router-view></router-view>
    <!-- 展不展示, 看当前路由的meta值 -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">


</style>
