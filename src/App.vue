<template>
  <div class="main">
    <router-view/>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
export default {
  name:'App',
  // created(){
  //   // this.initData()
  // },
  // computed:{
  //   ...mapGetters(['accountName','routes'])
  // },
  // methods:{
  //   ...mapActions(['loginIn','getMenuList','configRoute']),
  //     initData(){
  //     if(this.accountName){
  //      this.getMenuList()
  //       this.configRoute()
  //       this.$router.addRoutes(this.routes)
  //     }
  //     }
  // }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./assets/style/common.scss";
  .main{
    width: 100%;
    height: 100%;
   overflow: hidden;
  }
</style>
