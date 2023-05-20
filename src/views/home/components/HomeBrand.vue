<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a
        href="javascript:;"
        :class="{ disabled: index === 0 }"
        class="iconfont icon-angle-left prev"
        @click="toggle(-1)"
      ></a>
      <a
        href="javascript:;"
        :class="{ disabled: index === 1 }"
        class="iconfont icon-angle-right next"
        @click="toggle(1)"
      ></a>
    </template>
    <div class="box" ref="target">
      <ul class="list" :style="{ transform: `translateX(${-index * 1240}px)` }">
        <li v-for="item in brands" :key="item.id">
          <RouterLink to="/">
            <img v-lazy="item.picture" alt="" />
          </RouterLink>
        </li>
      </ul>
      <div class="skeleton">
        <XtxSkeleton
          class="item"
          v-for="i in 5"
          :key="i"
          animated
          bg="#e4e4e4"
          width="240px"
          height="305px"
        />
      </div>
    </div>
  </HomePanel>
</template>
<!-- Script -->
<script setup>
/* Import */
import HomePanel from './HomePanel.vue'
import { useLazyData } from '@/hook'
import { findBrand } from '@/api/home'
import { ref } from 'vue'
/* 数据与状态 */
const target = ref(null)
const index = ref(0)

/* 函数与事件 */
// 注意：useLazyData需要的是API函数，如果遇到要传参的情况，自己写函数再函数中调用API
const brands = useLazyData(target, () => findBrand({ limit: 10 }))
// 控制切换按钮
function toggle(step) {
  const newIndex = index.value + step
  if (newIndex > 1 || newIndex < 0) return
  index.value = newIndex
}
</script>
<!-- Style -->
<style lang="less" scoped>
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  // 鼠标禁用
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
