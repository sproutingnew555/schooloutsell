<template>
  <div class="box-container">
    <el-dialog
        title="详情"
        :visible.sync="dialogVisible"
        width="30%">
      <el-card class="card" v-for="orderDetail in orderDetailData" style="margin-bottom: 10px">
        <img src="../../../assets/images/admin.jpg" alt=""/>
        <span style="margin-right: 20px;">{{orderDetail.dishName}}</span>
        <span style="margin-right: 20px;">数量:{{orderDetail.number}}</span>
        <span>单价:{{orderDetail.price}}</span>
      </el-card>
    </el-dialog>
    <el-table :data="orderData">
      <el-table-column
          prop="createTime"
          label="创建日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="id"
          label="订单号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="consignee"
          label="收货人"
          width="180">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="手机号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="price"
          label="消费"
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址"
          width="180">
      </el-table-column>
      <el-table-column
          prop="knightName"
          label="骑手"
          width="180">
      </el-table-column>
      <el-table-column
          fixed="right"
          prop="status"
          label="状态"
          width="100">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleLook(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager">
      <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage">
      </el-pagination>
    </div>
  </div>
</template>
<script>

import {getOrderDetail, getOrderShopPage} from "@/api/index";

export default {
  data(){
    return{
      orderData: [],
      pageData: {
        page: 1,
        pageSize: 10,
        shopId: "",
        status: ""
      },
      total: 0,
      orderDetailData:[],
      dialogVisible: false
    }
  },
  methods:{
    handleLook(index,row){
      getOrderDetail({params: {orderId: row.id}}).then((data)=>{
        this.orderDetailData = data.data.data
      })
      this.dialogVisible = true
    },
    handlePage(val){
      this.pageData.page = val
      this.getList()
    },
    getList(){
      getOrderShopPage({params: this.pageData}).then((data) =>{
        this.orderData = data.data.data.records
        this.total = data.data.data.total || 0
      })
    }
  },
  created() {
    this.pageData.shopId = this.$store.state.shop.shop.info.id
    this.getList()
  }
}
</script>
<style lang="less" scoped>
.box-container{
  width: 90%;
  margin-left: 5%;
  .card{
    img{
      width: 100px;
      height: 100px;
    }
  }
}
</style>