<template>
  <header id="c-header" class="c-header">
    <div class="u-flex">
      <div class="c-header__date u-flex-center">{{ date }}</div>
      <div class="c-header__line"></div>
      <div class="c-header__content u-flex-center">
        {{ personInfo }}
      </div>
    </div>
    <div class="u-flex">
      <div class="c-header__logout" @click="logout">
        <i class="fa fa-sign-out" style="font-size:14px"></i>
        退出
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { UserState } from '@/store/types'

import { util } from '@/utils/util'
import { clearSysSession, clearZtoSession } from '@/api/auth'

@Component({
  name: 'CHeader'
})
export default class extends Vue {
  @Getter fullname!: string
  @Getter deptName!: string

  date = ''

  get personInfo() {
    return this.fullname + '-' + this.deptName
  }

  created() {
    this.date = util.getCurDateTimeWeek()
    setInterval(() => {
      this.date = util.getCurDateTimeWeek()
    }, 1000)
  }

  private logout() {
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
</script>
<style lang="scss" scoped>
.c-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .c-header__line {
    width: 1px;
    height: 16px;
  }
  .c-header__content {
    padding-left: 20px;
  }
  .c-header__logout {
    cursor: pointer;
    padding-right: 20px;
  }
}
</style>
