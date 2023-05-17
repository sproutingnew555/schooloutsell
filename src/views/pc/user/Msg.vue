<template>
  <div>
    <el-dialog
        title="修改个人信息"
        :visible.sync="dialogVisible"
        width="60%">
      <div class="form">
        <el-form ref="userForm" :model="userMsgForm" :rules="rulesMsg" label-width="80px" style="width: 60%">
          <el-form-item label="账号" disable>
            <el-input v-model="userMsgForm.account" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input placeholder="请输入手机号" v-model="userMsgForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-input v-model="userMsgForm.image"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible1"
        width="60%">
      <div class="form">
        <el-form ref="userPwd" :model="userPwdForm" :rules="rulesPwd" label-width="80px" style="width: 60%">
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码" v-model="userPwdForm.password"></el-input>
          </el-form-item>
          <el-form-item label="重复" prop="rePwd">
            <el-input placeholder="请再次输入密码" v-model="userPwdForm.rePwd"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="身份认证"
        :visible.sync="dialogVisible2"
        width="40%">
      <div class="form">
        <el-form ref="identification" :model="identification" label-width="80px" style="width: 60%">
          <el-form-item label="账号" prop="roleId">
            <el-input placeholder="请输入学号或职工号" v-model="identification.roleId"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">跳 过</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
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
        <div class="box-container">
          <div class="userInfo">
            <el-descriptions title="用户信息">
              <el-descriptions-item label="身份">{{ userMsg.roleNum }}</el-descriptions-item>
              <el-descriptions-item label="账号">{{userMsg.account}}</el-descriptions-item>
              <el-descriptions-item label="手机号">{{ userMsg.phone }}</el-descriptions-item>
              <el-descriptions-item label="头像">
                <img src="../../../assets/images/admin.jpg" alt="" style="width: 100px;height: 100px"/>
              </el-descriptions-item>

              <el-descriptions-item label="账号创建时间">{{ userMsg.createTime }}</el-descriptions-item>
              <el-descriptions-item label="最后一次登录时间">{{ userMsg.lastLoginTime }}</el-descriptions-item>
            </el-descriptions>
          </div>
          <div class="button">
            <el-button @click="updateMsg">修改</el-button>
            <el-button @click="updatePwd">修改密码</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import {getRole, getUser, updateUser} from "@/api/index";
import router from "@/router";

export default {
  data(){
    return{
      identification:{
        roleId: ""
      },
      userMsgForm: {
        id: "",
        account: '',
        phone: '',
        image: ''
      },
      userPwdForm:{
        id: "",
        password: "",
        rePwd: ""
      },
      userMsg: {},
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
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
    identifyPerson(){
      if (this.userMsg.roleNum == 0){
        this.dialogVisible2 = true
      }
    },
    submit(){
      if (this.dialogVisible == true){
        this.userMsgForm.id = this.userMsg.id
        this.$refs.userForm.validate((valid) => {
          if (valid){
            //处理数据
            updateUser(this.userMsgForm).then((data) =>{
              this.$message({
                message: data.data.data,
                type: 'success'
              });
              //刷新
              this.getUser()
              //关闭弹窗
              this.dialogVisible = false
            })
          }
        })
      }
      if (this.dialogVisible1 == true){
        this.userPwdForm.id = this.userMsg.id
        this.$refs.userPwd.validate((valid) => {
          if (valid){
            //处理数据
            updateUser(this.userPwdForm).then((data) =>{
              this.$message({
                message: data.data.data,
                type: 'success'
              });
              //关闭弹窗
              this.dialogVisible = false
              //退出账号，重新登录
              localStorage.removeItem("user")
              router.push('/pc/home')
            })
          }
        })
      }
      if (this.dialogVisible2 == true){
        if (this.identification.roleId != null){
          getRole({params:{roleId: this.identification.roleId}}).then((data)=>{
            if (data.data.data.role == "学生"){
              this.userMsg.roleNum = 1
            }
            if (data.data.data.role == "教职工"){
              this.userMsg.roleNum = 2
            }
            updateUser(this.userMsg).then((data)=>{
            })
            this.$message({
              message:"身份认证成功，你当前的身份是"+data.data.data.role,
              type:"success"
            })
            this.getUser()
            this.cancel()
          })
        }else {
          this.cancel()
        }
      }
    },
    cancel(){
      if (this.dialogVisible == true){
        this.$refs.userForm.resetFields()
        this.dialogVisible = false
      }
      if (this.dialogVisible1 == true){
        this.$refs.userPwd.resetFields()
        this.dialogVisible1 = false
      }
      if (this.dialogVisible2 == true){
        this.$refs.identification.resetFields()
        this.dialogVisible2 = false
      }
    },
    getUser(){
      getUser({params: {id: this.$store.state.user.user.info.id}}).then((data)=>{
        if (data.data.code == 1){
          this.userMsg = data.data.data
        }
      })
    },
    updatePwd(){
      this.dialogVisible1 = true
    },
    updateMsg(){
      this.userMsgForm.account = this.userMsg.account
      this.userMsgForm.phone = this.userMsg.phone
      this.userMsgForm.image = this.userMsg.image
      this.dialogVisible = true
    },
  },
  created() {
    this.getUser()
    this.identifyPerson()
  }
}
</script>
<style lang="less" scoped>
.box-container{
  display: flex;
  .userInfo{
    width: 80%;
    height: 50%;
    margin-left: 5%;
  }
  .button{
    margin-top: 10px;
  }
}
</style>