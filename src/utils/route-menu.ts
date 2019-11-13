/**
 * 菜单、路由工具类
 */
import { StaticRouteOptions, GetFloorRouteOptions } from '@/@types/router'
import { util } from '@/utils/util'

interface RouteArrOptions {
  id: number
  pId: number
  title?: string
  role?: string
  hidden?: boolean
  noMe?: boolean
  nav?: string
  name?: string
  path: string
  icon?: string
  subMenus: any[]
  isItem: boolean
}

type MenuTreeObj = Pick<RouteArrOptions, 'id' | 'subMenus'> | RouteArrOptions

export default class RouteMenu {
  private routeId: number
  routeArr: RouteArrOptions[]
  permissions: string[]
  addRouters: StaticRouteOptions[]

  constructor(routeId = 0, permissions = [], routeArr = [], addRouters = []) {
    this.routeId = routeId
    this.routeArr = routeArr
    this.permissions = permissions
    this.addRouters = addRouters
  }

  // 非网关
  // 整理所有的路由 prop
  preRouteArr(routes: StaticRouteOptions[], pId: number) {
    for (const v of routes) {
      v.meta = v.meta || {}
      this.routeId++
      this.routeArr.push({
        id: this.routeId,
        pId: pId,
        title: v.meta.label,
        role: v.meta.role,
        hidden: v.meta.hidden,
        noMe: v.meta.noMe,
        nav: v.meta.nav,
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

  // 递归向上，统计所有菜单权限
  fillPerms(role: string, routeArr: RouteArrOptions[]) {
    for (const v of routeArr) {
      if (role === v.role) {
        this.permissions.push(v.role)
        for (const v2 of routeArr) {
          if (v.pId === v2.id) {
            if (v2.role) {
              this.permissions.push(v2.role)
              this.fillPerms(v2.role, routeArr)
            }
          }
        }
      }
    }
  }

  // 传递,深层级数
  getFloor(treeData: StaticRouteOptions[], reference: boolean) {
    let max = 0
    const floor = 0
    treeData = reference ? treeData : util.deepCopy(treeData, [])
    function each(data: GetFloorRouteOptions[], floor: number) {
      data.forEach(e => {
        e.floor = floor
        if (floor > max) {
          max = floor
        }
        if (e.children && e.children.length > 0) {
          each(e.children, floor + 1)
        }
      })
    }
    each(treeData, floor + 1)
    return max
  }

  // 生成菜单树
  menuTree(
    obj: MenuTreeObj,
    routeArr: RouteArrOptions[],
    prop: string,
    navDefault: string
  ) {
    for (const v of routeArr) {
      if (
        v.pId === obj.id &&
        ((v.role && this.permissions.indexOf(v.role) >= 0) || !v.role) &&
        !v.hidden
      ) {
        if (prop === navDefault && (!v.nav || v.nav === navDefault)) {
          obj.subMenus.push(this.menuTree(v, routeArr, prop, navDefault))
        }
        if (prop !== navDefault && prop === v.nav) {
          obj.subMenus.push(this.menuTree(v, routeArr, prop, navDefault))
        }
      }
    }
    return obj
  }
}
