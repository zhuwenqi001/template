<template>
  <div style="padding:30px">
    <div style="padding:10px" @click="action">二级菜单-21</div>
    <div style="padding:10px" @click="action2">二级菜单-22</div>
    <div style="width:1200px;height:1000px">
      <el-input v-model="test" size="mini" type="text"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwoMenu',
  data() {
    return {
      test: ''
    }
  },
  methods: {
    action() {
      this.$router.push({
        name: 'twoMenu2',
        query: { test: '111' }
      })
    },
    action2() {
      this.$router.push({
        name: 'twoMenu2',
        query: { test: '222' }
      })
    }
  }
}
</script>
