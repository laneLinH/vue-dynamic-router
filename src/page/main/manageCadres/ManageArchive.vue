<template>
  <el-row class="">
    <dynamicForm
      ref="appArchForm"
      :form="searchForm">
      <el-form-item>
        <el-button type="primary" size="mini"@click="queryForm">查询</el-button>
        <el-button type="primary" size="mini" @click="reset">重置</el-button>
      </el-form-item>
    </dynamicForm>
    <dynamicButton
      toolType="tool"
      :pageNameFlg="pageNameFlg"
      :btns="toolbtns">
    </dynamicButton>
    <dynamicTable ref="manageArchTable"
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

  import cadresFormComponents from './cadresFormComponents'
  import detail from './detail'
  import {vimDownFile} from '@/utils/tools'
  export default {
    name: "ManageArchive",
    data(){
      return{
        // form:{
        //   inline:true,
        //   labelPosition:'right',
        //   formItem:[
        //     {type:'select',initValue:null,label:'单选选择框',name:'value1',placeholder:'请选择vue1',rules:[],options:[{id:1,value:'1',label:'选项1'},{id:2,value:'2',label:'选项2'}]},
        //     {type:'select',initValue:[],label:'多选选择框',name:'value2',multiple:true,collapseTags:true,placeholder:'请选择vue2',rules:[],options:[{id:1,value:'1',label:'选项1'},{id:2,value:'2',label:'选项2'}]},
        //     {type:'input',initValue:null,inputType:'text',name:'username',label:'姓名'},
        //     {type:'date',initValue:new Date(),dateType:'date',name:'date',label:'时间',placeholder:'请选择时间'},
        //     {type:'date',initValue:new Date(),dateType:'date',name:'date1',label:'时间',placeholder:'请选择时间'}
        //     ],
        // },
        searchForm:{
          inline:true,
          formItem:[
            {type:'input',initValue:null,inputType:'text',key:'cadreName',label:'',placeholder:'请输入干部姓名'},
            {type:'input',initValue:null,inputType:'text',key:'fulltimeEducation',label:'',placeholder:'请输入干部学历'},
          ]
        },
        toolbtns:[
          {type:'primary',isShow:'true',text:'导出excel',optType:'cust',httpUrl:this.$api.cadreBase_exportexcel,methods:'post',func:this.exportExcel},
          {type:'primary',isShow:'true',text:'新增',icon:'fa fa-plus',optType:'new',
            modalOption: {
              isShowModal:false,
              modalTitle:"干部信息",
              btnCenter:false,
              modalWidth:'50%',
              btns:[
                {type:'primary',isShow:true,loading:false,text:'暂存',httpUrl:this.$api.cadreBase_savetemp,methods:'postFormData',func:this.zancun},
                {type:'primary',isShow:true,loading:false,text:'保存',httpUrl:this.$api.cadreBase_insert,methods:'postFormData',func:'ok'},
                {type:'default',isShow:true,loading:false,text:'取消',func:'cancel'}
              ]
            },
            form:{
              custForm:cadresFormComponents,
            }
          }
        ],
        pageNameFlg:'manangeArch',
        tableConfig:{
          httpUrl:this.$api.cadreBase_pagelist,
          tableBaseConfig:{
            tableType:'table',
            height:500,
            maxHeight:500,
            isStripe:true,
            showHeader:true,
            tooltipEffect:'light'
          },
          paginationConfig:{
            pageNo:1,
            pageSize:10,
            pageSizes:[10,30,50,70,100],
            total:0
          },
          tableColumnType:'selection',
          tableColumn: [
            {prop:'cadreName',label:'姓名',fixed:''},
            {prop:'cadreSex',label:'性别'},
            {prop:'cadreBirthday',label:'出生日期'},
            {prop:'cadreNation',label:'民族'},
            {prop:'uploadDepartment',label:'呈报单位'},
            {prop:'curentDuties',label:'现任职务'},
            {prop:'fulltimeEducation',label:'全日制学历'},
            {prop:'highestProfessional',label:'专业'},
            {prop:'state',label:'档案状态',ftLabel:[
                {tTitle:'待审核',state:1,type:'primary'},
                {tTitle:'待提交',state:7,type:'primary'},
                {tTitle:'已归档',state:2,type:'primary'},
                {tTitle:'审核未通过',state:3,type:'danger'},
                {tTitle:'申请修改',state:4,type:'primary'}]},
                {label:'操作',fixed:'right',width:'200',optBtns:[
                    {type:'primary',isShow:false,
                      dealBtnStatus:{key:'state',status:[7]},text:'修改',optType:'edit',fixParams:{cadreId:null},methods:'postFormData',
                      modalOption:{
                        modalType:'editPop',
                        isShowModal:false,
                        btnLoading:true,
                        modalTitle:"修改",
                        btns:[
                          {type:'primary',isShow:true,text:'暂存',loading:false,httpUrl:this.$api.cadreBase_savetemp,methods:'postFormData',func:this.zancun},
                          {type:'primary',isShow:true,text:'保存',loading:false,httpUrl:this.$api.cadreBase_insert,methods:'postFormData',func:'ok'},
                          {type:'default',isShow:true,text:'取消',loading:false,func:'cancel'}
                        ],
                        btnCenter:false,
                        modalWidth:'50%',
                        okText:'保存',
                        cancelText:'取消'
                      },
                      form:{
                        custForm:cadresFormComponents,
                      }
                    },
                    {type:'primary',isShow:false,dealBtnStatus:{key:'state',status:[2]},text:'查看',optType:'edit',fixParams:{cadreId:null},
                      modalOption:{
                        modalType:'editPop',
                        isShowModal:false,
                        modalTitle:"查看",
                        btnCenter:true,
                        modalWidth:'50%',
                        btns:[
                          {type:'primary',isShow:true,text:'打印',loading:false,func:this.doPrint},
                          {type:'default',isShow:true,text:'关闭',loading:false,func:'cancel'},
                        ],
                      },
                      form:{
                        custForm:detail,
                      }
                    },
                    {type:'danger',isShow:false,dealBtnStatus:{key:'state',status:[7,3]},text:'删除',optType:'confirm',methods:'post',httpUrl:this.$api.cadreBase_delete,fixParams:{cadreId:null},confirmText:'确定要删除这条数据？',confirmTitle:'删除',
                    },
                    // {type:'danger',isShow:false,text:'查看', dealBtnStatus:{key:'state',status:[2]},icon:'fa fa-delete',httpUrl:'/cadreBase/delete',fixParams:{cadreId:null},optType:'confirm',confirmText:'确定要删除这条数据？',confirmTitle:'删除'}
                  ]
                }
          ]
        }
      }
    },
    mounted(){
      this.$dynamicBus.$on('reloadTable',(val)=>{
        if(this.pageNameFlg===val.pageNameFlg){
          this.reload()
        }
      })
    },
    computed:{
      queryFormData(){
        return this.$refs.manageArchTable.getQueryData()
      },
    },
    methods:{
      vimDownFile,
      zancun(item,dom){
        dom.custFormevent((params)=>{
          item.loading=true
          this.$http[item.methods](item.httpUrl,params).then((res)=>{
            item.loading=false
            if(res.success){
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 5 * 1000
              })
              this.$dynamicBus.$emit('reloadTable',{pageNameFlg:this.pageNameFlg})
              return false
            }else{
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 5 * 1000
              })
              return true
            }
          })
        })
      },
      doPrint(item,dom){
        dom.doPrint()
        return true
      },
      exportExcel(item){
        this.vimDownFile(item.httpUrl,this.queryFormData)
      },
      reset(){
        this.$refs.appArchForm.resetForm()
        this.$refs.manageArchTable.loadTableData()
      },

      queryForm(){
        this.$refs.appArchForm.queryForm((formData)=>{
          this.$refs.manageArchTable.loadTableData(formData)
        })
      },
      reload(){
        let _th=this
        setTimeout(()=> {
          _th.$refs.manageArchTable.loadTableData()
        })

      },
      dealTableData(tableData){
        let date=['cadreBirthday']
        for(let im of tableData){
          im=this.$dealTableDate(date,im,'YYYYMM')
          this.$set(im,'rowId',im.id)
        }
        this.$refs.manageArchTable.loadTable(tableData)
      },
      tableClickHandler(val){
        console.log(val)
      }
    },
    components:{
      detail,
      cadresFormComponents
    }
  }
</script>
