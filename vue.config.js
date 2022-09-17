const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    // 开启代理服务器 (方式二)
    proxy:{
     '/api':{ // 匹配所有以'api' 开头的请求路径
       target:'http://localhost:4000', // 代理目标的基础路径
       pathRewrite:{'^/api':''},  // 去向4000端口请求的时候,把/aiguigu 去掉,只剩下 /student
        ws:true,                      // 用于支持websocket
       changeOrigin: true          // 欺骗服务器请求来自5000,实际上来自8080,用于控制请求头中的htst值
     }
    }
 }
})
