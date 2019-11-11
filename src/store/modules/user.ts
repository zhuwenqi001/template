import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from '../types'
import GLOBAL from '@/config/global'
import { getUserInfo } from '@/api/auth'

const Types = {
  SET_USER_INFO: 'SET_USER_INFO',
  SET_PERMISSIONS: 'SET_PERMISSIONS',
  SET_MENU: 'SET_MENU',
  SET_PERMISSIONS_GATEWAY: 'SET_PERMISSIONS_GATEWAY',
  SET_MENU_GATEWAY: 'SET_MENU_GATEWAY'
}

export interface State {
  userInfo: {
    [propName: string]: any
  }
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
  }
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
  }
  [Types.SET_PERMISSIONS]:(state, params)=>{
    
  }
}
const actions: ActionTree<State, RootState> = {
  // 获取用户信息
  async getUserInfo({ rootState, commit }) {
    const result = await getUserInfo()
    commit(Types.SET_USER_INFO, result)
    if (GLOBAL.gateway) {
    } else {
      // set Permission

      // set menu
    }
  }
}
