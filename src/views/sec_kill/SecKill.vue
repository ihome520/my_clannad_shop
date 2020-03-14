<template>
  <div class="sec_kill">
    <van-nav-bar fixed title="秒杀专区" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="banner">
      <img src="https://wx.17hxg.com/uploads/shop_images/seckill.jpg" alt=""/>
    </div>
    <div class="container">
      <div class="item_box">

        <div class="item" v-for="(item,index) in goodsList" :key="index">
          <div class="left">
            <img :src="item.thumb" alt=""/>
          </div>
          <div class="right">
            <div class="top">{{ item.goods_name }}</div>
            <div class="center">时间：{{ item.start_time | cutTimeStr }} ~ {{ item.end_time | cutTimeStr}}</div>
            <div class="bottom">
              <div class="bottom_left">
                <span>抢购进度：</span>
                <div class="line_bar_box">
                  <div class="line_bar" :style="{'width':item.percent + '%'}"></div>
                </div>
              </div>
              <div class="bottom_righ">
                <van-button type="danger" size="small" :disabled="item.btn_status" @click="goSecKill(item.id)">{{ item.btn_str }}</van-button>
              </div>
            </div>
          </div>
        </div>
        <!--<div class="item">
          <div class="left">
            <img src="http://wx.17hxg.com/uploads/goods/20200310/15838027535e66e9815d55b.jpg" alt=""/>
          </div>
          <div class="right">
            <div class="top">新娘红色敬酒服小礼服2019新款气质裙女结婚2020合唱衣服平时可穿</div>
            <div class="center">2020-03-09 23:22:22 ~ 2020-03-15 22:22:22</div>
            <div class="bottom">
              <div class="bottom_left">
                <span>抢购进度：</span>
                <div class="line_bar_box">
                  <div class="line_bar"></div>
                </div>
              </div>
              <div class="bottom_righ">
                <van-button type="danger" size="small">立即抢购</van-button>
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import {HttpRequest} from "api/api";

  export default {
    name: "SecKill",
    components: {},
    props: {},
    data() {
      return {
        goodsList: [],
      }
    },
    watch: {
      goodsList: {
        handler(newValue, oldValue) {
          let timestamp = parseInt(new Date().getTime() / 1000);    // 当前时间戳
          newValue.forEach((item, index) => {
            //判断商品的状态
            let times = this.$utils.strToTime(item.start_time) - timestamp;
            if(times < 3600 && times > 0){ //
              newValue[index]['btn_str'] = '即将开始';
              newValue[index]['btn_status'] = true; //disabled的属性
              newValue[index]['percent'] = 0;//进度条展示
            }else if(times > 3600){
              newValue[index]['btn_str'] = '等待开始';
              newValue[index]['btn_status'] = true;
              newValue[index]['percent'] = 0;
            }else if(times < 0){
              //有2种情况 一种是还有 另外一种是抢完了
              if(item.sale_num == item.inventory){ //抢完了
                newValue[index]['btn_str'] = '抢完啦';
                newValue[index]['btn_status'] = true;
                newValue[index]['percent'] = 100;
              }else{
                newValue[index]['btn_str'] = '立即抢购';
                newValue[index]['btn_status'] = false;
                newValue[index]['percent'] = (item.sale_num / item.inventory) * 100;
              }
            }
          })
        },
        deep: true
      }
    },
    filters: {
      cutTimeStr(value){
        return value.substring(5);
      }
    },
    methods: {
      onClickLeft() {
        this.$router.push('/home');
      },
      //前往秒杀页面
      goSecKill(id) {
        this.$router.push('/seckill_goods?id=' + id);
      },
      getSecKillGoods() {
        HttpRequest('/sec_kill/index').then(res => {
          this.goodsList = res.data;
        })
      }
    },
    created() {
      this.getSecKillGoods();
    },
  }

</script>

<style scoped lang="less">
  .banner {
    width: 100%;
    height: 100px;
    margin-top: 46px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .container {
    position: fixed;
    top: 146px;
    bottom: 0;
    width: 100%;
    overflow: scroll;
    background-color: #cccccc;

    .item_box {
      padding: 2%;

      .item {
        padding: 1%;
        display: flex;
        background-color: #fff;
        border-radius: 5px;
        margin-bottom: 1%;
        box-sizing: border-box;

        .left {
          width: 25%;

          img {
            width: 100%;
            border-radius: 5px;
          }
        }

        .right {
          padding-left: 5px;

          .top {
            font-size: 14px;
          }

          .center {
            font-size: 13px;
            padding-top: 3px;
            color: #a5a5a5;
          }

          .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;


            .bottom_left {
              font-size: 13px;
              display: flex;
              width: 75%;
              align-items: center;

              .line_bar_box {
                width: 60%;
                border: #606060 1px solid;
                height: 10px;

                .line_bar {
                  background-color: #1c8fd2;
                  height: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
