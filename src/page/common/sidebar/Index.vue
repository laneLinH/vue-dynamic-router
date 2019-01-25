<template>
  <el-aside class="left-nav">
    <el-menu :default-active="routerPath"  :unique-opened="false">
      <sliderItem :menu-data="menuList"></sliderItem>
    </el-menu>
  </el-aside>
</template>
<script>
  import {mapActions,mapState} from 'vuex'
  import sliderItem from './SliderItem'
  export default {
    components:{
      sliderItem
    },
    computed:{
      routerPath(){
        return this.$route.path
      },
      menuList(){
        return this.$store.state.menu.menuList?this.$store.state.menu.menuList:{children:[]}
      },
      ...mapState(['login'])
    },
    mounted(){
      this.initData()
    },
    methods:{
      initData(){

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../assets/style/variables";
  .left-nav{
    padding: 0;
    margin: 0;
    max-width: 230px;
    overflow-y: auto;
    height: calc(100vh - 60px);
    background: white;
  }
</style>
