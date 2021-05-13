<!--
 * @Descripttion: 注册
 * @Author: 清香<1816546887@qq.com>
 * @Date: 2020-12-10 18:23:43
 * @LastEditTime: 2021-02-14 16:32:48
-->
<template>
  <div class="signUp">
    <div ref="registerForm">
      <mt-field
        label="用户名"
        placeholder="必填：用户名"
        v-model="registerForm.username"
      ></mt-field>
      <mt-field
        label="密码"
        placeholder="必填：密码"
        type="password"
        v-model="registerForm.password"
      ></mt-field>
      <!-- 性别 -->
      <mt-field label="性别" placeholder="必填：性别" v-model="fakeSex" class="sex"
        ><mt-switch v-model="sexValue" @change="turn"></mt-switch>
        <input
          class="trueSexInput"
          type="text"
          v-model="registerForm.sex"
        />
      </mt-field>
      <!-- 性别 -->
      <mt-field
        label="手机"
        placeholder="选填：手机号"
        type="tel"
        v-model="registerForm.phoneNum"
      ></mt-field>
      <mt-field
        label="邮箱"
        placeholder="请输入邮箱"
        type="email"
        v-model="registerForm.email"
      ></mt-field>
      <mt-field
        label="生日"
        placeholder="必填：生日"
        type="date"
        v-model="registerForm.birth"
      ></mt-field>
      <!-- <router-link to="/register/location"> -->
      <mt-field
        label="地区"
        placeholder="选填：省份"
        v-model="registerForm.location"
        @focus="shengfenVisible = true"
      >
        <mt-button @click.native="shengfenVisible = true">点击选择</mt-button>
        <mt-popup
          v-model="shengfenVisible"
          position="bottom">
          <mt-picker :slots="slots" v-show="shengfenVisible" @change="onValuesChange"></mt-picker>
        </mt-popup>
      </mt-field>
      <!-- </router-link> -->
      <mt-field
        label="签名"
        placeholder="选填：签名"
        type="textarea"
        rows="2"
        v-model="registerForm.introduction"
      ></mt-field>
      <div class="mui-content-padded">
        <button @click="SignUp" class="mui-btn mui-btn-block mui-btn-primary">
          注册
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from "../../mixins";
import { Toast } from 'mint-ui';
import { SignUp } from "../../api/index";

export default {
  mixins: [mixin],
  data() {
    return {
      slots: [
        {
          flex: 1,
          values: ['海南', '广东','广西','福建','湖南','湖北','安徽','北京','天津','河南','河北','辽宁','江西','浙江','山东','黑龙江','西藏','四川','重庆','上海','江苏','贵州','云南','台湾','山西','陕西','青海','甘肃','吉林','陕西','内蒙古','新疆','宁夏','澳门','香港','南海诸岛'],
          className: 'shengfen',
          textAlign: 'right'
        }],
      registerForm: {
        username: "", //用户名
        password: "", //密码
        sex: "1", //性别
        phoneNum: "", //手机
        email: "", //邮箱
        birth: "", //生日
        introduction: "", //签名
        location: "", //地区
      },
      shengfenVisible: false, // 省份弹出框
      sexValue: false,
      fakeSex: "男",
    };
  },
  created() {},
  mounted() {},
  methods: {
    SignUp() {
      let _this = this;
      console.log(this.registerForm.birth);
      let params = new URLSearchParams();
      params.append("username", this.registerForm.username);
      params.append("password", this.registerForm.password);
      params.append("sex", this.registerForm.sex);
      params.append("phoneNum", this.registerForm.phoneNum);
      params.append("email", this.registerForm.email);
      params.append("birth", this.registerForm.birth);
      params.append("introduction", this.registerForm.introduction);
      params.append("location", this.registerForm.location);
      params.append("avator", "/img/userPic.jpg");
      SignUp(params)
        .then((res) => {
          if (res.code == 1) {
            // 注册成功
            Toast({
              message: "注册成功",
              iconClass: "mui-icon mui-icon-checkmarkempty",
            });
            setTimeout(function () {
              _this.$router.push({ path: "/" });
            }, 2000);
          } else {
            // 注册失败
            Toast({
              message: "注册失败",
              iconClass: "mui-icon mui-icon-closeempty",
            });
          }
        })
        .catch((err) => {
          Toast({
            message: "无法连接到服务器",
            iconClass: "mui-icon mui-icon-spinner-cycle mui-spin",
          });
        });
    },
    turn() {
      // console.log(this.sexValue);
      if (this.sexValue) {
        // 后端传值
        this.registerForm.sex = "0";
        // 界面显示
        this.fakeSex = "女"
        // console.log(this.registerForm.sex);
      } else {
        this.registerForm.sex = "1";
        this.fakeSex = "男"
        // console.log(this.registerForm.sex);
      }
    },
    // 改变选项
    onValuesChange(picker, values) {
      this.registerForm.location = values
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/sign-up.scss'
</style>
