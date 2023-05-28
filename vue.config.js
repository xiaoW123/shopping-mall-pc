const { defineConfig } = require('@vue/cli-service')
// const path = require('path')

module.exports = defineConfig({
  devServer: {
    // 这个是给webpack-dev-server开启可IP和域名访问权限。
    historyApiFallback: true,
    allowedHosts: 'all',
    port: 8080
  },
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
  },
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  }
})
