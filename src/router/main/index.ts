import GLOBAL from '@/config/global'
import common from './common'
// 根据权限访问的路由
const asyncRouter = []

if (!GLOBAL.gateway) {
  // 非网关模式，每个路由菜单在此累加
  asyncRouter.push(common)
  asyncRouter.push({ path: '*', redirect: '/404', meta: { hidden: true } })
}
export const asyncRouterMap = asyncRouter
