<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <Aside/>
      </el-aside>
      <el-container>
        <el-header>
          <Header/>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from './Aside.vue'
import Header from "./Header.vue";
export default {
  data(){
    return{}
  },
  components:{
    Header,
    Aside
  }
}
</script>
<style lang="less" scoped>
.el-header{
  padding: 0;
}
</style>