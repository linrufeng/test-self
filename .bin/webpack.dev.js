const web_base = require('./webpack.base.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
let devConfig = {};

devConfig = Object.assign(web_base,{
    mode:"development",
    module:{
        rules:[
            {
                test: /\.(sa|sc|c)ss$/,
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
                use: [
                    'style-loader',                    
                    'css-loader',    
                    'sass-loader'                
                ]
            },  
            {
            test: /\.tsx?$/,              
            include: path.resolve(__dirname, "../src"),
            exclude: /node_modules/,
            use:[                
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
                use:['vue-loader']
            }           
    ]},     
    devServer:{
        open:true,
        proxy:{
            "/workshop/*":{
                target:"https://***.com",               
                changeOrigin: true,
                secure: false
            }
        }     
    }  
});

devConfig.plugins = [...devConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
          title:"vue_stage",
          template:'./src/index.html'
    }),   
];

module.exports= devConfig;