<template>
    <div class="user_addr_list">
      <van-nav-bar fixed title="收货地址列表" left-text="返回" left-arrow @click-left="onClickLeft" right-text="添加地址" @click-right="addAddress"/>
      <div class="container">
        <div class="address_list_box">
          <div class="address_item" v-for="(item,index) in address_list" :key="index">
            <div class="left">
              <span>{{ tests(item.username,index) | getUserNameFirst }}</span>
            </div>
            <div class="center">
              <div class="username">
                <div class="contact"><van-icon name="manager" />&nbsp; {{ item.username }} &nbsp;<van-icon name="phone" /> {{ item.tel }} </div>
<!--                <div class="contact"><van-icon name="manager" />&nbsp; {{ item.username }} &nbsp;<van-icon name="phone" />{{ item.tel }}</div>-->
              </div>
              <div> {{ item.area + item.address }}</div>
            </div>
            <div class="right">
              <router-link :to="'/user_addr_edit/' + item.id">修改</router-link>
              <van-tag plain type="primary" v-show="item.default">默认</van-tag>
            </div>
          </div>
        </div>
        <div class="not_address" v-show="!address_list.length">
          <span>——☆~ 空空如也 ~☆——</span>
        </div>
      </div>

    </div>
</template>

<script>
  import {AuthRequest} from "api/api";

  export default {
    name: "UserAddrList",
    components: {},
    data() {
      return {
        address_list:[],
        chrCodeIsEnKV:[],
        // is_chinese:false
      }
    },
    filters:{
      getUserNameFirst(value){
        return value.substring(0,1);
      }
    },
    methods: {
      tests(values,index){
        // console.log(values);
        // let pattern = /^[\u4e00-\u9fa5]+$/;
        // if(pattern.test(values)){
        //   this.chrCodeIsEnKV[index] = true;
        // }else{
        //   this.chrCodeIsEnKV[index] = false;
        // }
        return values;
      },
      onClickLeft() {
        this.$router.replace('/setting');
      },
      addAddress(){
        this.$router.push('/user_addr_add');
      },
      getUserAddressList(){
        this.$toast.loading('获取中...')

        AuthRequest('/user/userAddrList').then(res=>{
          this.address_list = res.data;

          // if(this.address_list){
          //   let pattern = /^[\u4e00-\u9fa5]+$/;
          //
          //   this.address_list.forEach((item,index) => {
          //     if(pattern.test(item.username)){
          //       this.chrCodeIsEnKV[index] = true;
          //     }else{
          //       this.chrCodeIsEnKV[index] = false;
          //     }
          //   })
          // }
        })
      }
    },
    created() {
      this.getUserAddressList();
    },
  }

</script>

<style scoped lang="less">
  .user_addr_list {

    .container{
      margin-top:46px;
      background-color: #cccccc;

      .address_list_box{
        padding: 2%;

        .address_item{
          padding: 2%;
          display: flex;
          align-items: center;
          background-color: #fff;
          border-radius: 5px;
          box-sizing: border-box;
          margin-bottom: 5px;

          .left{
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 15%;
            height: 70px;
            text-align: center;

            span{
              color:#9e9e9e;
              /*font-weight: bold;*/
              display: block;
            }
          }

          .center{
            width: 70%;
            font-size: 14px;

            .username{
              font-size: 15px;
            }
          }

          .right{
            text-align: center;
            flex: 1;
            a{
              color: #adadad;
              font-size: 16px;
            }
          }
        }
      }

      .not_address{
        padding: 5% 0;
        font-size: 16px;
        text-align: center;
        color: #bfbfbf;
        background-color: #fff;
        height: calc(100% - 40px - 2%);
      }
    }
  }
</style>
