<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
// 判断是否是手机端
//     if(this._isMobile()){
//       //手机端
//       this.$router.replace("/mobile")
//     }
    // else {
    //   //PC端
    //   this.$router.replace("/pc")
    // }

  },
  methods:{
    // 判断是否是移动端
    // _isMobile(){
    //   let flag = navigator.userAgent.match(
    //       /(phone|pad|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows phone)/i
    //   );
    //   return flag;
    // }
  }

}
</script>

<style lang="less">
html,body,h1,p{
  padding: 0;
  margin: 0;
}
</style>
