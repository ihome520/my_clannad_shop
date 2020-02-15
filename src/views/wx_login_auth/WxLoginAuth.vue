<template>
  <div></div>
</template>

<script>
  export default {
    name: "WxLoginAuth",
    components: {},
    props: {},
    data() {
      return {}
    },
    watch: {},
    filter: {},
    methods: {},
    created() {
      //判断是否有userToken
      if (this.$route.query.token) {
        localStorage.setItem('userToken',this.$route.query.token)
        this.$toast('登录成功，正在跳转...');

        setTimeout(()=>{
          this.$router.replace('/user');
        },1500)
      }else{
        this.$toast('授权失败，请重试换其他方式登录');
        setTimeout(()=>{
          this.$router.replace('/login');
        },1500)
      }
    },
    mounted() {

    }
  }

</script>

<style scoped lang="less">

</style>
