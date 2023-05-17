<template>
  <div class="box-container">
    <div class="box-top">
      <el-dialog
          title="请选择点餐的食堂"
          :visible.sync="dialogVisible"
          width="80%"
          :before-close="handleClose">
        <div class="canteen" v-for="canteen in canteenData" :key="canteen.id">
          <el-button @click="submit(canteen)">{{canteen.canteenName}}</el-button>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="all">全 选</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
      </el-dialog>
      <el-button @click="dialogVisible = true">选择食堂</el-button>
    </div>
    <el-card class="box-card" v-for="msg in shopData" :key="msg.id">
      <img src="../../../assets/images/admin.jpg" class="image">
      <div class="card-text">
        <span style="margin-left: 10vw">{{ msg.shopName }}</span>
      </div>
      <el-button type="text" class="button" @click="goShop(msg)">进入该店</el-button>
    </el-card>
  </div>
</template>
<script>
import {getCanteenList, getShopList} from "@/api";
import router from "@/router";

export default {
  data(){
    return{
      canteenData: [],
      shopData: [],
      canteenId: "",
      dialogVisible: false,
    }
  },
  methods:{
    submit(canteen){
      getShopList({params:{canteenId: canteen.id}}).then((data)=>{
        this.shopData = data.data.data
      })
      this.handleClose()
    },
    all(){
      getShopList().then((data)=>{
        this.shopData = data.data.data
      })
      this.handleClose()
    },
    handleClose(){
      this.dialogVisible = false
    },
    goShop(msg){
      router.push({
        path:'/mobile/user/shop/dish',
        query:{
          msg
        }
      })
    },
    getCanteenList() {
      getCanteenList().then((data)=>{
        this.canteenData = data.data.data
      })
    },
    getShopList(){
      getShopList().then((data)=>{
        this.shopData = data.data.data
      })
    }
  },created() {
    this.getCanteenList()
    this.getShopList()
  }
}
</script>
<style lang="less" scoped>
.box-container{
  ::v-deep .el-card__body{
    display: flex;
  }
  .el-card{
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5vh;
    img{
      width: 50px;
      height: 50px;
    }
    .card-text{
      text-align: center;
      span{
        font-size: 20px;
      }
    }
    .button{
      position: absolute;
      right: 5%;
      bottom: 5%;
      margin-top: 10vh;
      margin-left: 10vw;
    }
  }
}
</style>