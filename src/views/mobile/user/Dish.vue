<template>
  <el-row>
    <el-col :span="3" style="padding-right: 10px">
      <el-menu>
        <el-menu-item @click="select(item.id)" v-for="item in categoryMsg" :key="item.id">
          <span slot="title">{{ item.categoryName }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="21" style="padding-left: 10px">
      <div class="box-container">
        <el-card class="box-card" v-for="dish in dishList" :key="dish.id">
          <img src="../../../assets/images/admin.jpg" class="image">
          <div class="card-text">
            <span>{{ dish.dishName }}</span>
          </div>
          <div>
            <el-button type="text" class="button" @click="addShopCar(dish)">加入购物车</el-button>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>

</template>
<script>
import {getCategoryAll, getDishList} from "@/api/index";
import {addShopCar} from "@/api/index";

export default {
  data(){
    return{
      shopMsg: {},
      categoryMsg:[],
      dishList: [],
      shopCar:{
        userId: "",
        shopId: "",
        dishId: "",
        number: 1,
        price: "",
        image: ""
      }
    }
  },
  methods:{
    select(id){
      getDishList({params:{shopId: this.shopMsg.id,categoryId: id}}).then((data) =>{
        this.dishList = data.data.data
      })
    },
    addShopCar(dish){
      this.shopCar.userId = this.$store.state.user.user.info.id
      this.shopCar.shopId = this.shopMsg.id
      this.shopCar.dishId = dish.id
      this.shopCar.price = dish.price
      this.shopCar.image = dish.image
      addShopCar(this.shopCar).then((data) =>{
        this.$message({
          type: 'success',
          message: '已加入购物车'
        })
      })
    }
  },
  created() {
    this.shopMsg = this.$route.query.msg
    getCategoryAll({params: {shopId: this.shopMsg.id}}).then((data) =>{
      this.categoryMsg = data.data.data
    })
    getDishList({params:{shopId: this.shopMsg.id}}).then((data) =>{
      this.dishList = data.data.data
    })
  }
}
</script>
<style lang="less" scoped>
.box-container{
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