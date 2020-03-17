<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>

    <nav-tabbar v-show="!$route.meta.fullScreen"/>
  </div>
</template>

<script>
  import NavTabbar from 'components/tabbar/NavTabbar'

  export default {
    components:{
      NavTabbar
    },
  }
</script>

<style lang="less">
  @import "assets/css/normalize.css";
</style>
