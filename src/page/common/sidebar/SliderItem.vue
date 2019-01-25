<template>
  <div class="menu-wrapper">
    <template v-for="(item,index) in menuData">
      <el-submenu :index="item.path" v-if="item.children">
        <span slot="title" >{{item.name}}</span>
        <SliderItem :menu-data="item.children"></SliderItem>
      </el-submenu>
      <el-menu-item :index="item.pathUrl" @click="linkTo(item)" v-else>
        <a  class="links">
          {{item.name}}
        </a>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: "SliderItem",
    props:{
      menuData:{
        type:Array,
        default:[]
      }
    },
    methods:{
      linkTo(item){
        this.$router.push({path:item.pathUrl})
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .links{
    color: black;
  }
</style>
