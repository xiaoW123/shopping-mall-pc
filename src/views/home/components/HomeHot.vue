<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <div ref="target" style="position: relative; height: 426px">
      <Transition name="fade">
        <ul v-if="goods.length" ref="pannel" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img v-lazy="item.picture" alt="" />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </Transition>
    </div>
  </HomePanel>
</template>
<!-- Script -->
<script setup>
/* Import */
import HomePanel from './HomePanel.vue'
import HomeSkeleton from './HomeSkeleton.vue'
import { useLazyData } from '@/hook'
import { findHot } from '@/api/home'
import { ref } from 'vue'

/* 数据与状态 */
// const goods = ref([])
const target = ref(null)

/* 函数与事件 */
const goods = useLazyData(target, findHot) // 数据请求懒加载
// findHot().then((res) => {
//   goods.value = res.result
// })
</script>
<!-- Style -->
<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
