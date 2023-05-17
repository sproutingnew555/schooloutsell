<template>
  <div class="box-container">
    <el-dialog
        title="详情"
        :visible.sync="dialogVisible"
        width="80%">
      <el-card class="card" v-for="orderDetail in orderDetailData" style="margin-bottom: 10px">
        <img src="../../../assets/images/admin.jpg" alt=""/>
        <span>{{orderDetail.dishName}}</span>
        <span>数量:{{orderDetail.number}}</span>
        <span>单价:{{orderDetail.price}}</span>
      </el-card>
    </el-dialog>
    <el-table
        :data="ordersData"
        style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="食堂">
              <span>{{ props.row.canteenName }}</span>
            </el-form-item>
            <el-form-item label="店铺">
              <span>{{ props.row.shopName }}</span>
            </el-form-item>
            <el-form-item label="收货人">
              <span>{{ props.row.consignee }}</span>
            </el-form-item>
            <el-form-item label="手机号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
            <el-form-item label="截单时间">
              <span>{{ props.row.overTime }}</span>
            </el-form-item>
            <el-form-item label="骑手姓名">
              <span>{{ props.row.knightName }}</span>
            </el-form-item>
            <el-form-item label="骑手电话">
              <span>{{ props.row.knightPhone }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.description }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="店铺"
          prop="shopName">
      </el-table-column>
      <el-table-column
          label="状态"
          prop="status">
      </el-table-column>
      <el-table-column
          label="下单时间"
          prop="createTime">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleLook(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager">
      <el-pagination
          small
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {getOrderDetail, getOrderUserPage} from "@/api/index";

export default {
  data(){
    return{
      ordersData: [],
      orderDetailData: [],
      pageData: {
        page: 1,
        pageSize: 10,
        status: "",
        userId: ""
      },
      total: 0,
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
    getOrders(){
      this.pageData.userId = this.$store.state.user.user.info.id
      getOrderUserPage({params: this.pageData}).then((data)=>{
        this.ordersData = data.data.data.records
        this.total = data.data.data.total || 0
      })
    },
    handlePage(val){
      this.pageData.page = val
      this.getOrders()
    }
  },
  created() {
    this.getOrders()
  }
}
</script>
<style lang="less" scoped>
.box-container{
  width: 100%;
  .card{
    width: auto;
    img{
      width: 50px;
      height: 50px;
    }
  }
}
.demo-table-expand {
  font-size: 1%;
  label{
    width: 90px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>