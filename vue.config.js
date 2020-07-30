const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? "/dist/" : "/",
  chainWebpack: config => {
    config.resolve.alias
    .set('@', resolve('./src'))
    .set('@assets', resolve('./src/assets'))
    .set('api', resolve('./src/api'))
    .set('static', resolve('./public/static'))
  },
  assetsDir: 'static', //配置js、css静态资源二级目录的位置  
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'source-map'
    }
    config.plugins.push(
      new CopyWebpackPlugin([
        {
          from: './static',
          to: this.outputDir,
          ignore: ['.*']
        }
      ])
    )
  },
  devServer: {
    proxy: 'https://api.sogemao.com'//'http://6wgpih3t.xiaomy.net:21423'   https://api.sogemao.com
    // '/imageCollectCenter': {
    //   target: 'http://580ceb3c.nat123.fun:43331'
    // }
  }
}