<template>
  <div class="box-container">
    <el-dialog
        title="修改个人信息"
        :visible.sync="dialogVisible"
        width="80%">
      <span>手机号</span>
      <el-input v-model="MsgForm.phone"></el-input>
      <span>用户名</span>
      <el-input v-model="MsgForm.username"></el-input>
      <span>照片</span>
      <img src="../../../assets/images/admin.jpg" style="width: 100px;height: 100px">
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible1"
        width="80%">
      <span>密码</span>
      <el-input v-model="PwdForm.password"></el-input>
      <span>再输入一次</span>
      <el-input v-model="PwdForm.rePwd"></el-input>
      <span slot="footer" class="dialog-footer">
         <el-button @click="cancel">取 消</el-button>
         <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="image">
      <img src="../../../assets/images/admin.jpg">
    </div>
    <div class="account">
      <span v-model="userMsgData.account">账号:  {{userMsgData.account}}</span>
    </div>
    <div class="phone">
      <span v-model="userMsgData.phone">手机号:  {{userMsgData.phone}}</span>
    </div>
    <div class="real-name">
      <span v-model="userMsgData.username">用户名:  {{userMsgData.username}}</span>
    </div>
    <div class="operate">
      <el-button @click="updateMsg">修改个人信息</el-button>
      <el-button @click="updatePwd">修改密码</el-button>
    </div>
  </div>
</template>
<script>
import {getUser, updateUser} from "@/api/index";

export default {
  data(){
    return{
      userMsgData:{},
      MsgForm:{
        id: "",
        phone: "",
        username: ""
      },
      PwdForm:{
        id: "",
        password: "",
        rePwd: ""
      },
      dialogVisible: false,
      dialogVisible1: false,
      rulesMsg: []
    }
  },
  methods:{
    submit(){
      if (this.dialogVisible == true){
        this.MsgForm.id = this.userMsgData.id
        updateUser(this.MsgForm).then((data) =>{
          this.$message({
            message: data.data.data,
            type: 'success'
          });
          this.getMsg()
          this.cancel()
        })
      }
      if (this.dialogVisible1 == true){
        this.PwdForm.id = this.userMsgData.id
        updateUser(this.MsgForm).then((data) =>{
          this.$message({
            message: data.data.data,
            type: 'success'
          });
          localStorage.removeItem("user")
          this.$router.push('/mobile/home')
        })
      }
    },
    cancel(){
      if (this.dialogVisible = true){
        this.MsgForm.id = ""
        this.MsgForm.phone = ""
        this.MsgForm.username = ""
        this.dialogVisible = false
      }
      if (this.dialogVisible1 = true){
        this.PwdForm.id = ""
        this.PwdForm.password = ""
        this.PwdForm.rePwd = ""
        this.dialogVisible1 = false
      }
    },
    updateMsg(){
      this.dialogVisible = true
      this.MsgForm.phone = this.userMsgData.phone
      this.MsgForm.username = this.userMsgData.username
    },
    updatePwd(){
      this.dialogVisible1 = true
    },
    getMsg(){
      getUser({params: {id: this.$store.state.user.user.info.id}}).then((data) =>{
        this.userMsgData = data.data.data
      })
    }
  },
  created() {
    this.getMsg()
  }
}
</script>
<style lang="less" scoped>
.box-container{
  .image{
    justify-content: center;
    display: flex;
    img{
      width: 200px;
      height: 200px;
    }
  }
  .operate{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;//表示子组件先贴两侧再平分剩余空间
  }
}
</style>