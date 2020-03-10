<template>
    <div class="sec_kill">
      <router-link to="/seckill">
        <img src="https://wx.17hxg.com/uploads/shop_images/seckill.jpg" alt=""/>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "HomeSecKill",
        props: {},
        data() {
            return {}
        },
        watch: {},
        methods: {},
    }

</script>

<style scoped lang="less">
  .sec_kill{
    width: 100%;
    height: 100px;
    border-bottom: #eaeaea solid 5px;

    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
