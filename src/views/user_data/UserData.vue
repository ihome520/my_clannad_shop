<template>
  <div class="user_data">
    <van-nav-bar fixed title="个人资料" left-text="返回" left-arrow @click-left="onClickLeft" :right-text="right_text" @click-right="editInfo"/>
    <div class="content">
      <div class="thumb_box">
        <span>头像</span>
        <div class="thumb">
          <img :src="user.thumb"/>
          <input type="file" class="img_input" @change="selectImg($event)"/>
        </div>
      </div>
      <van-field size="large" class="input_item" disabled v-model="user.username" label="用户名"/>
      <van-field size="large" class="input_item" disabled v-model="user.tel" type="tel" label="手机号"/>
      <van-field size="large" class="input_item" disabled v-model="user.email" label="邮箱"/>
      <van-field size="large" class="input_item" :disabled="edit_status" v-model="user.nick_name" label="昵称"/>
      <van-field size="large" class="input_item" :disabled="edit_status" v-model="user.age" label="年龄"/>

      <van-field size="large" class="input_item" v-show="edit_status" :disabled="edit_status" v-model="user.showSex" label="性别"/>

      <van-field size="large" label="性别" v-show="!edit_status">
        <div class="sex_input" slot="input">
          <van-checkbox v-model="user.sex == 0" @click="changeSex(0)" icon-size="24px">男</van-checkbox>
          <van-checkbox v-model="user.sex == 1" @click="changeSex(1)" icon-size="24px">女</van-checkbox>
        </div>
      </van-field>

      <div class="submit" v-show="!edit_status">
        <van-button type="warning" @click="updateUserInfo">保存</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {AuthRequest} from "api/api";

  export default {
    name: "UserData",
    components: {},
    props: {},
    data() {
      return {
        user: {
          username: "",
          thumb: "",
          tel: "",
          email: "",
          age: 42,
          sex: '',
          showSex:'',
          nick_name: ''
        },
        edit_status: true,
        right_text: '修改'
      }
    },
    watch: {},
    methods: {
      onClickLeft() {
        this.$router.replace('/setting');
      },
      /**
       * 上传文件
       * @param event
       */
      selectImg(event) {
        this.$toast.loading({
          message:'上传中...'
        })

        let img = event.target.files[0];

        let fileData = new FormData();

        fileData.append('thumb', img);
        // fileData.append('nick_name','古河渚');

        AuthRequest('/user/uploadThumb', 'post', fileData, true).then(res => {
          if(res.code != 200){
            this.$toast(res.msg);
          }else{
            this.user.thumb = res.data;//替换头像
            this.$toast('更新成功');
          }
        })
      },
      editInfo() {
        if (this.right_text == '修改') {
          this.edit_status = false;
          this.right_text = '取消'
        } else {
          this.edit_status = true;
          this.right_text = '修改'
        }
      },
      updateUserInfo(){
        // let UserData = new FormData();
        // UserData.append('nick_name',this.user.nick_name);
        // UserData.append('age',this.user.age);
        // console.log(UserData);
        // UserData.append('sex',this.user.sex);

        let UserData = {
          nick_name:this.user.nick_name,
          age:this.user.age,
          sex:this.user.sex
        }
        AuthRequest('/user/update','post',UserData).then(res=>{
          if(res.code != 200){
            this.$toast(res.msg);
          }else{
            this.$toast(res.msg);
            this.edit_status = true;
            this.right_text = '修改';
            this.user.showSex = res.data.sex == 1 ? '女' : '男';
          }
        })
      },
      changeSex(sex){
          this.user.sex = sex
      },
      getUserInfo() {
        AuthRequest('/user/user_info').then(res => {
          this.user.username = res.data.username;
          this.user.thumb = res.data.thumb;
          this.user.tel = res.data.tel;
          this.user.email = res.data.email;
          this.user.showSex = res.data.sex == 1 ? '女' : '男';
          this.user.sex = res.data.sex;
          this.user.age = res.data.age;
          this.user.nick_name = res.data.nick_name;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    created() {
      this.getUserInfo()
    },
    mounted() {

    }
  }

</script>

<style scoped>
  .content {
    margin-top: 46px;
    font-size: 18px;
  }

  .content >>> input {
    font-size: 18px;
  }

  .input_item {
    align-items: flex-start;
  }

  .submit {
    padding: 5%;
  }

  .submit button {
    width: 100%;
    font-size: 16px;
  }

  .thumb_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.26667rem 0.42667rem;
    color: #323233;
    font-size: 17px;
  }

  .thumb {
    position: relative;
    box-sizing: border-box;
    height: 80px;
    width: 80px;
  }

  .thumb img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .img_input {
    position: absolute;
    z-index: 1;
    left: 0;
    height: 100%;
    opacity: 0;
  }

  .sex_input{
    display: flex;
  }

  .sex_input div{
    margin-right: 10px;
    box-sizing: border-box;
  }

</style>
