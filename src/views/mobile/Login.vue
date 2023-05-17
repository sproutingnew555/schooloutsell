<template>
  <el-form label-width="70px" class="login-container" :inline="true" :model="loginForm" :rules="rules">
    <h3 class="login-title">系统登录</h3>
    <el-form-item label="用户名" prop="account">
      <el-input v-model="loginForm.account" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item class="login-button">
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="primary" @click="register">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import axios from "axios";
import router from "@/router";

export default {
  data(){
    return{
      loginForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [
            {required: true, trigger: 'blur', message: '请输入用户名'}
        ],
        password: [
          {required: true, trigger: 'blur', message: '请输入密码'}
        ]
      },
      name: ""
    }
  },
  methods:{
    //登录
    login() {
      axios({
        method:'post',
        url:`http://localhost:8082/${this.name}/login`,
        data:{
          account: this.loginForm.account,
          password: this.loginForm.password
        },
      }).then(res => {
        if (res.data.code == 1){
          switch (this.name){
            case "user":
              this.$store.commit("setUser",res.data.data)
                  break;
            case "knight":
              this.$store.commit("setKnight",res.data.data)
                  break;
          }
          router.push('/mobile/'+this.name)
        }else {
          alert(res.data.msg)
        }
      })
    },
    register(){

    }
  },
  created() {
    this.name = this.$route.query.name
  }
}
</script>
<style lang="less" scoped>
.login-container{
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .el-input{
    width: 198px;
  }
  .login-title{
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .login-button{
    margin-left: 25%;
  }
}
</style>