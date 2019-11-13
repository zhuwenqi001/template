import { MutationTree, ActionTree } from 'vuex'
import { RootState, UserState as State } from '../types'

import GLOBAL from '@/config/global'
import { getUserInfo } from '@/api/auth'
import { asyncRouterMap } from '@/router/main/index'
import RouteMenu from '@/utils/route-menu'
import { filterAsyncRouter } from '@/utils/permission' // 权限判断函数

const rm = new RouteMenu()
const Types = {
  SET_USER_INFO: 'SET_USER_INFO',
  SET_PERMISSIONS: 'SET_PERMISSIONS',
  SET_MENU: 'SET_MENU',
  SET_PERMISSIONS_GATEWAY: 'SET_PERMISSIONS_GATEWAY',
  SET_MENU_GATEWAY: 'SET_MENU_GATEWAY'
}

const state: State = {
  userInfo: {
    avatar: '',
    certLevel: '',
    deptCode: '',
    deptId: '',
    deptName: '',
    fullname: '',
    moodMessage: '',
    nickname: '',
    nodeCode: '',
    nodeId: '',
    nodeName: '',
    openid: '',
    permissions: [],
    menus: {
      default: [],
      test: []
    }
  },
  routeDeep: 2 // 路由的深度
}

const mutations: MutationTree<State> = {
  [Types.SET_USER_INFO]: (state, params) => {
    state.userInfo.avatar = params.avatar
    state.userInfo.certLevel = params.cert_level
    state.userInfo.deptCode = params.dept_code
    state.userInfo.deptId = params.dept_id
    state.userInfo.deptName = params.dept_name
    state.userInfo.fullname = params.fullname
    state.userInfo.moodMessage = params.mood_message
    state.userInfo.nickname = params.nickname
    state.userInfo.nodeCode = params.node_code
    state.userInfo.nodeId = params.node_id
    state.userInfo.nodeName = params.node_name
    state.userInfo.openid = params.openid
  },
  [Types.SET_PERMISSIONS]: (state, params: string[]) => {
    rm.preRouteArr(asyncRouterMap, 0)
    for (const v of params) {
      rm.fillPerms(v, rm.routeArr)
    }
    for (const v2 of params) {
      rm.permissions.push(v2)
    }
    rm.permissions = Array.from(new Set([...rm.permissions]))
    state.userInfo.permissions = rm.permissions
    rm.addRouters = filterAsyncRouter(asyncRouterMap, rm.permissions)
    let routeDeep = rm.getFloor(rm.addRouters, false)
    routeDeep = routeDeep === 1 ? 2 : routeDeep
    state.routeDeep = routeDeep
  },
  [Types.SET_MENU]: (state, rootState: RootState) => {
    for (const v of rootState.common.navArr) {
      const menuObj = { id: 0, subMenus: [] }
      rm.menuTree(menuObj, rm.routeArr, v.prop, rootState.common.navDefault)
      state.userInfo.menus[v.prop] = menuObj.subMenus
    }
  }
}
const actions: ActionTree<State, RootState> = {
  // 获取用户信息
  async getUserInfo({ rootState, commit }) {
    const { result } = await getUserInfo()
    commit(Types.SET_USER_INFO, result)
    if (GLOBAL.gateway) {
      console.log(1)
    } else {
      // set Permission
      commit(Types.SET_PERMISSIONS, result.permissions)
      // set menu
      commit(Types.SET_MENU, rootState)
    }
    return rm.addRouters
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
