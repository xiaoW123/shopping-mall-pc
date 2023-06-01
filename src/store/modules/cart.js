// cart-store模块
import {
  getNewCartGoods,
  mergeLocalCart,
  findCartList,
  insertCart,
  deleteCart,
  updateCart,
  checkAllCart
} from '@/api/cart'
// import { mergeLocalCart } from '@/api/cart'
import { findGoods } from '@/api/product'
// 添加购物车
const state = () => ({
  // 购物车展示所需要的数据，通过组件设置
  list: []
})

const mutations = {
  // 本地需要的数据：id skuId name picture price nowPrice count attrsText selected stock isEffective
  // 没有登录，本地购物车
  // skuId：商品规格的唯一标识
  insertCart(state, goods) {
    // findIndex查找符合条件的元素的索引

    const sameIndex = state.list.findIndex((item) => item.skuId[0] === goods.skuId[0])
    console.log('sameIndex---', sameIndex)
    if (sameIndex > -1) {
      // 有就删除原来的数量加一,
      goods.count = state.list[sameIndex].count + goods.count
      state.list.splice(sameIndex, 1)
    }
    state.list.unshift(goods) // 每次添加在最前面
  },
  // 更新购物车列表数据
  updateCart(state, goods) {
    // goods返回的数据可能不完整，有null、undefined、'' 等
    // goods中必须要有skuId
    const updataGoods = state.list.find((item) => item.skuId === goods.skuId)
    for (const key in goods) {
      if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
        updataGoods[key] = goods[key]
      }
    }
  },
  // 删除购物车数据
  deleteCart(state, skuId) {
    const index = state.list.findIndex((item) => item.skuId === skuId)
    state.list.splice(index, 1)
  },
  // 设置购物车列表
  setCartList(state, list) {
    state.list = list
  }
}

const actions = {
  // 因为要处理 已登录 和 未登录 的情况，有网络请求处理，所以推荐用promise，就知道请求什么时候执行完毕

  // 合并购物车（登录和未登录）
  mergeLocalCart(context) {
    const cartList = context.getters.validList.map(({ skuId, selected, count }) => {
      return {
        skuId,
        selected,
        count
      }
    })
    mergeLocalCart(cartList)
      .then(() => {
        console.log(1)
        // 合并成功后删除原数据
        context.commit('setCartList', [])
      })
      .catch((e) => {
        console.log(2)
        console.log(e)
      })
  },
  // 加入购物车
  insertCart(context, goods) {
    return new Promise((resolve, reject) => {
      // context：中的state 表示当前模块的state
      // context：中的rootState 表示整个store的state
      if (context.rootState.user.token) {
        // 已登录
        insertCart(goods)
          .then(() => {
            return findCartList()
          })
          .then((data) => {
            context.commit('setCartList', data.result)
            resolve()
          })
      } else {
        // 未登录
        context.commit('insertCart', goods)
        resolve()
      }
    })
  },
  // 根据购物车的列表获取最新的商品信息，然后进行更新
  findCartList(context) {
    return new Promise((resolve, reject) => {
      if (context.rootState.user.token) {
        // 已登陆
        findCartList().then((data) => {
          context.commit('setCartList', data.result)
          resolve()
        })
      } else {
        // 未登录，本地购物车
        // 因为是根据购物车列表进行更新，有不同的商品，就意味着发生多个不同的请求
        // 使用 Promise.all
        // promiseArr返回的是一个请求成功的集合 [{请求1},{请求2}]
        const promiseArr = context.state.list.map((item) => {
          return getNewCartGoods(item.skuId)
        })
        Promise.all(promiseArr)
          .then((dataList) => {
            dataList.forEach((data, i) => {
              // 更新修改List购物车列表数据,因为Promise是按照顺序进行请求的，所以我们可以通过索引获取到skuId
              context.commit('updateCart', { skuId: context.state.list[i].skuId, ...data.result })
            })
            resolve()
          })
          .catch((e) => {
            reject(e)
          })
      }
    })
  },
  // 删除购物车商品
  deleteCart(context, skuId) {
    return new Promise((resolve, reject) => {
      if (context.rootState.user.profile.token) {
        // 已登录
        deleteCart([skuId])
          .then(() => {
            return findCartList()
          })
          .then((data) => {
            context.commit('setCartList', data.result)
            resolve()
          })
      } else {
        // 未登录
        context.commit('deleteCart', skuId)
        resolve()
      }
    })
  },
  // 修改购物车商品
  updateCart(context, goods) {
    return new Promise((resolve, reject) => {
      if (context.rootState.user.profile.token) {
        // 已登录
        updateCart(goods)
          .then(() => {
            return findCartList()
          })
          .then((data) => {
            context.commit('setCartList', data.result)
            resolve()
          })
      } else {
        // 未登录
        context.commit('updateCart', goods)
        resolve()
      }
    })
  },
  // 做有效商品的全选和反选
  checkAllCart(context, selected) {
    return new Promise((resolve, reject) => {
      if (context.rootState.user.profile.token) {
        // 已登陆
        const ids = context.getters.validList.map((item) => item.skuId)
        checkAllCart({ selected, ids })
          .then(() => {
            return findCartList()
          })
          .then((data) => {
            context.commit('setCartList', data.result)
            resolve()
          })
      } else {
        // 未登录
        // 遍历购物车商品列表,把selected进行修改
        context.getters.validList.forEach((item) => {
          console.log(item)
          context.commit('updateCart', { skuId: item.skuId, selected })
        })
        resolve()
      }
    })
  },
  // 修改商品规格
  updateCartSku(context, { oldSkuId, newSku }) {
    return new Promise(async (resolve, reject) => {
      if (context.rootState.user.profile.token) {
        // 已登录
        // 登录 TODO
        // 1. 获取原先商品的数量
        // 2. 删除原先商品
        // 3. 获取修改的skuId 和 原先商品数量 做一个加入购物车操作
        // 4. 更新列表
        const oldGoods = context.state.list.find((item) => item.skuId === oldSkuId)
        deleteCart([oldGoods.skuId])
          .then(() => {
            return insertCart({ skuId: newSku.skuId, count: oldGoods.count })
          })
          .then(() => {
            return findCartList()
          })
          .then((data) => {
            context.commit('setCartList', data.result)
            resolve()
          })
      } else {
        // 未登录
        // 1.获取旧的商品信息
        console.log(oldSkuId)
        const oldGoods = context.state.list.find((item) => item.skuId === oldSkuId)
        console.log('oldGoods--------', oldGoods)
        // 1.1获取修改的规格图片
        const { result } = await findGoods(oldGoods.id)
        console.log('data------', result)
        // 2.删除旧的商品信息
        context.commit('deleteCart', oldSkuId)
        // 3.合并一条新的商品信息
        const { skuId, price: nowPrice, inventory: stock, specsText: attrsText } = newSku
        console.log('skuId-----------', skuId)
        const imaUrColor = result.skus.find((item) => item.id === skuId[0]).specs[0].valueName
        const picture = result.specs[0].values.find((i) => i.name === imaUrColor).picture
        const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText, picture }
        console.log('newGoods--------', newGoods)
        // 4.把新数据插入
        context.commit('insertCart', newGoods)
        resolve()
      }
    })
  },
  // 批量删除,(true未无效商品)
  batchDeleteCart(context, isClear) {
    return new Promise((resolve, reject) => {
      if (context.rootState.user.profile.token) {
        // 已登录
        // 得到需要删除的商品列表（失效，选中）的skuId集合
        const ids = context.getters[isClear ? 'invalidList' : 'selectedList'].map((item) => item.skuId)
        deleteCart(ids)
          .then(() => {
            return findCartList()
          })
          .then((data) => {
            context.commit('setCartList', data.result)
            resolve()
          })
      } else {
        // 未登录
        context.getters[isClear ? 'invalidList' : 'selectedList'].forEach((item) => {
          context.commit('deleteCart', item.skuId)
        })
        resolve()
      }
    })
  }
}
const getters = {
  /* 购物车弹窗数据 */
  validList(state) {
    // 有效视频列表,该规格的库存
    return state.list.filter((item) => item.stock > 0 && item.isEffective)
  },
  validTotal(state, getters) {
    // 有效商品件数, 累加, p: 累加后的值,c: 当前值, 初始值为0
    return getters.validList.reduce((p, c) => p + c.count, 0)
  },
  validAmount(state, getters) {
    // 有效商品金额,js的浮点运算,会有精度丢失
    return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
  },
  /* 购物车页面数据 */
  invalidList(state) {
    // 无效商品列表, (库存为0，isEffective为false)
    return state.list.filter((item) => !(item.stock > 0 && item.isEffective))
  },
  selectedList(state, getters) {
    // 选中的购物车商品列表,在有效列表中查找
    return getters.validList.filter((item) => item.selected)
  },
  selectedTotal(state, getters) {
    // 选中商品件数
    return getters.selectedList.reduce((p, c) => p + c.count, 0)
  },
  selectedAmount(state, getters) {
    // 选中商品总金额
    return getters.selectedList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
  },
  isCheckAll(state, getters) {
    // 是否全选
    return getters.validList.length === getters.selectedList.length && getters.selectedList.length !== 0
  }
}

export default {
  // 开启模块命名空间
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
