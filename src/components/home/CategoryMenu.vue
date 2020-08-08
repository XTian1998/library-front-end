<template>
  <div class="category_menu">
    <div class="category_title">
      <h2>分类标签</h2>
      <hr />
    </div>
    <div
      class="menu_item"
      v-for="category in categories"
      :key="category.id"
      @click="gotoCategory(category.category)"
    >
      <div class="cover">
        <img src="~@/assets/images/category_image.jpg" alt />
      </div>
      <span>{{category.category}}</span>
    </div>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      categories: [],
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
      this.categories = res.data.data;
      this.$store.commit('getCategories', res.data.data)
    });
  },
  methods: {
    gotoCategory(category) {
      this.$router.push("/reader/book/category/" + category);
    },
  },
};
</script>
<style scoped>
.category_menu {
  display: flex;
  flex-wrap: wrap;
}
.category_menu .category_title {
  width: 100%;
  margin-bottom: 20px;
}
.menu_item {
  display: flex;
  flex-direction: column;
  width: 105px;
  margin: 10px 10px;
  cursor: pointer;
}
.cover {
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.15);
}
.menu_item img {
  display: block;
  width: 100px;
  margin-left: 10px;
}
.menu_item span {
  margin: 0 auto;
}
</style>