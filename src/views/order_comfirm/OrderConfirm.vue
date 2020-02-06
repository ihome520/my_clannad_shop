<template>
  <div class="order_confirm">
    <van-nav-bar fixed title="订单确认" left-text="返回" left-arrow @click-left="onClickLeft"/>
  </div>
</template>

<script>
  import {AuthRequest} from "api/api";

  export default {
    name: "OrderConfirm",
    components: {},
    props: {},
    data() {
      return {
        cart_ids: 0
      }
    },
    watch: {},
    filter: {},

    created() {
      this.cart_ids = this.$route.query.cart_ids
    },
    mounted() {
      this.getConfirmInfo();
    },
    methods: {
      getConfirmInfo(){
        let cd = this.cart_ids
        AuthRequest('/cart/settlement','post',{cart_ids:cd}).then(res=>{
          if(res.code != 200){
            this.$toast(res.msg);

            this.$router.replace('/cart'); //发生错误，调回购物车页面
          }else{
            //订单确认页
            console.log(res);
          }
        })
      },
      onClickLeft(){
        this.$router.replace('/cart');
      }
    },
  }

</script>

<style scoped lang="less">
  .order_confirm {

  }
</style>
