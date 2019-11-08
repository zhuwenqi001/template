<template>
  <div class="c-error">
    <div class="c-error__bg"><img :src="bgPic" alt="错误背景图" /></div>
    <div class="c-error__body"><img :src="errorPic" alt="错误图" /></div>
    <div class="c-error__footer">
      <h3 class="c-error__tip">{{ errorMsg }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  name: 'ErrorPage403',
  components: {}
})
export default class extends Vue {
  @Prop({ default: '' }) private bgPic!: string
  @Prop({ default: '' }) private errorPic!: string
  @Prop({ default: '' }) private errorMsg!: string
  @Prop({ default: '/' }) private link!: string
  @Prop({ default: '' }) private linkMsg!: string
}
</script>
