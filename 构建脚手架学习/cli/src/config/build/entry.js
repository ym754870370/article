/**
 * @description 获取entry与Htmlplugin多页配置入口
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const config = require(resolve('./audit_config.js'));
const entryConfig = config.entry;

const core = () => {
    const rem = {
        devHtml: [],
        proHtml: [],
        entry: {},
    };
    const normal = {
        devHtml: [],
        proHtml: [],
        entry: {},
    };

    const entryKeys = Object.keys(entryConfig);
    entryKeys.map((key) => {
        const res = entryConfig[key];
        const chunks = [res.chunkName, 'manifest', 'vendor', 'vendor-libs'];
        const devConfig = {
            filename: res.filename,
            template: `${resolve('./')}${res.template}`,
            chunks: chunks,
            // vendor: '/dll/vendor.dll.js',
            isDev: true,
            inject: true,
            SLARDAR_BID: config.SLARDAR_BID,
        };
        const proConfig = {
            filename: res.filename,
            template: `${resolve('./')}${res.template}`,
            chunks: chunks,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            },
            // chunksSortMode: 'dependency',
            SLARDAR_BID: config.SLARDAR_BID,
        };

        if (res.isUseRem) {
            rem.devHtml.push(new HtmlWebpackPlugin(devConfig));
            rem.proHtml.push(new HtmlWebpackPlugin(proConfig));
            rem.entry[res.chunkName] = `${resolve('./')}${res.jsTplPath}`;
        } else {
            normal.devHtml.push(new HtmlWebpackPlugin(devConfig));
            normal.proHtml.push(new HtmlWebpackPlugin(proConfig));
            normal.entry[res.chunkName] = `${resolve('./')}${res.jsTplPath}`;
        };
    });
    console.log("resolve('src'): ", resolve('src'));
    return {
        rem,
        normal,
    };
};

module.exports = {
    getRem: () => {
        const rem = core().rem;
        return rem;
    },
    getNormal: () => {
        const normal = core().normal;
        return normal;
    },
};
