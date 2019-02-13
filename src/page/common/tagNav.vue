<template>
  <section class="tag-nav">
    <ul>
      <li v-for="(item,id) in tarNavList" :key="id" :class="{active:item.path===localRoute}">
        <router-link :to="item.path">{{item.name}}</router-link>
        <a class="tag-close" @click="closeTags(id)"><i class="fa fa-close" ></i></a>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          页面标签操作<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </section>
</template>

<script>
  import {mapState,mapMutations,mapActions} from 'vuex'
  export default {
    name: "TagNav",
    mounted(){
      this.setTarNav(this.$route)
    },
    computed:{
      tarNavList(){
        return this.$store.state.tarNav.tarNavList
      },
      localRoute(){
        return this.$route.path
      }
    },
    watch:{
      $route(n, o){
        this.setTarNav(n)
      }
    },
    methods:{
      ...mapActions(['setTarNav']),
      closeTags(index) {
        const delItem = this.tarNavList.splice(index, 1)[0];
        const item = this.tarNavList[index] ? this.tarNavList[index] : this.tarNavList[index - 1];
        if (item) {
          delItem.path === this.$route.fullPath && this.$router.push(item.path);
        }else{
          this.$router.push('/');
        }
      },
      closeOther(){
        const curItem = this.tarNavList.filter(item => {
          return item.path === this.$route.fullPath;
        })
        this.$store.commit('setTarNav',curItem)
      },
      closeAll(){
       const tarlist= this.tarNavList.filter(m=>{
          return m.path === this.$route.fullPath;
        })
        console.log(tarlist)
      this.$store.commit('setTarNav',tarlist)
      },
      handleTags(command){
        console.log(command)
        command === 'other' ? this.closeOther() : this.closeAll();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tag-nav{
    position: absolute;
    width: calc(100% - 230px);
    right: 0;
    height: 41px;
    top: 60px;
    background-color: #ffffff;
    box-shadow: 0 0 4px 0 #ccc;
    z-index: 99;
    ul{
      display: flex;
      li{
        margin-right: 5px;
        margin: 5px;
        padding: 5px;
        font-size: $smFontSize;
        border-radius: 5px;
        background: $tagDefBkColor;
        transition: all .3s ease-in;
        a{
          /*color: white;*/
        }
      }
      li.active{
        margin: 5px;
        padding: 5px;
        background: $tagAcBkColor;
        border-radius: 5px;

      }
    }
  }
  .tag-close{
    margin-left: 5px;
  }
  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 5px;
    text-align: center;
    height: 41px;
    background: #fff;
  }
</style>
