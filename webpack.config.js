const path=require('path')

const htmlWebpackPlugin=require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const webpack=require('webpack');

module.exports = {
  entry:path.join(__dirname,'/src/main.js'),
  externals: {
    "BMap": "BMap"
  },
  output:{
    path:path.join(__dirname,'/dist'),
    filename:'bundle.js'
  },
  plugins:[
    new htmlWebpackPlugin({
      template:path.join(__dirname,'/src/index.html'),
      filename:'index.html',
    }),
    new VueLoaderPlugin(),
    //导入jq
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
   })
  ],
  //第三方模块加载器
  module:{
    rules:[
      {test:/\.css$/,use:['style-loader','css-loader']},
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
      {test:/\.png|jpg|gif|jpeg$/,use:'url-loader?limit=10240&name=[hash:8]-[name].[ext]'},
      {test:/\.ttf|woff|woff2|eot|svg$/,use:'url-loader'},
      {test:/\.vue$/,use:'vue-loader'},
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
    ]
  },
  resolve:{
    alias:{
      "vue$":"vue/dist/vue.js"
    }
  },
    mode: 'development'
};