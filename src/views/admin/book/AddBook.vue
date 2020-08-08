<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加书籍</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-steps :space="200" :active="Number(activeIndex)" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="书籍封面"></el-step>
        <el-step title="内容简介"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-form ref="addBookFormRef" :model="addBookForm" :rules="addBookRules" label-width="80px">
        <el-tabs :tab-position="'left'" style="height: 600px;" v-model="activeIndex">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="ISBN号" prop="isbn">
              <el-input v-model="addBookForm.isbn"></el-input>
            </el-form-item>
            <el-form-item label="书名" prop="b_name">
              <el-input v-model="addBookForm.b_name"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input v-model="addBookForm.author"></el-input>
            </el-form-item>
            <el-form-item label="出版社" prop="press">
              <el-input v-model="addBookForm.press"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input v-model="addBookForm.price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="count">
              <el-input v-model="addBookForm.count" type="number"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="category">
              <el-select v-model="addBookForm.category" placeholder="请选择">
                <el-option
                  v-for="item in $store.state.categories"
                  :key="item.id"
                  :label="item.category"
                  :value="item.category"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="书籍封面" name="1">
            <el-form-item label="图片上传">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/book/uploads/"
                :headers="headerObj"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <img :src="'http://127.0.0.1:5000'+addBookForm.image" alt />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="内容简介" name="2">
            <el-form-item label="内容简介" prop="desc">
              <el-input v-model="addBookForm.desc" type="textarea"></el-input>
            </el-form-item>
            <el-button type="primary" @click="addBook">添加书籍</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      activeIndex: "0",
      addBookForm: {
        isbn: "",
        b_name: "",
        author: "",
        press: "",
        price: 0,
        count: 0,
        image: "",
        category: "",
        desc: "",
      },
      addBookRules: {
        isbn: [{ required: true, message: "请输入ISBN号", trigger: "blur" }],
        b_name: [{ required: true, message: "请输入书名", trigger: "blur" }],
        author: [{ required: true, message: "请输入作者", trigger: "blur" }],
        press: [{ required: true, message: "请输入出版社", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        count: [{ required: true, message: "请输入数量", trigger: "blur" }],
        category: [{ required: true, message: "请输入分类", trigger: "blur" }],
        desc: [{ required: true, message: "请输入简介", trigger: "blur" }],
      },
      imageUrl: "",
      headerObj: {
        Authorization: window.sessionStorage.getItem("token"),
      },
    };
  },
  created() {
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
      this.$store.commit("getCategories", res.data.data);
    });
  },
  methods: {
    addBook() {
      this.$refs.addBookFormRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请检查表单");
        }
        if (this.addBookForm.image == "")
          return this.$message.error("请选择书籍封面");
        request({
          url: "/book/",
          method: "post",
          data: this.addBookForm,
        }).then((res) => {
          if (res.data.meta.status !== 201) {
            return this.$message.error(res.data.meta.msg);
          }
          this.$message.success(res.data.meta.msg);
          this.activeIndex = "0";
          this.$refs.addBookFormRef.resetFields();
          this.addBookForm.image = ''
        });
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess(response) {
      if (response.meta.status !== 200) {
        return this.$message.error("上传失败");
      }
      this.$message.success(response.meta.msg);
      this.addBookForm.image = response.data.url;
    },
  },
};
</script>
<style scoped>
.el-input {
  width: 300px;
}
.el-textarea >>> .el-textarea__inner {
  width: 600px;
  height: 300px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  width: 178px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
img {
  margin-top: 15px;
  padding: 0;
}
</style>