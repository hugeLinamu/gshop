<template>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:loginWay}"  @click="loginWay=true">短信登录</a>
            <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
             <!-- 短信登陆 -->
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <!-- 获取验证码 -->
                <button 
                :disabled="!rightPhone" 
                class="get_verification" 
                @click.prevent="getCode"
                :class="{right_phone: rightPhone}"
                >{{ computeTime > 0 ? computeTime + 'S':'获取验证码'}}</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码"  v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
             <!-- 密码登录 -->
            <div :class="{on:!loginWay}">
              <section >
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="text" autocomplete  maxlength="8" placeholder="密码"  v-if="showPassword" v-model="pwd">
                  <input type="password" autocomplete  maxlength="8" placeholder="密码" v-if="!showPassword" v-model="pwd">
                  <div class="switch_button" :class="showPassword ? 'on' : 'off' " @click="showPassword=!showPassword">
                    <div class="switch_circle" :class="{right:showPassword}"></div>
                    <span class="switch_text">{{showPassword? 'abc' : '...'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <!-- 此图片不需要ajax请求 -->
                  <img class="get_verification" src="http://localhost:4000/captcha" @click="getCaptcha" alt="captcha" ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <!-- 回退 -->
        <a href="javascript:" class="go_back" @click="goBack">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
      <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"></AlertTip>
    </section>
</template>

<script> 
import { reqSendCode , reqPwdLogin ,reqSmsLogin } from '../../api/index.js'
import AlertTip from '../../components/AlertTip/AlertTip.vue'
export default {
    name:'Login', 
    components:{ AlertTip },
    data(){
      return {
        loginWay: true, // true 代表短信登陆, false 代表密码登陆
        computeTime: 0,
        showPassword: false, // 是否显示密码
        phone: '', // 手机号
        code: '', // 短信验证码
        name: '', // 用户名
        pwd: '', // 密码
        captcha: '', // 图形验证码
        showAlert: false, // 是否显示提示框
        alertText: '', // 提示框文本
      }
    },
    methods:{
      goBack(){
        this.$router.back()
      },
      // 异步获取短信验证码
      async getCode(){
       if(!this.intervalID){  // 如果没有定时器
        // 启动倒计时
       this.computeTime = 30
       this.intervalID = setInterval(()=>{
        this.computeTime --;
            if(this.computeTime<=0){
              clearInterval(this.intervalID)
            }
        },1000)

        // 发送ajax请求（向指定手机号发送验证短信） 
        const result = await reqSendCode(this.phone);
          if(result.code === 1){  // 不成功
            // 显示提示
              this.alertText = result.msg
              this.showAlert = true
            // 关闭计时器
            this.computeTime = 0
            clearInterval(this.intervalID)
          }else{
            // console.log('send Code succeed');
          }
       }
      },
      Alertshow(alertText) {
        this.alertShow = true
        this.alertText = alertText
      },

      // 发送ajax请求(请求后台向指定手机号发验证码短信)
      // async login(){
      //   let result
      //  // 前台表单验证
      //   const {loginWay , rightPhone ,code , pwd , captcha ,phone} = this
      //   if(loginWay){ // 短信登录
      //       if(!rightPhone){ // 手机号码不正确
      //       this.showAlert('请填写正确的手机号码')
      //       return
      //     }else if(!(/^\d{6}$/gi.test(code))){   // 验证码不正确
      //       this.showAlert('验证码必须是六位数')
      //       return
      //     }

      //     // 发送ajax请求短信登录
      //     result = await reqSmsLogin(phone , code)   

      //   } else {   // 密码登录
      //     if(!this.name){ // 用户名不正确
      //       this.showAlert('请填写正确的账号')
      //       return
      //     }else if(!pwd){  // 密码不正确
      //       this.showAlert('请填写正确的密码')
      //       return
      //     }else if(!captcha){ // 验证码不正确
      //       this.showAlert('请填写正确的验证码')
      //       return
      //     }
      //      // 发送ajax请求密码登录
      //     result = await reqPwdLogin({name:this.name,pwd,captcha})
      //   }

      //   // 停止计时
      //   if(this.computeTime) {
      //     this.computeTime = 0
      //     clearInterval(this.intervalId)
      //     this.intervalId = undefined
      //   }

      //   // 账号或密码登录  根据结果数据处理
      //   if( result){ // 成功
      //       console.log(123);
      //     }else {     // 失败
      //       this.alertText =result.msg
      //       this.showAlert = true
      //     }
      // },

        // 异步登陆
      async login () {
        let result
        // 前台表单验证
        if(this.loginWay) {  // 短信登陆
          const {rightPhone, phone, code} = this
          if(!rightPhone) {
            // 手机号不正确
            this.Alertshow('手机号不正确')
            return
          } else if(!/^\d{6}$/.test(code)) {
            // 验证必须是6位数字
            this.Alertshow('验证必须是6位数字')
            return
          }
          // 发送ajax请求短信登陆
          result = await reqSmsLogin(phone, code)

        } else {// 密码登陆
          const {name, pwd, captcha} = this
          if(!this.name) {
            // 用户名必须指定
            this.Alertshow('用户名必须指定')
            return
          } else if(!this.pwd) {
            // 密码必须指定
            this.Alertshow('密码必须指定')
            return
          } else if(!this.captcha) {
            // 验证码必须指定
            this.Alertshow('验证码必须指定')
            return
          }
          // 发送ajax请求密码登陆
          result = await reqPwdLogin({name, pwd, captcha})
        }

        // 停止计时
        if(this.computeTime) {
          this.computeTime = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }

        // 根据结果数据处理
        if(result.code===0) {
          const user = result.data
          // console.log(user);
          // 将user保存到vuex的state
          this.$store.dispatch('recordUserInfo', user)
          // 去个人中心界面
          this.$router.replace('/profile')
        } else {
          // 显示新的图片验证码
          this.getCaptcha()
          // 显示警告提示
          const msg = result.msg
          this.Alertshow(msg)
        }
      },

       // 关闭提示框
       closeTip(){
        this.alertText =''
        this.showAlert = false
       },
      
       // 异步获取图片验证码，不需要发送ajax请求， ajax请求才有跨域问题
       getCaptcha(){
        this.$refs.captcha.src='http://localhost:4000/captcha?time='+Date.now()
       }
    },
    computed:{
      rightPhone(){
        return /^1\d{10}$/.test(this.phone)
      },

    },
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color: black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)    
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>