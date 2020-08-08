<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>预约查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-input placeholder="请输入学号" v-model="rid">
        <el-button slot="append" icon="el-icon-search" @click="getBookInfo"></el-button>
      </el-input>

      <el-table :data="bookInfo" style="width: 100%" stripe border default-expand-all>
        <el-table-column type="expand">
          <el-table :data="bookList" style="width: 80%" stripe border>
            <el-table-column prop="oid" label="预约号"></el-table-column>
            <el-table-column prop="isbn" label="ISBN号"></el-table-column>
            <el-table-column prop="b_name" label="书名"></el-table-column>
            <el-table-column label="预约时间">
              <template v-slot="scope">{{scope.row.book_date | dateFormat}}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button type="primary" icon="el-icon-edit" @click="lead(scope.row)">借出</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-table-column>
        <el-table-column prop="rid" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      rid: "",
      bookInfo: [],
      bookList: [],
    };
  },
  methods: {
    getBookInfo() {
      request({
        url: "/book/bookinfo/",
        method: "get",
        params: {
          rid: this.rid,
        },
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          this.bookInfo = [];
          this.rid = "";
          return this.$message.error(res.data.meta.msg);
        }
        this.bookInfo = []
        this.bookInfo.push(res.data.data);
        this.bookList = res.data.data.book_list;
      });
    },
    lead(row) {
      request({
        url: "/book/leadinfo/",
        method: "post",
        data: {
          rid: row.rid,
          isbn: row.isbn,
        },
      }).then((res) => {
        if (res.data.meta.status !== 201) {
          return this.$message.error(res.data.meta.msg);
        }
        this.$message.success(res.data.meta.msg)
        this.bookInfo = []
        this.book_list = []
        this.getBookInfo()
      });
    },
  },
};
</script>
<style scoped>
.el-input {
  width: 300px;
}
</style>