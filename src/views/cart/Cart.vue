<template>
  <div class="cart">
    <van-nav-bar fixed title="购物车"/>
    <div class="cart_items">
      <van-checkbox-group v-model="selectItem" ref="checkboxGroup" class="cart_group">
        <div class="cart_item" v-for="(item,index) in cartList" :key="index">
          <van-checkbox :name="item.id"/>
          <router-link :to="'/goods/' + item.goods_id">
            <img :src="item.thumb"/>
          </router-link>
          <div class="goods_info">
            <div class="goods_name">{{ item.goods_name }}</div>
            <div class="sku_info">
              <div v-for="(sku,index) in item.sku_info" :key="index">
                {{ sku.spec_name }} : {{ sku.value }}
              </div>
            </div>
            <div class="price">
              <span>￥ {{ item.price }}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <van-stepper class="number"
                           button-size="22"
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
    </div>

    <van-submit-bar class="submit_area"
                    :price="totalPrice"
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
        totalPrice:0
      }
    },
    mounted() {
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
          if(newValue.length > 0){
            this.totalPrice = 0;
            let singlePrice = 0.00;
            this.cartList.forEach(item => {
              if(newValue.includes(item.id)){
                singlePrice += parseFloat(item.price) * item.number
              }
            })

            this.totalPrice = singlePrice * 100
          }else{
            this.totalPrice = 0;
          }
        },
        deep: true
      },
      cartList: {
        handler(newValue, oldValue) {
          newValue.forEach(item => {
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
      },
      /**
       * 更改购物车数量 后端请求
       */
      changeCartNumber(cart_id, type) {
        this.$toast.loading();
        AuthRequest('/cart/changeCartNumber', 'post', {id: cart_id, type}).then(res => {
          if(res.code != 200){
            this.$toast(res.msg);
          }
          this.$toast.clear();
        }).catch(err=>{
          this.$toast.clear();
        })
      },
      /**
       * 提交订单
       */
      submitOrder() {
        if(this.selectItem.length > 0){
          console.log('提交订单,跳转到新页面');
          let cart_ids = this.selectItem.toString();

          this.$router.push({
            path:'/order_confirm',
            query:{cart_ids}
          })
        }else{
          this.$toast('请选择要结算的商品')
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
    }
  }
</script>

<style scoped lang="less">
  .cart_group {
    padding: 5px;
  }

  .cart_items {
    position: absolute;
    top: 46px;
    bottom: 100px;
    width: 100%;
    overflow: auto;
  }

  .cart_item {
    display: flex;
    border: #d8d8d8 1px solid;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 3px;

    img {
      margin-top: 5px;
      width: 80px;
      height: 80px;
      border-radius: 5px;
      margin-left: 8px;
      border: silver 2px solid;
    }

    .goods_info {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      padding: 5px;
      flex-grow: 1;

      .goods_name {
        font-size: 18px;
        padding: 2px 0px;
      }

      .sku_info {
        font-size: 14px;
        padding: 3px 0px;
      }

      .price {
        padding: 2px 0px;
        font-size: 16px;
        display: flex;
        align-items: center;
        color: red;

        .number {
          touch-action: none;
          display: inline-block;
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
