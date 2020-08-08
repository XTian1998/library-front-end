<template>
  <div class="comment">
    <hr />
    <h2 class="comment_head">
      <span>评论</span>
    </h2>
    <div class="comment_send">
      <img src="~@/assets/images/user_avatar.jpg" alt />
      <el-input type="textarea" v-model="newComment"></el-input>
      <el-button type="primary" @click="sendComment">发表评论</el-button>
    </div>
    <hr />
    <div v-if="JSON.stringify(commentList) != '[]'">
      <div class="comment_list" v-for="comment in commentList" :key="comment.id">
        <img src="~@/assets/images/user_avatar.jpg" alt />
        <div class="content">
          <span class="name">{{comment.rid}}</span>
          <p class="text">{{comment.content}}</p>
          <span class="date">{{comment.date | dateFormat}}</span>
        </div>
      </div>
    </div>
    <h3 v-else class="no_comment">看看下面~来发评论吧</h3>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      newComment: "",
      commentList: [],
    };
  },
  created() {
    this.getCommentList();
  },
  methods: {
    getCommentList() {
      request({
        url: "/book/bookcomment/",
        methods: "get",
        params: {
          isbn: this.$route.params.isbn,
        },
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取失败");
        }
        this.commentList = res.data.data;
      });
    },
    sendComment() {
      if (JSON.stringify(this.$store.state.reader) == "{}") {
        this.$router.push("/reader/login");
      } else {
        request({
          url: "/book/bookcomment/",
          method: "post",
          data: {
            rid: this.$store.state.reader.id,
            isbn: this.$route.params.isbn,
            content: this.newComment,
          },
        }).then((res) => {
          if (res.data.meta.status !== 201) {
            return this.$message.error("发表评论失败");
          }
          this.$message.success('评论成功')
          this.newComment=""
          this.getCommentList();
        });
      }
    },
  },
};
</script>
<style scoped>
.comment {
  margin-top: 60px;
}
.comment_head {
  text-align: center;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 40px;
}
.comment_head span {
  position: relative;
  padding-right: 11px;
  padding-left: 11px;
}
.comment_head span::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -30px;
  width: 30px;
  height: 1px;
  background-color: #333;
  transform: translateY(-50%);
}
.comment_head span::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -30px;
  width: 30px;
  height: 1px;
  background-color: #333;
  transform: translateY(-50%);
}
.comment_send {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 60px;
}
img {
  display: inline-block;
  width: 35px;
  border-radius: 50%;
  margin-right: 20px;
}
.el-textarea >>> .el-textarea__inner {
  width: 800px;
  height: 100px;
}
.comment_list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #ccc;
  padding: 30px;
}
.content .name {
  color: #6d757a;
}
.content .text {
  width: 800px;
  line-height: 20px;
  padding: 2px 0;
  font-size: 14px;
}
.content .date {
  color: #99a2aa;
  line-height: 26px;
  font-size: 12px;
}
.no_comment {
  text-align: center;
  margin-bottom: 200px;
  font-weight: 400;
}
</style>