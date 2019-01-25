<template>
  <el-form  class="resum-form"
            ref="infoform"
           label-width="200px"
           :model="formData">
        <el-form-item
                    label="姓名"
                    prop="cadreName"
                    :rules="rules.cadreName">

          <el-input type="text" v-model="formData.cadreName" maxlength:="18"></el-input>
          <el-tooltip  effect="light" :content="noticeTip.cadreName"  placement="right">
            <i class="fa fa-question-circle notice-tip"></i>
          </el-tooltip>
      </el-form-item>
      <el-form-item label="所属组织部门"
              prop="orgType"
              :rules="[{validator:orgCheckValid, trigger: 'change'}]">
            <treeSelect :value="treeValue"  noChildrenText="暂无数据" noResultsText="暂无数据" noOptionsText="暂无数据" placeholder="请选择组织" @select="chooseTree" :options="orgTreeData" >
            </treeSelect>
          <el-input type="hidden" style="display: none" v-model="formData.orgType" ></el-input>
      </el-form-item>
      <el-form-item label="照片">
        <el-tooltip  effect="light" :content="noticeTip.photo"  placement="right">
          <i class="fa fa-question-circle notice-tip"  style="left:0;width: 20px"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item
        prop="file"
        :rules="{validator:imageValid, trigger: 'change' }">

        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          action=""
          :auto-upload="false"
          :on-change="changeImg">
          <img v-if="formData.fileAddress" :src="formData.fileAddress" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!--<el-input type="hidden" style="display: none" v-model="formData.file" ></el-input>-->
      </el-form-item>

      <el-form-item
        label="性别"
        prop="cadreSex"
        :rules="rules.cadreSex">
        <el-select type="text" filterable v-model="formData.cadreSex" >
          <el-option v-for="(item,key) in sexOption" :value="item.value" :label="item.label" :key="key">
          </el-option>
        </el-select>
        <el-tooltip  effect="light" :content="noticeTip.cadreSex"  placement="right">
          <i class="fa fa-question-circle notice-tip"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item    label="出生年月(岁)"
                       prop="cadreBirthday"
                       :rules="rules.cadreBirthday">
        <el-date-picker
          v-model="formData.cadreBirthday"
          type="date"
          placeholder="选择日期"
          format="yyyyMM" style="width: 75%;">
        </el-date-picker>
        <span>{{age}}</span>
        <el-tooltip  effect="light" :content="noticeTip.cadreBirthday"  placement="right">
          <i class="fa fa-question-circle notice-tip"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="民族"
                    prop="cadreNation"
                    :rules="rules.cadreNation">
                <el-select v-model="formData.cadreNation" filterable placeholder="请选择民族">
                  <el-option
                    v-for="(item,num) in cadreNationOptions"
                    :key="num"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
        <el-tooltip  effect="light" :content="noticeTip.cadreNation"  placement="right">
          <i class="fa fa-question-circle notice-tip"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item    label="籍贯"
                       prop="nativePlace"
                       :rules="rules.nativePlace">
        <el-input type="text" v-model="formData.nativePlace"></el-input>
        <el-tooltip  effect="light" :content="noticeTip.nativePlace"  placement="right">
          <i class="fa fa-question-circle notice-tip"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item    label="出生地"
                       prop="birthPlace"
                       :rules="rules.birthPlace">
        <el-input type="text" v-model="formData.birthPlace"></el-input>
        <el-tooltip  effect="light" :content="noticeTip.birthPlace"  placement="right">
          <i class="fa fa-question-circle notice-tip"></i>
        </el-tooltip>
      </el-form-item>
    <el-form-item label="党派">
      <el-tooltip  effect="light" :content="noticeTip.party" style="left:0;width: 20px"  placement="right">
        <i class="fa fa-question-circle notice-tip"></i>
      </el-tooltip>
    </el-form-item>
    <el-form-item
       prop="partyTypeList"
       :rules="rules.partyTypeList"
      label="选择类型">
      <el-checkbox-group
        v-model="partyInfo.partyTypes">
        <el-checkbox v-for="(che,ix) in partyInfo.options"  :key="ix" :disabled="che.disabled" :label="che.label">{{che.label}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item v-if="partyInfo.isShowDate"   label="入党时间"
                     prop="joinPartyDate"
                     :rules="rules.joinPartyDate">
      <el-date-picker
        v-model="formData.joinPartyDate"
        type="date"
        placeholder="选择日期"
        format="yyyyMM">
      </el-date-picker>
    </el-form-item>
    <el-form-item  v-if="partyInfo.isShowPartytext"  label="非共产党派填写"
                     prop="partyType"
                     :rules="rules.partyType">
      <el-input type="text" v-model="formData.partyType"></el-input>
    </el-form-item>
      <el-form-item    label="参加工作时间"
                       prop="joinWorkDate"
                       :rules="rules.joinWorkDate">
        <el-date-picker
          v-model="formData.joinWorkDate"
          type="date"
          placeholder="选择日期"
          format="yyyyMM">
        </el-date-picker>
        <el-tooltip  effect="light" :content="noticeTip.joinWorkDate"  placement="right">
          <i class="fa fa-question-circle notice-tip"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item    label="健康状况"
                       prop="healthCondition"
                       :rules="rules.healthCondition">
        <el-input type="text" v-model="formData.healthCondition" maxlength="18"></el-input>
        <el-tooltip  effect="light" :content="noticeTip.healthCondition"  placement="right">
          <i class="fa fa-question-circle notice-tip"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item    label="专业技术职务"
                       prop="healthCondition"
                       :rules="rules.highestProfessional">
        <el-input type="text" v-model="formData.highestProfessional"></el-input>
        <el-tooltip  effect="light" :content="noticeTip.highestProfessional"  placement="right">
          <i class="fa fa-question-circle notice-tip"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item    label="熟悉专业有何专长"
                                      prop="specialitySkill"
                                      :rules="rules.specialitySkill">
      <el-input type="textarea" v-model="formData.specialitySkill"></el-input>
      <el-tooltip  effect="light" :content="noticeTip.specialitySkill"  placement="right">
        <i class="fa fa-question-circle notice-tip"></i>
      </el-tooltip>
      </el-form-item>
      <el-form-item label="学历学位">
        <el-tooltip  effect="light" :content="noticeTip.fulltimeEducation"  placement="right">
          <i class="fa fa-question-circle notice-tip" style="left:0;width: 20px"></i>
        </el-tooltip>
      </el-form-item>

    <el-form-item     label="全日制教育"
                      prop="fulltimeEducation"
                      :rules="rules.fulltimeEducation">
      <el-input type="textarea"  v-model="formData.fulltimeEducation" rows="2"></el-input>

    </el-form-item>
    <el-form-item    label="毕业院校及专业"
                     prop="fulltimeEducationSchool"
                     :rules="rules.fulltimeEducationSchool">
      <el-input type="textarea" v-model="formData.fulltimeEducationSchool" rows="2"></el-input>

    </el-form-item>
    <el-form-item     label="在职教育"
                      prop="inserviceEducation"
                      :rules="rules.inserviceEducation">
      <el-input type="textarea"  v-model="formData.inserviceEducation" rows="2"></el-input>

    </el-form-item>
    <el-form-item    label="毕业院校及专业"
                     prop="specialitySkill"
                     :rules="rules.inserviceEducationSchool">
      <el-input type="textarea" v-model="formData.inserviceEducationSchool" rows="2"></el-input>

    </el-form-item>
    <el-form-item    label="现任职务"
                     prop="specialitySkill"
                     :rules="rules.curentDuties">
      <el-input type="textarea" v-model="formData.curentDuties" max-length="324" rows="5"></el-input>
      <el-tooltip  effect="light" :content="noticeTip.curentDuties"  placement="right">
        <i class="fa fa-question-circle notice-tip"></i>
      </el-tooltip>
    </el-form-item>
    <el-form-item    label="拟任职务"
                     prop="proposedDuties"
                     :rules="rules.proposedDuties">
      <el-input type="textarea" v-model="formData.proposedDuties" max-length="324" rows="5"></el-input>
      <el-tooltip  effect="light" :content="noticeTip.proposedDuties"  placement="right">
        <i class="fa fa-question-circle notice-tip"></i>
      </el-tooltip>
    </el-form-item>
    <el-form-item    label="拟免职务"
                     prop="fireDuties"
                     :rules="rules.fireDuties">
      <el-input type="textarea" v-model="formData.fireDuties" max-length="324" rows="5"></el-input>
      <el-tooltip  effect="light" :content="noticeTip.fireDuties"  placement="right">
        <i class="fa fa-question-circle notice-tip"></i>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="简历">
      <el-tooltip  effect="light" :content="noticeTip.resumes"  placement="right">
        <i class="fa fa-question-circle notice-tip" style="left:0;width: 20px"></i>
      </el-tooltip>
      <el-button size="mini" class="add-btn" type="primary" @click="addResume">添加</el-button>
    </el-form-item>
    <div v-for="(item,index) in formData.resumes" :key="index">
      <el-form-item    label="时间"
                       :prop="'resumes.'+index+'.resumesDate'"
                       :rules="rules.resumesDate">
        <el-date-picker
          v-model="item.resumesDate"
          type="daterange"
          range-separator="至"
          format="yyyyMM"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button v-if="index!==0" size="mini" class="remove-btn" type="primary" @click="removeResume(index)">删除</el-button>
      </el-form-item>
      <el-form-item   :prop="'resumes.'+index+'.resumeDescribe'"  label="描述" :rules="rules.resumeDescribe">
        <el-input type="textarea" v-model="item.resumeDescribe" max-length="552" rows="5"></el-input>
      </el-form-item>
    </div>


    <el-form-item    label="奖惩情况"
                     prop="rewardsPunishments"
                     :rules="rules.rewardsPunishments">
      <el-input type="textarea" v-model="formData.rewardsPunishments" max-length="552" rows="8"></el-input>
      <el-tooltip  effect="light" :content="noticeTip.rewardsPunishments"  placement="right">
        <i class="fa fa-question-circle notice-tip"></i>
      </el-tooltip>
    </el-form-item>
    <el-form-item    label="考核结果"
                     prop="assessmentResult"
                     :rules="rules.assessmentResult">
      <el-input type="textarea" v-model="formData.assessmentResult" max-length="414" rows="8"></el-input>
      <el-tooltip  effect="light" :content="noticeTip.assessmentResult"  placement="right">
        <i class="fa fa-question-circle notice-tip"></i>
      </el-tooltip>
    </el-form-item>
    <el-form-item    label="任免理由"
                      prop="appointmentRemovalReason"
                     :rules="rules.appointmentRemovalReason">
      <el-input type="textarea" v-model="formData.appointmentRemovalReason" max-length="552" rows="8"></el-input>
      <el-tooltip  effect="light" :content="noticeTip.appointmentRemovalReason"  placement="right">
        <i class="fa fa-question-circle notice-tip"></i>
      </el-tooltip>
    </el-form-item>


    <el-form-item label="家庭主要成员及重要社会关系">
      <el-tooltip  effect="light" :content="noticeTip.familys"  placement="right">
        <i class="fa fa-question-circle notice-tip"  style="left:0;width: 20px"></i>
      </el-tooltip>
      <el-button size="mini" class="add-btn" type="primary" @click="addFamily">添加</el-button>
    </el-form-item>
    <div v-for="(item,ids) in formData.familys" :key="'_'+ids">
      <el-form-item  :prop="'familys.'+ids+'.relation'" :rules="rules.relation"  label="称谓">
        <el-input type="text" v-model="item.relation" ></el-input>
        <el-button v-if="ids!==0" size="mini" class="remove-btn" type="primary" @click="removeFamily(ids)">删除</el-button>
      </el-form-item>
      <el-form-item  :prop="'familys.'+ids+'.familyName'" :rules="rules.familyName"  label="姓名">
        <el-input type="text" v-model="item.familyName" ></el-input>
      </el-form-item>
      <el-form-item  :prop="'familys.'+ids+'.familyBirthday'" :rules="rules.familyBirthday"  label="出生日期">
        <el-date-picker
          v-model="item.familyBirthday"
          type="date"
          placeholder="选择日期"
          format="yyyyMM">
        </el-date-picker>
      </el-form-item>
      <el-form-item  :prop="'familys.'+ids+'.politicalStatus'" :rules="rules.politicalStatus"  label="政治面貌">
        <el-input type="text" v-model="item.politicalStatus" ></el-input>
      </el-form-item>
      <el-form-item  :prop="'familys.'+ids+'.departmentJob'" :rules="rules.departmentJob"  label="工作单位及职务">
        <el-input type="text" v-model="item.departmentJob" ></el-input>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
  import {cadreNationOptions} from '@/utils/dict'
  import treeSelect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {mapState} from 'vuex'
    export default {
      name: "cadresFormComponents",
        props:{
          optType:{
            default: ''
          },
            pageNameFlg:{
              default:''
            }
        },
        components:{
          treeSelect
        },
        data:()=>({
          cadreNationOptions,
          // imageUploadUrl:'/cad/sysUploadFileInfo/upload',
          sexOption:[
            {value:'男',label:'男'},
            {value:'女',label:'女'},
          ],
          age:'',
          isEdit:false,
          orgTreeData:[],
          partyInfo:{
            partyTypes:[],
            options:[{label:'共产党',disabled:false},{label:'无党派',disabled:false},{label:'其它党派',disabled:false}],
            isShowDate:false,
            isShowPartytext:false
          },
          fileFormData:new FormData(),
          treeValue:null,
          formData:{
            cadreId:null,
            orgNo:null,
            orgType:null,
            cadreName:null,
            cadreSex:null,
            cadreBirthday:null,
            cadreNation:null,
            nativePlace:null,
            birthPlace:null,
            joinWorkDate:null,
            healthCondition:null,
            highestProfessional:null,
            specialitySkill:null,
            fulltimeEducation:null,
            fulltimeEducationSchool:null,
            inserviceEducation:null,
            inserviceEducationSchool:null,
            curentDuties:null,
            proposedDuties:null,
            fireDuties:null,
            resumes:[],
            rewardsPunishments:null,
            assessmentResult:null,
            appointmentRemovalReason:null,
            familys:[],
            fileAddress:null,
            joinPartyDate:null,
            partyTypeList:[],
            partyType:null,
            file:null,
          },
          rules:{
            cadreName:[{ required: true, message: '请输入姓名', trigger: 'blur'}],
            cadreSex:[{required: true, message: '请选择性别', trigger: 'blur' }],
            cadreBirthday:[{required: true, message: '请输入出生年月', trigger: 'blur'}],
            cadreNation:[{required: true, message: '请输入民族', trigger: 'blur' }],
            nativePlace:[{required: true, message: '请输入籍贯', trigger: 'blur'}],
            birthPlace:[{required: true, message: '请输入出生地', trigger: 'blur' }],
            joinWorkDate:[{required: true, message: '请输入参加工作时间', trigger: 'blur' }],
            healthCondition:[{required: true, message: '请输入健康情况', trigger: 'blur' }],
            highestProfessional:[{required: true, message: '请输入专业技术职务', trigger: 'blur' }],
            specialitySkill:[{required: true, message: '请输入熟悉专业有何专长', trigger: 'blur' }],
            fulltimeEducation:[{required: true, message: '请输入全日制教育', trigger: 'blur' }],
            fulltimeEducationSchool:[{required: true, message: '请输入毕业院校及专业', trigger: 'blur' }],
            inserviceEducation:[{required: true, message: '请输入在职教育', trigger: 'blur' }],
            inserviceEducationSchool:[{required: true, message: '请输入毕业院校及专业', trigger: 'blur' }],
            curentDuties:[{required: true, message: '请输入现任职务', trigger: 'blur' }],
            proposedDuties:[{required: true, message: '请输入拟任职务', trigger: 'blur' }],
            fireDuties:[{required: true, message: '请输入拟免职务', trigger: 'blur' }],
            rewardsPunishments:[{required: true, message: '请输入奖惩情况', trigger: 'blur' }],
            assessmentResult:[{required: true, message: '请输入考核结果', trigger: 'blur' }],
            appointmentRemovalReason:[{required: true, message: '请输入任免理由', trigger: 'blur' }],
            resumesDate:[{required: true, message: '请选择时间', trigger: 'blur' }],
            resumeDescribe:[{required: true, message: '请输入描述', trigger: 'blur' }],
            relation:[{required: true, message: '请输入称谓', trigger: 'blur' }],
            familyName:[{required: true, message: '请输入姓名', trigger: 'blur' }],
            familyBirthday:[{required: true, message: '请输入出生日期', trigger: 'blur' }],
            politicalStatus:[{required: true, message: '请输入政治面貌', trigger: 'blur' }],
            departmentJob:[{required: true, message: '请输入工作单位及职务', trigger: 'blur' }],
            partyTypeList:[{ required: true, message: '请选择党派', trigger: 'change'}],
            joinPartyDate:[{required: true, message: '请输入入党时间', trigger: 'blur' }],
            partyType:[{required: true, message: '请输入非共产党派内容', trigger: 'blur' }]
          },
          noticeTip:{
            cadreName:"填写户籍登记所用的姓名。\n姓名（包括少数民族干部的姓名）用字应固定，不能用同音字代替。最多允许输入18个汉字（包括“·”）。",
            cadreSex:"从下拉列表中选择，或者手动填写“男”“女”。",
            cadreBirthday:"如实填写出生年月。填写时，一律用公历和阿拉伯数字，年份用4位数字表示，月份用2位数字表示，如“197204”。",
            cadreNation:"从下拉列表中选择，或者手动填写民族的全称（如汉族、回族、朝鲜族、维吾尔族等），不能简写为“汉”“回”“鲜”“维”等。",
            nativePlace:"填写本人的祖居地（指祖父的长期居住地）。按现行政区划填写，应填写省、市或县的名称，如“辽宁大连”“河北盐山”。直辖市直接填写城市名，如“上海”“重庆”等。",
            birthPlace:"填写本人出生的地方。按现行政区划填写，应填写省、市或县的名称，如“辽宁大连”“河北盐山”。直辖市直接填写城市名，如“上海”“重庆”等。",
            joinWorkDate:"格式同【出生年月】。",
            healthCondition:"根据本人的具体情况填写“健康” “一般”或“较差”；有严重疾病、慢性疾病或身体伤残的，要如实简要填写。最多允许输入18个汉字。",
            highestProfessional:"应填写本人现担任的最高专业技术职务或现具有的最高专业技术职务任职资格。",
            specialitySkill:"填写干部所熟悉的工作业务及专长。",
            fulltimeEducation:"学历学位分为全日制教育和在职教育两类。全日制教育和在职教育区分的基本原则和条件如下：干部在参加工作之前所取得的学历学位，按照国家教育部门关于学历学位的有关规定，属于普通全日制教育的，按全日制教育掌握；其他情况，一般按在职教育掌握。干部在参加工作之后所取得的学历学位，按全日制教育掌握的，一般须同时符合以下条件：通过参加全国统一的普通高校招生考试入学、达到录取分数线、经省级招办批准录取；学习期间采取全天在校学习方式（即全脱产学习）；学习期间须与原单位脱离工作关系和工资关系，转递本人档案；毕业时颁发普通高等学校学历证书和学位证书，并重新派遣。否则，一般按在职教育掌握。\n" +
              "    具体填写要求如下：\n" +
              "    （1）【全日制教育】填写通过全日制教育获得的最高学历学位；【在职教育】填写以其他学习方式获得的最高学历学位。\n" +
              "    （2）【毕业院校系及专业】填写与学历学位相对应的毕业院校（科研院所等，下同）、系和专业，且应为毕业时院校系及专业名称。如原毕业院校系及专业现已更名，可加括号注明，不得直接填写现在的院校系及专业名称。\n" +
              "    （3）在党校学习获得学历的情况分为两类：一类是国民教育学历，其中：通过全日制教育获得的，填入【全日制教育】；通过在职学习获得的，填入【在职教育】。另一类是党校学历，均填入【在职教育】，并在研究生、大学或大专学历前加“中央党校”或“省（区、市）委党校”。\n" +
              "    （4）1970-1977年恢复高考制度以前入学的高等院校毕业生，填写“大学普通班”学历。\n" +
              "    （5）接受学历教育“结业”或“肄业”的，应予注明，如：大学结业、研究生肄业等。\n" +
              "    （6）高中及以下学历，【毕业院校系及专业】不填写。\n" +
              "    （7）获得学历同时也获得学位的，应同时填写，并写明何学科学位。如，通过全日制教育获得了大学本科学历、理学学士学位，则【全日制教育】填写“大学 理学学士”（在一栏中分两行填写）。\n" +
              "    （8）获得学历但没有学位的或以同等学力攻读并获得学位的，按获得的学历或学位如实填写。如果一个人同时有这两种情况，且分别为其最高学历、学位，则这两种情况均填写。如，通过在职学习，先获得研究生学历（没有学位），后又以同等学力攻读学位，获得了经济学硕士，则【在职教育】填写“研究生 经济学硕士”（在一栏中分两行填写），【毕业院校系及专业】相对应地要将两个毕业院校、系及专业填入。\n" +
              "    （9）以上学历、学位中，涉及国民教育学历、学位，需有国家教育行政部门承认的学历证书、国务院授权的高校或科研机构颁发的学位证书以及按规定应进入个人档案的相关材料；涉及国外学习取得的学历、学位，按其培养规格、学习年限、学业成绩或学分，比照我国高等教育相应层次的培养要求，由国家教育行政部门认证；涉及党校学历需简历若无结束时间，结束段的日期可用7个空格代替，与时间段后的两空格共连续输入9个空格，例如“1991.01--         ”，在输入9个空格后输入汉字部分。",
            curentDuties:"填写干部现工作单位及担任的主要职务（含拟免职务），一律使用全称或规范的简称。按照干部管理权限，具体填写要求由干部管理部门确定。最多可输入324个汉字。",
            proposedDuties:"应填写拟任职的工作单位及职务，一律使用全称或规范的简称。按照干部管理权限，具体填写要求由干部管理部门确定。最多可输入324个汉字。",
            fireDuties:"应填写拟免职的工作单位及职务，一律使用全称或规范的简称。按照干部管理权限，具体填写要求由干部管理部门确定。最多可输入324个汉字。",
            rewardsPunishments:"填写重要的奖励或记功，受处分的，要填写何年何月因何问题经何单位批准受何种处分，何年何月经何单位批准撤销何种处分。没有受过奖励和处分的，应填写“无” 允许栏内回车换行，最多可输入552个汉字。",
            assessmentResult:"填写近两年的年度考核情况，没有年度考核结果的，应采取写实的办法注明。最多可输入414个汉字。",
            appointmentRemovalReason:"填写此次任免的具体理由，如工作需要、任职年龄到限、任届期满、不胜任本职工作需作调整、因身体健康原因本人请求辞去××职务等等。允许栏内回车换行，最多可输入552个汉字。",
            resumes:"从参加工作时填起，大、中专院校学习毕业后参加工作的，从大、中专院校学习时填起，“文化大革命”期间毕业留校待分配的，待分配时间应另段填写“留校待分配”。简历的起止时间填到月（年份用4位数字表示，月份用2位数字表示），前后要衔接，不得空断（因病休学、休养、待分配等都要如实填写）。党内职务以中央和各级党委批准任免的时间为准；行政职务（人大、政协及人民团体的领导职务）以行政任免或有关会议通过或选举的时间为准；党内职务和行政职务一并任免的，可按党内批准的时间合并填写。在大、中专院校学习的经历，要填某年某月至某年某月在某院校某系某专业学习，院校、系及专业要填写毕业时的名称。工作简历要按照干部在不同时期所担任的职务和工作单位的变动情况分段填写。县（市）前面均应冠以省（区、市）名，地名或行政区划发生变化的，填写当时的地名或行政区划名称。参加过党校或行政学院学习三个月以上的，在职攻读学历、学位的，临时离开工作单位连续半年以上及到基层挂职锻炼的，均应在本简历段后注明；上述情况跨两个及两个以上简历段的，应在该经历结束所在简历段后另起一行注明。\n" +
              "    工作单位和职务一律使用规范的简称。\n" +
              "    对比现任职务级别，凡担任上一级（及以上）的党委委员、候补委员，纪委委员，人大常委会委员，政协常务委员、委员的，需在简历的最后隔行另段填写，写明届次。\n" +
              "    时间段（时间段格式要求：1991.01--2000.01）输入完毕后输入两个空格，之后输入汉字部分。最近一段简历若无结束时间，结束段的日期可用7个空格代替，与时间段后的两空格共连续输入9个空格，例如“1991.01--         ”，在输入9个空格后输入汉字部分。",
            familys:"主要填写干部本人的配偶、子女和父母的有关情况。亲属中现任或曾担任过高级领导职务的人员以及重要海外关系也要如实填写。按照干部管理权限，具体填写范围由干部管理部门确定。称谓、姓名、年龄、政治面貌、工作单位及职务要填写准确。“称谓”的写法要规范：配偶为妻子、丈夫，子女为儿子、女儿，多子女为长子、次子、三子、长女、次女、三女等，父母为父亲、母亲。\n" +
              "    “姓名”的填写要求同【姓名】。\n" +
              "    “出生日期”的填写要求同【出生日期】。\n" +
              "    “政治面貌”应填写：“中共党员”“预备党员”“共青团员”“无党派”“群众”或某个民主党派。\n" +
              "    “工作单位及职务”：按【现任职务】要求准确填写，家庭成员中有在国外（境外）学习、工作、定居和在中外合资或外资企业工作的，其所在院校、定居地点、工作单位及职务，应如实填写。已退休的、已去世的，应在原工作单位及职务后加括号注明，如在“工作单位及职务”中包含“已去世”字样，打印时年龄栏为空。",
            photo:"干部本人近期彩色免冠正面电子照片，宽高比为4：5。文件大小不能超过5m",
            party:"填写加入中共的时间，格式同【出生年月】。民主党派成员或无党派人士，需在“入党时间”栏内注明民主党派名称或注明无党派，如“民建”“九三”“无党派”等，不填写加入民主党派的时间；加入多个民主党派的，须如实填写，各项之间用分号隔开，如“民建；民盟”。是民主党派成员又是中共党员的，先填写加入中共时间，分号隔开后再填写民主党派名称，如“200108；民建”。"
          }
        }),
     mounted(){
      this.addResume()
      this.addFamily()
      this.getOrgTree()
      if(this.optType==='edit'){
        setTimeout(()=>{
          this.getcadreByorgNo()
        })
      }
      },
      watch:{
        'formData.cadreBirthday'(val){
              let birth=new Date(val).getTime()
              let nowDate=new Date().getTime()
              this.age=new Date(nowDate-birth).getFullYear()-1970+'岁'
        },
        'partyInfo.partyTypes'(val){
           this.validPartyType(val)
        }
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
          getcadreByorgNo(){
            this.formData.cadreId=this.rowData[0].cadreId
            this.$http.get('/cadreBase/curentinfo',{params:{cadreId:this.formData.cadreId}}).then((res)=>{
              if(res.success){
                let data=res.data
                this.isEdit=true
                for(let k in this.formData){
                  if(data.hasOwnProperty(k)){
                    if(k==='joinWorkDate'||k==='cadreBirthday'){
                      this.formData[k]=parseInt(data[k])||null
                    }else{
                      this.formData[k]=data[k]||null
                    }
                  }
               }
                this.treeValue=this.formData.orgNo
                this.getOrgType( this.orgTreeData,this.formData.orgNo)
                if(data.fileAddress){
                  this.formData.fileAddress=window.location.origin+'/'+data.fileAddress.replace("\\","/")
                }
                if(data.joinPartyDate&&data.joinPartyDate!=='null'){
                  this.partyInfo.partyTypes.push('共产党')
                }
                if(data.partyType){
                  if(data.partyType.indexOf('无')>-1){
                    this.partyInfo.partyTypes.push('无党派')
                  }else{
                    this.partyInfo.partyTypes.push('其它党派')
                  }
                }
              }
            },error=>{

            })
          },
        getOrgType(obj,orgCode){
          if(this.$typeOf(obj)==='object'){
            if(obj.orgCode===orgCode){
             this.formData.orgType=obj.orgType
            }else{
              if(obj.hasOwnProperty('children')){
                  this.getOrgType(obj.children,orgCode)
              }
            }
          }else if(this.$typeOf(obj)==='array'){
            obj.forEach((m)=>{
              this.getOrgType( m,orgCode)
            })
          }
        },
        validPartyType(val){
          this.formData.partyTypeList=val
          if(!val.length){
            for(let sk of this.partyInfo.options){
              sk.disabled=false

            }
            this.partyInfo.isShowDate=false
            this.partyInfo.isShowPartytext=false
            this.formData.joinPartyDate=null
            this.formData.partyType=null
          }else{
          if(val.includes('共产党') || val.includes('其它党派')){
            val.filter(m=>m!=='无党派')
            this.partyInfo.options[1].disabled=true
            this.partyInfo.options[2].disabled=false
            this.partyInfo.isShowDate=true
            this.partyInfo.isShowPartytext=true
            if(!val.includes('共产党')){
              this.partyInfo.isShowDate=false
              this.formData.joinPartyDate=null
              this.partyInfo.isShowPartytext=true
            }
            if(!val.includes('其它党派')){
              this.partyInfo.isShowDate=true
              this.partyInfo.isShowPartytext=false
              this.formData.partyType=null
            }
          }else{
            val.filter((m)=>m!=='共产党'&&m!=='其它党派')
            this.partyInfo.options[0].disabled=true
            this.partyInfo.options[2].disabled=true
            this.partyInfo.isShowDate=false
            this.formData.joinPartyDate=null
            this.partyInfo.isShowPartytext=true
          }
         }
        },
          chooseTree(node, instanceId){
            this.formData.orgNo=node.orgCode
            this.formData.orgType=node.orgType
          },
          orgCheckValid(rule, val, callback){
            if(val){
              if(val!='2'){
                callback(new Error('只有部门才能新增干部!'))
              }else{
                callback()
              }
            }else{
              callback(new Error('请选择需要新增干部的部门!'))
            }
          },
          dealTreeData(obj,parentId=0,id=0){
            if(this.$typeOf(obj)==='object'){
              this.$set(obj,'id',obj.orgCode)
              this.$set(obj,'label',obj.orgName)
              if(obj.hasOwnProperty('children')){
                if(!obj.children){
                  obj.children=[]
                }else{
                  this.dealTreeData(obj.children,parentId+'_'+id,id)
                }
              }
            }else if(this.$typeOf(obj)==='array'){
              obj.forEach((m,n)=>{
               this.dealTreeData( m,parentId,n)
              })
            }
          },
          getOrgTree(){
            this.$http.get('/sysOrganization/orginfos').then((res)=>{
              if(res.success){
                this.orgTreeData=[res.data]
                this.dealTreeData(this.orgTreeData,0)
              }
            },error=>{

            })
          },
        resetForm(){
          this.$refs.infoform.resetFields()
        },
        addResume(){
          this.formData.resumes.push({resumesDate:[],resumeDescribe:''})
        },
        removeResume(index){
          this.formData.resumes.splice(index,1)
        },
        addFamily(){
          this.formData.familys.push({familyName:'',relation:'',familyBirthday:'',politicalStatus:'',departmentJob:''})
        },
        removeFamily(id){
          this.formData.familys.splice(id,1)
        },
        imageValid(rule, file, callback){
          if(this.isEdit){
            callback()
          }else{
            if(file){
              let type=file.raw.type
              let size=file.size
              if(size / 1024 / 1024 >5){
                callback(new Error('电子照片大小不能超过 5MB!'))
              }else if(type!=='image/png' && type!=='image/jpeg' && type!=='image/jpg'){
                callback(new Error('电子照片只支持png,jpeg,jpg'))
              }else{
                callback()
              }
            }else{
              callback(new Error('请选择照片'))
            }
          }

        },
        changeImg(file,filelist){
            this.formData.fileAddress=URL.createObjectURL(file.raw)
           // this.fileFormData.append('file',file.raw)
          this.isEdit=false
            this.formData.file=file
        },
        getFormData(){
          return this.formData
        },
        formatDate(params){
          if(params instanceof Array){
            for(let kn of params){
              this.formatDate(kn)
            }
          }else if(params instanceof Object){
            for(let key in params){
              if (params[key] instanceof Date) {
                params[key] = new Date(params[key]).getTime()||''
              }else if(params[key] instanceof Array){
                this.formatDate(params[key])
              }
            }
          }
        },
        formateResumesDate(){
          for(let k of this.formData.resumes){
            this.$set(k,'startTime',new Date(k.resumesDate[0]).getTime()||'')
            this.$set(k,'endTime',new Date(k.resumesDate[1]).getTime()||'')
          }
        },
        custFormevent(suc){
          // this.formateResumesDate()
          this.formatDate(this.formData)
          let submtData=this.$deepCopy(this.formData)
          let forms=new FormData()
          for(let k in submtData){
            if(k==='file' && submtData[k]){
              forms.append('file',submtData[k].raw)
            }else {
              if(submtData[k]) {
                if (this.$typeOf(submtData[k]) === 'array') {
                  forms.append(k, JSON.stringify(submtData[k]))
                } else {
                  forms.append(k, submtData[k])
                }
              }
            }
          }
          suc(forms)
        },
        submit(suc,fal){
          this.$refs.infoform.validate((valid) => {
            if(valid){
              this.formateResumesDate()
              this.formatDate(this.formData)
              let submtData=this.$deepCopy(this.formData)
              let forms=new FormData()
              for(let k in submtData){
                if(k==='file'&& submtData[k]){
                  forms.append('file',submtData[k].raw)
                }else {
                  if(submtData[k]){
                    if(this.$typeOf(submtData[k])==='array'){
                      forms.append(k,JSON.stringify(submtData[k]))
                    }else{
                      forms.append(k,submtData[k])
                    }
                  }
                }
              }
              suc(forms)
            }else{
              if(fal != null){
                fal(forms)
              }
            }
          });
        }
      },

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .resum-form{
    display: inline-block;
    width: 650px;
    display: block;
  }
  .notice-tip{
    position: absolute;
    right: -27px;
    top: 13px;
    display: inline;
    color: #409eff;
  }
  .add-btn{
    position: absolute;
    left: 30px;
    top: 5px;
  }
  .remove-btn{
    position: absolute;
    right:-65px;
    top: 5px;
  }

</style>
