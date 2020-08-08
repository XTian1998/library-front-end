<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <h2>各类书籍数量分布</h2>
      <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import { request } from "@/network/request";
import echarts from "echarts";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));

    request({
      url: "/book/category/",
      method: "get",
      params: {
        query: "num",
      },
    }).then((res) => {
      console.log(res.data);
      this.tableData = res.data.data;

      var option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: 10,
        },
        series: [
          {
            name: "数量",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.tableData,
          },
        ],
      };

      myChart.setOption(option);
    });
  },
};
</script>
<style scoped>
</style>