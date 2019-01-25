<template>
      <el-table :data="mockdata.data">
        <template  v-for="(item,index) in tableColumn">
            <el-table-column
              :type="item.tableColumnType"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :key="index"
              :fixed="item.fixed">
            </el-table-column>
        </template>
      </el-table>
</template>
<script>
    export default {
        name: "dynamicTreeTable",
       data:()=>({
         mockdata:{
           "code": 200,
           "success": true,
           "msg": "success",
           "data": {
             "orgId": null,
             "orgCode": "1",
             "orgName": "旅投集团",
             "orgType": 1,
             "isUser": 1,
             "parentId": null,
             "createDate": null,
             "updateDate": null,
             "children": [
               {
                 "orgId": "1084743938474762241",
                 "orgCode": "1-8",
                 "orgName": "测试二级子公司",
                 "orgType": 1,
                 "isUser": 1,
                 "parentId": "1",
                 "createDate": "2019-01-14 17:28:03",
                 "updateDate": "2019-01-14 17:28:03",
                 "children": null,
                 "leaf": true
               },
               {
                 "orgId": "11",
                 "orgCode": "1-1",
                 "orgName": "酒店公司",
                 "orgType": 1,
                 "isUser": 1,
                 "parentId": "1",
                 "createDate": "2019-01-14 16:19:11",
                 "updateDate": null,
                 "children": null,
                 "leaf": true
               },
               {
                 "orgId": "12",
                 "orgCode": "1-2",
                 "orgName": "四川旅投商贸发展有限责任公司",
                 "orgType": 1,
                 "isUser": 1,
                 "parentId": "1",
                 "createDate": "2019-01-14 16:20:30",
                 "updateDate": null,
                 "children": null,
                 "leaf": true
               },
               {
                 "orgId": "13",
                 "orgCode": "1-3",
                 "orgName": "航旅公司",
                 "orgType": 1,
                 "isUser": 1,
                 "parentId": "1",
                 "createDate": "2019-01-14 16:22:44",
                 "updateDate": null,
                 "children": null,
                 "leaf": true
               },
               {
                 "orgId": "14",
                 "orgCode": "1-4",
                 "orgName": "创新公司",
                 "orgType": 1,
                 "isUser": 1,
                 "parentId": "1",
                 "createDate": "2019-01-14 16:23:17",
                 "updateDate": null,
                 "children": null,
                 "leaf": true
               },
               {
                 "orgId": "15",
                 "orgCode": "1-5",
                 "orgName": "金牛宾馆",
                 "orgType": 1,
                 "isUser": 1,
                 "parentId": "1",
                 "createDate": "2019-01-14 16:23:20",
                 "updateDate": null,
                 "children": null,
                 "leaf": true
               },
               {
                 "orgId": "16",
                 "orgCode": "1-6",
                 "orgName": "锦弘集团",
                 "orgType": 1,
                 "isUser": 1,
                 "parentId": "1",
                 "createDate": "2019-01-14 16:23:23",
                 "updateDate": null,
                 "children": null,
                 "leaf": true
               },
               {
                 "orgId": "17",
                 "orgCode": "1-7",
                 "orgName": "基金公司",
                 "orgType": 1,
                 "isUser": 1,
                 "parentId": "1",
                 "createDate": "2019-01-14 16:23:31",
                 "updateDate": null,
                 "children": null,
                 "leaf": true
               }
             ],
             "leaf": false
           }
         }
       })
    }
</script>

<style scoped>

</style>
