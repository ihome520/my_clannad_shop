<template>
  <div class="user">
    用户页面
  </div>
</template>

<script>
  export default {
    name: "User",
    data(){
      return {

      }
    },
    mounted(){
      this.getUserInfo();
    },
    methods:{
      //检查是否有token，如果没有，表示没有登录
      getUserInfo(){
        let token = this.$store.state.user.token;

        if(!token){ //未登录
          this.$router.replace('/login');
        }
      }
    }
  }
</script>

<style scoped>

</style>
