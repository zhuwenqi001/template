<template>
  <header id="c-header" class="c-header-nav">
    <div class="u-flex">
      <div class="c-header-nav__logo u-flex-center">
        <img class="c-header-nav__img" :src="logo" />
      </div>
      <el-tabs v-model="navCurrent" @tab-click="handleClick">
        <el-tab-pane
          v-for="item in navArr"
          :label="item.label"
          :name="item.prop"
          :key="item.prop"
        >
          {{ item.label }}
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="u-flex">
      <el-popover
        placement="bottom"
        popper-class="c-header-nav__user"
        trigger="hover"
      >
        <div class="user__info">
          <img
            class="user__avatar"
            :src="userInfo.avatar ? userInfo.avatar : avatar"
          />
          <div class="user__name">{{ userInfo.fullname }}</div>
          <div class="user__dept">{{ userInfo.deptName }}</div>
          <div class="user__date">{{ date }}</div>
        </div>
        <div class="user__svg u-flex-center" slot="reference">
          <svg-icon icon-class="yonghu"></svg-icon>
        </div>
      </el-popover>
      <div class="c-header-nav__line"></div>
      <div class="c-header-nav__logout u-flex-center" @click="logout">
        <svg-icon icon-class="guanbi"></svg-icon>
      </div>
    </div>
  </header>
</template>
<script>
import logo from '@/assets/layout/logo-new.svg'
import avatar from '@/assets/layout/header-avatar.jpg'
import { mapState, mapActions } from 'vuex'
import { util } from '@/utils/util'
import { clearSysSession, clearZtoSession } from '@/api/auth'
export default {
  name: 'CHeaderNav',
  data() {
    return {
      logo: logo,
      avatar: avatar,
      date: util.dateToStr(new Date(), 1),
      navCurrent: ''
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      navArr: state => state.common.navArr,
      navCur: state => state.common.navCur
    })
  },
  watch: {
    navCur() {
      this.navCurrent = this.navCur
    }
  },
  mounted() {
    this.navCurrent = this.navCur
  },
  methods: {
    ...mapActions({
      setNavCur: 'common/setNavCur'
    }),
    handleClick(tab) {
      this.setNavCur(tab.name)
    },
    logout() {
      this.$confirm('您确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(
        () => {
          // 泰坦框架1.8.6以前。退出方式
          // window.location.href = '/logout'

          // 前后端分离，后端泰坦框架1.8.6以上。退出方式
          clearZtoSession()
            .then()
            .finally(async () => {
              try {
                await clearSysSession()
                // 网关模式退出接口，会返回 res.statusCode '301'。不需要手动window.location.reload()
                if (!this.GLOBAL.gateway) window.location.reload()
              } catch (err) {
                if (!this.GLOBAL.gateway) window.location.reload()
              }
            })
        },
        () => {}
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.c-header-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .c-header-nav__img {
    width: 120px;
  }
  /deep/ .el-tabs__header {
    margin: 0 0 0 40px;
    line-height: 50px;
  }
  /deep/ .el-tabs__active-bar {
    bottom: inherit;
    top: 0;
  }
  /deep/ .el-tabs__nav-wrap::after {
    bottom: inherit;
    top: 0;
  }
  /deep/ .el-tabs__item {
    font-weight: 300; // padding: 0 30px;
  }
  /deep/ .el-tabs__content {
    display: none;
  }
  .c-header-nav__line {
    height: 26px;
    width: 1px;
    margin: 0 20px;
  }
  .user__svg {
    height: 26px;
    outline: none;
    .svg-icon {
      font-size: 21px;
      cursor: pointer;
    }
  }
  .c-header-nav__logout {
    margin-right: 20px;
    cursor: pointer;
    .svg-icon {
      font-size: 17px;
    }
  }
}
</style>
