<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>读者管理</el-breadcrumb-item>
      <el-breadcrumb-item>违规用户</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-input placeholder="请输入学号" v-model="query" clearable @clear="getBlackList">
        <el-button slot="append" icon="el-icon-search" @click="getBlackList"></el-button>
      </el-input>

      <el-button type="primary" @click="changeStatus">恢复账号</el-button>

      <el-button type="primary" @click="updateBlackList">更新名单</el-button>

      <el-table :data="blackList" style="width: 60%" stripe border>
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-table :data="scope.row.overtime_lead_info" style="width: 100%" stripe border>
              <el-table-column prop="oid" label="订单号"></el-table-column>
              <el-table-column prop="isbn" label="ISBN号"></el-table-column>
              <el-table-column label="借阅日期">
                <template v-slot="scope">{{scope.row.lend_date | dateFormat}}</template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column label="状态">
          <el-tag type="danger">已冻结</el-tag>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      query: "",
      blackList: [],
    };
  },
  created() {
    this.getBlackList();
  },
  methods: {
    getBlackList() {
      request({
        url: "/admin/blacklist/",
        method: "get",
        params: {
          query: this.query,
        },
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error(res.data.meta.msg);
        }
        this.blackList = res.data.data;
      });
    },
    updateBlackList() {
      request({
        url: "/admin/blacklist/",
        method: "put",
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error(res.data.meta.msg);
        }
        this.$message.success(res.data.meta.msg);
        this.query = ''
        this.getBlackList();
      });
    },
    changeStatus() {
      if (this.query != "") {
        request({
          url: `/admin/blackuser/${this.query}/`,
          method: "put",
        }).then((res) => {
          if (res.status !== 200) {
            return this.$message.error(res.data.meta.msg);
          }
          this.$message.success(res.data.meta.msg);
        });
      }
    },
  },
};
</script>
<style scoped>
.el-input {
  width: 300px;
  margin-right: 50px;
}
</style>