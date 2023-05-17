<template>
  <div class="box-container">
    <el-card class="box-card" v-for="msg in shopMsg" :key="msg.id">
      <img src="../../../assets/images/admin.jpg" class="image">
      <div class="card-text">
        <span>{{ msg.shopName }}</span>
      </div>
      <el-button type="text" class="button" @click="goShop(msg)">进入该店</el-button>
    </el-card>
  </div>
</template>
<script>
import {getShopList} from "@/api/index";
import router from "@/router";

export default {
  data(){
    return{
      shopMsg: [],
    }
  },
  methods:{
    goShop(msg){
      router.push({
        path:'/pc/user/shop/dish',
        query:{
          msg
        }
      })
    }
  },
  created() {
    getShopList().then((data) =>{
      this.shopMsg = data.data.data
    })
  }
}
</script>
<style lang="less" scoped>
.box-container{
  width: 80vw;
  margin-left: 10vw;
  display: flex;
  flex-wrap: wrap;
  ::v-deep .el-card__body{
    display: flex;
  }
  .el-card{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 25vw;
    margin-right: 1vw;
    margin-bottom: 1vh;
    img{
      width: 150px;
      height: 150px;
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