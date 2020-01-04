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
      .set('network',resolve('src/network'))
      .set('views',resolve('src/views'))
      .set('common',resolve('src/common'))
  }
}
