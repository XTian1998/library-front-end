<template>
  <div>
    <el-carousel indicator-position="none">
      <el-carousel-item v-for="book in popularList" :key="book.isbn" >
        <div class="carousel_item" @click="showBook(book.isbn)">  
          <img :src="'http://127.0.0.1:5000'+ book.image" alt />
          <div class="carousel_info">
            <h3>{{book.b_name}}</h3>
            <p>作者：{{book.author}}</p>
            <p>出版社：{{book.press}}</p>
            <p>分类：{{book.category}}</p>
            <p class="desc">简介：{{book.desc}}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      popularList: [],
    };
  },
  created() {
    request({
      url: "/book/popular/",
      method: "get",
    }).then((res) => {
      this.popularList = res.data.data;
    });
  },
  methods: {
      showBook(isbn) {
          this.$router.push('/reader/bookinfo/'+isbn)
      }
  },
};
</script>
<style scoped>
.el-carousel {
  width: 800px;
  height: 400px;
  margin: 20px auto;
}
.el-carousel >>> .el-carousel__container {
  height: 377px;
}
.carousel_item {
  display: flex;
  justify-content: space-evenly;
  background-color: #eee;
  cursor: pointer;
}
.desc {
  width: 350px;
  height: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
}
.carousel_info {
  padding: 10px;
}
</style>