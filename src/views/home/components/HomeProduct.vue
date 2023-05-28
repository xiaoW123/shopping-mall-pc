<template>
  <div class="home-product" ref="target">
    <HomePanel :title="item.name" v-for="item in list" :key="item.id">
      <template v-slot:right>
        <div class="sub">
          <RouterLink v-for="sub in item.children" :key="sub.id" :to="`/category/${sub.id}`">{{ sub.name }}</RouterLink>
        </div>
        <XtxMore />
      </template>
      <div class="box">
        <RouterLink class="cover" :to="`/category/${item.id}`">
          <img v-lazy="item.picture" alt="" />
          <strong class="label">
            <span>{{ item.name }}馆</span>
            <span>{{ item.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="i in item.goods" :key="i.id">
            <HomeGoods :goods="i" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>
<!-- Script -->
<script setup>
/* Import */
import { useLazyData } from '@/hook'
import HomePanel from './HomePanel.vue'
import HomeGoods from './HomeGoods.vue'
import { findGoods } from '@/api/home'
import { ref } from 'vue'

/* 数据与状态 */
const target = ref(null)

/* 函数与事件 */
const list = useLazyData(target, findGoods) // 4个商品区块的数据
</script>
<!-- Style -->
<style lang="less" scoped>
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
