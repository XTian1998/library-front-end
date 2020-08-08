<template>
  <div>
    <el-table :data="bookList" style="width: 80%" stripe border>
      <el-table-column prop="oid" label="订单"></el-table-column>
      <el-table-column prop="isbn" label="ISBN号"></el-table-column>
      <el-table-column prop="b_name" label="书名"></el-table-column>
      <el-table-column label="借阅日期">
        <template v-slot="scope">{{scope.row.lend_date | dateFormat}}</template>
      </el-table-column>
      <el-table-column label="归还日期">
        <template v-slot="scope">{{scope.row.back_date | dateFormat}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      bookList: [],
      name: "",
    };
  },
  created() {
    request({
      url: `/book/leadinfo/${this.$store.state.reader.id}/`,
      method: "get",
      params: {
        type: "history",
      },
    }).then((res) => {
      if (res.data.meta.status !== 200) {
        return this.$message.error(res.data.meta.msg);
      }
      this.bookList = res.data.data.lead_history;
    });
  },
};
</script>
<style scoped>
.el-table {
  margin: 30px auto;
}
</style>