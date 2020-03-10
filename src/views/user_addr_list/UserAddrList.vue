<template>
    <div class="user_addr_list">
      <van-nav-bar fixed title="收货地址列表" left-text="返回" left-arrow @click-left="onClickLeft" right-text="添加地址" @click-right="addAddress"/>
      <div class="container">
        <div class="address_list_box">
          <div class="address_item" v-for="(item,index) in address_list" :key="index">
            <div class="left">
              <span>{{ item.username | getUserNameFirst }}</span>
            </div>
            <div class="center">
              <div class="username">
                <div class="contact"><van-icon name="manager" />&nbsp; {{ item.username }} &nbsp;<van-icon name="phone" /> {{ item.tel }} </div>
<!--                <div class="contact"><van-icon name="manager" />&nbsp; {{ item.username }} &nbsp;<van-icon name="phone" />{{ item.tel }}</div>-->
              </div>
              <div> {{ item.area + item.address }}</div>
            </div>
            <div class="right">
              <div class="mgr">
                <router-link :to="'/user_addr_edit/' + item.id">修改</router-link>&nbsp;
                <a href="javascript:void(0);" @click="delAddress(item.id)">删除</a>
              </div>
              <van-tag plain type="primary" v-show="item.default">默认地址</van-tag>
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
      }
    },
    filters:{
      getUserNameFirst(value){
        return value.substring(0,1);
      }
    },
    methods: {
      delAddress(id){
        this.$dialog.confirm({
          title: '确认删除该地址？',
        }).then(() => {
          AuthRequest('/user/delAddress', 'get', {id: id}).then(res => {
            this.$toast(res.msg);

            if (res.code == 200) {
              let index = this.address_list.findIndex(item => {
                return item.id == id
              })

              this.address_list.splice(index, 1);
            }
          })
        }).catch(err => {
          //取消不作处理
        })
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
          this.$toast.clear()
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
      height: calc(100% - 46px);

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
            width: 61%;
            font-size: 14px;

            .username{
              font-size: 15px;
            }
          }

          .right{
            text-align: center;
            flex: 1;
            font-size: 14px;

            .mgr{
              padding-bottom: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            a{
              color: #adadad;
              box-sizing: border-box;
              padding-left: 5px;
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
