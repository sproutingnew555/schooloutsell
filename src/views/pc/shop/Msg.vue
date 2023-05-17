<template>
  <div>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="60%">
      <div class="form">
        <el-form ref="shopForm" :model="shopMsgForm" :rules="rulesMsg" label-width="80px" style="width: 60%">
          <el-form-item label="账号" disable>
            <el-input v-model="shopMsgForm.account" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input placeholder="请输入手机号" v-model="shopMsgForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-input v-model="shopMsgForm.image"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible1"
        width="60%">
      <div class="form">
        <el-form ref="shopPwd" :model="shopPwdForm" :rules="rulesPwd" label-width="80px" style="width: 60%">
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码" v-model="shopPwdForm.password"></el-input>
          </el-form-item>
          <el-form-item label="重复" prop="rePwd">
            <el-input placeholder="请再次输入密码" v-model="shopPwdForm.rePwd"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="box-container">
      <div class="shopInfo">
        <el-descriptions title="用户信息">
          <el-descriptions-item label="账号">{{shopMsg.account}}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{ shopMsg.phone }}</el-descriptions-item>
          <el-descriptions-item label="头像">
            <img src="../../../assets/images/admin.jpg" alt="" style="width: 100px;height: 100px"/>
          </el-descriptions-item>
          <el-descriptions-item label="所属食堂">{{ shopMsg.canteenName }}</el-descriptions-item>
          <el-descriptions-item label="账号创建时间">{{ shopMsg.createTime }}</el-descriptions-item>
          <el-descriptions-item label="最后一次登录时间">{{ shopMsg.lastLoginTime }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="button">
        <el-button @click="updateMsg">修改</el-button>
        <el-button @click="updatePwd">修改密码</el-button>
      </div>
    </div>
  </div>
</template>
<script>

import {getShop, updateShop} from "@/api/index";
import router from "@/router";

export default {
  data(){
    return{
      shopMsgForm: {
        id: "",
        account: '',
        phone: '',
        image: ''
      },
      shopPwdForm:{
        id: "",
        password: "",
        rePwd: ""
      },
      shopMsg: {},
      dialogVisible: false,
      dialogVisible1: false,
      rulesMsg: {
        phone: [
          {required: true, message: '请输入手机号'}
        ]
      },
      rulesPwd:{
        password: [
          {required: true, message: '请输入密码'}
        ],
        rePwd: [
          {required: true, message: '请再次输入密码'}
        ],
      }
    }
  },
  methods:{
    submit(){
      if (this.dialogVisible == true){
        this.shopMsgForm.id = this.shopMsg.id
        this.$refs.shopForm.validate((valid) => {
          if (valid){
            //处理数据
            updateShop(this.shopMsgForm).then((data) =>{
              this.$message({
                message: data.data.data,
                type: 'success'
              });
              //刷新
              this.getShopMsg()
              //关闭弹窗
              this.dialogVisible = false
            })
          }
        })
      }
      if (this.dialogVisible1 == true){
        this.shopPwdForm.id = this.shopMsg.id
        this.$refs.shopPwd.validate((valid) => {
          if (valid){
            //处理数据
            updateShop(this.shopPwdForm).then((data) =>{
              this.$message({
                message: data.data.data,
                type: 'success'
              });
              //关闭弹窗
              this.dialogVisible = false
              //退出账号，重新登录
              localStorage.removeItem("shop")
              router.push('/pc/home')
            })
          }
        })
      }
    },
    cancel(){
      if (this.dialogVisible == true){
        this.$refs.shopForm.resetFields()
        this.dialogVisible = false
      }
      if (this.dialogVisible1 == true){
        this.$refs.shopPwd.resetFields()
        this.dialogVisible1 = false
      }
    },
    getShopMsg(){
      getShop({params: {id: this.$store.state.shop.shop.info.id}}).then((data)=>{
        if (data.data.code == 1){
          this.shopMsg = data.data.data
        }
      })
    },
    updatePwd(){
      this.dialogVisible1 = true
    },
    updateMsg(){
      this.shopMsgForm.account = this.shopMsg.account
      this.shopMsgForm.phone = this.shopMsg.phone
      this.shopMsgForm.image = this.shopMsg.image
      this.dialogVisible = true
    },
  },
  created() {
    this.getShopMsg()
  }
}
</script>
<style lang="less" scoped>
.box-container{
  display: flex;
  .shopInfo{
    width: 80%;
    height: 50%;
    margin-left: 5%;
  }
  .button{
    margin-top: 10px;
  }
}
</style>