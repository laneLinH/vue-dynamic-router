<template>
  <el-row class="">
    <dynamic-form
      ref="manageAccForm"
      :pageNameFlg="pageNameFlg"
      :form="searchForm">
      <el-form-item>
        <el-button type="primary" size="mini"@click="queryForm">查询</el-button>
        <el-button type="default" size="mini" @click="reset">重置</el-button>
      </el-form-item>
    </dynamic-form>
    <dynamicButton
      :pageNameFlg="pageNameFlg"
      :btns="toolBtns">
    </dynamicButton>
    <dynamicTable ref="manageAccTable"
                  class="table-outer-border"
                  :tableBaseConfig="tableConfig.tableBaseConfig"
                  :tableColumnType="tableConfig.tableColumnType"
                  :tableColumn="tableConfig.tableColumn"
                  :paginationConfig="tableConfig.paginationConfig"
                  :httpUrl="tableConfig.httpUrl"
                  :pageNameFlg="pageNameFlg"
                  @dealTableData="dealTableData">
    </dynamicTable>
  </el-row>
</template>

<script>
  import {checkMobile} from '@/utils/tools'
  export default {
    name: "manageAccount",
    data(){
      return{
        pageNameFlg:'manageAcc',
        searchForm:{
          inline:true,
          formItem:[
            {type:'input',initValue:null,inputType:'text',key:'accountName',label:'',placeholder:'请输入账户名称'},
            {type:'input',initValue:null,inputType:'text',key:'nickName',label:'',placeholder:'请输入别名'},
          ]
        },
        toolBtns:[
          {type:'primary',isShow:'true',text:'创建帐号',icon:'fa fa-plus',optType:'new',
            modalOption: {
              modalType:'newPop',
              isShowModal:false,
              modalTitle:"创建帐号",
              btnCenter:false,
              modalWidth:'50%',
              btns:[
                {type:'primary',isShow:true,loading:false,text:'保存',httpUrl:this.$api.sysAccount_create,methods:'post',func:this.createAccount},
                {type:'default',isShow:true,loading:false,text:'取消',func:'cancel'}
              ],
            },
            form:{
              inline:false,
              labelPosition:'right',
              labelWidth:'150px',
              classStr:'dynamic-modal-form-no-inline',
              formItem:[
                {type:'input',initValue:null,inputType:'text',key:'accountName',label:'帐号',classStr:'el-col-10',rules:[ { required: true, message: '请输入帐号',placeholder:'请输入帐号', trigger: 'blur' }]},
                {type:'input',initValue:null,inputType:'password',key:'accountPassward',label:'密码',classStr:'el-col-10',rules:[ { required: true, message: '请输入密码',placeholder:'请输入密码', trigger: 'blur' }]},
                {type:'input',initValue:null,inputType:'text',key:'accountPhone',label:'手机号',classStr:'el-col-10',rules:[{ required: true, message: '请输入手机号码',trigger: 'blur' },{ validator:checkMobile, trigger: 'blur' }],placeholder:'请输入手机号'},
                {type:'input',initValue:null,inputType:'text',key:'accountEmail',label:'邮箱',classStr:'el-col-10',rules:[{required: true, message: '请输入邮箱', trigger: 'blur' },{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],placeholder:'请输入邮箱'},
                {type:'input',initValue:null,inputType:'text',key:'nickName',label:'别称',classStr:'el-col-10',rules:[ { required: true, message: '请输入别称', trigger: 'blur' }]},
                {type:'input',initValue:null,key:'remark',label:'备注',classStr:'el-col-10',placeholder:'请输入备注'},
                {type:'input',initValue:null,inputType:'hidden',key:'sorgNo',hidden:true},
                {type:'input',initValue:null,inputType:'hidden',key:'sorgName',hidden:true}
              ],
            }
          },
          {type:'primary',isShow:'true',text:'修改密码',optType:'edit',
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
          },
          {type:'primary',isShow:'true',text:'删除帐号',optType:'confirm',httpUrl:this.$api.sysAccount_batchdel,methods:'postNoJson',confirmText:'确定要删除？',confirmTitle:'删除',fixParams:{idList:'accountId'}}
        ],
        tableConfig:{
          httpUrl:this.$api.sysAccount_pagelist,
          tableBaseConfig:{
            tableColumnType:'selection',
            maxHeight:900,
            isStripe:true,
            showHeader:true,
            rowStyle:null,
            tooltipEffect:'light',
            isShowPagination:true
          },
          paginationConfig:{
            pageNo:1,
            pageSize:10,
            pageSizes:[10,30,50,70,100],
            total:0
          },
          tableColumn: [
            {prop:'',label:'序号',tableColumnType:'selection',fixed:'left'},
            {prop:'accountName',label:'帐号名称',fixed:''},
            {prop:'accountPhone',label:'手机'},
            {prop:'accountEmail',label:'邮箱'},
            {prop:'nickName',label:'别称'},
            {prop:'createDate',label:'创建时间'},
            {prop:'remark',label:'备注'},
            {prop:'sorgName',label:'所属组织'},
            {prop:'state',label:'帐号状态',ftLabel:[
                {tTitle:'启用',state:1,type:'primary'},
                {tTitle:'冻结',state:0,type:'primary'},
                {tTitle:'冻结',state:null,type:'primary'}]
            },
              {
                label:'操作',fixed:'right',width:'200',optBtns:
                [
                  {type:'primary',isShow:false,dealBtnStatus:{key:'state',status:[0]},text:'启用',optType:'confirm',fixParams:{accountId:null},httpUrl:this.$api.sysAccount_reactive,methods:'post',confirmText:'确定要启用此帐号？',confirmTitle:'提示'
                  },
                  {type:'primary',isShow:false,dealBtnStatus:{key:'state',status:[1]},text:'冻结',optType:'confirm',fixParams:{accountId:null},httpUrl:this.$api.sysAccount_frozen,methods:'post',confirmText:'确定要冻结此帐号？',confirmTitle:'提示'
                  },
                    {type:'danger',isShow:false,text:'删除',dealBtnStatus:{key:'state',status:[0]},optType:'confirm',fixParams:{accountId:null},httpUrl:this.$api.sysAccount_delete,methods:'post',confirmText:'确定要删除此帐号？',confirmTitle:'删除'
                    },
                ]
              }
            ]
        },
        rowData:[],
        orgdata:[],
        sorgNo:null,
        sorgName:null
      }
    },
    mounted(){
      this.$dynamicBus.$on('reloadTable',(val)=>{
        if(this.pageNameFlg===val.pageNameFlg){
          this.reload()
        }
      })
        this.getorg()
    },
    methods:{
      dealorgData(obj,orgCode){
         if(this.$typeOf(obj) ==='object'){
             if(obj.orgCode===orgCode){
                 this.sorgName=obj.orgName
             }
             if(!obj.children) {
                 return;
             }
             for(let im of obj.children){
                 this.dealorgData(im,orgCode)
             }
         }
      },
      getorg(){
          this.$http.get(this.$api.sysOrganization_copinfos).then((res) => {
            if(res.success){
                this.orgdata=res.data
                this.toolBtns[0].form.formItem.push(
                    {type:'selectCascader',key:'orgs',props:{value:'orgCode',label:'orgName',children:'children'},changefuc:this.orgchange,options:[this.orgdata],changeOnSelect:true, label:'所在组织名称',classStr:'el-col-10',rules:[{ required: true, message: '请选择组织', trigger: ['blur','change'] }],placeholder:'请选择组织'},
                )
            }
          })
      },
      orgchange(val,item){
        this.sorgNo=val[val.length-1]
        this.dealorgData(this.orgdata,this.sorgNo)
      },
      createAccount(item,dom){
          delete dom.formData.orgs;
          this.$set(dom.formData,'sorgNo',this.sorgNo)
          this.$set(dom.formData,'sorgName',this.sorgName)
          dom.submitData(item)
      },
      reset(){
        this.$refs.manageAccForm.resetForm()
        this.$refs.manageAccTable.refresh()
      },
      queryForm(){
        this.$refs.manageAccForm.queryForm((formData)=>{
          this.$refs.manageAccTable.loadTableData(formData)
        })
      },
      reload(){
        let _th=this
        setTimeout(()=> {
          _th.$refs.manageAccTable.refresh()
        })
      },
      dealTableData(tableData){
          tableData=tableData.data
        this.$refs.manageAccTable.loadTable(tableData)
      }
    }
  }
</script>
