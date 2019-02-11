<template>
  <el-row class="">
    <dynamic-form
      ref="manageAccForm"
      :pageNameFlg="pageNameFlg"
      :form="searchForm">
      <el-form-item>
        <el-button type="primary" size="mini"@click="queryForm">查询</el-button>
        <el-button type="primary" size="mini" @click="reset">重置</el-button>
      </el-form-item>
    </dynamic-form>
    <dynamicButton
      :pageNameFlg="pageNameFlg"
      :btns="toolBtns">
    </dynamicButton>
    <dynamicTable ref="manageAccTable"
                  :tableBaseConfig="tableConfig.tableBaseConfig"
                  :tableColumnType="tableConfig.tableColumnType"
                  :tableColumn="tableConfig.tableColumn"
                  :paginationConfig="tableConfig.paginationConfig"
                  :httpUrl="tableConfig.httpUrl"
                  :pageNameFlg="pageNameFlg"
                  @dealTableData="dealTableData"
                  @tableSelection="tableSelection">
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
                {type:'primary',isShow:true,loading:false,text:'保存',httpUrl:this.$api.sysAccount_create,methods:'post',func:'ok'},
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
                {type:'input',initValue:null,inputType:'text',key:'accountPhone',label:'手机号',classStr:'el-col-10',rules:[ { validator:checkMobile, trigger: 'blur' }],placeholder:'请输入手机号'},
                {type:'input',initValue:null,inputType:'text',key:'accountEmail',label:'邮箱',classStr:'el-col-10',rules:[{required: true, message: '请输入邮箱', trigger: 'blur' },{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],placeholder:'请输入邮箱'},
                {type:'input',initValue:null,inputType:'text',key:'nickName',label:'别称',classStr:'el-col-10',rules:[ { required: true, message: '请输入别称', trigger: 'blur' }]},
                {type:'input',initValue:null,key:'remark',label:'备注',classStr:'el-col-10',placeholder:'请输入备注'},
                {type:'input',initValue:null,key:'sorgName',label:'所在组织名称',classStr:'el-col-10',rules:[{ required: true, message: '请输入所在组织名称', trigger: 'blur' }],placeholder:'请输入所在组织名称'},
                {type:'input',initValue:null,inputType:'text',key:'sorgNo',label:'所在组织编号',rules:[ { required: true, message: '请输入所在组织编号', trigger: 'blur' }],classStr:'el-col-10'}
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
          {type:'primary',isShow:'true',text:'删除帐号',optType:'confirm',httpUrl:this.$api.sysAccount_delete,methods:'post',confirmText:'确定要删除这条数据？',confirmTitle:'删除',fixParams:{accountId:null}}
        ],
        tableConfig:{
          httpUrl:this.$api.sysAccount_pagelist,
          tableBaseConfig:{
            tableColumnType:'selection',
            maxHeight:600,
            isStripe:true,
            showHeader:true,
            rowStyle:null,
            tooltipEffect:'light'
          },
          paginationConfig:{
            pageNo:1,
            pageSize:10,
            pageSizes:[10,30,50,70,100],
            total:0
          },
          tableColumn: [
            // {prop:'accountId',label:'帐号id',},
            {prop:'',label:'序号',tableColumnType:'selection',fixed:'left'},
            {prop:'accountName',label:'帐号名称',fixed:''},
            {prop:'accountPhone',label:'手机'},
            {prop:'accountEmail',label:'邮箱'},
            // {prop:'accountPassward',label:'帐号密码'},
            {prop:'nickName',label:'别称'},
            {prop:'createDate',label:'创建时间'},
            {prop:'updateDate',label:'更新时间'},
            {prop:'remark',label:'备注'},
            {prop:'sorgNo',label:'组织编号'},
            {prop:'valid',label:'帐号状态',ftLabel:[
                {tTitle:'可用',state:1,type:'primary'},
                {tTitle:'禁用',state:0,type:'primary'}]
            },
            // {label:'操作',fixed:'right',width:'300',optBtns:[
            //     {type:'primary',isShow:'true',text:'编辑',optType:'edit',httpUrl:'',},
            //     {type:'danger',isShow:'true',text:'删除',icon:'fa fa-delete',httpUrl:'/system/account/list',optType:'confirm',confirmText:'确定要删除这条数据？',confirmTitle:'删除'}
            //   ]
            // }
          ]
        },
        rowData:[]
      }
    },
    mounted(){
      this.$dynamicBus.$on('reloadTable',(val)=>{
        if(this.pageNameFlg===val.pageNameFlg){
          this.reload()
        }
      })
    },
    methods:{
      reset(){
        this.$refs.manageAccForm.resetForm()
        this.$refs.manageAccTable.loadTableData()
      },
      queryForm(){
        this.$refs.manageAccForm.queryForm((formData)=>{
          this.$refs.manageAccTable.loadTableData(formData)
        })
      },
      reload(){
        let _th=this
        setTimeout(()=> {
          _th.$refs.manageAccTable.loadTableData()
        })
      },
      dealTableData(tableData){
        // this.getAccount(queryData)
        this.$refs.manageAccTable.loadTable(tableData)
      },
      tableSelection(val){
        this.rowData=val
      }
    }
  }
</script>
