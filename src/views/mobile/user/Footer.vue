<template>
  <div class="bottom">
    <router-link class="bottom-item" to="/mobile/user/shop">
      <i class="el-icon-s-shop"></i>
      <span>店铺</span>
    </router-link>
    <router-link class="bottom-item" to="/mobile/user/shopCar">
      <i class="el-icon-shopping-cart-1"></i>
      <span>购物车</span>
    </router-link>
    <router-link class="bottom-item" to="/mobile/user/order">
      <i class="el-icon-s-order"></i>
      <span>订单</span>
    </router-link>
    <router-link class="bottom-item" to="/mobile/user/msg">
      <i class="el-icon-user"></i>
      <span>个人中心</span>
    </router-link>
  </div>
</template>
<script>
export default {
  data(){
    return{}
  }
}
</script>
<style lang="less" scoped>
.bottom{
  display:flex;
  width:100%;
  height:50px;
  .bottom-item{
    flex:1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color:#333;
    font-size:12px;

    .iconfont{
      margin-bottom:4px;
      font-size:18px;
    }
  }

}
</style>