<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播组件 -->
        <HomeBanner />
      </div>
    </div>
  </div>
  <!-- 新鲜好物 -->
  <HomeNew />
  <!-- 人气推荐 -->
  <HomeHot />
  <!-- 热门品牌 -->
  <HomeBrand />
  <!-- 商品区块 -->
  <HomeProduct />
  <!-- 最新专题 -->
  <HomeSpecial />
</template>

<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeBrand from './components/HomeBrand.vue'
import HomeProduct from './components/HomeProduct.vue'
import HomeSpecial from './components/HomeSpecial.vue'
</script>

<style lang="less" scoped></style>
