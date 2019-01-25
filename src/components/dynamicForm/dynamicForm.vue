<template>
  <el-form ref="dyform"
           :size="form.size"
           :class="form.classStr"
           :label-position="form.labelPosition"
           :label-width="form.labelWidth"
           :model="formData"
           :inline="form.inline"
           :disabled="form.disabled"
           :hide-required-asterisk="form.hideRequiredAsterisk">
    <el-form-item  v-for="(item,id) in form.formItem"
                  :key="id"
                  :label="item.label"
                  :prop="item.key"
                  :class="item.classStr"
                  :rules="item.rules"
                  v-show="!item.hidden"
                  :label-width="item.labelWidth">
      <el-select v-if="item.type==='select'"
        v-model="formData[item.key]"
        :clearable="item.clearable"
        :multiple="item.multiple"
        :collapse-tags="item.collapseTags"
        :size="item.size"
        :name="item.selectName"
        :multiple-limit="item.multipleLimit"
        :autocomplete="item.autocomplete"
        :placeholder="item.placeholder">
        <el-option
          v-for="item in item.options"
          :key="item.id"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        v-else-if="item.type==='date'"
        v-model="formData[item.key]"
        :type="item.dateType"
        :range-separator="item.rangeSeparator"
        :start-placeholder="item.startPlaceholder"
        :end-placeholder="item.endPlaceholder"
        :placeholder="item.placeholder"
        @change="dateChange">
      </el-date-picker>
      <el-input
        v-else-if="item.type==='input'"
        :type="item.inputType"
        :maxlength="item.maxlength"
        :minlength="item.minlength"
        :disabled="item.disabled"
        :clearable="item.clearable"
        :placeholder="item.placeholder"
        :size="item.size"
        :prefix-icon="item.prefixIcon"
        :suffix-icon="item.suffixIcon"
        :name="item.name"
        :autocomplete="item.autocomplete"
        :readonly="item.readonly"
        :autofocus="item.autofocus"
        v-model="formData[item.key]"
        :number="item.isnumber">
        <span slot="prepend" v-if="item.inputType==='sub_text'" v-html="getPsubVal(item.name)"></span>
      </el-input>
      <el-radio-group v-else-if="item.type==='radio'"
        v-model="formData[item.key]"
        :disabled="item.disabled">
        <el-radio v-for="(rad,ix) in item.options" :key='ix'  :label="rad.value">{{rad.label}}</el-radio>
      </el-radio-group>
      <el-checkbox-group
        v-else-if="item.type==='checkbox'"
        v-model="formData[item.key]"
        :min="item.min"
        :max="item.max">
        <el-checkbox v-for="(che,ix) in item.options" :key="ix" :label="che.value">{{che.label}}</el-checkbox>
      </el-checkbox-group>
      <component v-else-if="item.type='custtype'" :is="item.type"></component>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
      name: "dynamicForm",
      props:{
        form:{
           default:{
             httpUrl:null,
             size:'medium ',
             labelPosition:null,
             labelWidth:null,
             formItem:[],
             inline:false,
             disabled:false,
             hideRequiredAsterisk:null
           }
        },
        pageNameFlg:{
              default:''
        },
        fixParams:{
        }
      },
      data:()=>({
          scopefixparams:{}
      }),
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
      data:()=>({
           formData:{}
      }),
      mounted(){
        console.log('form--',this.fixParams)
        this.initData()
      },
      methods:{
        initData(){
          for(let item of this.form.formItem){
            this.$set(this.formData,item.key,item.initValue)
          }
          if(this.form.httpUrl){
            this.loadFormData()
          }
        },
        resetForm(){
          this.$refs.dyform.resetFields()
          this.initData()
        },
        queryForm(getformData){
          getformData(this.getFormData())
        },
        getFormData(){
          return this.formData
        },
        dateChange(val){
        },
        loadFormData(){
          for(let k in this.form.fixParams){
            this.form.fixParams[k]=this.rowData[0][k]
          }
          this.$http.get(this.form.httpUrl,this.form.fixParams).then((res)=>{
            if(res.code===200){
              let data=res.data
                for(let km in  this.formData){
                  this.formData[km]=data[km]
                }
            }
          })
        },
        // custFormevent(getdata){
        //   this.formData=Object.assign(this.formData,this.fixParams)
        //   for(let key in this.formData){
        //     if (this.formData[key] instanceof Date) {
        //       this.formData[key] = new Date(this.formData[key]).getTime()||null
        //     }
        //   }
        //   getdata(this.getFormData())
        // },
        submitData(){
          this.validateForm((params)=>{
            this.btnLoading=true
            this.$http[this.btnObj.methods](this.btnObj.httpUrl,params).then((res)=>{
              this.btnLoading=false
              if(res.success){
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 5 * 1000
                })
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
        },
        validateForm(suc,fal){
            this.scopefixparams=this.$deepCopy(this.fixparams||null)
          if(this.scopefixparams){
            if(Object.keys(this.scopefixparams).length>0&&this.rowData && this.rowData.length===1){
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
          }
          for(let key in this.formData){
            if (this.formData[key] instanceof Date) {
              this.formData[key] = new Date(this.formData[key]).getTime()||null
            }
          }
          this.$refs.dyform.validate((valid) => {
           if(valid){
             suc(this.getFormData())
           }else{
             if(fal != null){
               fal(this.getFormData())
             }
           }
          });
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
