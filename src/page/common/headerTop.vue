<template>
  <el-header :span="24">
    <el-row class="el-col-4 logo">
      干部系统管理
    </el-row>
    <el-row class="el-col-14 head-nav"></el-row>
    <el-row class="el-col-4 userinfo">
      <span>欢迎您,{{accountName}}</span>
      <el-tooltip  class="right" content="退出" placement="bottom">
        <span class="login-out" @click="loginOut">退出</span>
      </el-tooltip>
    </el-row>
  </el-header>
</template>

<script>
  import {mapActions} from 'vuex'
    export default {
        name: "HeaderTop",
        computed:{
          accountName(){
              return sessionStorage.getItem('accountName')
          }
        },
      methods:{
        ...mapActions(['loginOut'])
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .logo{
    width: 230px;
    line-height: 60px;
    font-size: $logoFontSize;
  }
  .el-header{
    background: $mainColor;
    color: $whiteFontColor;
    line-height: 60px;
  }
  .userinfo{
    float: right;
    .login-out{
        cursor: pointer;
    }
  }
</style>
