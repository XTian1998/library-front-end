<template>
  <div class="navbar">
    <h2>图书馆</h2>
    <div class="login_item" v-if="JSON.stringify($store.state.reader) == '{}'">
      <span @click="login">登录</span>
      <span>|</span>
      <span @click="register">注册</span>
    </div>
    <div v-else class="reader_item">
      <div class="container" @mouseenter="show" @mouseleave="hide">
        <img src="~@/assets/images/user_avatar.jpg" alt />
        <div class="user_menu" v-if="visible">
          <p @click="gotoAccount">个人中心</p>
          <p @click="logout">退出</p>
        </div>
      </div>
      <span>
        {{$store.state.reader.username}}
        <i
          class="el-icon-warning-outline"
          v-if="$store.state.reader.status"
        ></i>
        <i class="el-icon-circle-check" v-else></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    login() {
      this.$router.push("/reader/login");
    },
    register() {
      this.$router.push("/reader/register");
    },
    show() {
      setTimeout(() => {
        this.visible = true;
      }, 200);
    },
    hide() {
      this.visible = false;
    },
    logout() {
      window.sessionStorage.clear();
      this.$store.commit("saveReaderInfo", {});
      this.$router.push("/reader/login");
    },
    gotoAccount() {
      this.$router.push("/reader/account");
    },
  },
};
</script>
<style scoped>
.navbar {
  display: flex;
  width: 100%;
  height: 80px;
  background-color: rgba(36, 41, 46);
  align-items: center;
  justify-content: space-between;
}
.login_item {
  margin-right: 40px;
}
h2 {
  margin: 0 30px;
  color: #fff;
}
span {
  color: #fff;
  margin: 0 8px;
}
.login_item span {
  cursor: pointer;
}

.reader_item {
  display: flex;
  position: relative;
  height: 50px;
  margin-right: 60px;
  align-items: center;
}
.reader_item img {
  position: relative;
  z-index: 3;
  display: inline-block;
  width: 35px;
  border-radius: 50%;
  margin: 20px;
  transition: 0.3s;
}
.container {
  position: relative;
  margin-top: 10px;
}
.container:hover img {
  transform: scale(1.5) translate(0, 50%);
}
.user_menu {
  width: 150px;
  background-color: #fff;
  position: absolute;
  left: -35px;
  top: 60px;
  padding-top: 40px;
  border-radius: 5%;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
}
.user_menu p {
  box-sizing: border-box;
  margin: 0;
  padding: 10px;
  width: 100%;
  text-align: center;
  color: #64676b;
  cursor: pointer;
}
.user_menu p:hover {
  background-color: #0366d6;
  color: #fff;
}
</style>