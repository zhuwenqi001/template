import { GetterTree } from 'vuex'
import { RootState } from './types'
const getters: GetterTree<RootState, RootState> = {
  isCollapse: state => state.common.sidebar.opened,
  navOpen: state => state.common.navOpen,
  permissions: state => state.user.userInfo.permissions,
  deptName: state => state.user.userInfo.deptName,
  fullname: state => state.user.userInfo.fullname

  // getCacheViews: state => {
  //   const defaultArr = []
  //   for (const v of state.tagsView.defaultViews) {
  //     if (v.cache) {
  //       defaultArr.push(v.name)
  //     }
  //   }
  //   return [...defaultArr, ...state.tagsView.cachedViews]
  // },
  // getVisitedViews: state => {
  //   return [...state.tagsView.defaultViews, ...state.tagsView.visitedViews]
  // }
}
export default getters
