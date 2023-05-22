// 定义分类相关数据api
import request from '@/utils/request'

/*
 *获取所有分类（顶级，二级，对应的商品推荐数据）
 *
 */
export function findAllCategory() {
  return request('/home/category/head', 'GET')
}

/**
 * 获取单个顶级分类信息
 * @param {String} id - 顶级分类ID
 */
export function findTopCategory(id) {
  return request('/category', 'get', { id })
}

/**
 * 获取二级分类筛选条件数据
 * @param {String} id - 二级分类ID
 */
export function findSubCategoryFilter(id) {
  return request('/category/sub/filter', 'get', { id })
}

/**
 * 获取分类下的商品（带筛选条件）
 * @param {Object} params - 可参考接口文档
 */

export function findSubCategoryGoods(params) {
  return request('/category/goods/temporary', 'post', params)
}
