<template>
  <div>
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <Footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
export default {
  data(){
    return{}
  },
  components:{
    Header,
    Footer
  },
  created() {
    this.$store.commit("initUser")
  }
}
</script>
<style lang="less" scoped>
.el-card__body{
  padding: 0;
}
.el-main{
  padding: 0;
  margin-bottom: 10vh;
}
.el-header{
  padding: 0;
  background-color: orange;
}
.el-footer{
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: #eaeaea;
  height: 10vh;
  z-index: 999;
}
</style>