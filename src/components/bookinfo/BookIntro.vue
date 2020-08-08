<template>
  <div>
    <div class="book_intro">
      <img :src="'http://127.0.0.1:5000'+ bookInfo.image" alt />
      <div class="word">
        <h3>{{bookInfo.b_name}}</h3>
        <div>
          <p>ISBN号：{{bookInfo.isbn}}</p>
          <p>作者：{{bookInfo.author}}</p>
          <p>分类：{{bookInfo.category}}</p>
          <p>库存数量：{{bookInfo.count}}</p>
        </div>
      </div>
      <el-button type="primary" @click="book">预约</el-button>
    </div>
    <hr />
    <div class="desc">
      <h2>
        <span>简介</span>
      </h2>
      <p>{{bookInfo.desc}}</p>
    </div>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      bookInfo: {},
    };
  },
  created() {
    this.getBookInfo()
  },
  methods: {
    getBookInfo() {
      request({
        url: `/book/${this.$route.params.isbn}/`,
        method: "get",
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error(res.data.meta.msg);
        }
        this.bookInfo = res.data.data;
      });
    },
    book() {
      if (JSON.stringify(this.$store.state.reader) == "{}") {
        this.$router.push("/reader/login");
      } else {
        request({
          url: "/book/bookinfo/",
          method: "post",
          data: {
            rid: this.$store.state.reader.id,
            isbn: this.$route.params.isbn,
          },
        }).then((res) => {
          if (res.data.meta.status !== 201) {
            return this.$message.error(res.data.meta.msg);
          }
          this.$message.success(res.data.meta.msg);
          this.getBookInfo()
        });
      }
    },
  },
};
</script>
<style scoped>
.book_intro {
  display: flex;
  position: relative;
  margin-bottom: 50px;
}
.book_intro img {
  width: 150px;
  margin-right: 100px;
}
.word {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.word h3 {
  margin-top: 0;
  margin-bottom: 50px;
}
.word p {
  margin: 4px;
  color: #959ca5;
}
.el-button {
  position: absolute;
  right: 50px;
  bottom: 10px;
  width: 100px;
  height: 35px;
}
h2 {
  text-align: center;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 60px;
}
h2 span {
  position: relative;
  padding-right: 11px;
  padding-left: 11px;
}
h2 span::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -30px;
  width: 30px;
  height: 1px;
  background-color: #333;
  transform: translateY(-50%);
}
h2 span::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -30px;
  width: 30px;
  height: 1px;
  background-color: #333;
  transform: translateY(-50%);
}
.desc p {
  text-indent: 2rem;
  line-height: 2;
}
</style>