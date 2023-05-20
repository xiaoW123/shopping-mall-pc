// 封装插件
import XtxSkeleton from './XtxSkeleton.vue'
import XtxCarousel from './XtxCarousel.vue'
import XtxMore from './XtxMore.vue'
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展
export default {
  install(app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    // 定义指令
    defineDirective(app)
  }
}

import defaultImg from '@/assets/images/200.png'
// 定义指令
const defineDirective = (app) =>
  app.directive('lazy', {
    // binding：指令绑定的值
    mounted(el, binding) {
      const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            console.log('进入-img')
            // 停止观察
            observer.unobserve(el)
            // 处理图片加载失败,给默认图
            el.onerror = () => {
              el.src = defaultImg
            }
            el.src = binding.value
          }
        },
        {
          threshold: 0
        }
      )
      // 开启观察
      observer.observe(el)
    }
  })

// vue2：DOM是否创建好的钩子 -》 inserted
// vue3：DOM是否创建好的钩子与组件一样 -》 mounted
