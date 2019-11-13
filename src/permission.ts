import router from '@/router/index'
import store from '@/store/index'
import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress

  // 有权限数据。因为是动态添加的路由，目前的路由都是有权限访问。无权限的对应的菜单路由不存在，都跳到404
  if (store.getters.permissions && store.getters.permissions.length > 0) {
    // 导航栏开关
    if (to.meta.nav !== from.meta.nav) {
      // 切换顶部导航栏高亮
      // store.dispatch('common/setNavCur', to.meta.nav).then(() => {
      next()
      NProgress.done()
      // })
    } else {
      next()
      NProgress.done()
    }
  } else {
    store.dispatch('user/getUserInfo').then(addRouters => {
      // debugger
      // 生成可访问的路由表
      router.addRoutes(addRouters)
      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    })
  }
})
router.afterEach(() => {
  NProgress.done()
  // 路由完成后做些事情
})
