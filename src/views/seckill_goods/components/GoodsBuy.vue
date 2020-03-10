<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon icon="wap-home-o" text="首页" @click="goHome"/>
      <van-goods-action-icon icon="cart-o" text="购物车" @click="goCart"/>
      <van-goods-action-button type="danger" :disabled="disabled_buy" text="立即抢购" @click="buyGoods"/>
    </van-goods-action>
  </div>
</template>

<script>
  // import { checkLogin } from '@/lib/utils'

  export default {
    name: "GoodsBuy",
    props: {
      disabled_buy: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      goHome() {
        this.$router.replace('/home');
      },
      goCart() {
        this.$router.push('/cart')
      },
      addToCart() {
        this.$utils.checkLogin() ? this.$emit('addToCart') : "";
      },
      buyGoods() {
        this.$utils.checkLogin() ? this.$emit('buyGoods') : '';
      },
      /*checkLogin() {
        //先判断用户是否已经登录
        if (!localStorage.getItem('userToken')) {
          this.$toast('请先登录后再操作');
          //将要返回的地址存入路由
          let path = this.$route.fullPath;

          setTimeout(()=>{
            this.$router.push({
              path:'/login',
              query:{redirect:path}
            });
          },1000)

          return false;
        }else{
          return true;
        }
      }*/
    }
  }
</script>

<style scoped>

</style>
