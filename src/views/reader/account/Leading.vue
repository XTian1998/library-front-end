<template>
  <div>
    <el-table :data="leading" style="width: 90%" border stripe>
      <el-table-column prop="oid" label="订单号"></el-table-column>
      <el-table-column prop="b_name" label="书名"></el-table-column>
      <el-table-column prop="isbn" label="ISBN号"></el-table-column>
      <el-table-column label="借阅日期">
        <template v-slot="scope">{{scope.row.lend_date | dateFormat}}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="scope">
          <el-tag v-if="scope.row.status == '0'" type="primary">借阅中</el-tag>
          <el-tag v-else type="danger">已超期</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      leading: [],
    };
  },
  created() {
    request({
      url: `/book/leadinfo/${this.$store.state.reader.id}/`,
      method: "get",
      params: {
        type: "leading",
      },
    }).then((res) => {
      if (res.data.meta.status !== 200) {
        return this.$message.error(res.data.meta.msg);
      }
      this.leading = res.data.data;
    });
  },
};
</script>
<style scoped>
.el-table {
  margin: 30px auto;
}
</style>