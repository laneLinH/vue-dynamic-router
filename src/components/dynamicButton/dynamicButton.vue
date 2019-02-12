<template>
  <div>
      <el-button v-for="(item,index) in btns"
                 :key="index"
                 @click="btnClick(item)"
                 :type="item.type"
                 :icon="item.icon"
                 v-if="item.isShow"
                 :loading="item.loading"
                 :disabled="item.disabled"
                  size="mini">
        {{item.text}}
        <i :class="item.cusIconClass" v-if="item.cusIconClass"></i>
      </el-button>
      <dynamicModal  ref="btnModal" :pageNameFlg="pageNameFlg" :modalOption="modalOption" :httpUrl="httpUrl" :form="form" >
      </dynamicModal>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  export default {
    name: "dynamicButton",
    props:{
      btns:{
        default: []
      },
      pageNameFlg:{
        default: ''
      }
    },
    data:()=>({
      modalOption:{},
      httpUrl:null,
      form:{},
      rowIds:[],
      formData:{},
      scopefixparams:{}
    }),
    mounted(){
    },
    computed:{
      ...mapState(['dynamicVx']),
      rowData(){
        for(let k of this.dynamicVx.optData){
          if(k.name===this.pageNameFlg){
            return k.data['rowData']||null
          }
        }
        return null
      }
    },
    methods:{
      ...mapActions(['setOptData']),
      btnClick(item){
        this.$nextTick(()=>{
          if(item.optType==='new' || item.optType==='edit') {
            this.modalOption=item.modalOption
            this.form=item.form
            this.httpUrl=item.httpUrl
            this.showSelfModal(item)
          }else if (item.optType === 'confirm') {
            if (this.rowData&&this.rowData.length>0) {
              this.$confirm(item.confirmText, item.confirmTitle, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.scopefixparams=this.$deepCopy(item.fixParams)
                if(this.rowData && this.rowData.length>0){
                  for(let k in this.scopefixparams){
                    if(this.scopefixparams[k]){
                      let newk=this.scopefixparams[k]
                      let fixVl=[]
                      for(let ks of this.rowData){
                        fixVl.push(ks[newk])
                      }
                        this.scopefixparams[k]=fixVl
                      // fixVl.length>1? this.scopefixparams[k]=fixVl.join(','):this.scopefixparams[k]=fixVl
                    }else{
                      let fixVl=[]
                      for(let ks of this.rowData){
                        fixVl.push(ks[k])
                      }
                        this.scopefixparams[k]=fixVl
                      // fixVl.length>1? this.scopefixparams[k]=fixVl.join(','):this.scopefixparams[k]=fixVl
                    }
                  }
                }
                this.formData=Object.assign(this.formData,this.scopefixparams)

                this.$http[item.methods](item.httpUrl, this.formData).then((res)=>{
                      if(res.code===200){
                        this.$message({
                          type: 'success',
                          message: res.msg
                        });
                        this.setOptData({data:{},pageNameFlg:this.pageNameFlg})
                        this.$dynamicBus.$emit('reloadTable',{pageNameFlg:this.pageNameFlg})
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
            } else {
              this.$message.error('请选择要操作的数据!')
            }
          }else if(item.optType==='cust'){
            item.func(item)
          }
        })
      },
      showSelfModal(item){
        this.$nextTick(()=>{
          this.$refs.btnModal.showModal(item)
        })
      }
    }
  }
</script>

<style scoped>

</style>
