<template>
    <div>
      <el-row>
        <el-col :span="5" style="padding-right: 10px">
          <el-menu :router="true">
            <el-menu-item index="/pc/user/msg">
              <i class="el-icon-user"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item index="/pc/user/address">
              <i class="el-icon-place"></i>
              <span slot="title">地址管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="19" style="padding-right: 10px">
          <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="60%"
              :before-close="handleClose">
            <el-form ref="addressForm" :inline="true" :rules="rules" :model="addressForm" label-width="80px">
              <el-form-item label="收货人" prop="consignee">
                <el-input placeholder="请输入收货人" v-model="addressForm.consignee"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input placeholder="请输入手机号" v-model="addressForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-input placeholder="请输入地址" v-model="addressForm.address"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="submit">确 定</el-button>
            </span>
          </el-dialog>
          <div class="manage">
            <div class="manage-header">
              <el-button @click="handleAdd" type="primary">
                +  新增
              </el-button>
            </div>
            <div class="common-table">
              <el-table
                  :data="addressData"
                  style="width: 100%">
                <el-table-column
                    prop="consignee"
                    label="收货人">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
                <el-table-column
                    prop="isDefault"
                    label="默认">
                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleChange(scope.$index, scope.row)">{{scope.row.isDefault == 1 ? "默认地址" : "设置"}}</el-button>
                  </template>
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
        </el-col>
      </el-row>
    </div>
</template>
<script>
import {addAddress, deleteAddress, getAddressPage, setAddressDefault, updateAddress} from "@/api/index";

export default {
  data(){
    return{
      addressData: [],
      addressForm:{
        userId: "",
        consignee: "",
        phone: "",
        address: ""
      },
      pageData: {
        page: 1,
        pageSize: 10,
        userId: ""
      },
      total: 0,
      dialogVisible: false,
      modalType: "",
      rules: {
        consignee: [
          {required: true, message: '请输入收货人'}
        ],
        phone: [
          {required: true, message: '请输入手机号'}
        ],
        address: [
          {required: true, message: '请输入地址'}
        ],
      },
    }
  },
  methods:{
    handleChange(index,row){
      setAddressDefault({id: row.id,userId: row.userId}).then(() =>{
        this.$message({
          type: 'success',
          message: '修改成功'
        });
        this.getList()
      })
    },
    handlePage(val){
      this.pageData.page = val
      this.getList()},
    submit(){
      this.addressForm.userId = this.$store.state.user.user.info.id
      this.$refs.addressForm.validate((valid) => {
        if (valid){
          if (this.modalType === 0){
            //处理数据
            addAddress(this.addressForm).then((data) =>{
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
            })
          }else{
            //处理数据
            updateAddress(this.addressForm).then((data) =>{
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
            })
          }
          this.getList()
          this.handleClose()
        }
      })
    },
    cancel(){
      this.handleClose()
    },
    handleClose(){
      this.$refs.addressForm.resetFields()
      this.dialogVisible = false
    },
    handleAdd(){
      this.dialogVisible = true
      this.modalType = 0
    },
    handleEdit(index,row){
      this.dialogVisible = true
      this.modalType = 1
      //对当前行数据进行深拷贝
      this.addressForm = JSON.parse(JSON.stringify(row))
    },
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAddress({params: {id: row.id}}).then((data) =>{
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
    getList(){
      this.pageData.userId = this.$store.state.user.user.info.id
      getAddressPage({params: this.pageData}).then((data) =>{
        if (data.data.code == 1){
          this.addressData = data.data.data.records
          this.total = data.data.total || 0
        }
      })
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
    .pager{
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>