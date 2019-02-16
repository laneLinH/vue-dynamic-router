<template>
    <div class="login-warp">
        <div class="logo">
            <img src="/img/logo.png"/>
        </div>
        <div class="login-left"></div>
        <div class="login-right">

            <el-form class="login-form" ref="loginForm"  :model="loginForm" :rules="loginRule" >
                <h5 class="login-title">用户登录</h5>
            <el-form-item  prop="accountName">
            <el-input type="text" v-model="loginForm.accountName" placeholder="用户名">
            </el-input>
            </el-form-item>
            <el-form-item  prop="accountPassward">
            <el-input class="input" type="password"  v-model="loginForm.accountPassward" placeholder="密码">
            </el-input>
            </el-form-item>
            <span class="pw-tip">
                <el-checkbox v-model="rememberpw">记住密码</el-checkbox>   <i>忘记密码？</i>
            </span>
            <el-form-item class="text-center">
            <el-button type="primary" @click="onSubmit('loginForm')" size="medium">登录</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
  import {mapActions,mapState} from 'vuex'
    export default {
      name:'login',
      data(){
          return {
              rememberpw:false,
              loginForm: {
                  accountName: null,
                  accountPassward: null,
              },
              loginRule:{
                  accountName: [
                      { required: true, message: '请输入用户名', trigger: 'blur' },
                  ],
                  accountPassward: [
                      { required: true, message: '请输入密码', trigger: 'blur' },
                  ]
              }
          }
        },
      computed:{
        ...mapState(['menu'])
      },
      mounted(){
        sessionStorage.clear()
        let _th=this
        document.onkeydown=function(event) {
          var et = event || window.event || arguments.callee.caller.arguments[0];
          if(et.keyCode===13){
            _th.onSubmit('loginForm')
          }
        }
        this.loginForm.accountName=this.getCookie('accountName')||null
        this.loginForm.accountPassward=this.getCookie('accountPassward')||null
         this.rememberpw= this.getCookie('rememberpw')==='true'

      },
      methods:{
        ...mapActions(['loginIn','getMenuList','configRoute']),
          getCookie(name) {
              var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
              arr = document.cookie.match(reg)
             return arr? arr[2]: null;
          },
          setCookie (name, value, expiredays) {
              var exdate = new Date();
              exdate.setDate(exdate.getDate() + expiredays);
              document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
          },
          delCookie (name) {
              var exp = new Date();
              exp.setTime(exp.getTime() - 1);
              var cval = this.getCookie(name);
              if (cval != null)
                  document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        },
        onSubmit(loginForm){
          this.$refs[loginForm].validate((valid,callback) => {
            if (valid) {
                if(this.rememberpw){
                    this.setCookie('accountName',this.loginForm.accountName)
                    this.setCookie('accountPassward',this.loginForm.accountPassward)
                    this.setCookie('rememberpw',this.rememberpw)
                }else{
                    this.delCookie('accountName')
                    this.delCookie('accountPassward')
                    this.delCookie('rememberpw')
                }

              this.loginIn(this.loginForm).then((res)=>{
                if(res.success){
                  if(this.menu.routes){
                    this.getMenuList()
                    this.configRoute()
                    this.$router.addRoutes(this.menu.routes)
                  }
                  this.$router.push('/manageCadres/manageArchive')
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
        display: flex;
    }
    .login-right{
       width: 420/1920*100%;
        position: relative;
        background: url("/img/login-right.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        .login-form{
            position: absolute;
            left: 50%;
            top: 50%;
            width: 65%;
            transform: translate(-50%,-52%);
            z-index: 1;
        }
        .pw-tip{
            margin: 10px 0;
            display: flex;
            justify-content: space-between;
            color: white;
           font-size: 12px;
            label{
                color: white;
            }
            i{
                font-style:normal;
            }
        }
        .login-title{
            margin-bottom: 10px;
            font-size: 24px;
            text-align: center;
            color: #fafafa;
        }
    }
    .login-left{
        width: 1500/1920*100%;
        background: url(/img/login-left.png) no-repeat;
        background-size: 100% 100%;
    }
  .text-center{
    text-align: center;
  }
    .logo{
        user-select: none;
        width: 200px;
        position: absolute;
        left: 35px;
        top:35px;
        img{
            max-width: 100%;
        }
    }
</style>
