// 封装插件
// import XtxSkeleton from './XtxSkeleton.vue'
// import XtxCarousel from './XtxCarousel.vue'
// import XtxMore from './XtxMore.vue'
// import XtxBread from '@/components/Library/XtxBread.vue'
// import XtxBreadItem from '@/components/Library/XtxBreadItem.vue'

/* 自动批量注册组件 */
// 1.使用 require 提供的函数 context 加载某一个目录下的所有 .vue 后缀的文件。
// 2.然后 context 函数会返回一个导入函数 importFn，importFn有一个属性 keys() 获取所有的文件路径
// 通过文件路径数组，通过遍历数组，再使用 importFn 根据路径导入组件对象
// 遍历的同时进行全局注册即可
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context('./', false, /\.vue$/)
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展
export default {
  install(app) {
    // 自定义全局组件
    // app.component('XtxSkeleton', XtxSkeleton)
    // app.component('XtxCarousel', XtxCarousel)
    // app.component('XtxMore', XtxMore)
    // app.component('XtxBread', XtxBread)
    // app.component('XtxBreadItem', XtxBreadItem)
    /* 自动批量注册 */
    importFn.keys().forEach((key) => {
      const component = importFn(key).default
      // 注册组件
      app.component(component.__name, component)
    })
    // 自定义指令
    defineDirective(app)
    // Message 组件
    app.config.globalProperties.$message = Message
  }
}

// 定义指令
import defaultImg from '@/assets/images/200.png'
import Message from './Message'
const defineDirective = (app) =>
  app.directive('lazy', {
    // binding：指令绑定的值
    mounted(el, binding) {
      const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
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
