<template>
  <div>
    <el-table :data="bookList" style="width: 80%" stripe border>
      <el-table-column prop="oid" label="预约号"></el-table-column>
      <el-table-column prop="isbn" label="ISBN号"></el-table-column>
      <el-table-column prop="b_name" label="书名"></el-table-column>
      <el-table-column label="预约时间">
        <template v-slot="scope">{{scope.row.book_date | dateFormat}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="cancel(scope.row)">取消预约</el-button>
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
      bookList: [],
    };
  },
  created() {
    this.getBookList();
  },
  methods: {
    getBookList() {
      request({
        url: "/book/bookinfo/",
        method: "get",
        params: {
          rid: this.$store.state.reader.id,
        },
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error(res.data.meta.msg);
        }
        this.bookList = res.data.data.book_list;
      });
    },
    cancel(row) {
      request({
        url: "/book/bookinfo/",
        method: "delete",
        params: {
          rid: this.$store.state.reader.id,
          isbn: row.isbn,
        },
      }).then((res) => {
        if (res.data.meta.status !== 204) {
          return this.$message.error(res.data.meta.msg);
        }
        this.$message.success(res.data.meta.msg);
        this.getBookList()
      });
    },
  },
};
</script>
<style scoped>
.el-table {
  margin: 30px auto;
}
</style>