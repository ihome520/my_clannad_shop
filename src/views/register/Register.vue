<template>
  <div class="register">
    <van-nav-bar fixed title="注册用户" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="container">
      <van-field size="large" class="input_item" maxlength="10" v-model="user.username" label="用户名"/>
      <van-field size="large" type="password" class="input_item" maxlength="16" v-model="user.password" label="密码"/>
      <van-field size="large" type="password" class="input_item" maxlength="16" v-model="user.password_confirmation" label="确认密码"/>
      <van-field size="large" class="input_item" maxlength="10" v-model="user.nick_name" label="昵称"/>
      <van-field size="large" class="input_item" maxlength="11" v-model="user.tel" label="手机" placeholder="测试账号随便填"/>
      <van-field size="large" class="input_item" maxlength="50" v-model="user.email" label="邮箱"/>
      <van-field v-model="email_code" maxlength="6" center clearable label="邮箱验证码" placeholder="请输入邮箱验证码">
        <van-button slot="button" :disabled="send_status" size="small" type="primary" @click="sendVerifyCode">
          {{send_text}}
        </van-button>
      </van-field>
      <van-field size="large" label="性别">
        <div class="sex_input" slot="input">
          <van-checkbox v-model="user.sex == 0" @click="changeSex(0)" icon-size="24px">男</van-checkbox>
          <van-checkbox v-model="user.sex == 1" @click="changeSex(1)" icon-size="24px">女</van-checkbox>
        </div>
      </van-field>
      <div class="add_btn">
        <van-button type="info" @click="register">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {HttpRequest} from "api/api";

  export default {
    name: "Register",
    components: {},
    data() {
      return {
        send_status: false,
        send_text: '发送验证码',
        email_code: '',
        calcSecond: 100,
        verify_str: '',
        user: {
          username: 'ihome520',
          password: '123456',
          password_confirmation: '123456',
          nick_name: '月宫亚由',
          tel: '18779031202',
          email: 'hxxk@qq.com',
          sex: 0
        }
      }
    },
    watch: {},
    filter: {},
    methods: {
      onClickLeft() {
        this.$router.replace('/login');
      },
      changeSex(sex) {
        this.user.sex = sex
      },
      sendVerifyCode() {
        if (!this.user.email || !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.user.email)) {
          this.$toast('邮箱未输入或格式不正确，请检查');
          return false;
        }

        HttpRequest('/login/sendRegEmailVerifyCode', 'post', {
          email: this.user.email
        }).then(res => {
          if (res.code != 200) {
            this.$toast(res.msg);
            return false;
          } else if (res.data.send_status == 1) { //表示已经发送短信 倒计时还没完结 防刷新
            //已经发送
            this.calcSecond = res.data.calcSecond; //重置倒计时
            this.send_status = true;
            this.email_code = res.data.code;
            this.verify_str = res.data.verify_str;
          } else {
            this.verify_str = res.data.verify_str;//随机验证码
            this.send_status = true;
            this.email_code = res.data.code;
            this.calcSecond = 100;//第二次刷新的時候，要重置倒計時
          }
          this.$toast(res.msg);
          this.countDown();
        })
      },
      /**
       * 倒计时
       */
      countDown() {
        let calc = setInterval(() => {
          if (this.calcSecond == 1) {
            clearInterval(calc);
            this.send_status = false;
            this.send_text = '发送验证码';
            this.calcSecond = 5;
          } else {
            this.calcSecond--;
            this.send_text = this.calcSecond + '秒后重发';
          }
        }, 1000)
      },
      register() {
        //正则验证
        let msg = '';
        if (!/[\u4e00-\u9fa5A-Za-z_0-9]{1,10}$/.test(this.user.nick_name)) {
          msg = '昵称只能是中文、数字、下划线、字母'
        } else if (!/[A-Za-z_0-9]{3,12}$/.test(this.user.username)) {
          msg = '用户名只能是字母、数字、下划线';
        } else if (!/^1[3456789]\d{9}$/u.test(this.user.tel)) {
          msg = '手机号格式不正确';
        } else if (!/[0|1]{1}$/.test(this.user.sex)) {
          msg = '性别不在可选范围内'
        } else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.user.email)) {
          msg = '邮箱未输入或格式不正确，请检查'
        } else if (!/[0-9]{6}$/.test(this.email_code)) {
          msg = '验证码未输入或格式不正确'
        } else if (this.password != this.password_confirmation) {
          msg = '2次密码不一致'
        } else if (this.verify_str.length > 100) {
          msg = '验证码字符串格式不正确'
        }

        if (msg) {
          this.$toast(msg);
          return false;
        }

        HttpRequest('/login/register', 'post', {
          username: this.user.username,
          password: this.user.password,
          password_confirmation: this.user.password_confirmation,
          nick_name: this.user.nick_name,
          tel: this.user.tel,
          email: this.user.email,
          sex: this.user.sex,
          code: this.email_code,
          verify_str: this.verify_str,
        }).then(res => {
          if (res.code != 200) {
            this.$toast(res.msg);
            return false;
          } else {
            this.$dialog.alert({
              title: '注册成功',
              message: '测试账号默认支付密码：123456'
            }).then(() => {
              localStorage.setItem('userToken', res.data);
              this.$router.replace('/user');
            });
          }
        })
      }
    },
  }

</script>

<style scoped lang="less">
  .container {
    margin-top: 46px;

    .add_btn {
      padding: 5%;

      button {
        font-size: 16px;
        width: 100%;
      }
    }

    .sex_input {
      display: flex;
    }

    .sex_input div {
      margin-right: 10px;
      box-sizing: border-box;
    }
  }
</style>
