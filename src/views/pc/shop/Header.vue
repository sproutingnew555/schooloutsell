<template>
  <div class="header-container">
    <div class="l-content">
      <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
      <span class="text">首页</span>
    </div>
    <div class="r-content">
      <el-dropdown>
        <img class="user" src="../../../assets/images/shop.jpg" alt="">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button type="text" @click="logout">退出</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import {userLogout} from "@/api";

export default {
  data(){
    return{}
  },
  methods:{
    handleMenu(){
      this.$store.commit('collapseMenu')
    },
    logout(){
      userLogout().then((data)=>{
        this.$router.push("/pc/home")
        localStorage.removeItem("shop")
        this.$message({
          message: data.data.data,
          type:"success"
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header-container{
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;//表示子组件先贴两侧再平分剩余空间
  align-items: center;
  .text{
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .r-content{
    .user{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>