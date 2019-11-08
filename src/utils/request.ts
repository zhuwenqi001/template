import axios from 'axios'
import { Message } from 'element-ui'
import GLOBAL from '@/config/global'

// 创建一个axios实例
const service = axios.create({
  // baseURL: "", 存在一些场景，借口一部分调这个地址一部分调另外一个地址
  // timeout: 5000, // 超时时间
  withCredentials: true // 允许携带cookie
})

// 请求发送处理
service.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.status) {
      // 泰坦框架1.8.6以前。后端session过期
      // if (res.statusCode === '302') {
      //   window.location.reload()
      // }

      // 前后端分离，泰坦框架1.8.6以上。使用这段代码替换上面302 reload
      if (GLOBAL.gateway) {
        // 网关模式
        if (res.statusCode === '301') {
          window.location.href = res.message
          return
        }
      } else {
        // 普通模式模式
        const msg = res.message
        if (msg && msg.indexOf('oauth2/authorize') !== -1) {
          window.location.href = msg
          return
        }
      }

      // 请求异常
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      // 请求成功
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
