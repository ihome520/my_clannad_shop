<template>
    <div class="user_addr_list">
      <van-nav-bar fixed title="收货地址列表" left-text="返回" left-arrow @click-left="onClickLeft" right-text="添加地址" @click-right="addAddress"/>
      <div class="container">
        <div class="address_list_box">
          <div class="address_item">
            <div class="left">
              <span>叶</span>
            </div>
            <div class="center">
              <div class="username">
                <div class="contact"><van-icon name="manager" />&nbsp; 空门苍 &nbsp;<van-icon name="phone" />158005568420</div>
<!--                <div class="contact"><van-icon name="manager" />&nbsp; {{ item.username }} &nbsp;<van-icon name="phone" />{{ item.tel }}</div>-->
              </div>
              <div>江西省赣州市上犹县营前镇下湾村同和组1XXXXXX号XX栋XX单元XXXXXX大厦董事长室</div>
            </div>
            <div class="right">
              <router-link to="/edit_addr/1">修改</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "UserAddrList",
    components: {},
    data() {
      return {}
    },
    watch: {},
    methods: {
      onClickLeft() {
        this.$router.replace('/setting');
      },
      addAddress(){
        this.$router.push('/user_addr_add');
      }
    },
    created() {

    },
    mounted() {

    }
  }

</script>

<style scoped lang="less">
  .user_addr_list {

    .container{
      position: absolute;
      top: 50px;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #cccccc;

      .address_list_box{
        padding: 2%;

        .address_item{
          padding: 2%;
          display: flex;
          align-items: center;
          background-color: #fff;
          border-radius: 5px;

          .left{
            width: 15%;
            text-align: center;

            span {
              border-radius: 50%;
              font-size: 20px;
              padding: 15% 20%;
              background-color: #9e9e9e;
              color:#fff;
              font-weight: bold;
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
    }
  }
</style>
