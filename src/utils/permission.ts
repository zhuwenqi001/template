import { StaticRouteOptions } from '@/@types/router'

import store from '@/store/index'
/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
//  */
// export const checkPerm = function(value) {
//   if (value && value instanceof Array && value.length > 0) {
//     const roles = store.getters && store.getters.permissions
//     const permissionRoles = value

//     const hasPermission = roles.some(role => {
//       return permissionRoles.includes(role)
//     })

//     if (!hasPermission) {
//       return false
//     }
//     return true
//   } else {
//     console.error(`need roles! Like v-if="checkPerm['op_editor']"`)
//     return false
//   }
// }

function hasPermission(roles: string[], route: StaticRouteOptions) {
  if (route.meta && route.meta.role) {
    const _role = route.meta.role
    return roles.some(role => _role === role)
  }
  return true
}

export const filterAsyncRouter = function(
  asyncRouterMap: StaticRouteOptions[],
  roles: string[]
) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
