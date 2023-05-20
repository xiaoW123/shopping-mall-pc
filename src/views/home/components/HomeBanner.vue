<template>
  <!-- 轮播图 -->
  <div class="home-banner">
    <!-- 轮播图组件 -->
    <XtxCarousel :sliders="sliders" autoPaly />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { findBanner } from '@/api/home'
/* 数据 */
const sliders = ref([])
/* 函数 */

findBanner().then((res) => {
  sliders.value = res.result
})
</script>

<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
