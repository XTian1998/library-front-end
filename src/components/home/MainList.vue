<template>
  <div class="main_list">
    <el-input placeholder="请输入书名" v-model="listQueryInfo.query" clearable @clear="getBookList">
      <el-button slot="append" icon="el-icon-search" @click="fuzzyQuery"></el-button>
    </el-input>
    <hr />
    <div class="list">
      <div class="list_content" v-for="book in bookList" :key="book.isbn" @click="showBook(book.isbn)">
        <img :src="'http://127.0.0.1:5000'+ book.image" alt />
        <div class="bookinfo">
          <h3>{{book.b_name}}</h3>
          <p>作者：{{book.author}}</p>
          <p>出版社：{{book.press}}</p>
          <p>分类：{{book.category}}</p>
        </div>
      </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQueryInfo.pagenum"
      :page-size="listQueryInfo.pagesize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      listQueryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      bookList: [],
      total: 0,
    };
  },
  created() {
    this.getBookList();
  },
  methods: {
    getBookList() {
      request({
        url: "/book/",
        method: "get",
        params: this.listQueryInfo,
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取列表失败");
        }
        this.bookList = res.data.data.books;
        this.total = res.data.data.total;
      });
    },
    handleSizeChange(newSize) {
      this.listQueryInfo.pagesize = newSize;
      this.getBookList();
    },
    handleCurrentChange(newPage) {
      this.listQueryInfo.pagenum = newPage;
      this.getBookList();
    },
    fuzzyQuery() {
      this.listQueryInfo.pagenum = 1;
      this.getBookList();
    },
    showBook(isbn) {
      this.$router.push("/reader/bookinfo/" + isbn);
    },
  },
};
</script>
<style scoped>
.main_list {
  position: relative;
  padding-bottom: 100px;
}
.el-input {
  margin: 30px 30px;
  width: 300px;
}
hr {
  color: #eee;
}
.list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.list_content {
  display: flex;
  align-items: center;
  width: 450px;
  margin-bottom: 20px;
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
.list_content img {
  width: 100px;
}
.list_content .bookinfo {
  margin: 0 10px;
}
.bookinfo p {
  font-size: 10px;
}
.el-pagination {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>