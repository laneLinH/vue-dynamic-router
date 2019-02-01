<template>
  <div class="main">
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'App',
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
