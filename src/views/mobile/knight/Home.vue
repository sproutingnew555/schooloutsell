<template>
  <div>
    <div class="button">
      <el-button @click="getOrder">接单</el-button>
    </div>
    <span>派送中的订单</span>
    <div class="table">
      <el-table
          :data="doOrderData"
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
            label="收货人"
            prop="consignee">
        </el-table-column>
        <el-table-column
            label="手机号"
            prop="phone">
        </el-table-column>
        <el-table-column label="操作" width="auto">
          <template slot-scope="scope">
            <el-button
                v-if="scope.row.status==5"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">送达</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {knightGetOrder, knightSeeOrder, updateOrder} from "@/api/index";

export default {
  data(){
    return{
      ordersData: [],
      doOrderData:[]
    }
  },
  methods:{
    handleEdit(index,row){
      row.status = 6
      updateOrder(row).then((data)=>{
        this.$message({
          message:data.data.data,
          type:"success"
        })
        this.getList()
      })
    },
    getOrder(){
      knightGetOrder({params: {knightId: this.$store.state.knight.knight.info.id}}).then((data)=>{
        this.$message({
          message: data.data.data,
          type: 'success'
        });
        this.SeeOrder()
      })
    },
    SeeOrder(){
      knightSeeOrder({params: {knightId: this.$store.state.knight.knight.info.id}}).then((data)=>{
        this.doOrderData = data.data.data
      })
    }
  },
  created() {
    this.SeeOrder()
  }
}
</script>
<style lang="less" scoped>
.button{
  display: flex;
  justify-content: center;
}
.table{
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
}
</style>