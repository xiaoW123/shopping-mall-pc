<template>
  <div class="xtx-carousel" @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body">
      <li
        class="carousel-item"
        v-for="(item, i) in sliders"
        :key="item.id"
        :class="{ fade: index === i }"
      >
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a href="javascript:;" class="carousel-btn next" @click="toggle(+1)"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <span
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ active: index === i }"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, ref, watch, defineProps } from 'vue'
/* 数据 */
const props = defineProps({
  sliders: {
    type: Array,
    default: () => []
  },
  // 是否自动播放
  autoPaly: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 2000
  }
})

/* 函数式事件 */
// 记录播放第几种张，当index等于元素的index时，添加类属性，实现淡入淡出
const index = ref(0)
// 轮播图--定时器播放,自动播放，但是什么时候调用？
let timer = null
function autoPalyFn() {
  timer = setInterval(() => {
    index.value++
    if (index.value >= props.sliders.length) {
      index.value = 0
    }
  }, props.duration)
}
// 轮播图--需要监听sliders数据变化，且autoPaly为true，掉用定时器
watch(
  () => props.sliders,
  (newValue) => {
    if (newValue.length && props.autoPaly) {
      autoPalyFn()
    }
  }
)
// 轮播图--鼠标进入离开，暂停，开启
function stop() {
  if (timer) clearInterval(timer)
}
function start() {
  if (props.sliders.length && props.autoPaly) {
    autoPalyFn()
  }
}
//  轮播图--切换上下张
function toggle(step) {
  const newIndex = index.value + step
  if (newIndex >= props.sliders.length) {
    index.value = 0
    return
  }
  if (newIndex < 0) {
    index.value = props.sliders.length - 1
    return
  }
  index.value = newIndex
}
// 组件销毁时，清除定时器
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="less" scoped>
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
