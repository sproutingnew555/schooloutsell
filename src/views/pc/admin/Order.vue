<template>
  <div class="manage">
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
    <div class="manage-header">
    </div>
    <div class="common-table">
      <el-table
          height="90%"
          :data="orderData"
          style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="订单号">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="当前状态">
                <span>{{ props.row.status }}</span>
              </el-form-item>
              <el-form-item label="食堂">
                <span>{{ props.row.canteenName }}</span>
              </el-form-item>
              <el-form-item label="商家">
                <span>{{ props.row.shopName }}</span>
              </el-form-item>
              <el-form-item label="收货人">
                <span>{{ props.row.consignee }}</span>
              </el-form-item>
              <el-form-item label="用户手机号">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="骑手姓名">
                <span>{{ props.row.knightName }}</span>
              </el-form-item>
              <el-form-item label="骑手电话">
                <span>{{ props.row.knightPhone }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="截止时间">
                <span>{{ props.row.overTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            prop="id"
            label="订单号"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="当前状态"
            label="status"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="shopName"
            label="商家"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="knightName"
            label="骑手"
            width="auto">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleShow(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
import {getOrderDetail, getOrderPage} from "@/api/index";

export default {
  data(){
    return{
      dialogVisible: false,
      orderData: [],
      orderDetailData: [],
      pageData: {
        page: 1,
        pageSize: 10,
        shopId: "",
        knightId: "",
        orderId: "",
        status: ""
      },
      total: 0
    }
  },
  methods: {
    handleShow(index,row){
      getOrderDetail({params: {orderId: row.id}}).then((data)=>{
        this.orderDetailData = data.data.data
      })
      this.dialogVisible = true
    },
    //查询所有
    getList(){
      getOrderPage({params: this.pageData}).then(({ data }) =>{
        this.orderData = data.data.records
        this.total = data.data.total || 0
      })
    },
    //回调选择的页面
    handlePage(val){
      this.pageData.page = val
      this.getList()
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
.manage{
  height: 90%;
  .common-table{
    position: relative;
    height: calc(100% - 62px);
    .demo-table-expand {
      font-size: 0;
      label {
        width: 90px;
        color: #99a9bf;
      }
      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
    }
    .pager{
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
  .card{
    img{
      width: 100px;
      height: 100px;
    }
  }
}
</style>