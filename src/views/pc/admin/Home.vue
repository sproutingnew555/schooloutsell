<template>
  <el-row>
    <el-col :span="16" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../../../assets/images/admin.jpg" alt="">
          <div class="user-info>">
            <p style="font-size: 32px;margin-bottom: 10px;">Admin</p>
            <p style="color: #999999;">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2021.1.2</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;height: 460px">
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column v-for="(val,key) in tableLabel"
              :prop="key"
              :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="8" style="padding-left: 10px">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex',padding: 0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="price">{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
      </el-card>
      <div class="graph">
        <el-card style="height: 260px"></el-card>
        <el-card style="height: 260px"></el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getData } from '../../../api'
import * as echarts from 'echarts'
export default {
  data(){
    return{
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableLabel:{
        date:'日期',
        name:'姓名',
        address:'地址'
      },
      countData:[{
        name: "今日订单数",
        value: "1234",
        icon: "success",
        color: "#aaa"
      },{
        name: "本月订单数",
        value: "1234",
        icon: "success",
        color: "#aaa"
      },{
        name: "今日营业额",
        value: "1234",
        icon: "success",
        color: "#aaa"
      },{
        name: "本月营业额",
        value: "1234",
        icon: "success",
        color: "#aaa"
      },]
    }
  },
  mounted() {
    getData().then((data) => {
      console.log(data)
    })
  }
}
</script>
<style lang="less" scoped>
.user{
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img{
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
}
.login-info{
  p{
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span{
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail{
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price{
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
    }
    .desc{
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card{
    width: 48%;
    margin-bottom: 20px;
  }
}
.graph{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 48%;
  }
}
</style>