// 定义分类相关数据api
import request from '@/utils/request'

/*
 *获取所有分类（顶级，二级，对应的商品推荐数据）
 *
 */
export function findAllCategory() {
  return request('/home/category/head', 'GET')
}
