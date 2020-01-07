<template>
  <div id="app">
    <router-view/>

    <nav-tabbar v-show="!$route.meta.fullScreen"/>
  </div>
</template>

<script>
  import NavTabbar from 'components/tabbar/NavTabbar'

  export default {
    components:{
      NavTabbar
    }
  }
</script>

<style lang="less">
  @import "assets/css/normalize.css";
</style>
