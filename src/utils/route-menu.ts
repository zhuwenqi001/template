/**
 * 菜单、路由工具类
 */
import { StaticRouteOption } from '@/@types/router'

interface routeArrOptions {
  id: number
  pId: number
  title: string | undefined
  role: string | undefined
  hidden: boolean | undefined
  noMe: boolean | undefined
  nav: boolean | undefined
  name: string
  path: string
  icon: string
  subMenus: string[]
  isItem: boolean
}

export default class RouteMenu {
  private routeId: number
  permissions: string[]
  routeArr: any[]
  addRouters: any[]

  constructor(routeId = 0, permissions = [], routeArr = [], addRouters = []) {
    this.routeId = routeId
    this.permissions = permissions
    this.routeArr = routeArr
    this.addRouters = addRouters
  }

  // 非网关
  // 整理所有的路由 prop
  preRouteArr(routes: StaticRouteOption[], pId: number) {
    for (const v of routes) {
      this.routeId++
      this.routeArr.push({
        id: this.routeId,
        pId: pId,
        title: v.meta && v.meta.label,
        role: v.meta && v.meta.role,
        hidden: v.meta && v.meta.hidden,
        noMe: v.meta && v.meta.noMe,
        nav: v.meta && v.meta.nav,
        name: v.name,
        path: v.path,
        icon: v.icon,
        subMenus: [],
        isItem: !(v.children && v.children.length > 0)
      })
      if (v.children && v.children.length > 0) {
        this.preRouteArr(v.children, this.routeId)
      }
    }
  }
}
