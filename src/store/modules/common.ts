import { MutationTree, ActionTree } from 'vuex'
import { RootState, CommonState as State } from '../types'

import router from '@/router/index'
import RouteMenu from '@/utils/route-menu'
import GLOBAL from '@/config/global'

const Types = {
  SET_SKIN: 'SET_SKIN',
  SET_NAV_CUR: 'SET_NAV_CUR',
  SET_NAV_OPEN: 'SET_NAV_OPEN',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR'
}
const state: State = {
  // 皮肤版本
  skin: 'v1',
  sidebar: {
    opened: true //左侧菜单默认展开
  },
  //开启导航菜单
  navOpen: GLOBAL.navOpen,
  // 导航菜单列表
  navArr: [
    {
      prop: 'default',
      label: '默认菜单'
    },
    {
      prop: 'test',
      label: '测试菜单'
    }
  ],
  navDefault: 'default', // 导航菜单默认选项
  navCur: 'default' // 导航菜单当前选项
}
const mutations: MutationTree<State> = {
  [Types.SET_SKIN](state, params) {
    state.skin = params
  },
  [Types.SET_NAV_CUR]: (state, params) => {
    state.navCur = params || state.navDefault
  },
  [Types.SET_NAV_OPEN]: state => {
    state.navOpen = !state.navOpen
  },
  [Types.TOGGLE_SIDEBAR]: state => {
    state.sidebar.opened = !state.sidebar.opened
  }
}
const actions: ActionTree<State, RootState> = {
  //添加详情页面
  addPageDetail({ rootState }, params) {
    // return new Promise(resolve => {
    //   const routes = []
    //   const obj = {}
    //   const rm = new RouteMenu()
    //   routes.push(rm.pageDetail(params, obj, 1, rootState.user.routeDeep))
    //   router.addRoutes(routes)
    //   resolve()
    // })
  },
  // 设置皮肤
  setSkin({ commit }, params) {
    return new Promise(resolve => {
      commit(Types.SET_SKIN, params)
      resolve()
    })
  },
  // 切换开启导航菜单
  setNavOpen({ commit }, params) {
    return new Promise(resolve => {
      commit(Types.SET_NAV_OPEN, params)
      resolve()
    })
  },
  // 设置当前导航菜单
  setNavCur({ commit }, params) {
    return new Promise(resolve => {
      commit(Types.SET_NAV_CUR, params)
      resolve()
    })
  },
  //左侧菜单展开切换
  toggleSideBar({ commit }) {
    commit(Types.TOGGLE_SIDEBAR)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
