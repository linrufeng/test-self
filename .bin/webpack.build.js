const web_base = require('./webpack.base.js');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer         = require('autoprefixer');
const config               = require('./../package.json');
const argv = require('yargs').argv;
const path = require('path');
let buildCongfig = Object.assign(web_base,{
    mode:'production',
    optimization:{
        minimize:true,
            minimizer:[            
             new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                extractComments: true,               
                uglifyOptions:{
                        compress: {
                            drop_console: true,
                            drop_debugger: true, 
                        }                              
                }            
            })
            ]
    },
    module:{
        rules:[
            {
                test: /\.(sa|sc|c)ss$/,
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,                    
                    'css-loader',    
                    'sass-loader'                                                             
                ]
            },               
            {
            test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include:[path.resolve('src/asset/svgSprite')],
                options:{
                    symbolId:'icon-[name]'
                }
            },
            {
            test: /\.(png|jpg|gif|webp|woff|eot|ttf|svg)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        name:'img/[name].[ext]',
                        limit:3000
                    }
                },
                exclude:[path.resolve('src/asset/svgSprite')]            
            },     
            {
                test:/\.vue$/,
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
                use:[
                    {
                        loader:'vue-loader',
                        options: {
                            loaders:{
                                scss:[
                                    MiniCssExtractPlugin.loader,
                                    'css-loader',
                                    'sass-loader'
                                ]
                            },
                            postcss: [autoprefixer()]
                        },
                    }
                ]
            },
            {
                test: /\.tsx?$/,              
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
                use:[        
                    'babel-loader',        
                    {                  
                        loader:'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            appendTsxSuffixTo: [/\.vue$/]
                        }
                    }
                ]              
            }, 
            {
                test:/\.js$/,
                use:'babel-loader?cacheDirectory',               
            }           
    ]}
})
buildCongfig.plugins = [
    ...buildCongfig.plugins,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/index.html'),
        filename: 'index.html',    
    }),       
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename:'css/[id].css'    
    }),  
    new optimizeCss(),           
    new webpack.BannerPlugin('Build time : '+new Date().toString()),
];

module.exports =buildCongfig;