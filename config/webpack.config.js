const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin    = require('uglifyjs-webpack-plugin')
const CleanPlugin       = require('clean-webpack-plugin');
const HtmlPlugin        = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const NODE_ENV          = process.env.NODE_ENV || 'development';

module.exports = {
  context: `${process.cwd()}/app/client`,
  entry: {
    main: ['./App.jsx', './stylesheets/main.scss']
  },
  output: {
    path: `${process.cwd()}/public/`,
    filename: 'bundle-[hash].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|gif|jpg)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: false,
                minimize: NODE_ENV == 'production',
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                sourceComments: NODE_ENV != 'production'
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new CleanPlugin(['public/*.js', 'public/*.gz', 'public/*.css'], {root: process.cwd()}),
    new ExtractTextPlugin("styles-[hash].css"),
    new HtmlPlugin({template: './index.html'}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV)
      }
    })
  ].concat(minimizeAssets()),
  watch: NODE_ENV != 'production'
}

function minimizeAssets(){
  if(NODE_ENV == 'production'){
    return [
      new UglifyJsPlugin(),
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js|.css$/,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: true
      })
    ]
  }else return []
}
