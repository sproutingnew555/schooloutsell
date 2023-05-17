<template>
  <div>
    <div>
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
              <el-form-item label="收货地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            label="店铺"
            prop="shopName">
        </el-table-column>
        <el-table-column
            label="地址"
            prop="address">
        </el-table-column>
        <el-table-column
            label="状态"
            prop="status">
        </el-table-column>
      </el-table>
    </div>
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
import {getOrderKnightPage} from "@/api/index";

export default {
  data(){
    return{
      ordersData: [],
      pageData: {
        page: 1,
        pageSize: 10,
        status: "",
        knightId: ""
      },
      total: 0,
    }
  },
  methods:{
    getOrders(){
      this.pageData.knightId = this.$store.state.knight.knight.info.id
      getOrderKnightPage({params: this.pageData}).then((data)=>{
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