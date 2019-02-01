<template>
      <el-row>
        <dynamicTable ref="manageOrgtable"
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
    export default {
        name: "ManageOrganization",
        data:()=>({
          rowData:null,
          pageNameFlg:'manageOrg',
          tableConfig:{
            httpUrl:'/cad/sysOrganization/orginfos',
            tableBaseConfig:{
              tableType:'treeTable',
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
            tableColumn: [
              {prop:'',label:'序号',tableColumnType:'index',fixed:'left'},
              {prop:'orgName',label:'组织名称',isTree:true,fixed:'left'},
              {prop:'orgId',label:'组织id'},
              {prop:'orgCode',label:'组织代码'},
              {prop:'orgType',label:'组织类型',ftLabel:[
                  {tTitle:'公司',state:1,type:'primary'},
                  {tTitle:'部门',state:2,type:'primary'}]},
              {prop:'isUser',label:'账户权限',ftLabel:[
                {tTitle:'用户',state:1,type:'primary'},
                {tTitle:'管理',state:0,type:'primary'}]},
              {prop:'parentId',label:'更新时间'},
              {prop:'createDate',label:'创建时间'},
              {prop:'updateDate',label:'更新时间'},
              {label:'操作',fixed:'right',width:'300',optBtns:[
                  {type:'primary',isShow:false,
                    dealBtnStatus:{key:'orgType',status:[1]},text:'添加公司',optType:'new',fixParams:{parentId:'orgCode',},methods:'post',
                    modalOption:{
                      modalType:'editPop',
                      isShowModal:false,
                      modalTitle:"添加公司",
                      btnCenter:false,
                      modalWidth:'50%',
                      btns:[
                        {type:'primary',isShow:true,loading:false,text:'保存',httpUrl:'/cad/sysOrganization/insertcop',methods:'post',func:'ok'},
                        {type:'default',isShow:true,loading:false,text:'取消',func:'cancel'}
                      ],
                    },
                    form:{
                      inline:false,
                      labelPosition:'right',
                      labelWidth:'150px',
                      classStr:'dynamic-modal-form-no-inline',
                      formItem:[
                        {type:'input',initValue:null,inputType:'text',key:'orgName',label:'组织名称',classStr:'el-col-10',rules:[ { required: true, message: '请输入组织名称',placeholder:'请输入组织名称', trigger: 'blur' }]},
                        {type:'select',initValue:'1',options:[{label:'公司',value:'1',id:1}], key:'orgType',label:'组织类型',classStr:'el-col-10',rules:[ { required: true, message: '请选择组织类型',placeholder:'请选择组织类型', trigger: 'blur' }]},
                      ],
                    }
                  },
                  {type:'primary',isShow:false,
                    dealBtnStatus:{key:'orgType',status:[1]},text:'添加部门',optType:'new',fixParams:{parentId:'orgCode'},
                    modalOption:{
                      modalType:'editPop',
                      isShowModal:false,
                      modalTitle:"添加部门",
                      btnCenter:false,
                      modalWidth:'50%',
                      btns:[
                        {type:'primary',isShow:true,loading:false,text:'保存',httpUrl:'/cad/sysOrganization/insertdep',methods:'post',func:'ok'},
                        {type:'default',isShow:true,loading:false,text:'取消',func:'cancel'}
                      ],
                    },
                    form:{
                      inline:false,
                      labelPosition:'right',
                      labelWidth:'150px',
                      classStr:'dynamic-modal-form-no-inline',
                      formItem:[
                        {type:'input',initValue:null,inputType:'text',key:'orgName',label:'组织名称',classStr:'el-col-10',rules:[ { required: true, message: '请输入组织名称',placeholder:'请输入组织名称', trigger: 'blur' }]},
                        {type:'select',initValue:'2',options:[{label:'部门',value:'2',id:2}], key:'orgType',label:'组织类型',classStr:'el-col-10',rules:[ { required: true, message: '请选择组织类型',placeholder:'请选择组织类型', trigger: 'blur' }]},
                      ],
                    }
                  },
                  {type:'danger',isShow:false,
                    dealBtnStatus:{key:'ishasChilren',status:[0]},text:'删除',icon:'fa fa-delete',confirmText:'确定要删除这条数据？',confirmTitle:'删除',optType:'confirm',httpUrl:'/cad/sysOrganization/delcop',fixParams:{orgNo:'orgCode'},methods:'post',
                  },
                ]
              }
            ]
          },
        }),
      mounted(){
        this.$dynamicBus.$on('reloadTable',(val)=>{
          if(this.pageNameFlg===val.pageNameFlg){
            this.reload()
          }
        })
      },
      methods:{
        reload(){
          let _th=this
          setTimeout(()=> {
            _th.$refs.manageOrgtable.loadTableData()
          })
        },
        dealTableData(tableData){
          if(this.tableConfig.tableBaseConfig.tableType==='treeTable'){
            tableData=this.$refs.manageOrgtable.formatTreeTableData([],[tableData])
          }
          for(let im of tableData){
            if(im.children && im.children.length>0){
              this.$set(im,'ishasChilren',1)
            }else{
              this.$set(im,'ishasChilren',0)
            }
            // this.$set(im,'_rowId',im.orgId)
          }
          this.$refs.manageOrgtable.loadTable(tableData)
        },
        tableSelection(val){
          this.rowData=val
        }
      },

    }
</script>

<style scoped>

</style>
