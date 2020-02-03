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
        <input type="text" v-model="formInputData.password" name="password"/>
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
          username:'',
          password:'',
        },
        tips:''
      }
    },
    watch: {},
    methods: {
      formSub(event){
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

      input[type=text]{
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
