const { defineConfig } = require('@vue/cli-service')
// const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        'D:\\wl1902\\项目实战\\03_vue3项目\\小兔仙购物商城\\shopping-mall-pc\\src\\assets\\style\\variables.less',
        'D:\\wl1902\\项目实战\\03_vue3项目\\小兔仙购物商城\\shopping-mall-pc\\src\\assets\\style\\mixins.less'
      ]
    }
  }
  // chainWebpack: (config) => {
  //   config.module
  //     .rule('images')
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .tap((options) => Object.assign(options, { limit: 10000 }))
  // }
})
