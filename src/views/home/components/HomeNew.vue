<template>
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template #right><XtxMore /></template>
    <!-- 面板内容 -->
    <div ref="target" style="position: relative; height: 426px">
      <Transition name="fade">
        <ul v-if="goods.length" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <RouterLink :to="`/product/${item.id}`">
              <img v-lazy="item.picture" alt="" />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </Transition>
    </div>
  </HomePanel>
</template>

<script setup>
import HomePanel from './HomePanel.vue'
import HomeSkeleton from './HomeSkeleton.vue'
import { findNew } from '@/api/home'
import { ref } from 'vue'
import { useLazyData } from '@/hook'

// const goods = ref([])
const target = ref(null)
const goods = useLazyData(target, findNew) // 组件数据懒加载
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
