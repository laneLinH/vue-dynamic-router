<template>
    <div>
      <el-row>
          <el-table
            ref="dynamicTable"
            :data="tableData"
            v-loading="loading"
            :show-header="tableBaseConfig.showHeader"
            :row-style="dealTableRowStyle"
            :fit="tableBaseConfig.fit"
            :tooltip-effect="tableBaseConfig.tooltipEffect"
            :span-method="tableBaseConfig.spanMethod"
            :stripe="tableBaseConfig.isStripe"
            :height="tableBaseConfig.height"
            :max-height="tableBaseConfig.maxHeight"
           @selection-change="selectionChange">
            <template  v-for="(item,index) in tableColumn">
              <el-table-column v-if="item.tableColumnType"
                               :type="item.tableColumnType"
                               :key="index"
                               :label="item.label"
                               :width="item.width"
                               :fixed="item.fixed">
              </el-table-column>
              <template v-else>
                <el-table-column v-if="item.isTree"
                  :type="item.tableColumnType"
                  :prop="item.prop"
                  :label="item.label"
                  :width="item.width"
                  :key="index"
                  :fixed="item.fixed">
                  <template slot-scope="scope">
                    <p :style="`margin-left: ${scope.row._level * 20}px;margin-top:0;margin-bottom:0`">
                      <i  @click="toggleFoldingStatus(scope.row)" class="_toggleFold" :class="toggleFoldingClass(scope.row)"></i>
                      <a>{{scope.row[item.prop]}}</a>
                    </p>
                  </template>
                </el-table-column>
                <el-table-column v-else
                :type="item.tableColumnType"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :key="index"
                :fixed="item.fixed">
                <template slot-scope="scope">
                  <div v-if="item.optBtns">
                      <!--<dynamicButton :btns="item.optBtns"  :tablerowData="[scope.row]" toolType="action" ></dynamicButton>-->
                      <el-button v-for="(btns,index) in item.optBtns"
                                 :key="index"
                                 @click="btnClick(btns,[scope.row])"
                                 :type="btns.type"
                                 :icon="btns.icon"
                                 v-if="dealBtn(btns,scope.row)"
                                 :loading="btns.loading"
                                 :disabled="btns.disabled"
                                 size="mini">{{btns.text}}</el-button>
                  </div>
                  <div v-else-if="item.ftLabel">
                    <el-tag  :type="ims.type" :key="id" v-for="(ims,id) in item.ftLabel" v-if="scope.row[item.prop] == ims.state">{{ims.tTitle}}</el-tag>
                  </div>
                  <span v-else>
                          {{scope.row[item.prop]||'' }}
                  </span>
                </template>
              </el-table-column>
              </template>
            </template>
          </el-table>
      </el-row>
      <el-row style="text-align: right;margin: 20px 0;" v-if="tableBaseConfig.tableType!=='treeTable'">
          <el-pagination
            background
            @size-change="sizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryPage.page"
            :page-sizes="[10,30,50,70,100]"
            :page-size="queryPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryPage.total">
          </el-pagination>
      </el-row>
      <dynamicModal  ref="tableModal" :pageNameFlg="pageNameFlg" :modalOption="modalOption" :httpUrl="btnhttpUrl" :form="form" >
      </dynamicModal>
    </div>
</template>

<script>
  import {mapActions,mapState} from 'vuex'
    export default {
      name: "dynamicTable",
      props:{
        tableBaseConfig:{
        },
        paginationConfig:{
          default:{
            pageNo:1,
            pageSize:10,
            pageSizes:[10,30,50,70,100],
            total:0
          }
        },
        tableColumn:{
          default: []
        },
        httpUrl:{
          default:''
        },
        pageNameFlg:{
          default:''
        }
      },
      data:()=>({
        loading:false,
        queryPage:{
          pageNo:1,
          pageSize:10,
          total:0,
        },
        tableData:[],
        treeData:[],
        foldList:[],
        queryData:{},
        modalOptions:[],
        selection:null,
        modalOption:{},
        form:{},
        btnhttpUrl:null,
        scopefixparams:{},
        formData:{}
      }),
      computed: {
        ...mapState(['dynamicVx']),
        foldAllList () {
          return this.tableData.map(x => x._identity)
        },
        rowData(){
          for(let k of this.dynamicVx.optData){
            if(k.name===this.pageNameFlg){
              return k.data['rowData']||null
            }
          }
          return null
        }
      },
      mounted(){
        this.queryPage={
          pageNo:this.paginationConfig.pageNo,
          pageSize:this.paginationConfig.pageSize,
          total:this.paginationConfig.total,
        }
        this.loadTableData()
      },
      methods:{
        ...mapActions(['setOptData']),
        btnClick(btnObj,rowData){
          this.$nextTick(()=>{
            this.setOptData({data:{rowData:rowData},pageNameFlg:this.pageNameFlg})
            if(btnObj.optType==='new'||btnObj.optType==='edit') {
              this.modalOption=btnObj.modalOption
              this.form=btnObj.form
              this.btnhttpUrl=btnObj.httpUrl
              this.showSelfModal(btnObj)
            }else if (btnObj.optType === 'confirm') {
                this.$confirm(btnObj.confirmText, btnObj.confirmTitle, {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {

                this.scopefixparams=this.$deepCopy(btnObj.fixParams)
                if(this.rowData && this.rowData.length===1){
                  for(let k in this.scopefixparams){
                    if(this.scopefixparams[k]){
                      let newk=this.scopefixparams[k]
                      this.scopefixparams[k]=this.rowData[0][newk]
                    }else{
                      this.scopefixparams[k]=this.rowData[0][k]
                    }
                  }
                }
                this.formData=Object.assign(this.formData,this.scopefixparams)
                this.$http[btnObj.methods](btnObj.httpUrl,this.formData).then((res)=>{
                  if(res.code===200){
                    this.$message({
                      type: 'success',
                      message: res.msg
                    });
                    this.loadTableData()
                  }else{
                    this.$message({
                      type: 'error',
                      message: res.msg
                    });
                  }
                },(error)=>{
                    this.$message({
                      type: 'error',
                      message: error
                    });
                  })
                }).catch(() => {

                })
            }
          })
        },
        //列表状态处理
        dealBtn(btns,data){
              if(btns.dealBtnStatus){
                let st=btns.dealBtnStatus
                for(let ks in data){
                  if(st.key===ks){
                    if(data[ks] || data[ks]===0){
                      return  st.status.includes(parseInt(data[ks]))
                    }
                  }
                }
            }
          return false
        },
        showSelfModal(item){
          this.$nextTick(()=>{
            this.$refs.tableModal.showModal(item)
          })
        },
        loadTableData(formData){
          this.queryData=formData||{}
          this.loading=true
          if(this.tableBaseConfig.tableType==='treeTable'){
            this.$http.get(this.httpUrl,{params:this.queryData}).then((res)=>{
              this.loading=false
              if (!res.success) {
                this.$http.handleError(res)
              } else {
                this.$emit('dealTableData', res.data)
              }
            },er=>{
              this.loading=false
            })
          }else {
            this.$set(this.queryData,'pageNo',this.queryPage.pageNo)
            this.$set(this.queryData,'pageSize',this.queryPage.pageSize)
            this.$http.get(this.httpUrl,{params:this.queryData}).then((res)=>{
              this.loading=false
              if (!res.success) {
                this.$http.handleError(res)
              } else {
                this.queryPage.total = Number(res.data.total)
                this.$emit('dealTableData',res.data.data)
              }
            },er=>{
              this.loading=false
            })
          }
        },
        loadTable(tableData){
            this.tableData=tableData
        },
        formatTreeTableData(parent,children,index=0,_family=[],_flg='f'){
          if(children && children.length>0){
            children.map((m,n)=>{
              this.$set(m,'_family',[..._family,_flg+'_'+n])
              this.$set(m,'_level',index)
              this.$set(m,'_identity',_flg+'_'+n)
              parent.push(m)
              this.formatTreeTableData(parent,m.children,index+1,[..._family,_flg+'_'+n],_flg+'_'+n)
            })
          }
          return parent
        },
        sizeChange(val){
            this.queryPage.pageSize=val
            this.loadTableData()
        },
        handleCurrentChange(val){
          this.queryPage.pageNo=val
          this.loadTableData()
        },
        toggleRow(row){
           this.$refs.dynamicTable.setCurrentRow(row)
        },
        selectionChange(selection){
          this.setOptData({data:{rowData:selection},pageNameFlg:this.pageNameFlg})
        },
        dealTableRowStyle({row,index}){
          if(this.tableBaseConfig.tableType==='treeTable'){
              this.foldList=this.foldAllList//默认设置折叠树
              for(let im of this.foldList){
                if (row._family.includes(im) && row._identity !== im){
                  return 'display:none;'
                }
              }
              return ''
          }else{
            return  this.tableBaseConfig.rowStyle? this.tableBaseConfig.rowStyle({row,index}) :''
          }
        },
        toggleFoldingStatus (params) {
          this.foldList.includes(params._identity) ?
            this.foldList.splice(this.foldList.indexOf(params._identity), 1):
            this.foldList.push(params._identity)
        },
        toggleFoldingClass (params) {
          if(!params.children || !params.children.length){
            return ''
          }else{
              return  this.foldList.indexOf(params._identity) === -1 ? 'fa fa-minus' : 'fa fa-plus'
          }
        }
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  ._toggleFold{
    cursor: pointer;
    padding: 5px;
    color: #409eff;
  }
</style>
