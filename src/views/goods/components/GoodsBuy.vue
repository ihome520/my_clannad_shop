<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon icon="wap-home-o" text="首页" @click="goHome"/>
      <van-goods-action-icon icon="cart-o" text="购物车" @click="goCart"/>
      <van-goods-action-button type="warning" :disabled="disabled_buy" text="加入购物车" @click="addToCart"/>
      <van-goods-action-button type="danger" :disabled="disabled_buy" text="立即购买" @click="buyGoods"/>
    </van-goods-action>
  </div>
</template>

<script>
  export default {
    name: "GoodsBuy",
    props:{
      disabled_buy:{
        type:Boolean,
        default:false
      },
    },
    methods:{
      goHome(){
        this.$router.replace('/home');
      },
      goCart(){
        this.$router.push('/cart')
      },
      addToCart(){
        this.$emit('addToCart')
      },
      buyGoods(){
        this.$emit('buyGoods')
      }
    }
  }
</script>

<style scoped>

</style>
