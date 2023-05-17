<template>
  <el-container>
    <el-header style="height: auto;padding: 0">
      <Header/>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import Header from "./Header.vue";
export default {
  data(){
    return{
    }
  },
  components: {
    Header
  },
  created() {
    this.$store.commit("initUser")
  }
}
</script>
<style>
</style>