<template>
  <div
    class="c-sidebar"
    :class="{ 'c-sidebar--collapse': isCollapse, 'c-sidebar--nav': navOpen }"
  >
    <div class="c-sidebar__header u-flex-center" v-if="!navOpen">
      <img class="c-sidebar__logo" :src="logo" v-if="!isCollapse" />
      <svg-icon icon-class="branch-1" v-else></svg-icon>
    </div>
    <div class="c-sidebar__body">
      <c-menu
        :menus="user.userInfo.menus[navCur]"
        :isCollapse="isCollapse"
        :defaultOpeneds="defaultOpeneds"
        :defaultActive="defaultActive"
        :uniqueOpened="uniqueOpened"
        @executeRouter="executeRouter"
      ></c-menu>
    </div>
    <div class="c-sidebar__footer u-flex-center" @click="toggleMenu">
      <svg-icon
        :icon-class="isCollapse ? 'arrowright-2' : 'arrowleft-2'"
      ></svg-icon>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace, Getter } from 'vuex-class'
import logo from '@/assets/layout/logo-new.svg'
import { CommonState, UserState } from '@/store/types'

const commonModule = namespace('common')
const userModule = namespace('user')
@Component({
  name: 'Sidebar'
})
export default class extends Vue {
  uniqueOpened = false // 是否允许只能打开一个菜单
  logo = logo // 侧边栏展开状态下的logo
  defaultActive = '' // 默认激活的导航
  defaultOpeneds = [] // 默认打开的菜单

  @userModule.State(state => state) user!: UserState
  @Getter navCur!: boolean
  @Getter navOpen!: boolean
  @Getter isCollapse!: boolean
}
</script>
<style lang="scss">
.c-sidebar {
  transition: width 0.28s;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  .c-sidebar__header {
    height: 50px;
  }
  .c-sidebar__logo {
    width: 120px;
  }
  .c-sidebar__body {
    width: 100%;
    overflow: auto;
    position: absolute;
    top: 50px;
  }
  .c-sidebar__footer {
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  ::-webkit-scrollbar {
    position: absolute;
    width: 10px;
    margin-left: -10px;
    -webkit-appearance: none;
  }
  ::-webkit-scrollbar-thumb {
    height: 50px;
    background-clip: content-box;
    border-color: transparent;
    border-style: solid;
    border-width: 1px 2px;
  }
}
.c-sidebar--collapse {
  .c-sidebar__body {
    top: 0;
  }
}
.c-sidebar--nav {
  .c-sidebar__body {
    top: 0;
  }
}
</style>
