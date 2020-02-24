<template>
  <div class="address_add">
    <van-nav-bar fixed title="添加收货地址" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="container">
      <van-field size="large" class="input_item"  label="姓名"/>
      <van-field size="large" class="input_item"  label="电话"/>
      <van-field size="large" class="input_item"  label="地址">
        <template slot="input">
          <select>
            <option>fdsafa</option>
            <option>fdsafa</option>
            <option>fdsafa</option>
            <option>fdsafa</option>
            <option>fdsafa</option>
          </select>
          <select>
            <option>fdsafa</option>
            <option>fdsafa</option>
            <option>fdsafa</option>
            <option>fdsafa</option>
            <option>fdsafa</option>
          </select>
          <select>
            <option>fdsafa</option>
            <option>fdsafa</option>
            <option>fdsafa</option>
            <option>fdsafa</option>
            <option>fdsafa</option>
          </select>
        </template>
      </van-field>
      <div class="add_btn">
        <van-button type="info">添加</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserAddrAdd",
    components: {},
    data() {
      return {}
    },
    watch: {},
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
    },
    created() {

    },
    mounted() {

    }
  }

</script>

<style scoped lang="less">
  .container{
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    width: 100%;

    .add_btn{
      padding: 5%;

      button{
        font-size: 16px;
        width: 100%;
      }
    }
  }
</style>
