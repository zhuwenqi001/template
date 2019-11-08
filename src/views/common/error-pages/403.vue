<template>
  <error-page
    :bg-pic="errorPic"
    :error-pic="errorPic"
    error-msg="权限不足，请联系管理员开通！"
    link-msg="返回首页"
  ></error-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ErrorPage from '@/modules/components/error/ErrorPage.vue'
import bgPic from '@/assets/error/bg-403.png'
import errorPic from '@/assets/error/pic-403.png'

@Component({
  name: 'ErrorPage403',
  components: {
    ErrorPage
  }
})
export default class extends Vue {
  private bgPic = bgPic
  private errorPic = errorPic
}
</script>
