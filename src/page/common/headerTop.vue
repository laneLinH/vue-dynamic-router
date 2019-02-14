<template>
  <el-header :span="24">
    <el-row class="el-col-4 logo">
      干部管理系统
    </el-row>
    <el-row class="el-col-14 head-nav"></el-row>
    <el-row class="el-col-8 userinfo">
      <span style="margin-right: 10px">上次登录时间：{{formatDate(lastime)}}</span>
      <span>欢迎您,{{accountName}}</span>
      <el-dropdown  class="right" @command="handleTags">
        <el-button size="mini" type="primary">
          账户操作<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="changepw">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <dynamicButton
        pageNameFlg="headertop"
        ref="changepwButton"
        style="display: none;"
        :btns="btns">
      </dynamicButton>
    </el-row>
  </el-header>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
    export default {
        name: "HeaderTop",
        data(){
            return {
                isShowModal:false,
                 btns:[{
                      type:'primary',isShow:'true',text:'修改密码',optType:'edit',
                      modalOption:{
                        modalType:'editPop',
                            isShowModal:false,
                            modalTitle:"修改密码",
                            btnCenter:false,
                            modalWidth:'400px',
                            btns:[
                            {type:'primary',isShow:true,loading:false,text:'保存',httpUrl:this.$api.sysAccount_changepwd,methods:'post',func:'ok'},
                            {type:'default',isShow:true,loading:false,text:'取消',func:'cancel'}
                        ],
                    },
                      form:{
                          inline:false,
                              labelPosition:'right',
                              labelWidth:'80px',
                              classStr:'dynamic-modal-form-no-inline',
                              formItem:[
                              {type:'input',initValue:null,inputType:'password',key:'oldpassWord',label:'旧密码',classStr:'el-col-24',rules:[ { required: true, message: '请输入旧密码', trigger: 'blur' },{}],placeholder:'请输入旧密码'},
                              {type:'input',initValue:null,inputType:'password',key:'newpassWord',label:'新密码',classStr:'el-col-24',rules:[ { required: true, message: '请输入新密码', trigger: 'blur' }],placeholder:'请输入新密码'},
                              {type:'input',initValue:null,inputType:'password',key:'confirmpassWord',label:'确认密码',classStr:'el-col-24',rules:[ { required: true, message: '请输入确认密码', trigger: 'blur' }],placeholder:'请输入确认密码'},
                          ],
                      }
                  }]
            }
        },
        computed:{
            ...mapGetters(['lastime']),
          accountName(){
              return sessionStorage.getItem('accountName')
          }
        },
      mounted(){
          this.$dynamicBus.$on('reloadTable',(obj)=>{
             if(obj['pageNameFlg']==='headertop'){
                 this.$confirm('为了你的账户安全,修改密码后需要重新登录', '安全提示', {
                     showCancelButton:false,
                     closeOnClickModal:false,
                     confirmButtonText: '知道了',
                     type: 'warning'
                 }).then(() => {
                     this.loginOut()
                 },()=>{
                     this.loginOut()
                 })

             }
          })
      },
      methods:{
        ...mapActions(['loginOut']),
          formatDate(string){
              if(!string){
                  return ''
              }
              return this.$formatDate(parseInt(string),'YYYY-MM-DD HH:mm:ss')
          },
          handleTags(command){
            if(command==='logout'){
                this.loginOut();
            }else if(command==='changepw'){
                this.$refs.changepwButton.$el.querySelectorAll('button')[0].click()
            }
          }
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
