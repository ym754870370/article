const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 会在打包结束后 自动生成一个htnl文件 并把打包完成的Js文件自动引入到当前的html中 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production', // 默认 production 压缩代码   development: 不会压缩代码
    entry: {
        main: './src/index.js',
    },
    devServer: {
        contentBase: './dist', 
        open: "true", //自动默认打开一个浏览器
        hot: true, //热更新
    },
    devtool: 'source-map',
    optimization: {
        usedExports: true,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.css$/,
                use: [ // loader 是从下到上 从右到左的执行顺序
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2, // 当文件有额外的 import引入 也支持走下面的2个loaders
                            modules: true, // 开启CSS的模块化打包
                        }
                    },
                    'sass-loader',
                     'postcss-loader' // 可以支持 增加厂商前缀 自动带上 -webkit- 前缀  会去默认使用插件 
                ]
            }
        ]
    },
    plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html',
            }),
            new CleanWebpackPlugin(['dist']), // 在打包之前  清除dist目录下所有的文件
            new webpack.HotModuleReplacementPlugin(), // 热更新支持
    ],
    output: {
        public: '/', // 保证终端路径
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bundle')
    }
}