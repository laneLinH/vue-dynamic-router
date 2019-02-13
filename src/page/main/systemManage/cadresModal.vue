<template>
    <div>
        <dynamicTable
            v-if="isShowTable"
            ref="cadresModalTable"
            :tableBaseConfig="tableConfig.tableBaseConfig"
            :httpUrl="tableConfig.httpUrl"
            :tableColumn="tableConfig.tableColumn"
            :fixParams="tableConfig.fixParams"
            :pageNameFlg="pageNameFlg"
            @dealTableData="dealTableData">
        </dynamicTable>

    </div>
</template>

<script>
    import detail from '@/page/main/manageCadres/detail'
    import {mapState} from 'vuex'
    export default {
        name: "cadresModal",
        components:{
            detail
        },
        data() {
            return {
                pageNameFlg: 'cadresModal',
                tableConfig: {
                    httpUrl: this.$api.cadreBase_getcadreByorgNo,
                    fixParams:{orgNo:null},
                    tableBaseConfig: {
                        tableType: 'table',
                        maxHeight: 300,
                        isStripe: true,
                        showHeader: true,
                        tooltipEffect: 'light',
                        isBorder: true,
                        isShowPagination:false
                    },
                    // paginationConfig: {
                    //     pageNo: 1,
                    //     pageSize: 10,
                    //     pageSizes: [10, 30, 50, 70, 100],
                    //     total: 0
                    // },
                    tableColumnType: 'selection',
                    tableColumn: [
                        {prop: 'cadreName', label: '姓名'},
                        {prop: 'cadreSex', label: '性别'},
                        {prop: 'cadreBirthday', label: '出生日期'},
                        {prop: 'birthPlace', label: '出生地'},
                        {prop: 'fulltimeEducation', label: '全日制学历'},
                        {prop: 'fulltimeEducationSchool', label: '毕业院校'},
                        {prop: 'orgName', label: '所属组织'},
                        {label: '操作', fixed: 'right', optBtns: [
                                {
                                    type: 'primary',
                                    isShow: false,
                                    dealBtnStatus: {key: 'state', status: [2,7]},
                                    text: '查看',
                                    optType: 'edit',
                                    fixParams: {cadreId: null},
                                    modalOption: {
                                        modalType: 'editPop',
                                        isShowModal: false,
                                        modalTitle: "查看",
                                        btnCenter: true,
                                        modalWidth: '50%',
                                        btns: [
                                            {type: 'default', isShow: true, text: '关闭', loading: false, func: 'cancel'},
                                        ],
                                    },
                                    form: {
                                        custForm: detail,
                                    }
                                },
                            ]
                        }
                    ]
                },
                cadreData: [],
                isShowTable:false
            }
        },
        computed:{
            ...mapState(['dynamicVx']),
            rowData(){
                return this.dynamicVx.singleRowData
            }
        },
        mounted(){
            setTimeout(()=>{
                this.tableConfig.fixParams.orgNo=this.rowData.orgCode
                this.isShowTable=true
            })
        },
        methods:{
            formatDate(string){
                if(!string){
                    return ''
                }
                return this.$formatDate(parseInt(string),'YYYYMM')
            },
            getCadreByorgNo(){
                this.$http.get(this.$api.cadreBase_getcadreByorgNo, {orgNo: this.rowData.orgCode}).then((res) => {
                    if(res.success){
                        this.cadreData=res.data
                    }
                })
            },
            dealTableData(tableData){
                let date=['cadreBirthday']
                for(let im of tableData){
                    im=this.$dealTableDate(date,im,'YYYYMM')
                    this.$set(im,'rowId',im.id)
                }
                this.$refs.cadresModalTable.loadTable(tableData)
            }
        }
    }
</script>

<style scoped>

</style>
