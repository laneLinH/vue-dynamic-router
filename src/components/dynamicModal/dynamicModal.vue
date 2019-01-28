<template>
    <el-dialog
      v-if="isShowModal"
      :visible.sync="isShowModal"
      :title="modalOption.modalTitle"
      :width="modalOption.modalWidth"
      :center="modalOption.btnCenter"
      appendToBody>
      <dynamicForm v-if="!form.custForm"  ref="modalForm" :fixParams="fixParams" :pageNameFlg="pageNameFlg" :form="form"></dynamicForm>

      <component v-if="form.custForm"  ref="cusForm" :is="form.custForm" :pageNameFlg="pageNameFlg" :optType="optType" @closeModal="cancel"></component>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="custFormevent" :loading="custbtnLoading" v-if="modalOption.custText">{{modalOption.custText}}</el-button>
        <el-button type="primary" v-if="modalOption.okText" @click="ok" :loading="btnLoading">{{modalOption.okText}}</el-button>
        <el-button @click="cancel"  v-if="modalOption.cancelText">{{modalOption.cancelText}}</el-button>
      </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "dynamicModal",
        components:{
          // dynamicForm
        },
         props: {
           modalOption: {
             default: {},
           },
           form: {
               default: {}
           },
           pageNameFlg:{
             default:''
           }
      },
      data:()=>({
        btnLoading:false,
        custbtnLoading:false,
        isShowModal:false,
        fixParams:null,
        btnObj:null
      }),
      computed:{
        optType(){
          return this.btnObj.optType
        }
      },
      mounted(){

      },
      // watch:{
      //   'isShowModal'(val){
      //     if(!val){
      //       setTimeout(()=> {
      //         if(!this.form.custForm){
      //           this.$refs.modalForm.resetForm()
      //         }
      //       })
      //     }
      //   }
      // },
      methods:{
        showModal(btnObj){
          this.btnObj=btnObj
          console.log('showModal--',btnObj.fixParams)
          this.fixParams=btnObj.fixParams
          this.isShowModal=true
        },
        cancel(){
          this.isShowModal=false
        },
        custFormevent(){
           this.$refs.cusForm.custFormevent((params)=>{
               this.custbtnLoading=true
               this.$http[this.modalOption.custUrlmethods](this.modalOption.custUrl,params).then((res)=>{
                 this.custbtnLoading=false
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
               })
          })
        },
        ok(){
          if(!this.form.custForm){
          this.$refs.modalForm.validateForm((params)=>{
              this.btnLoading=true
              this.$http[this.btnObj.methods](this.btnObj.httpUrl,params).then((res)=>{
              this.btnLoading=false
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
          }else{
            this.$refs.cusForm.submit((params)=>{
              this.btnLoading=true
              this.$http[this.btnObj.methods](this.btnObj.httpUrl,params).then((res)=> {
                this.btnLoading = false
                if (res.success) {
                  this.btnLoading=false
                  if(res.success){
                    this.$message({
                      message: res.msg,
                      type: 'success',
                      duration: 5 * 1000
                    })
                    this.isShowModal=false
                    this.$dynamicBus.$emit('reloadTable',{pageNameFlg:this.pageNameFlg})
                } else {
                    this.$message({
                      message: res.msg,
                      type: 'error',
                      duration: 5 * 1000
                    })
                }
                  }
              })
            })
          }
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
