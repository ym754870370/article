'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const entry = require('./entry');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const auditConfig = require(path.resolve('./audit_config.js'));

const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const templateRem = entry.getRem().devHtml;
const templateNormal = entry.getNormal().devHtml;

const devWebpackBaseConfig = (isUseRem = false) => {
    return {
        mode: 'development',
        module: {
            rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true }),
        },
        // cheap-module-eval-source-map is faster for development
        devtool: config.dev.devtool,

        // these devServer options should be customized in /config/index.js
        devServer: {
            clientLogLevel: 'warning',
            historyApiFallback: {
                rewrites: [
                    { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
                ],
            },
            https: false,
            hot: true,
            contentBase: false, // since we use CopyWebpackPlugin.
            compress: true,
            host: HOST || config.dev.host,
            port: PORT || config.dev.port,
            open: config.dev.autoOpenBrowser,
            overlay: config.dev.errorOverlay
                ? { warnings: false, errors: true }
                : false,
            publicPath: config.dev.assetsPublicPath,
            quiet: true, // necessary for FriendlyErrorsPlugin
            disableHostCheck: true,
            watchOptions: {
                poll: config.dev.poll,
            },
        },
        optimization: {
            moduleIds: 'hashed',
            namedChunks: true,
            namedModules: true,
            runtimeChunk: {
                name: 'manifest',
            },
            splitChunks: {
                chunks: 'all',
                name: false,
                cacheGroups: {
                    libs: {
                        name: 'vendor-libs',
                        minChunks: 2,
                        priority: 10,
                        test: /[/]node_modules[/]/,
                        chunks: 'initial', // 只打包初始时依赖的第三方
                    },
                    vendor: {
                        name: 'vendor',
                        test: chunks => chunks.context && chunks.context.indexOf('node_modules') !== -1,
                        minChunks: 1,
                        chunks: 'all',
                        priority: 1,
                        reuseExistingChunk: true,
                    },
                    default: false,
                },
            },
        },
        plugins: [
            // 支持编译时增加全局变量
            new webpack.DefinePlugin({
                'process.env': require('../config/dev.env'),
            }),

            // 支持热更新
            new webpack.HotModuleReplacementPlugin(), 
            // TODO: 优化相对路径展示
            // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
            // new webpack.NoEmitOnErrorsPlugin(),
            // 加载提前打包好的 静态资源文件 提升项目的构建效率
            // 此插件依赖 html-webpack-plugin，由于预构建项目内并不需要生成中间 html 文件，因此我们可以不用像示例那样配置 HtmlWebpackPlugin 来生成 .html 文件
            new AddAssetHtmlWebpackPlugin({
                filepath: path.resolve(__dirname, './dll/vendor.dll.js'),
            }),
            // 支持直接在 html 底部 增加<script src="./static/dll.vendor.js"></script> 的方式进行引入
            // DllReferencePlugin 就是将 DllPlugin 打包的文件获取
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./dll/vendor-manifest.json'),
            }),
            // copy custom static assets
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, '../static'),
                    to: config.dev.assetsSubDirectory,
                    ignore: ['.*'],
                },
            ]),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, './dll'),
                    to: 'dll',
                },
            ]),
        ],
    };
};

// set rem normal config
let remWebpackConfig = merge(baseWebpackConfig.rem, devWebpackBaseConfig(true));
let normalWebpackConfig = merge(baseWebpackConfig.normal, devWebpackBaseConfig(false));

remWebpackConfig = merge(auditConfig.dev, remWebpackConfig);
normalWebpackConfig = merge(auditConfig.dev, normalWebpackConfig);

remWebpackConfig.plugins = remWebpackConfig.plugins.concat();
normalWebpackConfig.plugins = normalWebpackConfig.plugins.concat();
// set rem plugins
for (let i of templateRem) {
    remWebpackConfig.plugins.push(i);
}

// set normal plugins
for (let i of templateNormal) {
    normalWebpackConfig.plugins.push(i);
}

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            remWebpackConfig.devServer.port = port;
            normalWebpackConfig.devServer.port = port;
            // Add FriendlyErrorsPlugin
            const errorSolution = new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${remWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined,
            });

            remWebpackConfig.plugins.push(errorSolution);
            normalWebpackConfig.plugins.push(errorSolution);

            const commonConfig = utils.getCommonConfig(remWebpackConfig, normalWebpackConfig);
            if (!commonConfig.length) {
                const err = new Error('config/entry.json配置为空!');
                reject(err);
            } else if (commonConfig.length === 1) {
                resolve(commonConfig[0]);
            } else {
                resolve(commonConfig);
            }
        }
    });
});

