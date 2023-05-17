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
            <el-button type="text" @click="toMsg">个人信息</el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button type="text" @click="toOrder">订单查询</el-button>
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
export default {
  data(){
    return{}
  },
  methods:{
    toHome(){
      this.$router.push("/mobile/knight/home")
    },
    toMsg(){
      this.$router.push("/mobile/knight/msg")
    },
    toOrder(){
      this.$router.push("/mobile/knight/order")
    },
    logout(){
      this.$router.push("/mobile/home")
      localStorage.removeItem("knight")
    }
  }
}
</script>
<style lang="less" scoped>
.header-container{
  background-color: lightskyblue;
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