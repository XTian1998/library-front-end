<template>
  <div>
    <header>
      <nav-bar />
    </header>
    <section>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>书本详情</el-breadcrumb-item>
      </el-breadcrumb>
      
      <book-intro />
      <book-comment />
    </section>
  </div>
</template>

<script>
import NavBar from "@/components/home/NavBar";
import BookIntro from "@/components/bookinfo/BookIntro";
import BookComment from "@/components/bookinfo/BookComment";
export default {
  data() {
    return {};
  },
  components: {
    NavBar,
    BookIntro,
    BookComment
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
</style>