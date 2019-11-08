/**
 * Created by Administrator
 */

/**
* name:'router-name'             the name is used by <keep-alive> (must set!!!),对所有带二级菜单的路由来说必填项
* icon: 'svg-name'               路由前缀图标。可不传
* redirect                       重定向位置，非必填参数
* meta : {
    label:      string           标题
    cache:      boolean          是否缓存标签数据。true缓存标签
    closable:   boolean          标签是否可关闭。true可关闭标签
    role:       string           访问当前路由需要的权限。参数不存在时，不需要权限皆可访问
    hidden:     boolean          路由是否显示在菜单栏。true不显示  当父级设置不显示时，子菜单皆不显示。
    noMe        boolean          路由一二三级，是否显示在菜单列表。true不显示
    nav         string           路由对应的导航栏菜单，不传为默认导航菜单
    iframe      string           iframe引用页面,自定义key。同域名的可以使用一样的key
    iframeUrl   string           iframeUrl引用页面的后缀url路径
  }
**/
import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './constant'

Vue.use(Router)

export default new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
