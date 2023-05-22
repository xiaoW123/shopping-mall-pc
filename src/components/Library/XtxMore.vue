<!-- 主体复用组件-查看更多 -->
<template>
  <RouterLink :to="path" class="xtx-more">
    <span>查看全部</span>
    <i class="iconfont icon-angle-right"></i>
  </RouterLink>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  path: {
    type: String,
    default: '/'
  }
})
</script>

<style lang="less" scoped></style>
