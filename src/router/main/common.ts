import { StaticRouteOption } from './type'

import Layout from '@/modules/layout/Layout.vue'
import Nest2 from '@/modules/layout/Nest2.vue'
// 基础数据路由
const common: StaticRouteOption = {
  path: '/',
  component: Layout,
  meta: {
    hidden: true
  },
  children: [
    {
      path: '',
      redirect: '/welcome',
      component: Nest2,
      meta: { noMe: true },
      children: [
        {
          path: 'welcome',
          name: 'Welcome',
          component: () => import('@/views/common/welcome.vue'),
          meta: {
            label: '首页', // 标题
            cache: true, // 是否缓存
            closable: false // 是否标签可关闭
          }
        }
      ]
    }
  ]
}
export default common
