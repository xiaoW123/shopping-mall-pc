<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory.id">{{
            topCategory.name
          }}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height: 500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in topCategory.children" :key="i.id">
            <a href="javascript:;">
              <img v-lazy="i.picture" />
              <p>{{ i.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem v-for="i in item.goods" :key="i.id" :goods="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { findBanner } from '@/api/home'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import GoodsItem from './component/GoodsItem.vue'
import { findTopCategory } from '@/api/category'

const sliders = ref([])
const store = useStore()
const route = useRoute()
const subList = ref([])

// 获取轮播数据
findBanner().then((res) => {
  sliders.value = res.result
})
// 获取分类数据
const topCategory = computed(() => {
  let cate = {} // 这样 在渲染时，就不用每次v-if进行判断是否有数据再渲染
  const item = store.state.category.list.find((item) => {
    return item.id === route.params.id
  })
  if (item) cate = item
  return cate
})

// 请求商品数据
// 问题：当我们在切换居家和美食时，发现组件没有（setuo）重新渲染（如果请求对应的数据，只会请求一次），只能数据进行了替换？
// 原因：当我们router完全发生改变时，组件才会渲染
// 解决：监听路由地址发生变化时发起请求
function getSubList() {
  findTopCategory(route.params.id).then((res) => {
    subList.value = res.result.children
  })
}
// 注意：当我们跳转二级类目路由时，也会发送不必要的请求
watch(
  () => route.params.id,
  (newValue) => {
    if (newValue && `/category/${newValue}` === route.path) getSubList()
    // newValue && getSubList()
  },
  {
    immediate: true
  }
)
</script>

<style lang="less" scoped>

.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
