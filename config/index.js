'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

var path = require('path')
var HOSTDATA = [{
  index: '../dataAssets/index.html',
  assetsRoot: '../dataAssets',
  baseServerUrl: 'http://59.215.191.43:2000'
  // baseServerUrl: 'http://192.168.22.202:8013/v1/assets',
}, {
  index: '../chart/index.html',
  assetsRoot: '../chart',
  baseServerUrl: 'http://192.168.22.202:8012/datalink'
}][0];

module.exports = {
dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {

    },
    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8013, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // baseServerUrl: 'http://192.168.30.113:8000', //向宇
    baseServerUrl: 'http://59.215.191.43:2000', //内网
  
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    // index: path.resolve(__dirname, '../chart/index.html'),
    index: path.resolve(__dirname, HOSTDATA.index),

    // Paths
    // assetsRoot: path.resolve(__dirname, '../chart'),
    assetsRoot: path.resolve(__dirname, HOSTDATA.assetsRoot),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
    //  */
    // host: '192.168.22.202',
    host: '192.168.0.8',
    port: 8012,
    baseServerUrl: HOSTDATA.baseServerUrl,
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
