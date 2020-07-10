<template>
  <div class="goods">
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <goods-swiper :album="goods_album"/>
    <goods-price :goods="goods" :seckill="seckill" @onfinished="onfinished"/>
    <goods-attr :goods_spec="goods_spec"
                @changeSelectSpec="changeSelectSpec"
                @changeGoodsNumber="changeGoodsNumber"
                :limit_num="limit_num"
    />
    <goods-detail :content="goods.description"/>
    <goods-buy :disabled_buy="disabled_buy" :loading_ctrl="loading_ctrl" @buyGoods="buyGoods"/>
  </div>
</template>

<script>
  import GoodsSwiper from "./components/GoodsSwiper";
  import GoodsPrice from "./components/GoodsPrice";
  import GoodsAttr from "./components/GoodsAttr";
  import GoodsDetail from "./components/GoodsDetail";
  import GoodsBuy from "./components/GoodsBuy";

  import {HttpRequest, AuthRequest} from "@/api/api";

  export default {
    name: "Goods",
    components: {
      GoodsSwiper,
      GoodsPrice,
      GoodsAttr,
      GoodsDetail,
      GoodsBuy
    },
    data() {
      return {
        goods_album: [
          {
            "image": "https://wx.17hxg.com/uploads/goods_album/20200108/15784660615e157b0d1a464.jpg"
          },
          {
            "image": "https://wx.17hxg.com/uploads/goods_album/20200108/15784660615e157b0d1a749.jpg"
          },
          {
            "image": "https://wx.17hxg.com/uploads/goods_album/20200108/15784660615e157b0d1aa06.jpg"
          }
        ],
        goods_id: 0,
        goods: {
          type: Object,
          default() {
            return {}
          }
        },
        seckill: {
          type: Object,
          default() {
            return {}
          }
        },
        active_id:0,
        goods_spec: [
          {
            "goods_id": 122,
            "spec_id": 1,
            "spec_name": "颜色",
            "spec_value_id": "11,10,9",
            "spec_items": [
              {
                "id": 9,
                "value": "蓝色"
              },
              {
                "id": 10,
                "value": "绿色"
              },
              {
                "id": 11,
                "value": "铂光金"
              }
            ]
          },
          {
            "goods_id": 122,
            "spec_id": 6,
            "spec_name": "容量",
            "spec_value_id": "14,13",
            "spec_items": [
              {
                "id": 13,
                "value": "128GB"
              },
              {
                "id": 14,
                "value": "256GB"
              }
            ]
          },
          {
            "goods_id": 122,
            "spec_id": 7,
            "spec_name": "网络类型",
            "spec_value_id": "16,15",
            "spec_items": [
              {
                "id": 15,
                "value": "移动4G"
              },
              {
                "id": 16,
                "value": "联通5G"
              }
            ]
          },
          {
            "goods_id": 122,
            "spec_id": 13,
            "spec_name": "定制网络",
            "spec_value_id": "31",
            "spec_items": [
              {
                "id": 31,
                "value": "中国联通"
              }
            ]
          }
        ],
        disabled_buy: false,//是否可以购买，当库存不足时，不可购买
        loading_ctrl:false,//按钮加载
        choose_spec: [],
        goods_num: 1,
        limit_num:1,//限购数量
        // inventory_num: '请选择规格',
        select_goods_price: '', //当前选中商品属性的价格
      }
    },
    watch:{
      seckill:{
        handler(newValue,oldValue){
          this.active_id = newValue.id;
        }
      }
    },
    mounted() {
      this.goods_id = this.$route.query.id;
      this.getGoodsInfo();
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1);
      },
      //倒计时完成
      onfinished(flag) {
        if (flag == 1) {
        } else {
          this.$dialog.alert({
            title: '本商品秒杀已结束',
            confirmButtonText: '确定'
          }).then(() => {
            this.$router.push({
              path: '/seckill',
            })
          })
          this.disabled_buy = true;
        }
      },
      /**
       * 选中的属性
       * @param skuData
       */
      async changeSelectSpec(skuData) {
        this.choose_spec = skuData.choose_spec; //已经选中的sku
        this.goods_num = skuData.goods_num;//商品数量

        /*let filterSpec = this.choose_spec.filter(res => {
          return res != '';
        })
        if (filterSpec.length == this.goods_spec.length) {
          //查询库存信息
          await HttpRequest('/ms/sec_kill/getInventory', 'get', {
            id: this.goods_id,
            sku_list: this.choose_spec.join(',')
          }).then(res => {
            if (res.code != 200) {
              this.disabled_buy = true
            } else {
              if (res.data.inventory) {
                this.inventory_num = res.data.inventory;//商品当前规格的库存
                this.disabled_buy = false;
              } else {
                this.inventory_num = '已售罄';
                this.disabled_buy = true; //库存为0的时候
              }
            }
          }).catch(err =>{
            this.disabled_buy = true;
            this.inventory_num = '';
          })
        } else {
          this.select_goods_price = '';//没有全选中属性
          this.disabled_buy = false;
        }*/
      },
      changeGoodsNumber(goods_num) {
        this.goods_num = goods_num;
      },
      /**
       * 直接购买
       */
      buyGoods() {
        let filterSpec = this.choose_spec.filter(res => {
          return res != '';
        })
        if (filterSpec.length != this.goods_spec.length) {
          this.$toast('请选择完整的商品规格');
          return false
        }

        console.log('下单');

        let data = {
          goods_id:this.goods_id,
          sku_list:this.choose_spec.toString(),
          active_id:this.active_id
        }

        this.loading_ctrl = true;
        AuthRequest('/ms/kill_goods/killGoodsToConfirm','post',data).then(res=>{
          if(res.code == 4001){ //已抢购，未确认
            this.$dialog.alert({
              title: res.msg,
              confirmButtonText: '确定'
            }).then(() => {
              this.$router.replace({
                path: '/seckill_confirm',//去确认
                query:{
                  goods_id:this.goods_id
                }
              })
            })
          }else if(res.code != 200){
            this.$toast(res.msg);
            this.loading_ctrl = false;
          }else{ // 200
            this.$toast('抢购成功，正在跳转...');

            setTimeout(()=>{
              this.$router.replace({
                path: '/seckill_confirm',//去确认
                query:{
                  goods_id:this.goods_id
                }
              })
            },1500)
          }
        }).catch(err =>{
          this.loading_ctrl = false;
        })
      },
      getGoodsInfo() {
        HttpRequest('ms/sec_kill/goods/' + this.$route.query.id).then(res => {
          if (res.code == 404) {
            this.$toast({
              message: res.msg,
            })

            setTimeout(() => {
              this.$router.back(-1);
            }, 1000)

            // setTimeout(() => {
            //   location.reload();
            // }, 2000)

            return false;
          }

          this.goods_album = res.data.goods_album;
          this.goods = res.data.goods;
          this.goods_id = res.data.goods.id;
          this.seckill = res.data.seckill;
          this.limit_num = res.data.seckill.single_num;//下单限购数量
          this.goods_spec = res.data.goods_spec;
          this.goods_inventory = res.data.goods_inventory;
        })
      }
    }
  }
</script>

<style scoped>

</style>
