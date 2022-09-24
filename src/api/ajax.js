// ajax 请求函数模块   返回值: promise 对象
import axios from 'axios'
// export default function ajax(url, data = {}, type = 'GET') {
//     // 二次封装ajax 返回值: promise对象(异步返回的数据是: response.data)
//       return new Promise((resolve, reject)=>{
//           // 执行 ajax请求
//           let p
//           if (type === 'GET') {
//               // 准备 url query参数数据
//               let dataStr = ''    // 数据拼接字符串
//               Object.keys(data).forEach(key => { // Object.keys(data) 得到的是一个key数组
//                   dataStr = key + '=' + data[key] + '&'
//               })
//               if (dataStr !== '') {
//                   dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
//                   url = url + '?' + dataStr
//               }
//               // 发送 get 请求
//               p = axios.get(url)
//           } else {
//               // 发送 post 请求
//               p = axios.post(url, data)
//           }
//           // return p
//           /*
//           *   不二次封装获得数据:
//           *   ajax12('http://localhost:5000/students').then( response => { response.data } )
//           *
//           *  */

//           // 二次封装ajax, await 之后直接得到response.data
//           p.then(response => {
//               // 成功了调用 resolve()
//               resolve(response.data)
//           }).catch(error => {
//               // 失败了调用 reject()
//               reject(error)
//           })
//       })
//   }


export default function ajax (url, data={}, type='GET') {

    return new Promise(function (resolve, reject) {
      // 执行异步ajax请求
      let promise
      if (type === 'GET') {
        // 准备url query参数数据
        let dataStr = '' //数据拼接字符串
        Object.keys(data).forEach(key => {
          dataStr += key + '=' + data[key] + '&'
        })
        if (dataStr !== '') {
          dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
          url = url + '?' + dataStr
        }
        // 发送get请求
        promise = axios.get(url)
      } else {
        // 发送post请求
        promise = axios.post(url, data)
      }
      promise.then(function (response) {
        // 成功了调用resolve()
        resolve(response.data)
      }).catch(function (error) {
        //失败了调用reject()
        reject(error)
      })
    })
  }