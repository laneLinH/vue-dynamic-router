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
                     >
        </dynamicTable>
      </el-row>
</template>

<script>
    import cadresModal from './cadresModal'
    export default {
        name: "manageOrganization",
        component:{
            cadresModal
        },
        data(){
            return {
                rowData:null,
                pageNameFlg:'manageOrg',
                tableConfig:{
                    httpUrl:this.$api.sysOrganization_orginfos,
                    tableBaseConfig:{
                        tableType:'treeTable',
                        maxHeight:900,
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
                        {prop:'isUser',label:'是否可以拥有此账号',ftLabel:[
                                {tTitle:'可以',state:1,type:'text'},
                                {tTitle:'不可以',state:0,type:'text'}]},
                        {prop:'createDate',label:'创建时间'},
                        {label:'操作',fixed:'right',width:'300',optBtns:[
                                {type:'primary',isShow:false,
                                    dealBtnStatus:{key:'orgType',status:[1]},text:'添加组织',optType:'new',fixParams:{parentId:'orgCode',},methods:'post',
                                    modalOption:{
                                        modalType:'editPop',
                                        isShowModal:false,
                                        modalTitle:"添加组织",
                                        btnCenter:false,
                                        modalWidth:'50%',
                                        btns:[
                                            {type:'primary',isShow:true,loading:false,text:'保存',httpUrl:this.$api.sysOrganization_insertorg,methods:'post',func:'ok'},
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
                                            {type:'select',initValue:'1',options:[{label:'公司',value:'1',id:1},{label:'部门',value:'2',id:2}], key:'orgType',label:'组织类型',classStr:'el-col-10',rules:[ { required: true, message: '请选择组织类型',placeholder:'请选择组织类型', trigger: 'blur' }]},
                                        ],
                                    }
                                },
                                {
                                  type:'primary',isShow:false,dealBtnStatus:{key:'orgType',status:[2]},text:'查看干部',optType:'edit',func:this.checkCadre,
                                    modalOption:{
                                        isShowModal:false,
                                        modalTitle:"干部列表",
                                        btnCenter:true,
                                        modalWidth:'50%',
                                        btns:[
                                            {type:'default',isShow:true,loading:false,text:'关闭',func:'cancel'}
                                        ],
                                    },
                                    form:{
                                        custForm:cadresModal
                                    }
                                },
                                {type:'danger',isShow:false,
                                    dealBtnStatus:{key:'ishasChilren',status:[1]},text:'删除',icon:'fa fa-delete',confirmText:'确定要删除这条数据？',confirmTitle:'删除',optType:'confirm',httpUrl:this.$api.sysOrganization_delcop,fixParams:{orgNo:'orgCode'},methods:'post',
                                },
                                {type:'danger',isShow:false,
                                    dealBtnStatus:{key:'ishasChilren',status:[2]},text:'删除',icon:'fa fa-delete',confirmText:'确定要删除这条数据？',confirmTitle:'删除',optType:'confirm',httpUrl:this.$api.sysOrganization_deldep,fixParams:{orgNo:'orgCode'},methods:'post',
                                },
                            ]
                        }
                    ]
                },
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
        reload(){
          let _th=this
          setTimeout(()=> {
            _th.$refs.manageOrgtable.loadTableData()
          })
        },
        checkCadre(item){
            this.$refs.manageOrgtable.showSelfModal(item)
        },
        getCadreByorgNo(orgNo){
            return new Promise((resolve, reject)=> {
                this.$http.get(this.$api.cadreBase_getcadreByorgNo, {orgNo: orgNo}).then((res) => {
                    resolve(res)
                }, error => {
                    reject()
                })
            })
        },
        dealTableData(tableData){
          if(this.tableConfig.tableBaseConfig.tableType==='treeTable'){
            tableData=this.$refs.manageOrgtable.formatTreeTableData([],[tableData])
          }
          for(let im of tableData){
            if(im.children && im.children.length>0){
                this.$set(im,'ishasChilren',0)
            }else{
                if(im.orgType===1){
                    this.$set(im,'ishasChilren',1)
                }else if(im.orgType===2){
                    this.$set(im,'ishasChilren',2)
                }
            }
          }
          this.$refs.manageOrgtable.loadTable(tableData)
        }
      },

    }
</script>

<style scoped>

</style>
