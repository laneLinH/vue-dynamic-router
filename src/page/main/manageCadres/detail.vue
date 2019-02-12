<template>
  <el-row  class="auditAppForm" >
    <el-row ref="printchunck1">
        <div class="cus-print">
          <h1 class="text-label tb-titles">干部任免审批表</h1>
          <table   class="cus-table " width="100%">
            <tr>
              <td class="text-label" width="10%" height="0">姓名</td>
              <td  width="10%">{{formData.cadreName}}</td>
              <td  class="text-label" width="10%">性别</td>
              <td  width="15%">{{formData.cadreSex}}</td>
              <td  width="10%">
                <div class="text-label">出生年月</div>
                <div style="text-align: center;">（岁）</div>
              </td>
              <td  width="15%">
                <el-row>{{formatDate(formData.cadreBirthday)}}</el-row>
                <el-row>({{age(formData.cadreBirthday)}})</el-row>
              </td>
              <td rowspan="4" width="20%" colspan="4">
                <img class="photo-chunck" :src="formData.fileAddress">
                <!--<img class="photo-chunck" src="blob:http://localhost:8081/37d8f1e4-20a4-4bdf-8d4b-2c6b3943146c"/>-->
              </td>
            </tr>
            <tr>
              <td class="text-label" width="10%">民族</td>
              <td >{{formData.cadreNation}}</td>
              <td class="text-label" width="10%">籍贯</td>
              <td >{{formData.nativePlace}}</td>
              <td class="text-label" width="10%">出生地</td>
              <td >{{formData.birthPlace}}</td>
            </tr>
            <tr >
              <td class="text-label" width="10%"  height="0">入党时间</td>
              <td><span v-if="formData.joinPartyDate">{{formatDate(formData.joinPartyDate)}}</span><span v-if="formData.partyType">;{{formData.partyType}}</span></td>
              <td class="text-label" width="10%">参加工作时间</td>
              <td >{{formatDate(formData.joinWorkDate)}}</td>
              <td class="text-label" width="10%">健康状况</td>
              <td >{{formData.healthCondition}}</td>
            </tr>
            <tr >
              <td class="text-label" width="10%">专业技术职务</td>
              <td colspan="2">{{formData.highestProfessional}}</td>
              <td class="text-label" width="10%">熟悉专业有何专长</td>
              <td colspan="2">{{formData.specialitySkill}}</td>
            </tr>
            <tr >

              <td class="text-label" width="10%" rowspan="2">学历学位</td>
              <td class="text-label" width="10%">全日制教育</td>
              <td colspan="2">{{formData.fulltimeEducation}}</td>
              <td class="text-label" width="10%">毕业院校系及专业</td>
              <td colspan="2">{{formData.fulltimeEducationSchool}}</td>
            </tr>
            <tr >
              <td class="text-label" width="10%">在职教育</td>
              <td colspan="2">{{formData.inserviceEducation}}</td>
              <td class="text-label" width="10%">毕业院校系及专业</td>
              <td colspan="2">{{formData.inserviceEducationSchool}}</td>
            </tr>
            <tr>
              <td class="text-label" colspan="2" style="height: 90px">现任职务</td>
              <td  colspan="5"><div class="scale-ft">{{formData.curentDuties}}</div></td>
            </tr>
            <tr>
              <td class="text-label" colspan="2" style="height: 90px">拟任职务</td>
              <td  colspan="5"><div class="scale-ft">{{formData.proposedDuties}}</div></td>
            </tr>
            <tr>
              <td  class="text-label" colspan="2" style="height: 90px">拟免职务</td>
              <td  colspan="5"><div class="scale-ft">{{formData.fireDuties}}</div></td>
            </tr>
          </table>
          <table class="cus-table " width="100%" style="margin-top: -1px;">
            <tr>
              <td  class="text-label t-wd jl-ht"><div class="text-vat">简历</div></td>
              <td colspan="6" style="height: 380px">
                  <div class="jl-ft" :key="inde" v-if="inde < 20" v-for="(item,inde) in formData.resumes">
                    <span>{{formatDate(item.startTime)}}-{{formatDate(item.endTime)}} {{item.resumeDescribe}}</span>
                  </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="cus-print">
          <table  class="cus-table" width="100%" style="margin-top: -1px;">
            <tr>
              <td   class="text-label t-wd" ><div class="text-vat">奖惩情况</div></td>
              <td colspan="6">
                <div style="height: 100px;">
                  {{formData.rewardsPunishments}}
                </div>
              </td>
            </tr>
            <tr>
              <td   class="text-label t-wd" ><div class="text-vat">年底考核结果</div></td>
              <td colspan="6">
                <div style="height: 100px;">
                {{formData.assessmentResult}}
                </div>
              </td>
            </tr>
            <tr>
              <td   class="text-label t-wd" ><div class="text-vat">任免理由</div></td>
              <td colspan="6">
                <div style="height: 100px;">
                {{formData.appointmentRemovalReason}}
                </div>
              </td>
            </tr>
            <tr>
              <td  class="text-label t-wd" :rowspan="familysLnth"><div class="text-vat">家庭主要成员及重要社会关系</div></td>
              <td class="text-label" width="15%">称谓</td>
              <td class="text-label" width="15%">姓名</td>
              <td class="text-label">出生日期</td>
              <td class="text-label"  width="15%">政治面貌</td>
              <td class="text-label" colspan="2">工作单位及职务</td>
            </tr>
            <tr v-for="(item,index) in formData.familys">
              <td><div class="tabl-ht">{{item.relation}}</div></td>
              <td><div class="tabl-ht">{{item.familyName}}</div></td>
              <td><div class="tabl-ht">{{formatDate(item.familyBirthday)}}</div></td>
              <td><div class="tabl-ht">{{item.politicalStatus}}</div></td>
              <td colspan="2"><div class="tabl-ht">{{item.departmentJob}}</div></td>
            </tr>
            <tr>
              <td class="text-label" ><div class="text-vat">呈报单位</div></td>
              <td colspan="6"></td>
            </tr>
          </table>
          <table  class="cus-table" width="100%" style="margin-top: -1px;">
            <tr>
              <td class="text-label" width="1%">审批机关意见</td>
              <td colspan="2" class="gz-qu">
                <div class="tb-gz">(盖章)</div>
                <div class="tb-nyr"><span>年</span><span>月</span><span>日</span></div>
              </td>
              <td class="text-label" width="1%">行政机关任免意见</td>
              <td colspan="2" class="gz-qu">
                <div class="tb-gz">(盖章)</div>
                <div class="tb-nyr"><span>年</span><span>月</span><span>日</span></div>
              </td>
              <!--<td class="text-label" width="15%"></td>-->
              <!--<td colspan="2"></td>-->
            </tr>
          </table>
        </div>
    </el-row>
    <el-form  class="auditAppForm" label-width="80">
      <el-form-item class="el-col-24" v-if="historyData.length>0">
        <el-form-item  label="操作历史："></el-form-item>
        <el-table :data="historyData" border>
          <el-table-column prop="auditUnit"  label="操作单位">
          </el-table-column>
          <el-table-column prop="auditPersion" width="100" label="操作人">
          </el-table-column>
          <el-table-column prop="auditResultDesc" width="100" label="操作结果">
          </el-table-column>
          <el-table-column prop="auditTypeDesc" width="100" label="操作类型">
          </el-table-column>
          <el-table-column prop="auditDate"   label="操作时间">
          </el-table-column>
          <el-table-column prop="auditDesc"   label="备注">
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </el-row>

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
        historyData:[],
      formData:{},
      auditInfo:[],
      familysTableRow:0,
      familysLnth:0
    }),
    computed: {
      ...mapState(['dynamicVx']),
      rowData(){
          return this.dynamicVx.singleRowData
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
        getAudithistory(){
            this.$http.get(this.$api.cadreAudit_audithisthory,{cadreId:this.rowData.cadreId}).then((res)=>{
                if(res.success){
                    this.historyData=res.data
                    for(let im of this.historyData){
                        this.$set(im,'auditResultDesc',im.auditResult?'通过':'驳回')
                        let desc='';
                        switch (im.auditType) {
                            case 1:
                                desc='提交';
                                break;
                            case 2:
                                desc='归档';
                                break;
                            case 3:
                                desc='申请修改';
                                break;
                            default :
                                desc='';
                                break;
                        }
                        this.$set(im,'auditTypeDesc',desc)
                    }
                }
            })
        },
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
        this.$http.get(this.$api.cadreBase_curentinfo,{cadreId:this.rowData.cadreId}).then((res)=>{
          if(res.success){
            this.formData=res.data
            if(this.formData.fileAddress){
              this.formData.fileAddress=this.$src+ this.formData.fileAddress.replace("\\","/")
            }
            if(this.formData.familys){
              this.familysTableRow =10-this.formData.familys.length
              if(this.familysTableRow){
                for(let i=0;i<this.familysTableRow;i++){
                  this.formData.familys.push({relation:null,familyName:null,familyBirthday:null,politicalStatus:null,departmentJob:null})
                }
              }
              for(let k of this.formData.familys){
                k.familyBirthday=this.formatDate(k.familyBirthday)
              }
              this.familysLnth=this.formData.familys.length+1
            }
            if(this.formData.resumes) {
                for (let k of this.formData.resumes) {
                    k.startTime = this.formatDate(k.startTime)
                    k.endTime = this.formatDate(k.endTime)
                }
            }
          }
        },error=>{

        })
      },
      doPrint(){
         let  prinDom1=this.$refs.printchunck1.$el
         let prin=prinDom1.querySelectorAll('.cus-print')
        if(prin){
          for(let im of prin){
            console.log(im.offsetHeight)
            if(im.offsetHeight>900){

            }
          }
        }
         let strx=`body{font-size: 14px}
                .cus-print{ page-break-before: always;page-break-inside: avoid;}
                .photo-chunck{
                  width: 150px;
                  height: 150px;
                  margin: 40px auto;
                  display: block;
                }
                .cus-table{
                  font-size: 13px;
                  border-collapse: collapse;
                }
                tr,td{
                  border: 1px solid #ccc;
                }
                td{
                  padding: 5px 10px;
                }
                .tabl-ht{
                  min-height: 20px;
                  line-height: 20px;
                }
                .text-vat{
                }
                .text-label{
                  text-align: justify;
                  font-weight: 500;
                }
                .text-label:after, .text-label:before{
                  display: inline-block;
                  width: 100%;
                  content: '';
                }
                .t-wd{
                text-align: center!important;
                width: 1%;
                }
               .jl-ht{
                line-height: 95px;
              }
              .tb-titles{
              font-size: 20px;width: 200px;margin: 10px auto;
              }
              .tb-gz{
                position: absolute;
                bottom: 33px;
                right: 16px;
                letter-spacing: 4px;
                text-align: justify;
              }
              .tb-nyr{
                position: absolute;
                bottom: 8px;
                right: 0;
                text-align: justify;
              }
              .tb-nyr span{
                margin: 0 10px;
              }
              .gz-qu{
                position: relative;
                height: 110px;
              }
              .ft-adjust{
                font-size:10px;
              }
              .jl-ft{
                font-size:12px;
              }
              .scale-ft{
                font-size:12px;
                width: 112%;
                transform: scale(0.9);
                transform-origin: top left;
              }`

        this.$print(strx,prinDom1)
      },
      exportExcel(){

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*-webkit-transform: scale(0.3);*/
  /*-webkit-transform-origin: 0 0;*/
  .photo-chunck{
    width: 150px;
    height: 150px;
    margin: 40px auto;
    display: block;
  }
  .cus-table{
    font-size: 14px;
    border-collapse: collapse;
  }
  tr,td{
    border: 1px solid #ccc;
  }
  td{
    padding: 0 10px;
  }
  .tabl-ht{
    min-height: 20px;
    line-height: 20px;
  }
  .text-vat{
  }
  .text-label{
    text-align: justify;
    font-weight: 700;
  }
  .text-label:after, .text-label:before{
    display: inline-block;
    width: 100%;
    content: '';
  }
  .t-wd{
    width: 30px;
    text-align: center;
  }
  .jl-ht{
    line-height: 160px;
  }
  .tb-titles{
    font-size: 20px;width: 200px;margin: 0 auto;
  }
  .tb-gz{
    position: absolute;
    bottom: 33px;
    right: 16px;
    letter-spacing: 4px;
    text-align: justify;
  }
  .tb-nyr{
    position: absolute;
    bottom: 8px;
    right: 0;
    text-align: justify;
  }
  .tb-nyr span{
    margin: 0 10px;
  }
  .gz-qu{
    position: relative;
    height: 110px;
  }
  .print-btn{
    display: block;width: 200px;margin: 20px auto;
  }
</style>
