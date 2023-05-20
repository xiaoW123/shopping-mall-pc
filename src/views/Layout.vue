<template>
  <!-- 布局容器 -->
  <!-- 顶部通栏 -->
  <AppTopnav />

  <!-- 头部组件 -->
  <AppHeader />

  <!-- 吸顶组件  -->
  <AppHeaderSticky />

  <!-- 内容容器 -->
  <div class="main">
    <!-- 二级路由 -->
    <RouterView />
  </div>

  <!-- 底部组件 -->
  <AppFooter />
</template>

<script setup>
import { useStore } from 'vuex'
// 组件
import AppTopnav from '@/components/AppTopnav/AppTopnav.vue'
import AppHeader from '@/components/AppHeader/AppHeader.vue'
import AppFooter from '@/components/AppFooter/AppFooter.vue'
import AppHeaderSticky from '@/components/AppHeaderSticky/AppHeaderSticky.vue'

// 请求所有分类数据
const store = useStore()
store.dispatch('category/getList')
</script>

<style lang="less" scoped>
.main {
  min-height: 600px;
}
</style>
