import { RouteConfig } from 'vue-router'

interface MetaConfig {
  // 菜单标题
  label?: string
  // 是否缓存标签数据 true缓存标签
  cache?: boolean
  // 标签是否可关闭 true可关闭标签
  closable?: boolean
  // 访问当前路由需要的权限。参数不存在时，不需要权限皆可访问
  role?: string
  // 路由是否显示在菜单栏。true不显示  当父级设置不显示时，子菜单皆不显示。
  hidden?: boolean
  // 路由一二三级，是否显示在菜单列表。true不显示
  noMe?: boolean
  // 路由对应的导航栏菜单，不传为默认导航菜单
  nav?: string
  // iframe引用页面,自定义key。同域名的可以使用一样的key
  iframe?: string
  // iframeUrl引用页面的后缀url路径
  iframeUrl?: String
}

export interface StaticRouteOption extends RouteConfig {
  icon?: string
  meta?: MetaConfig
}
