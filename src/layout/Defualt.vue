<template>
  <el-container class="is-vertical" >
    <headerTop></headerTop>
    <tagNav></tagNav>
    <el-container>
      <sidebar></sidebar>
      <mainContainer></mainContainer>
    </el-container>
  </el-container>
</template>

<script>
    import {headerTop,mainContainer,tagNav,sidebar} from '@/page/common'
    export default {
        name: "defualt",
        components:{
          headerTop,
          mainContainer,
          tagNav,
          sidebar
        }
    }
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>

</style>
