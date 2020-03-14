<template>
  <div class="cart">
    <van-nav-bar fixed title="购物车"/>
    <div class="cart_items">
      <van-checkbox-group v-model="selectItem" ref="checkboxGroup" class="cart_group">
        <div class="cart_item" v-for="(item,index) in cartList" :key="index">
          <van-checkbox class="checkBox" :name="item.id"/>

          <div class="img_box">
            <router-link :to="'/goods/' + item.goods_id">
              <img :src="item.thumb"/>
            </router-link>
          </div>
          <div class="goods_info">
            <div class="goods_name">{{ item.goods_name }}</div>
            <div class="sku_info">
              <div v-for="(sku,index) in item.sku_info" :key="index">
                {{ sku.spec_name }} : {{ sku.value }}
              </div>
            </div>
            <div class="price">
              <span>￥ {{ item.price }}</span>
              <van-stepper
                button-size="18"
                :value="numberKv[index]"
                @plus="changeNumber(index,1)"
                @minus="changeNumber(index,2)"
                min="1"
                max="5000"
              />
            </div>
          </div>

          <div class="del_btn">
            <van-button plain type="warning" size="small" @click="delCart(item.id)">删除</van-button>
          </div>
        </div>
      </van-checkbox-group>

      <div class="not_data" v-show="!cartList.length">
        <span>购物车中没有商品</span>
        <router-link to="/home">去逛逛 ~</router-link>
      </div>
    </div>

    <van-submit-bar class="submit_area"
                    :price="totalPrice"
                    :loading="sumbiting"
                    button-text="立即结算"
                    @submit="submitOrder"
    >
      <van-checkbox v-model="checkAllSelect" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
  import {AuthRequest} from "@/api/api";

  export default {
    name: "Cart",
    data() {
      return {
        cartList: [],
        selectItem: [],
        checkAllSelect: false,
        numberKv: [],//库存绑定的键值对
        cartKv: [],//购物车库存更新用的键值对 用number的key去对应购物车id
        totalPrice: 0,
        sumbiting: false,//订单提交状态
      }
    },
    created() {
      this.getCartList() //获取购物车列表
    },
    watch: {
      selectItem: {
        handler(newValue, oldValue) {
          if (newValue.length == this.cartList.length) {
            this.checkAllSelect = true; //全选中
          } else {
            this.checkAllSelect = false;
          }

          //计算总价格
          if (newValue.length > 0) {
            this.totalPrice = 0;
            let singlePrice = 0.00;
            this.cartList.forEach((item, index) => {
              if (newValue.includes(item.id)) {
                singlePrice += parseFloat(item.price) * this.numberKv[index]
              }
            })

            this.totalPrice = singlePrice * 100
          } else {
            this.totalPrice = 0;
          }
        },
        deep: true
      },
      cartList: {
        handler(newValue, oldValue) {
          this.numberKv = []; //如果删除了购物车，那么这里要先清空
          this.cartKv = [];
          newValue.forEach((item, index) => {
            this.numberKv.push(item.number);
            this.cartKv.push(item.id); //购物车对应的id
          })
        },
        deep: true
      },
    },
    methods: {
      /**
       * 全选
       */
      checkAll() {
        if (!this.checkAllSelect) {
          this.$refs.checkboxGroup.toggleAll(true);
          this.checkAllSelect = true;
        } else {
          this.$refs.checkboxGroup.toggleAll(false);
          this.checkAllSelect = false;
        }
      },
      /**
       * 更改购物车数据
       * @param index int 库存下标
       * @param type int 类型 1 增加 2减少
       */
      changeNumber(index, type) {
        if (type == 1) {
          this.numberKv[index]++;
          this.changeCartNumber(this.cartKv[index], 1);
        } else {
          this.numberKv[index]--;
          this.changeCartNumber(this.cartKv[index], 2);
        }

        //计算总价格
        if (this.selectItem.length > 0) {
          this.totalPrice = 0;
          let singlePrice = 0.00;
          this.cartList.forEach((item, index) => {
            if (this.selectItem.includes(item.id)) {
              singlePrice += parseFloat(item.price) * this.numberKv[index]
            }
          })

          this.totalPrice = singlePrice * 100
        } else {
          this.totalPrice = 0;
        }
      },
      /**
       * 更改购物车数量 后端请求
       */
      async changeCartNumber(cart_id, type) {
        this.$toast.loading();
        await AuthRequest('/cart/changeCartNumber', 'post', {id: cart_id, type}).then(res => {
          if (res.code != 200) {
            this.$toast(res.msg);
          }
          this.$toast.clear();
        }).catch(err => {
          this.$toast.clear();
        })
      },
      /**
       * 提交订单
       */
      async submitOrder() {
        this.sumbiting = true;
        if (this.selectItem.length > 0) {
          let cart_ids = this.selectItem.toString();

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
              this.$router.push({
                path: '/order_confirm',
                query: {cart_ids}
              })
            }
          })


        } else {
          this.$toast('请选择要结算的商品')
          this.sumbiting = false;
        }
      },
      /**
       * 删除购物车
       * @param id
       */
      delCart(id) {
        this.$dialog.confirm({
          title: '确认删除该商品',
        }).then(() => {
          AuthRequest('/cart/destroy', 'get', {id: id}).then(res => {
            this.$toast(res.msg);

            if (res.code == 200) {
              let index = this.cartList.findIndex(item => {
                return item.id == id
              })

              this.cartList.splice(index, 1);
            }
          })
        }).catch(err => {
          //取消不作处理
        })
      },
      getCartList() {
        AuthRequest('/cart/index').then(res => {
          this.cartList = res.data;
        })
      }
    },
    beforeCreate() {
      // document.querySelector('body').setAttribute('style', 'background-color:#eaeaea')
    },
    beforeDestroy() {
      // document.querySelector('body').removeAttribute('style')
    }
  }
</script>

<style scoped lang="less">
  .not_data{
    width: 100%;
    text-align: center;
    font-size: 16px;
    padding-top: 5%;
    box-sizing: border-box;
    color: #cc855c;
  }
  .cart {
    height: 100vh;
    background-color: #eaeaea;
  }

  .cart_group {
    padding: 5px;
  }

  .cart_items {
    position: absolute;
    top: 46px;
    bottom: 100px;
    width: 100%;
    overflow: scroll;
  }

  .cart_item {

    .checkBox {
      width: 6%;
    }

    display: flex;
    border: #d8d8d8 1px solid;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 3px;
    background-color: #fff;

    .img_box {
      width: 20%;
      display: flex;
      align-items: center;
      padding-left: 5px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }

    .goods_info {
      width: 55%;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      padding: 1%;
      flex-grow: 1;

      .goods_name {
        font-size: 14px;
        padding: 2px 0;
      }

      .sku_info {
        font-size: 13px;
        color: #8c9096;
        padding: 3px 0;
      }

      .price {
        padding: 2px 0;
        font-size: 14px;
        display: flex;
        align-items: center;
        color: red;
        justify-content: space-around;

        .number {
          touch-action: none;
          /*display: inline-block;*/
        }
      }
    }

    .del_btn {
      display: flex;
      flex-flow: column;
      justify-content: center;
    }
  }

  .submit_area {
    position: absolute;
    bottom: 50px;
  }

</style>
