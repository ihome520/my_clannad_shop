<template>
  <div>
    购物车页面
  </div>
</template>

<script>
  import {AuthRequest} from "@/api/api";

  export default {
    name: "Cart",
    mounted() {
      this.getCartList() //获取购物车列表
    },
    methods: {
      getCartList() {
        AuthRequest('/cart/index').then(res => {
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>

</style>
