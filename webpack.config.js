var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: {
        vendor: ['jquery', './src/js/common.js'],
        index: './src/js/index.js',
        cart: './src/js/cart.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/[name].js',
        publicPath: ''
    },
    module: {
        rules: [{
            test: /\.css$/,
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
                // css转为style引入
                /* loader: 'style-loader!css-loader' */
        }]
    },
    plugins: [
        // 每次打包先删除dist文件
        new CleanWebpackPlugin('./dist', {
            root: path.join(__dirname, ''),
            verbose: true,
            dry: false
        }),
        // 公用部分合并
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['index', 'cart', 'vendor'],
            // 公用3次的就合并
            minChunks: 3
        }),
        // 把css以外联方式引入
        new ExtractTextPlugin("index.css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index', 'vendor'],
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'cart.html',
            template: './src/cart.html',
            // 引入哪些chunks
            chunks: ['cart', 'vendor'],
            // 配合UglifyJsPlugin使用,优化文件大小
            minify: {
                // 去除注释
                removeComments: true,
                // 去除空格
                collapseWhitespace: true
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery'
        }),
        new webpack.optimize.UglifyJsPlugin({
            // 警告压缩
            compress: {
                warnings: true
            }
        })
    ]
}