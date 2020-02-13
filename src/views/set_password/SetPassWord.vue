<template>
  <div class="set_password">
    <van-nav-bar fixed title="登录密码修改" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="container">
      <van-field size="large" type="password" maxlength="16" class="input_item" v-model="password" label="密码" placeholder="输入要修改的密码"/>
      <van-field size="large" type="password" maxlength="16" class="input_item" v-model="password_confirmation" label="确认密码" placeholder="输入和上面一致的密码"/>
      <div class="submit">
        <van-button type="warning" @click="changePswd">确认修改</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {AuthRequest} from "api/api";

  export default {
    name: "SetPassWord",
    data() {
      return {
        verify_str: '',
        oldUrl: '',//上一页的来源
        password: '',
        password_confirmation: ''
      }
    },
    watch: {},
    methods: {
      onClickLeft() {
        this.$router.replace('/setting');
      },
      changePswd() {
        if(!this.password || !this.password_confirmation){
          this.$toast('请输入密码和确认密码')
          return false
        }

        if(this.password != this.password_confirmation){
          this.$toast('2次密码输入不一致')
          return false
        }

        this.$toast.loading({
          message:'加载中...'
        })

        AuthRequest('/user/changePswd','post',{
          password:this.password,
          password_confirmation:this.password_confirmation,
          verify_str:this.verify_str
        }).then(res => {
          if(res.code != 200){
            this.$toast(res.msg);
          }else{
            this.$toast(res.msg);
            setTimeout(()=>{
              this.$router.replace('/login');
              localStorage.removeItem('userToken');
            },1500)
          }
        }).catch(err => {
          console.log(err);
          this.$toast.clear();
        })
      }
    },
    created() {
      this.verify_str = this.$route.params.verify_str

      if (!this.verify_str) {
        this.$toast('来源非法，禁止访问');
      }
    },
    //利用 beforeRouteEnter 这个钩子中的from参数获得之前url的信息，然后给 next 传递回调来访问当前组件的实例
    //beforeRouteEnter 守卫不能访问 this，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建
    beforeRouteEnter(to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例,将值传入oldUrl
        vm.oldUrl = from.path
      })
    },
    mounted() {
      this.$nextTick(() => {
        if (this.oldUrl != '/pswd_change') {
          this.$toast('非法访问来源，禁止访问');

          setTimeout(() => {
            this.$router.replace('/home');
          }, 2000);
        }
      })
    }
  }

</script>

<style scoped>
  .container {
    margin-top: 46px;
  }

  .container >>> input {
    font-size: 18px;
  }

  .input_item {
    align-items: flex-start;
  }

  .submit {
    padding: 5%;
  }

  .submit button {
    width: 100%;
  }
</style>
