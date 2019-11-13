<template>
  <div style="padding:30px">
    三级菜单-1
    <div style="width:200px">
      <el-input v-model="test" size="mini" type="text"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThreeMenu',
  data() {
    return {
      test: ''
    }
  }
}
</script>
