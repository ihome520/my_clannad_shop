<template>
  <div class="container">
    <div class="user_address">
      <div class="header">
        <span>当前寄送地址</span>
        <span @click="changeAddress">更换地址 >>></span>
      </div>
      <div class="addr_info">
        <van-icon name="location-o" />
        <div class="info">
          <div>{{ curr_address.address }}</div>
          <div>{{ curr_address.username }} {{ curr_address.tel }}</div>
        </div>
      </div>
      <van-popup class="address_box" closeable  v-model="showMoreAddress">
        <div class="more_address">
          <div class="title">请选择一个寄送地址：</div>
          <ul>
            <li v-for="(item,index) in user_address" :key="index" @click="select_addr(item.id)">
              <div>{{ item.area + item.address }}</div>
              <div class="contact"><van-icon name="manager" />&nbsp; {{ item.username }} &nbsp;<van-icon name="phone" />{{ item.tel }}</div>
            </li>
          </ul>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserAddress",
    components: {},
    props: {
      user_address:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        select_addr_id:0,
        showMoreAddress:false,
        curr_address:{
          address:'',
          tel:'',
          username:'',
        }
      }
    },
    watch: {
      user_address:{
        handler(newValue,oldValue){ //设置默认的地址
          let addr = newValue[0];
          this.curr_address.address = addr.area + addr.address;
          this.curr_address.tel = addr.tel;
          this.curr_address.username = addr.username;
          this.$emit('change_address',addr.id)
        },
        deep:true
      },
      select_addr_id(newValue){ //监听选中地址编号，显示对应的地址
        this.user_address.find(item => {
            if(item.id == newValue){
              this.curr_address.address = item.area + item.address;
              this.curr_address.tel = item.tel;
              this.curr_address.username = item.username;
            }
        })
      }
    },
    methods: {
      changeAddress(){
        this.showMoreAddress = true
      },
      select_addr(address_id){
        this.select_addr_id = address_id;
        this.showMoreAddress = false;
        this.$emit('change_address',address_id)
      }
    },
  }

</script>

<style scoped lang="less">
  .container{
    padding: 2%;
  }
  .user_address{
    padding: 2%;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background-color: #fff;

    .header{
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      padding-bottom: 10px;

      span:nth-child(2){
        font-weight: bold;
        color: #68b4e0;
      }
    }

    .addr_info{
      display: flex;
      align-items: center;

      .info{
        font-size: 15px;
      }
    }
  }

  .address_box{
    max-height: 90%;
    width: 90%;

    .more_address{
      padding: 5px;
      font-size: 14px;

      .title{
        padding: 5px;
        color: #1c8fd2;
      }

      ul > li{
        border-bottom: #dad6d6 1px solid;
        padding: 5px;

        div:nth-child(1){
           font-size: 15px;
           padding-bottom: 5px;
        }

        div:nth-child(2){
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>
