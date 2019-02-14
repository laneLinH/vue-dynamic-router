<template>

    <el-form class="auditAppForm"  label-width="80">
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
                <span>{{formatDate(formData.joinWorkDate)}}</span>
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
                <el-table :data="formData.resumes" border>
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
                <el-table :data="formData.familys" border>
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
        </el-row>

        <el-row :gutter="10" :span="20" >
            <el-col >
                <dynamicForm ref="auditForm" :form="auditForm" :fixParams="fixParams">
                </dynamicForm>
            </el-col>
            <el-col :offset="10" :span="6">
                <el-button type="primary" @click="audit()">提交申请</el-button>
            </el-col>
        </el-row>
    </el-form>

</template>

<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "updateCadreApp",
        props:{
            pageNameFlg:{
                default:''
            }
        },
        data:()=>({
            formData:{},
            fixParams:{
                cadreId:null
            },
            historyData:[],
            auditForm:{
                labelWidth:'150px',
                httpUrl:'',
                formItem:[
                    {type:'input',initValue:null,inputType:'textarea',classStr:'el-col-24',key:'auditDesc',label:'申请修改原因',placeholder:'请输入申请修改原因',rules:[{ required: true, message: '请输入申请修改原因', trigger: 'blur'}]},
                ]
            }
        }),
        computed: {
            ...mapState(['dynamicVx']),
            rowData(){
                return this.dynamicVx.singleRowData
            }
        },
        filters:{
            dealDate(string){
                return this.$formatDate(string,'YYYYMM')
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
                            this.$set(im,'auditResultDesc',im.auditResult?'成功':'失败')
                            let  desc=this.$OPRATE_HISTORY[im.auditType]||''
                            this.$set(im,'auditTypeDesc',desc)
                        }
                    }
                })
            },
            audit(){
                this.$refs.auditForm.validateForm((params)=>{
                    this.$http.post(this.$api.cadreBase_applyedit,params).then((res)=>{
                        if(res.success){
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            })
                            this.$emit('closeModal',true)
                            this.$dynamicBus.$emit('reloadTable',{pageNameFlg:this.pageNameFlg})
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            })
                        }
                    })
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
                        this.formData.familys=this.formData.familys||[]
                        for(let k of this.formData.familys){
                            k.familyBirthday=this.formatDate(k.familyBirthday)
                        }
                        this.formData.resumes=this.formData.resumes||[]
                        for(let k of this.formData.resumes){
                            k.startTime=this.formatDate(k.startTime)
                            k.endTime=this.formatDate(k.endTime)
                        }
                        this.fixParams.cadreId=this.formData.cadreId
                    }
                },error=>{

                })
            },
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
