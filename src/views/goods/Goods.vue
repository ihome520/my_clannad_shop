<template>
  <div class="goods">
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <goods-swiper :album="goods_album"/>
    <goods-price :goods="goods" :goods_inventory="goods_inventory" :select_goods_price="select_goods_price"
                 :seckill_info="seckill_info"
    />
    <goods-attr :goods_spec="goods_spec" :goods_inventory="goods_inventory"
                @changeSelectSpec="changeSelectSpec"
                @changeGoodsNumber="changeGoodsNumber"
    />
    <goods-detail :content="goods.description"/>
    <goods-buy :disabled_buy="disabled_buy" @addToCart="addToCart" @buyGoods="buyGoods"/>
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
        goods_album: [],
        goods_id: 0,
        goods: {
          type: Object,
          default() {
            return {}
          }
        },
        goods_spec: [],
        goods_inventory: [],
        inventoryKv: {},//库存键值对
        disabled_buy: false,//是否可以购买，当库存不足时，不可购买
        choose_spec: [],
        goods_num: 1,
        select_goods_price:'', //当前选中商品属性的价格
        seckill_info:{},//秒杀信息
      }
    },
    watch: {
      goods_inventory: {
        handler(newData) {
          //做一个键值对
          newData.forEach(item => {
            this.inventoryKv[item.sku_list] = item;
          })
        },
        deep: true
      },
    },
    mounted() {
      this.goods_id = this.$route.params.id;
      this.getGoodsInfo();
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1);
      },
      /**
       * 选中的属性
       * @param skuData
       */
      changeSelectSpec(skuData) {
        this.choose_spec = skuData.choose_spec; //已经选中的sku
        this.goods_num = skuData.goods_num;//商品数量

        let filterSpec = this.choose_spec.filter(res => {
          return res != '';
        })
        if (filterSpec.length == this.goods_spec.length) {
          let stock = this.inventoryKv[this.choose_spec].inventory;
          this.select_goods_price = this.inventoryKv[this.choose_spec].price; //修改价格

          if (stock < 1) {
            this.disabled_buy = true; //无货，不可购买
            this.$toast({
              message: '该规格库存不足'
            })
          } else {
            this.disabled_buy = false;
          }
        } else {
          this.select_goods_price = '';//没有全选中属性
          this.disabled_buy = false;
        }
      },
      changeGoodsNumber(goods_num){
        this.goods_num = goods_num;
      },
      /**
       * 加购
       */
      addToCart() {
        let filterSpec = this.choose_spec.filter(res => {
          return res != '';
        })
        if (filterSpec.length != this.goods_spec.length) {
          this.$toast('请选择完整的商品规格');
          return false
        }

        let goods_sku = this.choose_spec.toString();
        console.log(goods_sku);
        let data = {
          sku_list: this.choose_spec.toString(),
          goods_id: this.goods_id,
          number: this.goods_num
        }

        AuthRequest('/cart/store', 'post', data).then(res => {
          console.log(res);
          this.$toast(res.msg);
        })
      },
      /**
       * 直接购买
       */
      async buyGoods() {
        let filterSpec = this.choose_spec.filter(res => {
          return res != '';
        })
        if (filterSpec.length != this.goods_spec.length) {
          this.$toast('请选择完整的商品规格');
          return false
        }

        //效验用户是否添加了收货地址
        await AuthRequest('/cart/checkAddrCount').then(res=>{
          if(res.code != 200){
            this.$dialog.confirm({
              title: res.msg,
              confirmButtonText:'去设置'
            }).then(() => {
              this.$router.push({
                path: '/user_addr_list',
              })
            }).catch(err => {
              //取消不作处理
              return false;
            })
          }else{
            console.log('下单');
            this.$router.push({
              path:'/buy_goods',
              query:{
                sku_list: this.choose_spec.toString(),
                goods_id: this.goods_id,
                goods_num: this.goods_num
              }
            })
          }
        })
      },
      getGoodsInfo() {
        HttpRequest('/goods/show/' + this.$route.params.id).then(res => {
          if (res.code == 404) {
            this.$toast({
              message: res.msg,
            })

            setTimeout(() => {
              this.$router.back(-1);
            }, 1000)

            setTimeout(() => {
              location.reload();
            }, 2000)

            return false;
          }

          //判断秒杀是否已经开始 如果开始了 就直接跳转到秒杀页面
          if(res.data.goods.start_kill == 1){
              this.$router.replace('/seckill_goods?id=' + res.data.seckill_info.id)
          }

          this.goods_album = res.data.goods_album;
          this.goods = res.data.goods;
          this.goods_spec = res.data.goods_spec;
          this.goods_inventory = res.data.goods_inventory;
          this.seckill_info = res.data.goods.kill_status ? res.data.seckill_info : {};
        })
      }
    }
  }
</script>

<style scoped>

</style>
