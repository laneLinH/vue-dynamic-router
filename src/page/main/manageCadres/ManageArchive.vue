<template>
  <el-row class="">
    <dynamic-form
      ref="appArchForm"
      :form="searchForm">
      <el-form-item>
        <el-button type="primary" size="mini"@click="queryForm">查询</el-button>
        <el-button type="primary" size="mini" @click="reset">重置</el-button>
      </el-form-item>
    </dynamic-form>
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
                  @dealTableData="dealTableData"
                  @tableSelection="tableSelection">
    </dynamicTable>
  </el-row>
</template>

<script>

  import  cadresFormComponents from '@/page/main/manageCadres/cadresFormComponents'
  import detail from './detail'
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
        // toolBtns:[
        //   {type:'primary',isShow:'true',text:'新增',icon:'fa fa-plus',optType:'new',httpUrl:'/system/account/list',
        //     modalOption: {
        //       modalType:'newPop',
        //       isShowModal:false,
        //       btnLoading:false,
        //       modalTitle:"新增",
        //       btnCenter:false,
        //       modalWidth:'50%',
        //       okText:'保存',
        //       cancelText:'取消'
        //     },
        //     form:{
        //       inline:false,
        //       labelPosition:'right',
        //       labelWidth:'150px',
        //       classStr:'dynamic-modal-form-no-inline',
        //       formItem:[
        //         {type:'input',initValue:null,inputType:'text',name:'username',label:'姓名',classStr:'el-col-10',rules:[ { required: true, message: '请输入姓名', trigger: 'blur' }]},
        //         {type:'select',initValue:null,inputType:'text',name:'sex',label:'性别',classStr:'el-col-10',rules:[ { required: true, message: '请选择性别', trigger: 'blur' }],options:[{label:'男',value:'男',id:1},{label:'女',value:'女',id:2}]},
        //         {type:'date',initValue:null,dateType:'date',name:'date',label:'出生日期',classStr:'el-col-10',rules:[ { required: true, message: '请选择出生日期', trigger: 'blur' }],placeholder:'请选择时间'},
        //         {type:'select',initValue:null,inputType:'text',name:'mizhu',label:'民族',classStr:'el-col-10',rules:[ { required: true, message: '请选择民族', trigger: 'blur' }],options:[{label:'汉族',value:'汉族',id:1},{label:'回族',value:'回族',id:2},{label:'朝鲜族',value:'朝鲜族',id:3},{label:'维吾尔族',value:'维吾尔族',id:4}]},
        //         {type:'input',initValue:null,inputType:'text',name:'jiguan',label:'籍贯',classStr:'el-col-10',rules:[ { required: true, message: '请输入籍贯', trigger: 'blur' }]},
        //         {type:'date',initValue:null,dateType:'date',name:'rdsj',label:'入党时间',classStr:'el-col-10',rules:[ { required: true, message: '请选择入党时间', trigger: 'blur' }],placeholder:'请选择时间'},
        //         {type:'date',initValue:null,dateType:'date',name:'cjgzsj',label:'参加工作时间',rules:[ { required: true, message: '请选择参加工作时间', trigger: 'blur' }],classStr:'el-col-10',placeholder:'请选择时间'},
        //         {type:'input',initValue:null,inputType:'text',name:'jkzk',label:'健康状况',rules:[ { required: true, message: '请输入健康状况', trigger: 'blur' }],classStr:'el-col-10', maxlength:'18'},
        //         {type:'input',initValue:null,inputType:'text',name:'zyjszw',classStr:'el-col-10',rules:[ { required: true, message: '请输入专业技术职务', trigger: 'blur' }],label:'专业技术职务'},
        //         {type:'input',initValue:null,inputType:'text',name:'sxzyyhzc',classStr:'el-col-10',label:'熟悉专业有何专长',rules:[ { required: true, message: '请输入熟悉专业有何专长', trigger: 'blur' }]},
        //       ],
        //     }
        //     },
        //   {type:'primary',isShow:'true',text:'编辑',icon:'',optType:'edit',modalType:'editPop', httpUrl:'/system/account/list',
        //     modalOption: { modalType:'editPop',
        //       isShowModal:false,
        //       btnLoading:false,
        //       modalTitle:"编辑",
        //       btnCenter:false,
        //       modalWidth:'50%',
        //       okText:'保存',
        //       cancelText:'取消'
        //     },
        //     form:{
        //       inline:false,
        //       labelPosition:'right',
        //
        //       formItem:[
        //         {type:'select',initValue:null,label:'单选选择框',name:'value1',placeholder:'请选择vue1',rules:[],options:[{id:1,value:'1',label:'选项1'},{id:2,value:'2',label:'选项2'}]},
        //         {type:'select',initValue:[],label:'多选选择框',name:'value2',multiple:true,collapseTags:true,placeholder:'请选择vue2',rules:[],options:[{id:1,value:'1',label:'选项1'},{id:2,value:'2',label:'选项2'}]},
        //         {type:'input',initValue:null,inputType:'text',name:'username',label:'姓名'},
        //         {type:'date',initValue:new Date(),dateType:'date',name:'date',label:'时间',placeholder:'请选择时间'},
        //         {type:'date',initValue:new Date(),dateType:'date',name:'date1',label:'时间',placeholder:'请选择时间'}
        //       ],
        //     }
        //    },
        //   {type:'primary',isShow:'true',text:'删除',icon:'',optType:'confirm'},
        //   {type:'primary',isShow:'true',text:'查询',icon:'',optType:'cust',evtBkFg:'queryForm'},
        //   {type:'primary',isShow:'true',text:'重置',icon:'',optType:'cust',evtBkFg:'resetForm'}
        // ],
        searchForm:{
          inline:true,
          formItem:[
            {type:'input',initValue:null,inputType:'text',key:'cadreName',label:'',placeholder:'请输入干部姓名'},
            {type:'input',initValue:null,inputType:'text',key:'fulltimeEducation',label:'',placeholder:'请输入干部学历'},
          ]
        },
        toolbtns:[
          {type:'primary',isShow:'true',text:'新增',icon:'fa fa-plus',optType:'new',httpUrl:'/cadreBase/insert',methods:'postFormData',
            modalOption: {
              isShowModal:false,
              btnLoading:false,
              modalTitle:"干部信息",
              btnCenter:false,
              modalWidth:'50%',
              custText:'暂存',
              custUrl:'/cadreBase/savetemp',
              custUrlmethods:'postFormData',
              okText:'保存',
              cancelText:'取消'
            },
            form:{
              custForm:cadresFormComponents,
            }
          }
        ],
        pageNameFlg:'manangeArch',
        tableConfig:{
          httpUrl:'/cadreBase/pagelist',
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
                {type:'primary',isShow:false,onlyFlg:'',
                  dealBtnStatus:{key:'state',status:[7]},text:'修改',optType:'edit',httpUrl:'/cadreBase/insert',fixParams:{cadreId:null},methods:'postFormData',
                  modalOption:{
                    modalType:'editPop',
                    isShowModal:false,
                    btnLoading:true,
                    modalTitle:"修改",
                    custText:'暂存',
                    custUrl:'/cadreBase/savetemp',
                    custUrlmethods:'postFormData',
                    btnCenter:false,
                    modalWidth:'50%',
                    okText:'保存',
                    cancelText:'取消'
                  },
                  form:{
                    custForm:cadresFormComponents,
                  }
                },
                {type:'primary',isShow:false,dealBtnStatus:{key:'state',status:[2]},text:'查看',optType:'edit',httpUrl:'/cadreBase/curentinfo',fixParams:{cadreId:null},
                  modalOption:{
                    modalType:'editPop',
                    isShowModal:false,
                    btnLoading:true,
                    modalTitle:"查看",
                    btnCenter:true,
                    modalWidth:'50%',
                    cancelText:'关闭'
                  },
                  form:{
                    custForm:detail,
                  }
                },
                // {type:'danger',isShow:false,text:'查看', dealBtnStatus:{key:'state',status:[2]},icon:'fa fa-delete',httpUrl:'/cadreBase/delete',fixParams:{cadreId:null},optType:'confirm',confirmText:'确定要删除这条数据？',confirmTitle:'删除'}
              ]
            }
          ]
        },
        rowData:null
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
        this.$refs.manageArchTable.loadTableData()
      },
      queryForm(){
        this.$refs.appArchForm.queryForm((formData)=>{
          this.$refs.manageArchTable.loadTableData(formData)
        })
      },
      reload(){
        // this.$nextTick(()=>{
          this.$refs.manageArchTable.loadTableData()
        // })

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
      },
      tableSelection(val){
        this.rowData=val
      }
    },
    components:{
      detail,
      cadresFormComponents
    }
  }
</script>
