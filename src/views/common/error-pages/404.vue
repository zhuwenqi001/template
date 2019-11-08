<template>
  <error-page
    :bg-pic="errorPic"
    :error-pic="errorPic"
    error-msg="页面走丢了！"
    link-msg="返回首页"
  ></error-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ErrorPage from '@/modules/components/error/ErrorPage.vue'
import bgPic from '@/assets/error/bg-404.png'
import errorPic from '@/assets/error/pic-404.png'

@Component({
  name: 'ErrorPage404',
  components: {
    ErrorPage
  }
})
export default class extends Vue {
  private bgPic = bgPic
  private errorPic = errorPic
}
</script>
