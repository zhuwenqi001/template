import request from '@/utils/request'
import * as env from '@/config/env.js'
const HostName = env.HostName
// 后端自定义获取用户信息
export function getUserInfo() {
  return request({
    url: `${HostName}/getUserInfo`,
    method: 'get'
  })
}
