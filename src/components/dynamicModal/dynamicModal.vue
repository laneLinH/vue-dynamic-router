<template>
    <el-dialog
      v-if="isShowModal"
      :visible.sync="isShowModal"
      :title="scopeModopt.modalTitle"
      :width="scopeModopt.modalWidth"
      :center="scopeModopt.btnCenter"
      appendToBody>
      <dynamicForm v-if="!form.custForm"  ref="modalForm" :fixParams="fixParams" :pageNameFlg="pageNameFlg" :form="form"></dynamicForm>

      <component v-if="form.custForm" v-for=""  ref="cusForm" :is="form.custForm" :pageNameFlg="pageNameFlg" :optType="optType" @closeModal="cancel"></component>
      <div slot="footer" class="dialog-footer">
        <el-button v-for="(item,btnind) in  scopeModopt.btns" :key="btnind"
                   @click="btnClick(item)"
                   :type="item.type"
                   :icon="item.icon"
                   v-if="item.isShow"
                   :loading="item.loading"
                   :disabled="item.disabled"
                   size="mini">{{item.text}}</el-button>
      </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "dynamicModal",
         props: {
           modalOption: {
             default: ()=>{},
           },
           form: {
               default: ()=>{}
           },
           pageNameFlg:{
             default:null
           }
      },
      data:()=>({
        btnLoading:false,
        custbtnLoading:false,
        isShowModal:false,
        fixParams:null,
        btnObj:null,
        scopeModopt:{}
      }),
      computed:{
        optType(){
          return this.btnObj.optType
        }
      },
      watch:{
        isShowModal(val){
          if(val){
            this.scopeModopt=this.$deepCopy(this.modalOption)||{}
          }
        }
      },
      mounted(){
      },
      methods:{
        showModal(btnObj){
          this.btnObj=btnObj
          // this.modalOption=btnObj.modalOption
          // this.form=btnObj.form
          // console.log(this.btnObj)
          // console.log('showModal--',btnObj.fixParams)
          this.fixParams=btnObj.fixParams
          this.isShowModal=true
        },
        cancel(){
          this.isShowModal=false
        },
        // custFormevent(){
        //   //  this.$refs.cusForm.custFormevent((params)=>{
        //   //      this.custbtnLoading=true
        //   //      this.$http[this.modalOption.custUrlmethods](this.modalOption.custUrl,params).then((res)=>{
        //   //        this.custbtnLoading=false
        //   //        if(res.success){
        //   //          this.$message({
        //   //            message: res.msg,
        //   //            type: 'success',
        //   //            duration: 5 * 1000
        //   //          })
        //   //          this.isShowModal=false
        //   //          this.$dynamicBus.$emit('reloadTable',{pageNameFlg:this.pageNameFlg})
        //   //        }else{
        //   //          this.$message({
        //   //            message: res.msg,
        //   //            type: 'error',
        //   //            duration: 5 * 1000
        //   //          })
        //   //        }
        //   //      })
        //   // })
        // },
        btnClick(item){
          if(item.func==='ok'){
            this.ok(item)
          }else if(item.func==='cancel'){
            this.cancel()
          }else{
           this.isShowModal=item.func(item,this.$refs.cusForm||this.$refs.modalForm,this)
          }
        },
        ok(item){
          let form= this.$refs.modalForm
          if(this.form.custForm) {
            form=this.$refs.cusForm
          }
          form.validateForm((params)=>{
                item.loading=true
                this.$http[item.methods](item.httpUrl,params).then((res)=>{
                item.loading=false
                if(res.success){
                   this.$message({
                     message: res.msg,
                     type: 'success',
                     duration: 5 * 1000
                   })
                  this.isShowModal=false
                  this.$dynamicBus.$emit('reloadTable',{pageNameFlg:this.pageNameFlg})
                }else{
                  this.$message({
                    message: res.msg,
                    type: 'error',
                    duration: 5 * 1000
                  })
                }
                },error=>{
                  this.$message({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000
                  })
                })
            },(error)=>{
            })
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dynamic-modal-form{
  display: inline-block;
  &:after,&:before{
    content: '';
    display: table;
    clear: both;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
}
</style>
