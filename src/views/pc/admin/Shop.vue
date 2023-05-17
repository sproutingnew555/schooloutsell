<template>
  <div class="manage">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="70%"
        :before-close="handleClose">
      <el-form ref="shopForm" :inline="true" :rules="rules" :model="shopForm" label-width="80px">
        <el-form-item label="食堂" prop="canteenId">
          <el-select v-model="shopForm.canteenId" placeholder="请选择">
            <el-option
                v-for="item in canteenData"
                :key="item.id"
                :label="item.canteenName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="店铺名称" prop="shopName">
          <el-input placeholder="请输入食堂名称" v-model="shopForm.shopName"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input placeholder="请输入食堂名称" v-model="shopForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入食堂名称" v-model="shopForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input placeholder="请输入食堂名称" v-model="shopForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="权重" prop="weight">
          <el-input placeholder="请输入食堂名称" v-model="shopForm.weight"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <el-input placeholder="请输入食堂名称" v-model="shopForm.image"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary">
        +  新增
      </el-button>
    </div>
    <div class="common-table">
      <el-table
          height="90%"
          :data="shopData"
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
              <el-form-item label="账号">
                <span>{{ props.row.account }}</span>
              </el-form-item>
              <el-form-item label="密码">
                <span>{{ props.row.password }}</span>
              </el-form-item>
              <el-form-item label="手机号">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            label="序号"
            width="50px">
          <template slot-scope="scope">
            <span>{{ scope.$index + pageData.page*10 -9 }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="canteenName"
            label="食堂"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="image"
            label="图片"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="shopName"
            label="店铺"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="status"
            label="是否营业"
            width="auto">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import {addShop, deleteShop, getCanteenList, getShopList, updateShop} from "@/api";

export default {
  data(){
    return{
      dialogVisible: false,
      canteenData:[],
      shopForm: {
        canteenId:"",
        shopName: "",
        account: "",
        password: "",
        phone: "",
        weight: "",
        image: ""
      },
      rules: {
        shopName: [
          {required: true, message: '请输入店铺名称'}
        ],
        account: [
          {required: true, message: '请输入账号'}
        ],
        password: [
          {required: true, message: '请输入手机号'}
        ],
        phone: [
          {required: true, message: '请输入密码'}
        ]
      },
      shopData: [],
      modalType: 0, //0表示新增，1表示编辑
      pageData: {
        page: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  methods: {
    //新增菜品分类
    submit(){
      this.$refs.shopForm.validate((valid) => {
        if (valid){
          if (this.modalType === 0){
            //处理数据
            addShop(this.shopForm).then((data) =>{
              console.log(data)
              if (data.data.code == 1){
                this.$message({
                  message: data.data.data,
                  type: "success"
                })
              }else {
                this.$message({
                  message: data.data.msg,
                  type: "warning"
                })
              }
              this.getList()
              this.handleClose()
            })
          }else{
            //处理数据
            updateShop(this.shopForm).then((data) =>{
              this.$message({
                message: data.data.data,
                type: "success"
              })
              this.getList()
              this.handleClose()
            })
          }
        }
      })
    },
    //新增按钮
    handleAdd(){
      this.dialogVisible = true
      this.modalType = 0
    },
    //编辑按钮
    handleEdit(index,row){
      this.dialogVisible = true
      this.modalType = 1
      //对当前行数据进行深拷贝
      this.shopForm = JSON.parse(JSON.stringify(row))
    },
    //删除按钮
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteShop({params: {id: row.id}}).then((data) =>{
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
    },
    //弹窗关闭的时候
    handleClose(){
      this.$refs.shopForm.resetFields()
      this.dialogVisible = false
    },
    //弹窗点取消
    cancel(){
      this.handleClose()
    },
    //查询所有
    getList(){
      getShopList({params: this.pageData}).then(({ data }) =>{
        this.shopData = data.data
        this.total = data.data.total || 0
      })
    },
    //回调选择的页面
    handlePage(val){
      this.pageData.page = val
      this.getList()
    },
    getCanteenList(){
      getCanteenList().then((data)=>{
        this.canteenData = data.data.data
      })
    }
  },
  created() {
    this.getList()
    this.getCanteenList()
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
}
</style>