<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>书籍分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-button type="primary" @click="AddCategoryDialogVisible = true">添加分类</el-button>
      <el-table :data="categoris" style="width: 60%" border stripe>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="category" label="分类"></el-table-column>
      </el-table>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="AddCategoryDialogVisible"
      width="30%"
      @close="AddCategoryDialogClosed"
    >
      <el-form
        :model="addCategoryForm"
        :rules="addCategoryRules"
        ref="addCategoryRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="category">
          <el-input v-model="addCategoryForm.category"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddCategoryDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCategory">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      categoris: [],
      AddCategoryDialogVisible: false,
      addCategoryForm: {
        category: "",
      },
      addCategoryRules: {
        category: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      request({
        url: "/book/category/",
        method: "get",
        params: {
          query: "category",
        },
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error(res.data.meta.msg);
        }
        this.categoris = res.data.data;
        this.$store.commit('getCategories', this.categoris)
      });
    },
    AddCategoryDialogClosed() {
      this.$refs.addCategoryRef.resetFields();
    },
    saveCategory() {
      this.$refs.addCategoryRef.validate((valid) => {
        if (!valid) return;
        request({
          url: "/book/category/",
          method: "post",
          data: {
            category: this.addCategoryForm.category,
          },
        }).then(res => {
          if(res.data.meta.status !== 201) {
            return this.$message.error(res.data.meta.msg)
          }
          this.$message.success(res.data.meta.msg)
          this.AddCategoryDialogVisible = false;
          this.getCategories()
        })
      });
    },
  },
};
</script>
<style scoped>
</style>