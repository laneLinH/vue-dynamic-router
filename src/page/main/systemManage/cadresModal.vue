<template>
    <el-table :data="cadreData" border>
        <el-table-column prop="cadreName" label="姓名">
        </el-table-column>
        <el-table-column prop="cadreSex" label="性别">
        </el-table-column>
        <el-table-column prop="cadreBirthday" label="出生日期">
            <template slot-scope="scope">
                <span>{{formatDate(scope.row.cadreBirthday)}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="birthPlace" label="出生地">
        </el-table-column>
        <el-table-column prop="fulltimeEducation" label="学历">
        </el-table-column>
        <el-table-column prop="fulltimeEducationSchool" label="毕业院校">
        </el-table-column>
        <el-table-column prop="orgName" label="所属组织">
        </el-table-column>
    </el-table>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "cadresModal",
        data:()=>({
          cadreData:[]
        }),
        computed:{
            ...mapState(['dynamicVx']),
            rowData(){
                console.log(this.dynamicVx.singleRowData)
                return this.dynamicVx.singleRowData
            }
        },
        created(){
            this.getCadreByorgNo()
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
                   console.log(res)
                    if(res.success){
                        this.cadreData=res.data
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
