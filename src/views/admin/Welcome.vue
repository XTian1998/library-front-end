<template>
  <div>
      <h2>欢迎来到图书后台管理系统</h2>
      <p>本系统采用前后端分离的开发方式，通过vue+flask+mysql实现。系统包含读者端和管理员端两大部分。</p>
      <img class="welcome" src="~@/assets/images/welcome.png" alt="">
      <img class="book" src="~@/assets/images/welcome-2.png" alt="">
  </div>
</template>

<script>
  export default {
    data () {
      return {
      };
    },
  }

</script>
<style scoped>
div {
    position: relative;
    height: 750px;
    background-color: #fff;
}
h2 {
    padding: 30px;
    font-size: 40px;
}
p {
    margin-top: 100px;
    text-indent: 2rem;
}
.welcome {
    position: absolute;
    top: 50px;
    right: 100px;
    width: 300px;
}
.book {
    position: absolute;
    bottom: 50px;
    right: 100px;
    width: 500px;
}
</style>