import Layout from '@/modules/layout/Layout.vue'
import Nest2 from '@/modules/layout/Nest2.vue'
export default {
  path: '/demo-menu',
  component: Layout,
  icon: 'el-icon-edit',
  meta: { label: '示例菜单' },
  children: [
    {
      path: '',
      component: Nest2,
      meta: { noMe: true },
      children: [
        {
          path: 'two-menu',
          name: 'TwoMenu',
          icon: 'fa fa-database',
          component: () => import('@/views/demo-menu/two-menu.vue'),
          meta: {
            label: '二级菜单-1',
            cache: true,
            closable: true
          }
        },
        {
          path: 'two-menu2',
          name: 'TwoMenu2',
          icon: 'guanbi',
          component: () => import('@/views/demo-menu/two-menu2.vue'),
          meta: {
            label: '二级菜单-2',
            cache: true,
            closable: true
          }
        }
      ]
    },
    {
      path: 'three-sub',
      component: Nest2,
      meta: { label: '三级菜单' },
      children: [
        {
          path: 'three-menu',
          name: 'ThreeMenu',
          component: () =>
            import('@/views/demo-menu/three-menu/three-menu.vue'),
          meta: {
            label: '三级菜单-1',
            cache: true,
            closable: true
          }
        },
        {
          path: 'three-menu2',
          name: 'ThreeMenu2',
          component: () =>
            import('@/views/demo-menu/three-menu/three-menu2.vue'),
          meta: {
            label: '三级菜单-2',
            cache: true,
            closable: true
          }
        }
      ]
    }
  ]
}
