<template>
  <div>
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "./Header.vue";
export default {
  data(){
    return{}
  },
  components:{
    Header
  },
  created() {
    this.$store.commit("initKnight")
  }
}
</script>
<style lang="less" scoped>
.el-header{
  padding: 0;
}
</style>