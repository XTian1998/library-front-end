<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>书籍分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-input v-model="isbn" placeholder="请输入isbn号" clearable @clear="clearInput">
        <el-button slot="append" icon="el-icon-search" @click="getBookById"></el-button>
      </el-input>

      <el-table :data="bookList" style="width: 100%" border stripe>
        <el-table-column prop="isbn" label="ISBN号"></el-table-column>
        <el-table-column prop="b_name" label="书名"></el-table-column>
        <el-table-column prop="count" label="数量"></el-table-column>
        <el-table-column prop="category" label="分类">
          <template v-slot="scope">
            <el-tag>{{scope.row.category}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditBookDialog(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteBook(scope.row.isbn)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-if="paginationVisible"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQueryInfo.pagenum"
        :page-sizes="[5, 10, 20]"
        :page-size="listQueryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 编辑图书对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="editBookDialogVisible"
      width="50%"
      @close="editBookDialogClosed"
    >
      <el-form
        :model="editBookForm"
        :rules="editBookRules"
        ref="editBookFormRef"
        label-width="100px"
      >
        <el-form-item label="ISBN号">
          <el-input v-model="editBookForm.isbn" disabled></el-input>
        </el-form-item>
        <el-form-item label="书名" prop="b_name">
          <el-input v-model="editBookForm.b_name"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="editBookForm.author"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="press">
          <el-input v-model="editBookForm.press"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="editBookForm.price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="count" >
          <el-input v-model="editBookForm.count" type="number"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="editBookForm.category" placeholder="请选择">
            <el-option
              v-for="item in $store.state.categories"
              :key="item.id"
              :label="item.category"
              :value="item.category"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="desc">
          <el-input v-model="editBookForm.desc" type="textarea" autosize></el-input>
          <pre style="width: 600px">{{editBookForm.desc}}</pre>
        </el-form-item>
        <el-form-item label="封面图片">
          <img :src="'http://127.0.0.1:5000'+editBookForm.image" alt width="270px" />
          <h2>重新上传</h2>
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
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editBookDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="postEditForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      bookList: [],
      listQueryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      total: 0,
      paginationVisible: true,
      isbn: "",
      editBookDialogVisible: false,
      editBookForm: {},
      editBookRules: {
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
    this.getBookList();
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
    getBookList() {
      request({
        url: "/book/",
        method: "get",
        params: this.listQueryInfo,
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取列表失败");
        }
        this.bookList = res.data.data.books;
        this.total = res.data.data.total;
      });
    },
    handleSizeChange(newSize) {
      this.listQueryInfo.pagesize = newSize;
      this.getBookList();
    },
    handleCurrentChange(newPage) {
      this.listQueryInfo.pagenum = newPage;
      this.getBookList();
    },
    deleteBook(isbn) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request({
            url: `/book/${isbn}/`,
            method: "delete",
          }).then((res) => {
            if (res.data.meta.status !== 204) {
              return this.$message.error(res.data.meta.msg);
            }
            this.$message.success(res.data.meta.msg);
            this.isbn = "";
            this.getBookList();
            this.paginationVisible = true;
          });
        })
        .catch(() => {
          this.$message.info("已取消删除！");
        });
    },
    getBookById() {
      if (this.isbn !== "") {
        request({
          url: `/book/${this.isbn}/`,
          method: "get",
        }).then((res) => {
          if (res.data.meta.status !== 200) {
            return this.$message.error(res.data.meta.msg);
          }
          this.bookList = [];
          this.bookList.push(res.data.data);
          this.paginationVisible = false;
        });
      }
    },
    clearInput() {
      this.isbn = "";
      this.getBookList();
      this.paginationVisible = true;
    },
    showEditBookDialog(row) {
      this.editBookDialogVisible = true;
      this.editBookForm = row;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess(response) {
      if (response.meta.status !== 200) {
        return this.$message.error("上传失败");
      }
      this.$message.success(response.meta.msg);
      this.editBookForm.image = response.data.url;
    },
    editBookDialogClosed() {
      this.$refs.editBookFormRef.resetFields();
      this.$nextTick(function () {
        document.querySelector(".el-dialog__wrapper").scrollTop = 0;
      });
      this.getBookList();
    },
    postEditForm() {
      this.$refs.editBookFormRef.validate((valid) => {
        if (!valid) return;
        request({
          url: `/book/${this.editBookForm.isbn}/`,
          method: "put",
          data: this.editBookForm,
        }).then((res) => {
          if (res.data.meta.status !== 200) {
            return this.$message.error(res.data.meta.msg);
          }
          this.$message.success(res.data.meta.msg);
          this.editBookDialogVisible = false;
          this.getBookList();
        });
      });
    },
  },
};
</script>
<style scoped>
.el-input {
  width: 400px;
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
pre{white-space:pre-wrap; white-space:-moz-pre-wrap; white-space:-pre-wrap; white-space:-o-pre-wrap; word-wrap:break-word;} 
</style>