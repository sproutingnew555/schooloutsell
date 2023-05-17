<template>
  <div>
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
    <div class="top">
      <el-page-header @back="goBack" content="我的地址">
      </el-page-header>
    </div>
    <div class="main">
      <el-button @click="handleAdd">新增</el-button>
      <el-card class="box-card" v-for="address in addressData" :key="address.id">
        <el-row>
          <el-col :span="20">
            <span>收货人：{{address.consignee}}</span>
            <span>手机号：{{address.phone}}</span>
            <span>地址：{{address.address}}</span>
            <span>默认地址？：{{address.isDefault}}</span>
          </el-col>
          <el-col :span="4">
            <span>
              <el-button size="mini" type="warning" icon="el-icon-star-off" circle @click="handleChange(address)"></el-button>
            </span>
            <span>
              <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="handleEdit(address)"></el-button>
            </span>
            <span>
              <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(address)"></el-button>
            </span>
          </el-col>
        </el-row>

      </el-card>
    </div>
  </div>
</template>
<script>
import {addAddress, deleteAddress, setAddressDefault, updateAddress,getAddressList} from "@/api";

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
    handleChange(address){
      setAddressDefault({id: address.id,userId: address.userId}).then(() =>{
        this.$message({
          type: 'success',
          message: '已设置默认地址'
        });
        this.getList()
      })
    },
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
              this.getList()
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
              this.getList()
            })
          }
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
    handleEdit(address){
      this.dialogVisible = true
      this.modalType = 1
      //对当前行数据进行深拷贝
      this.addressForm = JSON.parse(JSON.stringify(address))
    },
    handleDelete(address){
      deleteAddress({params: {id: address.id}}).then((data) =>{
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
    },
    getList(){
      getAddressList({params: {userId: this.$store.state.user.user.info.id}}).then((data) =>{
        if (data.data.code == 1){
          this.addressData = data.data.data
        }
      })
    },
  goBack(){
    this.$router.push('/mobile/user/msg')
  }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
span {
  white-space: pre-line;
  display: block;
}
</style>