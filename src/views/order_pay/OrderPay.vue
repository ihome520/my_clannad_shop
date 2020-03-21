<template>
    <div class="order_pay">
      <div class="layer_box" v-show="showKeyboard"></div>
      <van-nav-bar fixed title="订单支付"/>
      <div class="success_info">
        <div class="succ_img">
          <img src="https://wx.17hxg.com/uploads/shop_images/Success.png" alt=""/>
          <div>下单成功！请支付！</div>
        </div>
        <div class="order_info">
          <div>
            <div>订单号：{{ order_sn }}</div>
            <div>物品数量：{{ goods_total }}件</div>
            <div>总金额：{{ price_total }}元</div>
            <div>下单时间：{{ created_at }}</div>
            <div class="balance">个人账户余额：{{ balance }}</div>
          </div>
        </div>
      </div>
      <div class="pay_btn">
        <van-button type="primary" @click="weixinPay">微信支付</van-button>
<!--        <van-button type="info">支付支付</van-button>-->
          <van-button type="warning" :disabled="balance_ctrl" @click="showKeyboard = true">余额支付</van-button>
      </div>

      <div class="footer">
        <router-link replace to="/user">返回个人中心</router-link>
      </div>

      <!-- 密码输入框 -->
      <div v-show="showKeyboard">
        <van-password-input class="pswd_input"
          :value="password"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
        <div class="pswd_tips">请输入6位数支付密码</div>
      </div>
      <!-- 数字键盘 -->
        <van-number-keyboard class="pswd_keyboard"
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="cancelPay"
        />
    </div>
</template>

<script>
  import {AuthRequest} from "api/api";
  import wx from 'weixin-js-sdk';

  export default {
    name: "OrderPay",
    components: {},
    props: {},
    data() {
      return {
        order_sn:this.$route.query.order_sn,
        goods_total:0,
        price_total:0.00,
        created_at:'2020-02-09 21:10:00',
        balance:0.00,
        balance_ctrl:false,//控制余额的有效性
        password:'',
        showKeyboard:false,
      }
    },
    watch: {},
    filter: {},
    methods: {
      onInput(key) {
        this.password = (this.password + key).slice(0, 6);

        if(this.password.length == 6){
            //验证密码
          AuthRequest('/balance/checkPayPswd','post',{
            password:this.password
          }).then(res=>{
            if(res.code != 200){
              this.$toast(res.msg);
              this.password = '';//清空密码
            }else{
              this.order_pay();//余额支付
            }
          })
        }
      },
      cancelPay(){
        this.showKeyboard = false;
        this.password = '';
        this.password.slice(0, 6);
      },
      onDelete() {
        this.password = this.password.slice(0, this.password.length - 1);
      },
      getOrderInfo(){
        AuthRequest('/order/order_pay_page','get',{
          order_sn:this.order_sn
        }).then(res=>{
          if(res.code != 200){
            this.$dialog.alert({
              title: '订单支付',
              message: res.msg
            }).then(() => {
              this.$router.replace('/user')
            });
          }else{
            this.goods_total = res.data.order_info.goods_total;
            this.price_total = res.data.order_info.price_total;
            this.created_at = res.data.order_info.created_at;
            this.balance = res.data.balance;

            if(parseFloat(this.balance) < parseFloat(this.price_total)){
              this.balance_ctrl = true;//余额不足时，不能用月支付
            }
          }
        })
      },
      /**
       * 支付类型
       * @param type
       */
      order_pay(pay_type = 1){
        if(pay_type == 1){ //余额
          this.$toast.loading({
            message:'支付中',
            overlay:true,
            loadingType:'spinner'
          });
          AuthRequest('/balance/balancePay','post',{
            order_sn:this.order_sn
          }).then(res=>{
            this.$toast.clear();
            //进入支付成功页面!
            this.$toast(res.msg + '正在跳转...');

            setTimeout(()=>{
              this.showKeyboard = false;
              this.$router.replace('/user')
            },1000)
          }).catch(err =>{
            this.$toast.clear();
          })
        }else{
          //支付宝支付

        }
      },

      weixinPay() {
        //先请求后端返回响应的签名串
        AuthRequest('/wxpay/orderPay', 'get', {'order_sn': this.order_sn}).then(res => {
          if (res.code != 200) {
            this.$dialog.alert(res.msg);
            return false;
          } else {

            this.$toast('微信支付暂停使用，请使用余额支付');
            return false;
            //跳转到H5支付
            //window.location.href = res.data.mweb_url;

            //本机发起微信JSSDK支付
            if (typeof WeixinJSBridge == "undefined"){
              if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              }
            }else{
              this.onBridgeReady(res.data);
            }
            //发起微信支付
            // wx.chooseWXPay({
            //   timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            //   nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
            //   package: res.data.package,
            //   signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            //   paySign: res.data.sign, // 支付签名
            //   success: function (res) {
            //     // 支付成功后的回调函数
            //     if (res.errMsg === 'chooseWXPay:ok') {
            //       // 支付成功
            //       /*eslint-disable */
            //       this.$dialog.alert('成功：' + res.msg);
            //     } else {
            //       alert(res.errMsg)
            //       this.$dialog.alert('失败：' + res.msg);
            //     }
            //   },
            //   cancel: function (res) {
            //     // 支付取消
            //     alert('支付取消')
            //   }
            // })
          }
        })
      },
      onBridgeReady(data){
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId":data.appId,     //公众号名称，由商户传入
            "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr":data.nonceStr, //随机串
            "package":data.package,
            "signType":data.signType,         //微信签名方式：
            "paySign":data.paySign //微信签名
          },
          function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok" ){
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              this.$toast('支付成功');
              setTimeout(()=>{
                this.$router.replace('/user');
              },1500)
            }else if(res.err_msg == 'get_brand_wcpay_request:fail'){
              this.$toast('支付失败，请联系管理员或稍后重试，即将跳转到用户中心');
              setTimeout(()=>{
                this.$router.replace('/user');
              },1500)
            }else if(res.err_msg == 'get_brand_wcpay_request:cancel'){
              //用户取消付款
            }
          });
      }
    },
    created(){
      this.getOrderInfo();
    },
    /**
     * 微信支付
     */



  }

</script>

<style scoped lang="less">
  .success_info{
    padding-top: 46px;
    width: 100%;

    .succ_img{
      text-align: center;

      div{
        font-size: 20px;
      }
    }

    .order_info{
      padding-top: 10px;
      font-size: 16px;
      display: flex;

      div{
        margin: 0 auto;
      }

      .balance{
        color: #aea699;
        margin-top: 10px;
      }
    }
  }

  .pay_btn{
    display: flex;
    margin-top: 5%;
    justify-content: center;

    button:nth-child(1){
      margin-right: 8%;
    }
  }

  .pswd_input{
    position: fixed;
    top: 35%;
    left: 50%;
    width: 80%;
    transform: translateX(-50%);
    z-index: 1;
  }

  .pswd_tips{
    position: fixed;
    top: 25%;
    text-align: center;
    color: #ffffff;
    font-size: 24px;
    z-index: 1;
    width: 100%;
    text-align: center;
  }

  .pswd_keyboard{
    z-index: 1;
  }

  .footer {
    margin-top: 20%;
    font-size: 16px;
    text-align: center;
  }

  .layer_box{
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: rgba(0,0,0,0.5);
    z-index: 1;
  }
</style>
