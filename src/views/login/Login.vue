<template>
  <div class="login">
    <van-nav-bar title="登录/注册"/>

    <div class="logo">
      <van-icon name="friends-o" size="75"/>
    </div>

    <div class="login_form">
      <div class="item">
        <van-field v-model="formInputData.username" label="用户名：" placeholder="请输入用户名" />
        <van-field type="password" v-model="formInputData.password" label="密码：" placeholder="请输入密码" />
      </div>
    </div>

    <div class="login_btn">
      <van-button type="primary" @click="wechat_login">微信登录</van-button>
      <van-button type="info" @click="formSub">账号登录</van-button>
    </div>

    <div class="not_account">
      <span>还没有账号？</span>
      <router-link to="/register">
        立即注册
      </router-link>
    </div>


    <!--<form @submit.prevent="formSub($event)">
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
    </form>-->
  </div>
</template>

<script>
  import {HttpRequest} from "../../api/api";

  export default {
    name: "Login",
    data() {
      return {
        formInputData:{
          username:'ihome520',
          password:'123456',
        },
        tips:''
      }
    },
    watch: {},
    methods: {
      formSub(event){
        // this.tips = '';//清空提示
        // console.log(event);
        // console.log(event.target.elements.tel.value);
        // console.log(event.target.elements.password.value);
        // console.log(event.target.elements.captcha.value);

        if(!this.formInputData.username || !this.formInputData.password){
          this.$toast('请输入用户名和密码')
          return false
        }

        this.$toast.loading({
          message:'正在登录...'
        })

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
          this.$toast.clear();
        })
      },
      wechat_login(){
        this.$toast('跳转中...');
        this.$route.query.redirect;
        // let url = encodeURIComponent('https://wx.17hxg.com/index/login/wxLogin');
        // window.location.href='https://open.weixin.qq.com/connect/qrconnect?appid=wx876213c6af12013a&redirect_uri='+url+'&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect';
        window.location.href='https://wx.17hxg.com/index/login/wxLogin';
      }
    },
    created() {

    },
    mounted() {

    }
  }

</script>

<style scoped>
  .logo{
    display: flex;
    justify-content: center;
    padding: 8%;
  }

  .login_form{
    padding: 0 10%;
  }

  .item{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: #d8d8d8 2px solid;
    border-radius: 5px;
  }

  .item >>> input {
    font-size: 18px;
  }

  .login_btn{
    display: flex;
    justify-content: center;
    padding: 3% 0;
  }

  .login_btn button{
    margin-right: 10px;
  }

  .not_account{
    box-sizing: border-box;
    margin-top: 10%;
    font-size: 14px;
    display: flex;
    justify-content: center;
  }

  .not_account a{
    color: #1c8fd2;
  }




  /*
  form {
    font-size: 16px;
    display: flex;
    flex-direction: column;
    padding: 0px 20px 0px 20px ;
  }

  .form-item{
    padding: 10px 10px 0px;
  }
    input[type=text] {
      border: none;
      border-bottom: #d8d8d8 1px solid;
    }
    input[type=password]{
      border: none;
      border-bottom: #d8d8d8 1px solid;
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
  }
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
  .captcha{
    border: none;
    border-bottom: #d8d8d8 1px solid;
    width: 40%;
  }*/
</style>
