<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>借阅历史</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-input placeholder="请输入学号" v-model="rid">
        <el-button slot="append" icon="el-icon-search" @click="getLeadHistory"></el-button>
      </el-input>

      <el-table :data="leadHistory" style="width: 100%" stripe border default-expand-all>
        <el-table-column type="expand">
          <el-table :data="bookList" style="width: 100%" stripe border>
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
      leadHistory: [],
      bookList: [],
    };
  },
  methods: {
    getLeadHistory() {
      request({
        url: `/book/leadinfo/${this.rid}/`,
        method: "get",
        params: {
          type: "history",
        },
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          this.rid = ''
          this.leadHistory = []
          this.bookList = []
          return this.$message.error(res.data.meta.msg);
        }
        this.$message.success(res.data.meta.msg);
        this.leadHistory = [];
        this.leadHistory.push(res.data.data);
        this.bookList = res.data.data.lead_history;
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