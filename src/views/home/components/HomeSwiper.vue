<template>
  <!--swiper-->
  <van-swipe :autoplay="3000" :height="200">
    <van-swipe-item v-for="(item, index) in banner" :key="index">
      <img :src="item.image" class="swiper-img" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
    export default {
        name: "HomeSwiper",
      props:{
        banner:{
          type:Array,
          default(){
            return [];
          }
        }
      }
    }
</script>

<style scoped>
  .swiper-img{
    width: 100%
  }
</style>
