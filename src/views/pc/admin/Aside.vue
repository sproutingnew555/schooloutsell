<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b"
           :router="true">
    <h1>{{ isCollapse ? '后台' : '欢迎你，XXX' }}</h1>
    <el-menu-item index="/pc/admin/home">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="user">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </template>
      <el-menu-item index="/pc/admin/user">用户</el-menu-item>
    </el-submenu>
    <el-submenu index="shop">
      <template slot="title">
        <i class="el-icon-s-shop"></i>
        <span slot="title">食堂管理</span>
      </template>
      <el-menu-item index="/pc/admin/canteen">食堂</el-menu-item>
      <el-menu-item index="/pc/admin/shop">商家</el-menu-item>
    </el-submenu>
    <el-submenu index="knight">
      <template slot="title">
        <i class="el-icon-bicycle"></i>
        <span slot="title">骑手管理</span>
      </template>
      <el-menu-item index="/pc/admin/knight">骑手</el-menu-item>
    </el-submenu>
    <el-menu-item index="/pc/admin/order">
      <i class="el-icon-s-order"></i>
      <span slot="title">订单查询</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed:{
    isCollapse(){
      return this.$store.state.tab.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu{
  height: 100vh;
  border-right: none;
  h1{
    color: red;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>