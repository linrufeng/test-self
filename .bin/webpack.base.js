const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
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
      new VueLoaderPlugin()    
  ] 
};