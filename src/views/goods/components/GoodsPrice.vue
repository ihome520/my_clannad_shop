<template>
  <div class="goods_price">
    <div class="price">
      <span class="left">￥ 99.9</span>
      <span class="right">
        <van-icon name="star-o" />
        <div>收藏</div>
      </span>
    </div>
    <div class="title">
      夏季新款男士纯棉透气吸汗Polo格子衬衫T恤打底衫
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsPrice",
    components:{

    },
    props:{

    },
    data(){
      return {

      }
    },
    watch:{

    },
    filter:{

    },
    methods:{

    }
  }
</script>

<style scoped lang="less">
  .goods_price{
    padding: 5px 10px 5px 5px;
    border-bottom: #e8e8e8 solid 10px;
    .price{
      display: flex;
      justify-content: space-between;

      .left{
        font-size: 26px;
        line-height: 30px;
        color: red;
      }

      .right{
        text-align: center;
        font-size: 10px;
      }
    }
  }

  .title{
    padding: 5px;
  }

</style>
