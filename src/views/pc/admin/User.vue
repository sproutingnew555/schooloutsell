<template>
  <div class="manage">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form ref="userForm" :inline="true" :rules="rules" :model="userForm" label-width="80px">
        <el-form-item label="账号" prop="account">
          <el-input placeholder="请输入账号" v-model="userForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input placeholder="请输入手机号" v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="userForm.username"></el-input>
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
          :data="userData"
          style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="账号">
                <span>{{ props.row.account }}</span>
              </el-form-item>
              <el-form-item label="密码">
                <span>{{ props.row.password }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            label="序号"
            width="auto">
          <template slot-scope="scope">
            <span>{{ scope.$index + pageData.page*10 -9 }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="username"
            label="用户名"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="手机号"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="创建时间"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="lastLoginTime"
            label="最后登录时间"
            width="auto">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
import {addUser, getUserPage, updateUser} from "@/api/index";

export default {
  data(){
    return{
      dialogVisible: false,
      userForm: {
        account: "",
        password: "",
        phone: "",
        username: ""
      },
      rules: {
        account: [
          {required: true, message: '请输入账号'}
        ],
        password: [
          {required: true, message: '请输入密码'}
        ],
        phone: [
          {required: true, message: '请输入手机号'}
        ],
        username: [
          {required: true, message: '请输入用户名'}
        ],
      },
      userData: [],
      modalType: 0, //0表示新增，1表示编辑
      pageData: {
        page: 1,
        pageSize: 10,
        username: "",
        phone: ""
      },
      total: 0
    }
  },
  methods: {
    submit(){
      this.$refs.userForm.validate((valid) => {
        if (valid){
          if (this.modalType === 0){
            //处理数据
            addUser(this.userForm).then((data) =>{
              this.$message({
                message: data.data.data,
                type: "success"
              })
              this.handleClose()
              this.getList()
            })
          }else{
            //处理数据
            updateUser(this.userForm).then((data) =>{
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
      this.userForm = JSON.parse(JSON.stringify(row))
    },
    //弹窗关闭的时候
    handleClose(){
      this.$refs.userForm.resetFields()
      this.dialogVisible = false
    },
    //弹窗点取消
    cancel(){
      this.handleClose()
    },
    //查询所有
    getList(){
      getUserPage({params: this.pageData}).then(({ data }) =>{
        this.userData = data.data.records
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
}
</style>