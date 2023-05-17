<template>
  <div class="container">
    <div class="button">
      <el-button @click="login('user')">我要点外卖</el-button>
      <el-button @click="login('knight')">骑手入职</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from "@/router";

export default {
  data(){
    return{}
  },
  methods:{
    login(name) {
      let isLogin = JSON.parse(localStorage.getItem(`${name}`))
      if (!isLogin){
        router.push({
          path:'/mobile/login',
          query:{
            name
          }
        })
      }else {
        router.push({
          path:'/mobile/'+name,
          query:{
            name
          }
        })
      }
    }
  }
}
</script>
<style></style>