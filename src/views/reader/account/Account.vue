<template>
  <div class="bg">
    <nav-bar></nav-bar>
    <section>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/reader/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="main">
        <div class="nav">
          <el-menu
            unique-opened
            :router="true"
            :default-active="$route.path"
            background-color="#fafafa"
            text-color="#000"
            active-text-color="#fff"
          >
            <el-menu-item index="/reader/account/user">
              <i class="el-icon-user"></i>
              <span slot="title">个人资料</span>
            </el-menu-item>
            <el-menu-item index="/reader/account/book">
              <i class="el-icon-reading"></i>
              <span slot="title">预约详情</span>
            </el-menu-item>
            <el-menu-item index="/reader/account/leading">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">借阅详情</span>
            </el-menu-item>
            <el-menu-item index="/reader/account/history">
              <i class="el-icon-finished"></i>
              <span slot="title">借阅历史</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "@/components/home/NavBar";
export default {
  data() {
    return {};
  },
  components: {
    NavBar,
  },
};
</script>
<style scoped>
.bg {
  height: 100%;
  background: url(~@/assets/images/user_bg.jpg) no-repeat;
  background-size: 100% 100%;
}
.el-breadcrumb {
  font-size: 20px;
  margin: 50px 0 0 450px;
}
.el-breadcrumb__item >>> .is-link {
  color: white;
}
h2 {
  padding-left: 450px;
  font-weight: normal;
  font-size: 30px;
}
.main {
  display: flex;
  width: 1000px;
  min-height: 600px;
  margin: 80px auto;
  border: 1px solid #e1e2e5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
  background-color: #fff;
}
.main .nav {
  width: 200px;
  min-height: 600px;
}
.nav .el-menu {
  height: 100%;
}
.main .content {
  width: 800px;
  height: 100%;
}
.el-menu-item {
  font-size: 16px;
}
.is-active {
  background-color: #ff5d23 !important;
}
</style>