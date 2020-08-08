<template>
  <div class="home">
    <header>
      <nav-bar />
    </header>
    <section>
      <div class="content">
        <div class="left">
          <carousel></carousel>
          <main-list></main-list>
        </div>
        <div class="right">
          <category-menu />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "@/components/home/NavBar";
import CategoryMenu from "@/components/home/CategoryMenu";
import MainList from "@/components/home/MainList";
import Carousel from "@/components/home/Carousel";

export default {
  data() {
    return {};
  },
  components: {
    NavBar,
    CategoryMenu,
    MainList,
    Carousel,
  }
};
</script>
<style scoped>
.home {
  background-color: #f6f8fa;
}
.carousel {
  width: 100%;
  height: 500px;
}
.content {
  display: flex;
  height: 100%;
  width: 1400px;
  margin: 0 auto;
  justify-content: space-around;
}
.content .left {
  width: 1000px;
  height: 100%;
}
.content .right {
  width: 300px;
}
</style>