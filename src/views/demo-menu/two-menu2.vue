<template>
  <div style="padding:30px">
    二级菜单-2
    <div style="width:200px">
      <el-input v-model="test" size="mini" type="text"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwoMenu2',
  data() {
    return {
      test: ''
    }
  },
  activated() {
    this.test = this.$route.query.test
  },
  watch: {
    $route() {
      this.test = this.$route.query.test
    }
  }
}
</script>
