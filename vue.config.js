const path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  // publicPath:BASE_URL,
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets',resolve('src/assets'))
      .set('components',resolve('src/components'))
      .set('views',resolve('src/views'))
      .set('lib',resolve('src/lib'))
      .set('api',resolve('src/api'))
      .set('config',resolve('src/config'))
  },
  // proxyTable: {
  //   '^/api': {
  //     target: 'https://wx.17hxg.com/api',  // 目标接口域名
  //     changeOrigin: true,  // 是否跨域
  //   },
  // },
}
