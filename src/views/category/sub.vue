<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="changeFilter" />
      <!-- 商品面板（排序和列表） -->
      <div class="goods-list">
        <SubSort @sort-change="changeSort" />
        <!-- 列表 -->
        <ul>
          <li v-for="i in goodsList" :key="i.id">
            <GoodsItem :goods="i" />
          </li>
        </ul>
        <!-- 无限列表数据加载 -->
        <XtxInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import SubBread from './component/SubBread.vue'
import SubFilter from './component/SubFilter.vue'
import SubSort from './component/SubSort.vue'
import GoodsItem from './component/GoodsItem.vue'
import { findSubCategoryGoods } from '@/api/category'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const loading = ref(false)
const finished = ref(false)
const goodsList = ref([]) // 保存请求的数据
const route = useRoute()

// 查询参数
let reqParams = {
  page: 1,
  pageSize: 20
}
function getData() {
  // 请求数据时，开启加载动画
  loading.value = true
  reqParams.categoryId = route.params.id // 因为做排序时需要用到二级类目id
  findSubCategoryGoods({ reqParams }).then(({ result }) => {
    if (result.items.length) {
      goodsList.value.push(...result.items)
      reqParams.page++
    } else {
      // 请求不到数据了，表示加载数据完毕
      finished.value = true
    }
    loading.value = false
  })
}

// 当我们在切换二级类目时，应该清空数据，重新请求
watch(
  () => route.params.id,
  (newValue) => {
    if (newValue && route.path === `/category/sub${newValue}`) {
      goodsList.value = []
      reqParams = {
        page: 1,
        pageSize: 20
      }
      finished.value = false
    }
  }
)
// 排序
const changeSort = (sortParams) => {
  reqParams.value = { ...reqParams, ...sortParams }
  reqParams.page = 1
  goodsList.value = []
  finished.value = false
}
// 筛选
const changeFilter = (filterParams) => {
  reqParams = { ...reqParams, ...filterParams }
  reqParams.page = 1
  goodsList.value = []
  finished.value = false
}
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
