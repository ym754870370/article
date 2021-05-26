
// const fs = require('fs');
const { resolve } = require('path');
// const shell = require('shelljs');
const chalk = require('chalk');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const _ = require('underscore-contrib');
const webpackDevServerOptions = require(`${__dirname}/config/build/webpack.dev.conf.js`);

// 获取webpack dev config
const getDevConfig = async () => {
    let config = [];
    await webpackDevServerOptions.then(data => {
        config[0] = data;
    });
    return config;
};
const auditDev = async () => {
    const config = await getDevConfig();
    const host = config[0].devServer.host;
    const port = config[0].devServer.port;
    _.map(config[0].entry, (value, key) => {
        config[0].entry[key] = [
            `webpack-dev-server/client?http://localhost:${port}/`,
            'webpack/hot/dev-server',
            `${resolve('./')}/src/router/js_tpl/${key}.js`,
        ];
    });

    config[0].output.publicPath = `http://${host}:${port}/`;

    config.plugins = (config.plugins || []).concat([
        new webpack.HotModuleReplacementPlugin(),
    ]);

    const compiler = webpack(config[0]);
    const server = new WebpackDevServer(compiler, config[0].devServer);
    server.listen(port, host, err => {
        if (err) {
            console.log(chalk.blue(err));
        }
    });
};
auditDev();
// module.exports = auditDev;
