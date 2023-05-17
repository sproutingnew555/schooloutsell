<template>
  <div class="header-container">
    <div class="l-content">
      <span class="text" @click="toHome">首页</span>
    </div>
    <div class="r-content">
      <el-dropdown>
        <img class="user" src="../../../assets/images/admin.jpg" alt="">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button type="text" @click="toAddress">我的地址</el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button type="text" @click="logout">退出</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import {userLogout} from "@/api/index";

export default {
  data(){
    return{}
  },
  methods:{
    toAddress(){
      this.$router.push("/mobile/user/address")
    },
    toHome(){
      this.$router.push("/mobile/user/shop")
    },
    logout(){
      userLogout().then((data)=>{
        this.$router.push("/mobile/home")
        localStorage.removeItem("user")
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
  height: 8vh;display: flex;
  justify-content: space-between;//表示子组件先贴两侧再平分剩余空间

  align-items: center;
  .text{
    color: #fff;
    font-size: 14px;
    margin-left: 3vw;
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