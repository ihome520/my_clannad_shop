<template>
  <!--swiper-->
  <van-swipe :autoplay="3000" :height="200">
    <van-swipe-item v-for="(item, index) in album" :key="index">
      <div class="img_box">
        <div class="img_center">
          <img :src="item.image" class="swiper-img"/>
        </div>
      </div>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
  export default {
    name: "HomeSwiper",
    props: {
      album: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .img_box {
    background: #d8d8d8;
    width: 100%;
    height: 100%;

    .img_center{
      height: 100%;
      width: 50%;
      margin: 0 auto;

      .swiper-img {
        width: 100%;
        height: 100%;
      }
    }
  }




</style>
