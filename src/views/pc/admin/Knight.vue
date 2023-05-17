<template>
  <div class="manage">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form ref="knightForm" :inline="true" :rules="rules" :model="knightForm" label-width="80px">
        <el-form-item label="账号" prop="account">
          <el-input placeholder="请输入账号" v-model="knightForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="knightForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input placeholder="请输入手机号" v-model="knightForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input placeholder="请输入姓名" v-model="knightForm.realName"></el-input>
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
          :data="knightData"
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
            prop="realName"
            label="姓名"
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
import {addKnight, deleteKnight, getKnightPage, updateKnight} from "@/api/index";

export default {
  data(){
    return{
      dialogVisible: false,
      knightForm: {
        account: "",
        password: "",
        phone: "",
        realName: ""
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
        realName: [
          {required: true, message: '请输入姓名'}
        ],
      },
      knightData: [],
      modalType: 0, //0表示新增，1表示编辑
      pageData: {
        page: 1,
        pageSize: 10,
        phone: "",
        realName: ""
      },
      total: 0
    }
  },
  methods: {
    submit(){
      this.$refs.knightForm.validate((valid) => {
        if (valid){
          if (this.modalType === 0){
            //处理数据
            addKnight(this.knightForm).then((data) =>{
              this.$message({
                message: data.data.data,
                type: "success"
              })
              this.handleClose()
              this.getList()
            })
          }else{
            //处理数据
            updateKnight(this.knightForm).then((data) =>{
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
      this.knightForm = JSON.parse(JSON.stringify(row))
    },
    //删除按钮
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteKnight({params: {id: row.id}}).then((data) =>{
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
      this.$refs.knightForm.resetFields()
      this.dialogVisible = false
    },
    //弹窗点取消
    cancel(){
      this.handleClose()
    },
    //查询所有
    getList(){
      getKnightPage({params: this.pageData}).then(({ data }) =>{
        this.knightData = data.data.records
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