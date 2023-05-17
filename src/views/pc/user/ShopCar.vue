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
        <div>
          <el-table
              :data="Object.values(shop)[0]"
              style="width: 100%">
            <el-table-column
                prop="image"
                label="图片"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="dishName"
                label="菜品名称"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="description"
                label="介绍"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="price"
                label="单价"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="number"
                label="数量"
                width="auto">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import {deleteShopCar, getAddressDefault, getShopCar} from "@/api/index";
import {submitOrder} from "@/api/index";

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
      this.getList()
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
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteShopCar({params: {id: row.id}}).then((data) =>{
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  created() {
    this.getList()
    this.getDefaultAddress()
  }
}
</script>
<style lang="less" scoped>
.cart-layout{
  width: 80%;
  margin-left: 10%;
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