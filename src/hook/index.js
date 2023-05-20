import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
/** 组件数据懒加载
 * @param target - Dom对象
 * @param apiFn  - API函数
 */

export function useLazyData(target, apiFn) {
  const result = ref([])
  // target 获取需要被观察的DOM对象-ref获取
  // isIntersecting 是否进入可视区域，true是进入 false是移出
  // observerElement 被观察的dom
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        console.log('进入')
        // 如果进入可视区，就停止观察
        stop()
        apiFn().then((res) => {
          console.log(res)
          result.value = res.result
        })
      }
    },
    {
      // 容器与进入可视区域的比例，0：表示进入就触发（比例为0），1：表示比例为1，当进入的部分与容器一样大视触发
      threshold: 0
    }
  )
  // 把懒加载获取的数据返回
  return result
}
