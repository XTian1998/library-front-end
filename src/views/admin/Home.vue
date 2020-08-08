<template>
  <el-container>
    <el-header>
      <span>图书后台管理系统</span>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :router="true"
          :default-active="$route.path"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span>书籍管理</span>
            </template>
            <el-menu-item index="/admin/booklist">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>书籍列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/admin/addbook">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>添加书籍</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/admin/bookcategory">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>书籍分类</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/admin/booking">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>预约查询</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/admin/leading">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>当前借阅</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/admin/leadhistory">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>借阅历史</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>读者管理</span>
            </template>
            <el-menu-item index="/admin/blackuser">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>违规用户</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-monitor"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="/admin/bookreport">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>数据报表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/admin/login");
    },
  },
};
</script>
<style scoped>
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #373d41;
  color: #fff;
  font-size: 30px;
}
.el-header span {
  margin-left: 20px;
}
.el-aside {
  background-color: #333744;
  height: 100%;
}
.el-aside .el-menu {
  border-right: none;
}
.el-main {
  background-color: #eaedf1;
}
</style>