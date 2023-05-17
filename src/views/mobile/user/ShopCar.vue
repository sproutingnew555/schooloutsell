<template>
  <div class="cart-layout">
    <div class="top">
      <span>购物车</span>
    </div>
    <div class="main">
      <el-card class="box-card" v-for="shop in shopCarData" style="margin-bottom: 10px">
        <div slot="header" class="clearfix">
          <span>{{Object.keys(shop)[0]}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="submit(Object.values(shop)[0])">下单</el-button>
        </div>
        <div class="dishMsg">
          <el-card v-for="dishMsg in Object.values(shop)[0]" style="margin-bottom: 1vh">
            <el-row style="width: 80%">
              <el-col :span="6">
                <img src="../../../assets/images/admin.jpg" style="width: 60px;height: 60px"/>
              </el-col>
              <el-col :span="18">
                <div>
                  <span>{{dishMsg.dishName}}</span>
                  <el-button style="position: absolute;right: 0"
                             size="mini"
                             type="danger"
                             icon="el-icon-delete" circle
                             @click="handleDelete(dishMsg)"
                  ></el-button>
                </div>
                <div>
                  <span>￥：{{dishMsg.price}}</span>
                  <div style="position: absolute;right: 0;bottom: 0">
                    <button style="margin-right: 10px" @click="sub(dishMsg)">-</button>
                    <span>{{dishMsg.number}}</span>
                    <button style="margin-left: 10px" @click="add(dishMsg)">+</button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import {submitOrder,deleteShopCar, getAddressDefault, getShopCar, updateShopCar} from "@/api/index";

export default {
  data(){
    return{
      shopCarData: [],
      allMoney: 0,
      otherMsg:{
        addressId: "",
        userId: ""
      },
      orders:{
        shopId: "",
        userId: "",
        addressId: ""
      }
    }
  },
  methods:{
    add(dishMsg){
      dishMsg.number ++
      updateShopCar(dishMsg).then((data)=>{
        if (data.data.code == 1){
          this.$message({
            type: 'success',
            message: data.data.data
          })
        }else {
          this.$message({
            type: 'warning',
            message: data.data.msg
          })
        }
        this.getList()
      })
    },
    sub(dishMsg){
      if (dishMsg.number == 1){
        this.$message({
          message:"商品不能再减少了",
          type:"warning"
        })
      }else {
        dishMsg.number --
        updateShopCar(dishMsg).then((data)=>{
          if (data.data.code == 1){
            this.$message({
              type: 'success',
              message: data.data.data
            })
          }else {
            this.$message({
              type: 'warning',
              message: data.data.msg
            })
          }
          this.getList()
        })
      }
    },
    submit(msg){
      this.otherMsg.userId = this.$store.state.user.user.info.id
      this.orders = this.otherMsg
      msg.map(item =>{
        this.orders.shopId = item.shopId
      })
      submitOrder(this.orders).then((data) =>{
        this.$message({
          type: 'success',
          message: data.data.data
        })
      })
      location.reload()
    },
    getDefaultAddress(){
      getAddressDefault({params:{userId: this.$store.state.user.user.info.id}}).then((data) =>{
        this.otherMsg.addressId = data.data.data.id
      })
    },
    getList(){
      getShopCar({params:{userId: this.$store.state.user.user.info.id}}).then((data)=>{
        this.shopCarData = data.data.data
      })
    },
    handleDelete(dishMsg){
      deleteShopCar({params: {id: dishMsg.id}}).then((data) =>{
        if (data.data.code == 1){
          this.$message({
            type: 'success',
            message: data.data.data
          })
        }else {
          this.$message({
            type: 'warning',
            message: data.data.msg
          })
        }
        this.getList()
      })
    }
  },
  created() {
    this.getList()
    this.getDefaultAddress()
  }
}
</script>
<style lang="less" scoped>
.el-card__body, .el-main {
  padding: 10px;
}
.cart-layout{
  width: 100%;
  .top{
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 72px;
    padding: 0 18px;
    border-bottom: 1px solid #e6e6e6;
    .cart-sum{
      position: absolute;
      right: 18px;
    }
  }
}
</style>