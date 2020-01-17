<template>
  <div class="goods">
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <goods-swiper :album="goods_album"/>
    <goods-price/>
    <goods-attr/>
  </div>
</template>

<script>
  import GoodsSwiper from "./components/GoodsSwiper";
  import GoodsPrice from "./components/GoodsPrice";
  import GoodsAttr from "./components/GoodsAttr";

  export default {
    name: "Goods",
    components:{
      GoodsSwiper,
      GoodsPrice,
      GoodsAttr
    },
    data(){
      return {
        goods_album: [
          {
            image:'https://wx.17hxg.com/uploads/goods_album/20200115/15790832175e1ee5d12160c.jpg',
          },
          {
            image: 'https://wx.17hxg.com/uploads/goods_album/20200115/15790832175e1ee5d12123e.jpg',
          },
          {
            image: 'https://wx.17hxg.com/uploads/goods_album/20200115/15790829695e1ee4d948be4.jpg',
          }
        ]
      }
    },
    mounted(){
      console.log(this.$route);
    },
    methods:{
      onClickLeft(){
        this.$router.back(-1);
      }
    }
  }
</script>

<style scoped>

</style>
