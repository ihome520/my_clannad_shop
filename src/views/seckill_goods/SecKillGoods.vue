<template>
  <div class="goods">
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <goods-swiper :album="goods_album"/>
    <goods-price :goods="goods" :goods_inventory="goods_inventory" :select_goods_price="select_goods_price"/>
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
              "id": 122,
              "goods_name": "男士夏季鞋子606测试588商品929潮流男鞋56佐佑理260古河渚",
              "thumb": "http://wx.17hxg.com/uploads/goods/20200310/15838027535e66e9815d55b.jpg",
              "price": "2458.00",
              "description": "<p>测试描述 find()方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。\r\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;find()方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。 findIndex()方法的用法与find()方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。\r\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;filter()方法使用指定的函数测试所有元素，并创建一个包含所有通过测试的元素的新数组。\r\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或 等价于 true 的值 的元素创建一个新数组。\r\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。filter 不会改变原数组。\r\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;遍历数组全部元素，利用回调函数对数组进行操作，自动遍历整个数组，且无法break中途跳出循环，不可控，不支持return操作输出，return只用于控制循环是否跳出当前循环。\r\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;回调有三个参数：第一个参数是遍历的数组内容，第二个参数是对应的数组索引，第三个参数是数组本身。\r\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>"
        },
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
        goods_inventory: [
          {
            "sku_list": "9,13,15,31",
            "inventory": 2459,
            "price": "2458.00"
          },
          {
            "sku_list": "9,13,16,31",
            "inventory": 2468,
            "price": "2467.00"
          },
          {
            "sku_list": "9,14,15,31",
            "inventory": 2477,
            "price": "2476.00"
          },
          {
            "sku_list": "9,14,16,31",
            "inventory": 2486,
            "price": "2485.00"
          },
          {
            "sku_list": "10,13,15,31",
            "inventory": 2495,
            "price": "2494.00"
          },
          {
            "sku_list": "10,13,16,31",
            "inventory": 2504,
            "price": "2503.00"
          },
          {
            "sku_list": "10,14,15,31",
            "inventory": 2513,
            "price": "2512.00"
          },
          {
            "sku_list": "10,14,16,31",
            "inventory": 2522,
            "price": "2521.00"
          },
          {
            "sku_list": "11,13,15,31",
            "inventory": 2531,
            "price": "2530.00"
          },
          {
            "sku_list": "11,13,16,31",
            "inventory": 2540,
            "price": "2539.00"
          },
          {
            "sku_list": "11,14,15,31",
            "inventory": 2549,
            "price": "2548.00"
          },
          {
            "sku_list": "11,14,16,31",
            "inventory": 2558,
            "price": "2557.00"
          }
        ],
        inventoryKv: {},//库存键值对
        disabled_buy: false,//是否可以购买，当库存不足时，不可购买
        choose_spec: [],
        goods_num: 1,
        select_goods_price:'', //当前选中商品属性的价格
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
      // this.goods_id = this.$route.params.id;
      // this.getGoodsInfo();
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
      buyGoods() {
        let filterSpec = this.choose_spec.filter(res => {
          return res != '';
        })
        if (filterSpec.length != this.goods_spec.length) {
          this.$toast('请选择完整的商品规格');
          return false
        }

        console.log('下单');
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

          this.goods_album = res.data.goods_album;
          this.goods = res.data.goods;
          this.goods_spec = res.data.goods_spec;
          this.goods_inventory = res.data.goods_inventory;
        })
      }
    }
  }
</script>

<style scoped>

</style>
