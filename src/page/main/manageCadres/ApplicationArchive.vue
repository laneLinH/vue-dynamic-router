<template>
    <el-row class="">
      <dynamic-form
          ref="appArchForm"
          :pageNameFlg="pageNameFlg"
          :form="searchForm">
        <el-form-item>
          <el-button type="primary" size="mini"@click="queryForm">查询</el-button>
          <el-button type="primary" size="mini" @click="reset">重置</el-button>
        </el-form-item>
      </dynamic-form>
      <dynamicTable ref="appArchTable"
                    :pageNameFlg="pageNameFlg"
                    :tableBaseConfig="tableConfig.tableBaseConfig"
                    :tableColumnType="tableConfig.tableColumnType"
                    :tableColumn="tableConfig.tableColumn"
                    :paginationConfig="tableConfig.paginationConfig"
                    :httpUrl="tableConfig.httpUrl"
                    @dealTableData="dealTableData"
                    @tableSelection="tableSelection">
      </dynamicTable>
    </el-row>
  </template>

  <script>
      import  auditApp from '@/page/main/manageCadres/auditApp'
      export default {
        name: "ApplicationArchive",
        data(){
            return{
              searchForm:{
                 inline:true,
                 formItem:[
                   {type:'input',initValue:null,inputType:'text',key:'cadreName',label:'',placeholder:'请输入干部姓名'},
                   {type:'input',initValue:null,inputType:'text',key:'fulltimeEducation',label:'',placeholder:'请输入干部学历'},
                 ]
               },
              pageNameFlg:'ApplicationArchive',
              tableConfig:{
                httpUrl:'/cadreBase/pageauditlist',
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
                  // {type:'primary',isShow:false,status:{key:'state',state:[7]},text:'修改',icon:'fa fa-plus',optType:'edit',httpUrl:'/cadreBase/curentinfo',fixParams:{cadreId:null},
                  //       modalOption:{
                  //                     modalType:'editPop',
                  //                     isShowModal:false,
                  //                     btnLoading:true,
                  //                     modalTitle:"修改",
                  //                     btnCenter:false,
                  //                     modalWidth:'50%',
                  //                     okText:'保存',
                  //                     cancelText:'取消'
                  //                   },
                  //           form:{
                  //             custForm:cadresFormComponents,
                  //           }
                  // },
                  {type:'primary',isShow:false,dealBtnStatus:{key:'state',status:[1]},text:'审核',optType:'edit',httpUrl:'/cadreBase/curentinfo',fixParams:{cadreId:null},
                    modalOption:{
                      modalType:'editPop',
                      isShowModal:false,
                      btnLoading:true,
                      modalTitle:"审核",
                      btnCenter:true,
                      modalWidth:'50%',
                      cancelText:'关闭'
                    },
                    form:{
                      custForm:auditApp,
                    }
                  },
                  {type:'danger',isShow:false,text:'删除',dealBtnStatus:{key:'state',status:[]},icon:'fa fa-delete',httpUrl:'/cadreBase/delete',fixParams:{cadreId:null},optType:'confirm',confirmText:'确定要删除这条数据？',confirmTitle:'删除'}
                    ]
                  }
                ]
              }
            }
        },
        computed:{
          rowData(){
            for(let k of this.dynamicVx.optData){
              debugger
              if(k.name===this.pageNameFlg){
                return k.data['rowData']||null
              }
            }
            return null
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
            this.$refs.appArchForm.resetForm()
            this.$refs.appArchTable.loadTableData()
          },
          reload(){
            this.$refs.appArchTable.loadTableData()
          },
          queryForm(){
            this.$refs.appArchForm.queryForm((formData)=>{
              this.$refs.appArchTable.loadTableData(formData)
            })
          },
          dealTableData(tableData){
            let date=['cadreBirthday']
            for(let im of tableData){
              im=this.$dealTableDate(date,im,'YYYYMM')
              this.$set(im,'rowId',im.id)
            }
            this.$refs.appArchTable.loadTable(tableData)
          },
          tableClickHandler(val){
            console.log(val)
          },
          tableSelection(val){
            this.rowData=val
          }
        },
         components:{
           auditApp
         }
      }
  </script>
