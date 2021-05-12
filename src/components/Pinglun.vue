<template>
  <div>
    <div class="pinglun">
      <mt-button type="primary" class="sub-btn" @click="postPinglun"
        >评论</mt-button
      >
      <div class="pinglun-msg">
        <mt-field
          class="pinglun-input"
          placeholder="请输入内容"
          type="textarea"
          rows="1"
          v-model="textarea"
        ></mt-field>
      </div>
    </div>
    <p class="pinglun-list">精彩评论：共{{ pinglunList.length }}条评论</p>
    <ul class="popular" v-for="(item, index) in pinglunList" :key="index">
      <li>
        <div class="popular-imgAmsg">
          <div class="popular-img">
            <img :src="attachImageUrl(userPic[index])" />
          </div>
          <div class="popular-msg">
            <div class="name">{{ userName[index] }}</div>
            <div class="time">{{ item.createTime }}</div>
          </div>
        </div>
        <div class="content">{{ item.content }}</div>
        <div class="up" ref="up" @click="postUp(item.id, item.up, index)">
          {{ item.up }}
          <svg t="1620734700930" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1885" width="16" height="16"><path d="M931.84 334.54c-39.936-10.444-133.837-10.24-271.258-13.926 6.554-30.003 7.988-57.036 7.988-104.96C668.672 100.966 585.114 0 511.18 0c-52.223 0-95.231 42.7-95.846 95.13-0.716 64.307-20.48 175.41-127.795 231.833-7.885 4.096-30.31 15.155-33.587 16.691l1.638 1.434a101.376 101.376 0 0 0-63.897-25.6H95.846A95.949 95.949 0 0 0 0 415.334V926.72c0 52.838 43.008 95.846 95.846 95.846h95.847a94.72 94.72 0 0 0 85.299-55.193l1.434 0.41 7.68 2.047c0.512 0 0.819 0.103 1.433 0.308 18.432 4.608 53.863 13.004 129.536 30.412 16.384 3.687 101.99 22.016 190.874 22.016h174.694c53.248 0 92.672-19.865 114.381-61.644 21.3-37.07 125.542-236.032 125.44-516.506 0-40.346-27.955-91.853-90.624-109.773zM223.642 926.72c0 17.613-14.336 31.949-31.95 31.949H95.847a31.949 31.949 0 0 1-31.948-31.949V415.334c0-17.612 14.336-31.948 31.948-31.948h95.847c17.715 0 31.949 14.336 31.949 31.948V926.72zM957.85 464.486c-13.312 321.024-117.146 466.33-117.146 466.33-9.728 17.408-25.19 27.853-58.163 27.853H607.949c-87.757 0-174.797-19.866-177.05-20.48-132.71-30.515-139.673-32.87-147.968-35.226l4.608-469.504c0-48.537 1.024-36.25 0-35.635C433.562 337.408 478.003 204.8 479.232 95.949A32.051 32.051 0 0 1 511.181 64c33.792 0 93.491 67.789 93.491 151.757 0 75.776-3.072 88.78-29.594 167.731 319.488 0 317.338 4.608 345.498 11.98 35.02 10.036 37.888 38.913 37.888 48.948 0 10.957-0.205 9.42-0.614 20.07z" fill="#adff2f" p-id="1886"></path></svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { mixin } from "../mixins";
import { mapGetters } from "vuex";
import { setPinglun, setLike, getAllPinglun, getUserOfId } from "../api/index";

export default {
  name: "pinglun",
  mixins: [mixin],
  props: [
    "playId", //歌曲或歌单id
    "type", //0歌曲、1歌单
  ],
  computed: {
    ...mapGetters([
      "id", //歌曲或歌单id
      "loginIn", //用户是否已登录
      "userId", //当前登录用户id
      "avator", //当前登录用户头像
    ]),
  },
  data() {
    return {
      textarea: "", //存放输入的评论内容
      pinglunList: [], //存放评论列表
      userPic: [], //用户的头像
      userName: [], //用户的昵称
    };
  },
  mounted() {
    this.getPinglun();
  },
  methods: {
    //提交评论
    postPinglun() {
      if (this.loginIn) {
        let params = new URLSearchParams();
        if (this.type == 0) {
          params.append("songId", this.playId);
        } else {
          params.append("songListId", this.playId);
        }
        params.append("userId", this.userId);
        params.append("type", this.type);
        params.append("content", this.textarea);
        setPinglun(params)
          .then((res) => {
            if (res.code == 1) {
              Toast("评论成功");
              this.textarea = "";
              this.getPinglun();
            } else {
              Toast("评论失败");
            }
          })
          .catch((err) => {
            Toast("评论失败");
          });
      } else {
        this.pingfen = null;
        Toast("请先登录");
      }
    },
    //评论列表
    getPinglun() {
      getAllPinglun(this.type, this.playId)
        .then((res) => {
          this.pinglunList = res;
          for (let item of res) {
            this.getUsers(item.userId);
          }
        })
        .catch((err) => {
          Toast("评论加载失败");
        });
    },
    //获取用户的头像和昵称
    getUsers(id) {
      getUserOfId(id)
        .then((res) => {
          this.userPic.push(res.avator);
          this.userName.push(res.username);
        })
        .catch((err) => {
          Toast("出错了");
        });
    },
    //给某一个评论点赞
    postUp(id, up, index) {
      if (this.loginIn) {
        let params = new URLSearchParams();

        params.append("id", id);
        params.append("up", up + 1);
        setLike(params)
          .then((res) => {
            if (res.code == 1) {
              this.$refs.up[index].children[0].style.color = "#2796cd";
              this.getPinglun();
            } else {
              Toast("点赞失败");
            }
          })
          .catch((err) => {
            Toast("点赞失败");
          });
      } else {
        this.pingfen = null;
        Toast("请先登录");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/css/pinglun.scss";
</style>
