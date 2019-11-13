/**
 * 全局变量、系统配置。注册到vue里
 */
const mockLocal = false // 开关本地mock,调用真实接口时需要把它关了。mock分为两类1、本地mock（mockData.js） 2、接口mock(如网关提供的mock接口)
const gateway = false // 开关网关模式
const navOpen = false // 开关导航菜单
const frameLen = 5 // 默认缓存iframe domain最大个数的
const pagination = {
  pageSizes: [10, 25, 50, 100],
  pageSize: 25
}
const modalTime = 250 // 模态框间隔时间
// 101货代维护状态,
const cFilter = {}
const cArr = {}
const cols = {
  selection: 40,
  number: 60,
  op1: 80,
  op2: 100,
  op3: 125,
  op4: 160,
  huge: 270,
  larger: 160,
  big: 140,
  medium: 120,
  common: 100,
  small: 80,
  mini: 60
}
const fFormLabel = '75px'
const mFormLabel = '100px'
export default {
  mockLocal,
  gateway,
  navOpen,
  frameLen,
  pagination,
  modalTime,
  cFilter,
  cArr,
  cols,
  fFormLabel,
  mFormLabel
}
