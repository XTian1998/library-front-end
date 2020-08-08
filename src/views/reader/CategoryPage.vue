<template>
  <div>
    <nav-bar></nav-bar>
    <section>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>书籍分类</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>图书分类：{{$route.params.category}}</h2>
      <hr />
      <div class="content">
        <div class="cate_book_list">
          <div v-for="book in cateBookList" :key="book.isbn" class="list_item" @click="gotoBookInfo(book.isbn)">
            <img :src="'http://127.0.0.1:5000'+book.image" alt />
            <div class="word">
              <h2>{{book.b_name}}</h2>
              <span>{{book.author}}/{{book.press}}</span>
              <p>{{book.desc}}</p>
            </div>
          </div>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-size="queryInfo.pagesize"
            layout="total, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <div class="category_tags">
          <h3>全部分类</h3>
          <span
            v-for="category in $store.state.categories"
            :key="category.id"
            class="tag"
            @click="gotoCategory(category.category)"
          >{{category.category}}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { request } from "@/network/request";

import NavBar from "@/components/home/NavBar";
export default {
  data() {
    return {
      queryInfo: {
        query: "list",
        category: "",
        pagenum: 1,
        pagesize: 5,
      },
      total: 0,
      cateBookList: [],
    };
  },
  components: {
    NavBar,
  },
  created() {
    request({
      url: "/book/category/",
      method: "get",
      params: {
        query: "category",
      },
    }).then((res) => {
      this.categories = res.data.data;
      this.$store.commit("getCategories", res.data.data);
      this.getCateBookList(this.$route.params.category);
    });
  },
  methods: {
    getCateBookList(category) {
      this.queryInfo.category = category;
      request({
        url: "/book/category/",
        method: "get",
        params: this.queryInfo,
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取失败");
        }
        this.total = res.data.data.total;
        this.cateBookList = res.data.data.books;
      });
    },
    gotoCategory(category) {
      this.$router.push("/reader/book/category/" + category);
      this.getCateBookList(category);
    },
    handleCurrentChange(newPage) {
      this, (queryInfo.pagenum = newPage);
      this.getCateBookList();
    },
    gotoBookInfo(isbn) {
      this.$router.push('/reader/bookinfo/'+isbn)
    }
  },
};
</script>
<style scoped>
section {
  width: 1000px;
  margin: 0 auto;
}
.el-breadcrumb {
  font-size: 20px;
  margin: 15px 0 50px 0;
}
hr {
  margin-top: 50px;
  border: 1px dashed #eee;
}
.content {
  display: flex;
}
.cate_book_list {
  width: 700px;
  position: relative;
  padding-bottom: 100px;
}
.category_tags {
  width: 300px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.category_tags h3 {
  text-align: center;
  width: 100%;
}
.tag {
  width: 60px;
  text-align: center;
  margin: 10px;
  padding: 5px;
  background-color: #eee;
  border-radius: 5%;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.list_item {
  display: flex;
  align-items: center;
  padding: 50px 0;
  border-bottom: 1px dashed#dddddd;
  cursor: pointer;
}
.list_item img {
  width: 130px;
  margin-right: 20px;
}
.list_item .word h2 {
  width: 400px;
  margin: 10px 0;
}
.list_item .word p {
  width: 500px;
  height: 40px;
  margin-top: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.el-pagination {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>