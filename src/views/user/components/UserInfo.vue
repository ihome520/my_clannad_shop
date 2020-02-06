<template>
  <div class="user_info">
    <div class="header">
      <img src="https://wx.17hxg.com/uploads/goods/20200115/15790790995e1ed5bb1a356.jpg" class="thumb"/>
      <div class="header_right">
        <div class="user_name">
          <span>宫泽有纪宁</span>
          &nbsp;
          <van-tag round type="success">采购达人</van-tag>
        </div>
        <div class="tel">Tel:18779031201</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    components: {},
    props: {},
    data() {
      return {}
    },
    watch: {},
    filter: {},
    methods: {},
    created() {

    },
    mounted() {

    }
  }

</script>

<style scoped lang="less">
  .user_info{
    padding: 2%;
  }
  .header{
    display: flex;
    border: #d6d9da 1px solid;
    border-radius: 5px;
    padding: 10px;
    background-color: #b5ec9e;

    .thumb{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: #e0a1b9 5px dashed;
    }

    .header_right{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 100%;
      margin-left: 10px;
      .user_name{
        font-size: 22px;
      }

      .tel{
        font-size: 16px;
      }
    }
  }
</style>
