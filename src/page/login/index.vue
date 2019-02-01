<template>
    <div class="login-warp">
        <el-form class="login-form" ref="loginForm"  :model="loginForm" :rules="loginRule" >
            <el-form-item  prop="accountName">
                  <el-input type="text" v-model="loginForm.accountName">
                    <template slot="prepend"><i class="fa fa-user-o"></i></template>
                  </el-input>
            </el-form-item>
            <el-form-item  prop="accountPassward">
              <el-input type="password"  v-model="loginForm.accountPassward">
                <template slot="prepend"><i class="fa fa-key"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item class="text-center">
              <el-button type="primary" @click="onSubmit('loginForm')" size="medium">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import {mapActions,mapState} from 'vuex'
    export default {
      name:'login',
      data:()=>({
        loginForm:{
          accountName:null,
          accountPassward:null
        },
        loginRule:{
          accountName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          accountPassward: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        }

      }),
      computed:{
        ...mapState(['menu'])
      },
      mounted(){
        let _th=this
        document.onkeydown=function(event) {
          var et = event || window.event || arguments.callee.caller.arguments[0];
          if(et.keyCode===13){
            _th.onSubmit('loginForm')
          }
        }
      },
      methods:{
        ...mapActions(['loginIn','getMenuList','configRoute']),
        onSubmit(loginForm){
          this.$refs[loginForm].validate((valid,callback) => {
            if (valid) {
              this.loginIn(this.loginForm).then((res)=>{
                if(res.success){
                  if(this.menu.routes){
                    this.getMenuList()
                    this.configRoute()
                    this.$router.addRoutes(this.menu.routes)
                  }
                  this.$router.push('/manageCadres/ApplicationArchive')
                }else{
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  })
                }
              })
            } else {
              return false;
            }
          });
        }
      }
    }
</script>

<style  rel="stylesheet/scss"  lang="scss" scoped>
    .login-warp{
        width: 100%;
        height: 100%;
        position: relative;
        background: url("/img/login_bg.png") no-repeat;
        .login-form{
          display: inline-block;
          background: rgba(0, 0, 0, 0.52);
          border-radius: 5px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          padding: 20px;
          box-shadow: 0 0 5px 1px #000000;
        }
      .login-title{
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        color: #4dbeff;
      }
    }
  .text-center{
    text-align: center;
  }
</style>
