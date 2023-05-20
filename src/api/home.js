import request from '@/utils/request'

export function findBrand(limit) {
  return request('/home/brand', 'get', limit)
}

/* 获取广告图 */
export function findBanner() {
  return request('/home/banner', 'get')
}

/* 新鲜好物模块 */
export function findNew() {
  return request('home/new', 'get')
}

/* 人气推荐模块 */
export function findHot() {
  return request('home/hot', 'get')
}

/* 商品区块数据 */
export function findGoods() {
  return request('home/goods', 'get')
}

/* 最新专题 */

export function findSpecial() {
  return request('home/special', 'get')
}
