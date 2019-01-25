<template>

  <el-form class="auditAppForm" label-width="80">

    <el-table>
      <el-table-column>

      </el-table-column>
    </el-table>




    <img class="photo-chunck" :src="formData.fileAddress">
    <el-row :gutter="10">
      <el-form-item class="el-col-12" label="姓名：">
        <span>{{formData.cadreName}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="出生年月(岁)：">
        <span>{{formatDate(formData.cadreBirthday)}}({{age(formData.cadreBirthday)}})</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="性别：">
        <span>{{formData.cadreSex}}</span>
      </el-form-item>

      <el-form-item class="el-col-12" label="所属组织部门：">
        <span>{{formData.cadreName}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="民族：">
        <span>{{formData.cadreNation}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="籍贯：">
        <span>{{formData.nativePlace}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="出生地：">
        <span>{{formData.birthPlace}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="入党时间："  v-if="formData.joinPartyDate!=='null'&&formData.joinPartyDate&&formData.partyType!=='null'&&formData.partyType">
        {{formData.joinPartyDate}};{{formData.partyType}}
      </el-form-item>
      <template v-else>
        <el-form-item class="el-col-12" label="入党时间：" v-if="formData.joinPartyDate!=='null'&&formData.joinPartyDate">
          <span>{{formData.joinPartyDate}}</span>
        </el-form-item>
        <el-form-item class="el-col-12" label="党派：" v-if="formData.partyType!=='null'&&formData.partyType">
          <span>{{formData.partyType}}</span>
        </el-form-item>
      </template>
      <el-form-item class="el-col-12" label="参加工作时间：">
        <span>{{formData.joinWorkDate}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="健康状况：">
        <span>{{formData.healthCondition}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="专业技术职务：">
        <span>{{formData.highestProfessional}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="熟悉专业有何专长：">
        <span>{{formData.specialitySkill}}</span>
      </el-form-item>

      <el-form-item class="el-col-12" label="现任职务：">
        <span>{{formData.curentDuties}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="拟任职务：">
        <span>{{formData.proposedDuties}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="拟免职务：">
        <span>{{formData.fireDuties}}</span>
      </el-form-item>
      <el-form-item class="el-col-24" label="学历学位">
      </el-form-item>
      <el-form-item class="el-col-12" label="全日制教育：">
        <span>{{formData.fulltimeEducation}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="毕业院校及专业：">
        <span>{{formData.fulltimeEducationSchool}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="在职教育：">
        <span>{{formData.inserviceEducation}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="毕业院校及专业：">
        <span>{{formData.inserviceEducationSchool}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="奖惩情况：">
        <span>{{formData.rewardsPunishments}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="考核结果：">
        <span>{{formData.assessmentResult}}</span>
      </el-form-item>
      <el-form-item class="el-col-12" label="任免理由：">
        <span>{{formData.appointmentRemovalReason}}</span>
      </el-form-item>
      <el-form-item class="el-col-24" >
        <el-form-item label="简历："></el-form-item>
        <el-table :data="formData.resumes">
          <el-table-column prop="startTime" width="100" label="开始时间">
          </el-table-column>
          <el-table-column prop="endTime" width="100" label="结束时间">
          </el-table-column>
          <el-table-column prop="resumeDescribe"  label="描述">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item class="el-col-24">
        <el-form-item  label="家庭主要成员及重要社会关系："></el-form-item>
        <el-table :data="formData.familys">
          <el-table-column prop="familyName" width="100" label="称谓">
          </el-table-column>
          <el-table-column prop="relation" width="100" label="姓名">
          </el-table-column>
          <el-table-column prop="familyBirthday"  width="100" label="出生日期">
          </el-table-column>
          <el-table-column prop="politicalStatus" label="政治面貌">
          </el-table-column>
          <el-table-column prop="departmentJob"  label="工作单位及职务">
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-row>
    <!--<el-row :gutter="10" :span="20" >-->
      <!--<el-col >-->
        <!--<dynamicForm ref="auditForm" :form="auditForm" :fixParams="fixParams">-->
        <!--</dynamicForm>-->
      <!--</el-col>-->
      <!--<el-col :offset="10" :span="6">-->
        <!--<el-button type="primary" @click="audit('pass')">通过</el-button>-->
        <!--<el-button type="danger" @click="audit('reject')">驳回</el-button>-->
      <!--</el-col>-->
    <!--</el-row>-->
  </el-form>

</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "detail",
    props:{
      pageNameFlg:{
        default:''
      }
    },
    data:()=>({
      formData:{},
      auditInfo:[]
    }),
    computed: {
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
    filters:{
      dealDate(string){
          return string?this.$formatDate(string,'YYYYMM'):''
      }
    },
    mounted(){
      this.getcadreByorgNo()
      this.getAudithistory()
    },
    methods:{
      age(val){
        if(!val){
          return ''
        }
        let birth=new Date(parseInt(val)).getTime()
        let nowDate=new Date().getTime()
        return new Date(nowDate-birth).getFullYear()-1970+'岁'
      },
      formatDate(string){
        if(!string){
          return ''
        }
        return this.$formatDate(parseInt(string),'YYYYMM')
      },
      getcadreByorgNo(){
        this.$http.get('/cadreBase/curentinfo',{params:{cadreId:this.rowData[0].cadreId}}).then((res)=>{
          if(res.success){
            this.formData=res.data
            this.formData.fileAddress=window.location.origin+'/'+ this.formData.fileAddress.replace("\\","/")
            for(let k of this.formData.familys){
              k.familyBirthday=this.formatDate(k.familyBirthday)
            }
            for(let k of this.formData.resumes){
              k.startTime=this.formatDate(k.startTime)
              k.endTime=this.formatDate(k.endTime)
            }
          }
        },error=>{

        })
      },
      getAudithistory(){
        this.$http.get('/cadreAudit/audithistory',{params:{cadreId:this.rowData[0].cadreId}}).then((res)=>{
          if(res.success){
            this.auditInfo=res.data
          }
        },error=>{

        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .photo-chunck{
    width: 150px;
    height: 150px;
    margin: 40px auto;
    display: block;
  }
</style>
