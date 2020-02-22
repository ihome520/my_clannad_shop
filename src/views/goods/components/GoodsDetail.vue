<template>
  <div class="goods_detail">
    <div class="title">商品详情：</div>
    <div class="content" v-html="content"></div>
  </div>

</template>

<script>
  export default {
    name: "GoodsDetail",
    components: {},
    props: {
      content:{
        type:String,
        default:'',
      }
    },
  }

</script>

<style scoped>
  .goods_detail{
    padding: 5px;
  }
  .title{
    padding: 3px;
    font-size: 14px;
    border-bottom: #aea699 1px solid;
  }
  .goods_detail >>> img{
    width: 100%;
    vertical-align:top;
  }

  .content{
    font-size: 14px;
  }
</style>
