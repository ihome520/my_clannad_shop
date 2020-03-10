<template>
  <div class="address_add">
    <van-nav-bar fixed title="添加收货地址" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="container">
      <van-field size="large" class="input_item" maxlength="10" v-model="username" label="姓名"/>
      <van-field size="large" class="input_item" maxlength="11" v-model="tel" label="电话"/>
      <!--<van-field size="large" class="input_item"  label="地址">
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
      </van-field>-->

      <van-field
        readonly
        clickable
        name="area"
        :value="area"
        label="地区选择"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>

      <van-field v-model="address" rows="2" autosize label="详细地址" type="textarea" maxlength="30" placeholder="请输入详细地址" show-word-limit/>

      <van-field name="switch" label="是否默认">
        <template #input>
          <van-switch v-model="is_default" inactive-color="#ccc" size="20" />
        </template>
      </van-field>

      <div class="add_btn">
        <van-button type="info" @click="add">添加</van-button>
      </div>
    </div>
  </div>
</template>

<script>

  import area_list from 'lib/area.js'
  import {AuthRequest} from "api/api";

  export default {
    name: "UserAddrAdd",
    components: {},
    data() {
      return {
        area: '',
        address:'',
        username:'',
        tel:'',
        showArea: false,
        areaList: area_list, // 全国省市区地址数据
        is_default:false,
      }
    },
    watch: {},
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      onConfirm(values) {
        this.area = values.map(item => item.name).join('/');
        this.showArea = false;
      },
      add() {
        if(!this.area || !this.address || !this.username || !this.tel){
          this.$toast('请输入完整信息');
          return false;
        }

        let msg = '';
        if (!/[\u4e00-\u9fa5A-Za-z_0-9]{1,10}$/.test(this.username)) {
          msg = '姓名只能是中文、数字、下划线、字母';
        }else if (!/^1[3456789]\d{9}$/u.test(this.tel)) {
          msg = '手机号格式不正确';
        }else if (!/[\u4e00-\u9fa5A-Za-z_0-9]{1,50}$/.test(this.address)) {
          msg = '地址只能是中文、数字、下划线、字母，长度不能超过50个字符';
        }

        if(msg){
          this.$toast(msg);
          return false;
        }

        let is_default = 0;
        if(this.is_default){
          is_default = 1;
        }

        this.$toast.loading('提交中...')

        AuthRequest('/user/userAddressAdd','post',{
          area:this.area,
          address:this.address,
          username:this.username,
          tel:this.tel,
          default:is_default
        }).then(res => {
          this.$toast(res.msg);
          if(res.code != 200){
              return false;
          }else{
            setTimeout(()=>{
              this.$router.replace('/user_addr_list');
            },1500)
          }
        })
      },
    },

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
