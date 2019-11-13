import request from '@/utils/request'
import * as env from '@/config/env.ts'
const HostName = env.HostName
// 后端自定义获取用户信息
export function getUserInfo() {
  return request({
    url: `${HostName}/getUserInfo`,
    method: 'get'
  })
}

// 后端自定义清除后端 session
export function clearSysSession() {
  return request({
    url: `${HostName}/logout`,
    method: 'get'
  })
}
// 清除sso session
export function clearZtoSession() {
  return request({
    url: 'https://connect.zto.com/session',
    method: 'delete'
  })
}
