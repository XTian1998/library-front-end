<template>
  <div class="user">
    <p>学号：{{$store.state.reader.id}}</p>
    <p>用户名：{{$store.state.reader.username}}</p>
    <p>状态：
      <el-tag type="danger" v-if="$store.state.reader.status">已冻结</el-tag>
      <el-tag typer="primary" v-else>正常</el-tag>
    </p>
    <img src="~@/assets/images/user.png" alt="">
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
.user {
  padding: 20px;
}
p {
  font-size: 20px;
}
img {
  width: 700px;
  padding-left: 80px;
}
</style>