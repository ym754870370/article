'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const entry = require('./entry');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const auditConfig = require(path.resolve('./audit_config.js'));
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const env = require('../config/prod.env');

const templateRem = entry.getRem().proHtml;
const templateNormal = entry.getNormal().proHtml;

const prodBaseConfig = (isUseRem) => {
    return {
        mode: 'production',
        module: {
            // rules: utils.styleLoaders({
            //     sourceMap: config.build.productionSourceMap,
            //     extract: true,
            //     usePostCSS: true,
            // }),
        },
        devtool: config.build.productionSourceMap ? config.build.devtool : false,
        output: {
            path: config.build.assetsRoot,
            filename: utils.assetsPath('js/[name].[chunkhash].js'),
            chunkFilename: utils.assetsPath('js/[id].[name].[chunkhash].js'),
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
            // http://vuejs.github.io/vue-loader/en/workflow/production.html
            new webpack.DefinePlugin({
                'process.env': env,
            }),
            // TODO:待优化 支持使用UglifyJS 去压缩优化JS代码 webpack4.0可以有更优解
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false,
                    },
                },
                sourceMap: config.build.productionSourceMap,
                parallel: true,
            }),
            // 会将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件。因此，你的样式将不再内嵌到 JS bundle 中
            // new ExtractTextPlugin({
            //     filename: isUseRem ? utils.assetsPath('css/[name].[hash].rem.css') : utils.assetsPath('css/[name].[hash].css'),
            // }),
            // 对css的重复数据进行删除并压缩
            // new OptimizeCSSPlugin({
            //     cssProcessorOptions: config.build.productionSourceMap
            //         ? { safe: true, map: { inline: false } }
            //         : { safe: true },
            // }),
            // keep module.id stable when vendor modules does not change
            // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。
            new webpack.HashedModuleIdsPlugin(),
            // copy custom static assets
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, '../static'),
                    to: config.build.assetsSubDirectory,
                    ignore: ['.*'],
                },
            ]),
        ],
    };
};

// set rem normal config
let remWebpackConfig = merge(baseWebpackConfig.rem, prodBaseConfig(true));
let normalWebpackConfig = merge(baseWebpackConfig.normal, prodBaseConfig(false));


remWebpackConfig = merge(auditConfig.build, remWebpackConfig);
normalWebpackConfig = merge(auditConfig.build, normalWebpackConfig);


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

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');
    const comPlugin = new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
            '\\.(' +
            config.build.productionGzipExtensions.join('|') +
            ')$'
        ),
        threshold: 10240,
        minRatio: 0.8,
    });
    remWebpackConfig.push(comPlugin);
    normalWebpackConfig.push(normalWebpackConfig);
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    const newBundleAnalyzerPlugin = new BundleAnalyzerPlugin();
    remWebpackConfig.push(newBundleAnalyzerPlugin);
    normalWebpackConfig.push(newBundleAnalyzerPlugin);
}

const commonConfig = utils.getCommonConfig(remWebpackConfig, normalWebpackConfig);
let webpackConfig = null;
if (!commonConfig.length) {
    const err = new Error('config/entry.json配置为空!');
    console.log(err);
} else if (commonConfig.length === 1) {
    webpackConfig = commonConfig[0];
} else {
    webpackConfig = commonConfig;
}

module.exports = webpackConfig;
