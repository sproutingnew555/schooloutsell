<template>
  <div class="container">
    <div class="button">
      <el-button @click="login('user')">我要点外卖</el-button>
      <el-button @click="login('shop')">我要入驻</el-button>
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
          path:'/pc/login',
          query:{
            name
          }
        })
      }else {
        router.push({
          path:'/pc/'+name,
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