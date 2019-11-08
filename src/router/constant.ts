import { RouteConfig } from 'vue-router'
// 通用页面
export const constantRouterMap: RouteConfig[] = [
  {
    path: '/403', // 无权限页面
    component: () => import('@/views/common/error-pages/403.vue')
  },
  {
    path: '/404', // 404页面
    component: () => import('@/views/common/error-pages/404.vue')
  },
  {
    path: '/500', // 服务器错误
    component: () => import('@/views/common/error-pages/500.vue')
  }
]
