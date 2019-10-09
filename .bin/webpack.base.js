const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const chalk= require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
module.exports = {    
  entry: './src/app.ts',
  output: {
    filename: './js/app.js',
    path: path.resolve(__dirname, '../dist')
  }, 
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.vue','.svg' ]
  },  
  plugins:[     
      new VueLoaderPlugin(),
      new ProgressBarPlugin({
        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',      
        clear: false, 
        width: 60
      }),
      new WebpackBuildNotifierPlugin({
        title: "My Project Webpack Build",
        // logo: path.resolve("./img/favicon.png"),
        suppressSuccess: true
      })
  ] 
};