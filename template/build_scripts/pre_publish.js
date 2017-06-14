require('shelljs/global')
process.env.NODE_ENV = 'prePub'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
//修改当前的编译环境为preBuild，默认是build
config.currentEnv = 'preBuild';

var webpackConfig = require('./webpack.prePublish.conf')
var spinner = ora('building for production...')

spinner.start()

var assetsPath = path.join(config.prePublish.assetsRoot, config.prePublish.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
})
