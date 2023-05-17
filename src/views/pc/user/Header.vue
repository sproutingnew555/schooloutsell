<template>
  <div class="header-container">

    <div class="l-left">
      <div class="logo">
        <img class="image" src="../../../assets/images/admin.jpg">
      </div>
    </div>

    <div class="l-center">
      <el-menu class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item index="/pc/user">首页</el-menu-item>
        <el-menu-item index="/pc/user/shop">商家</el-menu-item>
        <el-menu-item index="/pc/user/shopCar">购物车</el-menu-item>
        <el-menu-item index="/pc/user/msg">个人信息</el-menu-item>
        <el-menu-item index="/pc/user/order">订单查询</el-menu-item>
      </el-menu>
    </div>

    <div class="l-right">
      <el-dropdown>
        <img class="user" src="../../../assets/images/admin.jpg" alt="">
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
    logout(){
      userLogout().then((data)=>{
        this.$router.push("/pc/home")
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
  padding: 0 20px;
  height: 120px;
  display: flex;
  justify-content: space-between;//表示子组件先贴两侧再平分剩余空间
  align-items: center;
  .l-left{
    .logo{
      float: left;
      padding: 14px 0 19px 0;
      img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
  }
  .l-center{
    width: auto;
    .el-menu{
      .el-menu-item{
        color: orange;
        margin-right: 3vw;
        font-size: 2vw;
      }
    }
  }
  .l-right{
    .user{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
</style>