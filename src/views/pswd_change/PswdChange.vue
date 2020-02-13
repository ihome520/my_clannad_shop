<template>
  <div class="pswd_change">
    <van-nav-bar fixed title="登录密码修改" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="container">
      <van-field size="large" maxlength="11" class="input_item" v-model="tel" label="手机号" placeholder="输入绑定的手机号"/>
      <van-field
        v-model="sms_code"
        maxlength="6"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        @blur="checkCode"
      >
        <van-button slot="button" :disabled="send_status" size="small" type="primary" @click="sendMsg">{{ send_text }}
        </van-button>
      </van-field>

      <div class="submit" v-show="send_status">
        <van-button type="warning" @click="next_page" :disabled="next_ctrl">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {AuthRequest} from "api/api";

  export default {
    name: "PswdChange",
    data() {
      return {
        tel: '18779031201',
        sms_code: '',
        send_status: false,
        send_text: '发送验证码',
        calcSecond: 100,
        verify_str:'',
        next_ctrl:true,//下一步按钮的控制
        next_page_str:'',//到下一页的验证字符串 用于验证是否是来自正常方式进入的
      }
    },
    methods: {
      onClickLeft() {
        this.$router.replace('/setting');
      },
      sendMsg() {
        if(!(/^1[3456789]\d{9}$/.test(this.tel))){
          this.$toast("手机号码格式有误，请重填");
          return false;
        }

        AuthRequest('/user/sendMsg','post',{tel:this.tel}).then(res => {
          if(res.code != 200){
            this.$toast(res.msg);
            return false;
          }else if(res.data.send_status == 1){ //表示已经发送短信 倒计时还没完结 防刷新
            //已经发送
            this.calcSecond = res.data.calcSecond; //重置倒计时
            this.send_status = true;
            this.sms_code = '';
            this.verify_str = res.data.verify_str;
          }else{
            this.verify_str = res.data.verify_str;//随机验证码
            this.send_status = true;
            this.sms_code = '';
            this.calcSecond = 100;//第二次刷新的時候，要重置倒計時
          }
          this.$toast(res.msg);
          this.countDown();
        }).catch(err => {
          console.log(err);
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
      checkCode(){
        if(this.sms_code.length == 6 && this.verify_str){ //满6位 就检查
          this.$toast.loading({
            message:'效验中...'
          })
          AuthRequest('/user/checkCode','post',{
            sms_code:this.sms_code,
            verify_str:this.verify_str,
            tel:this.tel
          }).then(res => {
            if(res.code != 200){
              this.$toast(res.msg);
              this.next_ctrl = true;
            }else{
              this.next_ctrl = false;
              this.verify_str = '';
              this.next_page_str = res.data;
              this.$toast('验证成功！');
            }
          }).catch(err => {
            this.$toast.clear();
            console.log(err);
          })
        }
      },
      /**
       * 下一步
       */
      next_page() {
        if(this.next_page_str){
          this.$router.replace({
            path:'/set_password/' + this.next_page_str, //到下一页的时候，带上验证字符串参数
          });
        }else{
          this.$toast('请检查验证码输入是否正确');
        }
      }
    },
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
