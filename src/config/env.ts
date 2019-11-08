import GLOBAL from '@/config/global'

interface Property {
  HostName?: string
}
type EnvList = 'PROD' | 'PRE' | 'SIT' | 'TEST'
// Record<K,T> map the properties of a type to another type
type Url = Record<EnvList, string[]>
type Api = Record<EnvList, Property> & { DEV: Property }

// 域名
const URL: Url = {
  // 生产环境
  PROD: [],
  // 预发环境
  PRE: [],
  // 集成测试环境
  SIT: [],
  // 测试环境
  TEST: []
}

// 后台接口的域名
const API: Api = {
  // 生产环境
  PROD: {},
  // 预发环境
  PRE: {},
  // 集成测试环境
  SIT: {},
  // 测试环境
  TEST: {},
  // 开发环境
  DEV: {
    HostName: 'http://10.9.15.190:8080'
  }
}

let HostName = API.DEV.HostName || ''

function checkUrl(url: string) {
  return window.location.href.indexOf(url) === 0
}
// 根据域名为HostName重新赋值
Object.keys(URL).some(env => {
  const urls = URL[<EnvList>env]
  if (urls.length && urls.some(checkUrl)) {
    HostName = API[<EnvList>env].HostName || ''
    return true
  }
})

// 本地mockLocal时，为空字符串
HostName = GLOBAL.mockLocal ? '' : HostName

export { HostName }
