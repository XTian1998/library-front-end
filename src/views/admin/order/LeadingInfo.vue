<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>当前借阅</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-input placeholder="请输入学号" v-model="rid" clearable @clear="clearInput">
        <el-button slot="append" icon="el-icon-search" @click="getLeadingInfo"></el-button>
      </el-input>

      <el-table :data="leading" style="width: 80%" border stripe>
        <el-table-column prop="oid" label="订单号"></el-table-column>
        <el-table-column prop="rid" label="学号"></el-table-column>
        <el-table-column prop="isbn" label="ISBN号"></el-table-column>
        <el-table-column prop="b_name" label="书名"></el-table-column>
        <el-table-column label="借阅日期">
          <template v-slot="scope">{{scope.row.lend_date | dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            <el-tag v-if="scope.row.status == '0'" type="primary">借阅中</el-tag>
            <el-tag v-else type="danger">已超期</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" @click="returnBook(scope.row)">归还</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :hide-on-single-page="paginationInvisible"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      rid: "",
      queryInfo: {
        pagenum: 1,
        pagesize: 5,
      },
      leading: [],
      total: 0,
      paginationInvisible: false,
    };
  },
  created() {
    this.getLeadingList();
  },
  methods: {
    getLeadingList() {
      request({
        url: "/book/leadinfo/",
        method: "get",
        params: this.queryInfo,
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取失败");
        }
        this.leading = res.data.data.list;
        console.log(this.leading)
        this.total = res.data.data.total;
      });
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getLeadingList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getLeadingList();
    },
    returnBook(row) {
      request({
        url: "/book/leadinfo/",
        method: "put",
        data: {
          rid: row.rid,
          isbn: row.isbn,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.meta.status !== 200) {
          return this.$message.error(res.data.meta.msg);
        }
        this.$message.success(res.data.meta.msg);
        this.queryInfo.pagenum = 1
        this.getLeadingList();
      });
    },
    getLeadingInfo() {
      request({
        url: `/book/leadinfo/${this.rid}/`,
        method: "get",
        params: {
          type: "leading",
        },
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error(res.data.meta.msg);
        }
        this.$message.success(res.data.meta.msg);
        this.leading = res.data.data;
        this.paginationInvisible = true;
      });
    },
    clearInput() {
      this.getLeadingList();
      this.paginationInvisible = false;
    },
  },
};
</script>
<style scoped>
.el-input {
  width: 300px;
}
</style>