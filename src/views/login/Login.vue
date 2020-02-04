<template>
  <div class="login">
    <p class="title">登录 / 注册</p>
    <form @submit.prevent="formSub($event)">
      <div class="form-item">
        <label>手机号：</label>
        <input type="text" v-model="formInputData.username" name="username"/>
      </div>
      <div class="form-item">
        <label>密　码：</label>
        <input type="password" v-model="formInputData.password" name="password"/>
      </div>
      <div class="form-item">
        <label>验证码：</label>
        <input type="" class="captcha" name="captcha"/>
      </div>
      <div class="tips" v-show="tips">
        {{ tips }}
      </div>
      <div class="submit_area">
        <input type="submit" class="submit_btn" value="账号登录"/>
        <p>或</p>
        <input type="submit" class="wxlogin_btn" value="微信登录"/>
      </div>
    </form>
  </div>
</template>

<script>
  import {HttpRequest} from "../../api/api";

  export default {
    name: "Login",
    data() {
      return {
        formInputData:{
          username:'18779031201',
          password:'123',
        },
        tips:''
      }
    },
    watch: {},
    methods: {
      formSub(event){
        this.tips = '';//清空提示
        console.log(event);
        // console.log(event.target.elements.tel.value);
        // console.log(event.target.elements.password.value);
        // console.log(event.target.elements.captcha.value);

        if(!this.formInputData.username || !this.formInputData.password){
          this.$toast('请输入用户名和密码')
          return false
        }

        //开始请求登录接口
        HttpRequest('/login/login','post',this.formInputData).then(res=>{
          console.log(res);
          //将token存入localStorage中
          // this.$store.dispatch('setLoginStatus',res.data.token);
          //跳转页面
          // console.log('存入');

          if(res.code != 200){
            this.$toast(res.msg);
          }else{
            localStorage.setItem('userToken',res.data.token);

            //判断有没有要跳转的路由
            let path = this.$route.query.redirect ? this.$route.query.redirect : '/home';

            this.$toast('登录成功，正在跳转...');

            setTimeout(()=>{
              this.$router.replace(path);
            },1000)

          }
        }).catch(error=>{
          console.log(error);
        })
      }
    },
    created() {

    },
    mounted() {

    }
  }

</script>

<style scoped lang="less">
  .title {
    text-align: center;
    background-color: #cccccc;
    margin: 0;
    padding: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 0px 20px 0px 20px ;

    .form-item{
      padding: 10px 10px 0px;

      input[type=text] {
        border: none;
        border-bottom: #d8d8d8 1px solid;
      }

      input[type=password]{
        border: none;
        border-bottom: #d8d8d8 1px solid;
      }
    }

    .tips{
      padding: 5px;
      color: red;
      font-size: 12px;
      text-align: center;
    }

    .submit_area{
      text-align: center;
      margin-top: 10px;

      .submit_btn{
        padding: 5px 20px;
        border: none;
        background-color: #22d2e3;
        color: #fff;
      }

      .wxlogin_btn{
        padding: 5px 20px;
        border: none;
        margin-left: 10px;
        background-color: #2de35f;
        color: #fff;
      }
    }
    .captcha{
      border: none;
      border-bottom: #d8d8d8 1px solid;
      width: 40%;
    }




  }
</style>
