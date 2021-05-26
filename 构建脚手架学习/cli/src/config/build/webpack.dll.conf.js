const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: [
            // 'vue',
            'vue/dist/vue.common.js',
            'vuex',
            'vue-touch',
            'popper.js',
            'babel-polyfill',
            'eventsource-polyfill',
            'axios',
            'qs',
            'lib-match',
        ],
    },
    output: {
        path: path.join(__dirname, 'dll'),
        filename: '[name].dll.js',
        /**
         * output.library
         * 将会定义为 window.${output.library}
         * 在这次的例子中，将会定义为`window.vendor_library`
         */
        library: '[name]_library',
    },
    plugins: [
        // DllPlugin 的主要思想在于将项目内的一些不经常更改的依赖（比如 lodash）提前打包，使得项目构建时忽略这些打包文件，从而减少构建时间，提升构建速度。
        new webpack.DllPlugin({
            context: __dirname,
            /**
             * path
             * 定义 manifest 文件生成的位置
             * [name]的部分由entry的名字替换
             */
            path: path.join(__dirname, 'dll', '[name]-manifest.json'),
            /**
             * name
             * dll bundle 输出到那个全局变量上
             * 和 output.library 一样即可。
             */
            name: '[name]_library',
        }),
    ],
};
