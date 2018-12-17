'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const vuxLoader = require('vux-loader')
 
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
if(process.env.type=="pc"){
	var entryApp='./src/pcmain.js';
}else{
	var entryApp='./src/mbmain.js';
}

let webpackConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: entryApp,
//  env:"./src/config/env.js",
//  config:"./src/config/config.js",
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
// 在webpack配置文件中的output路径配置chunkFilename属性
//  chunkFilename: 'chunk[id].js?[chunkhash]',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
//    ...(config.dev.useEslint? [{
//      test: /\.(js|vue)$/,
//      loader: 'eslint-loader',
//      enforce: 'pre',
//      include: [resolve('src'), resolve('test')],
//      options: {
//        formatter: require('eslint-friendly-formatter'),
//        emitWarning: !config.dev.showEslintErrorsInOverlay
//      }
//    }] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]?[hash:7]'),
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[ext]?[hash:7]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]?[hash:7]')
        }
      }
    ]
  }
}


module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style']
})
