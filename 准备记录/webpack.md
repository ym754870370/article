# Webpack
## 1. webpack配置，loader、plugin 的区别
    
    1. loader: 转换器，要针对资源文件的加载，去编译或转化文件，执行顺序为最后一个先执行然后执行结果作为参数传递至上一个

    2. plugin: 扩展器，主要是偏向于工程层面，如扩展变量，优化性能，增加一些的功能，plugin可以通过其丰富的自定义功能和生命周期时间去控制打包流程的每个环节。

## 2. webpack性能优化
   1. babel编译优化
   ```javascript
    module.exports = {
        module: {
            rules: [
            {
                // js 文件才使用 babel
                test: /\.js$/,
                loader: 'babel-loader',
                // 只在 src 文件夹下查找
                include: [resolve('src')],
                // 不会去查找的路径
                exclude: /node_modules/
            }
            ]
        }
    }
    // 可以将 Babel 编译过的文件缓存起来，下次只需要编译更改过的代码文件即可，这样可以大幅度加快打包时间
    loader: 'babel-loader?cacheDirectory=true'

   ```
    2. HappyPack
    
    HappyPack 可以将 Loader 的同步执行转换为并行的，这样就能充分利用系统资源来加快打包效率了

    ```javascript
        module: {
            loaders: [
                {
                test: /\.js$/,
                include: [resolve('src')],
                exclude: /node_modules/,
                // id 后面的内容对应下面
                loader: 'happypack/loader?id=happybabel'
                }
            ]
            },
        plugins: [
            new HappyPack({
                id: 'happybabel',
                loaders: ['babel-loader?cacheDirectory'],
                // 开启 4 个线程
                threads: 4
            })
        ]

    ```

    3. DllPlugin
        DllPlugin 可以将特定的类库提前打包然后引入。这种方式可以极大的减少打包类库的次数，只有当类库更新版本才有需要重新打包，并且也实现了将公共代码抽离成单独文件的优化方案。
        构建时通过DllReferencePlugin 引用到需要的预编译和依赖中
    ```javascript
        // 单独配置在一个文件中
        // webpack.dll.conf.js
        const path = require('path')
        const webpack = require('webpack')
        module.exports = {
            entry: {
                // 想统一打包的类库
                vendor: ['react']
            },
            output: {
                path: path.join(__dirname, 'dist'),
                filename: '[name].dll.js',
                library: '[name]-[hash]'
            },
            plugins: [
                new webpack.DllPlugin({
                // name 必须和 output.library 一致
                name: '[name]-[hash]',
                // 该属性需要与 DllReferencePlugin 中一致
                context: __dirname,
                path: path.join(__dirname, 'dist', '[name]-manifest.json')
                })
            ]
        }
    ```
    4. 代码压缩
    5. Tree Shaking
        Tree Shaking 可以实现删除项目中未被引用的代码, Webpack 4，开启生产环境就会自动启动这个优化功能。

    6. Uglify-Js-Plugin 支持使用UglifyJS 去压缩优化JS代码
        => terser-webpack-plugin 并行处理多个子任务，效率会更加的提高
    7. optimize-css-assets-webpack-plugin 对css 重复数据进行删除并压缩
    8. extract-text-webpack-plugin 提取css webpack3
    9. mini-css-extract-plugin 提取css webpack4
    10. webpack-bundle-analyzer 对文件进行可视化展示
    11. Html-webpack-plugin录入常用变量
    12. MinChunkSizePlugin 对js文件进行压缩合并
    
#### 3. webpack 编译流程
        entry: 开始构建的文件入口
        Output: 如何命名输出的文件以及输出的目录
        Module: 模块
        Chunk: 编译输出的产物，主要使用splitChunksPlugin去分割

        1. 用yargs(解决处理命令参数)进行参数解析 解析合并webpack.config.js和shell option配置项，激活webpack 插件的加载
        
        2. 初始化 webpack  发射事件 WebpackOptionsApply: entryOption
            2.1 初始化 Compiler对象, 负责文件监听和启动编译, 全局至于一个Compile实例
            2.2 注册NodeEnvironmentPlugin插件
            2.3 挂载options中的plugin
            2.4 使用webpackOptionsApply初始化基础插件
        
        3. run 开始编译 
            发射事件
                1. beforeRun
                2. beforeCompile
                3. compile
                4. thisCompilation
                5. compilation
            3.1 调用compiler对象开始编译
            3.2 创建compilation对象：当webpack以开发模式运行时，每当检测到文件变化。一个新的Compilation对象就会被创建，包含了当前的模块资源、编译生成资源、变化的文件，提供了很多事件回调供插件做扩展。
                3.2.1 负责整个编译过程
                3.2.2 内部会保留compiler的引用
                3.2.3 this.entrys 入口
                3.2.4 this.chunks 代码块
                3.2.5 template
                    mainTemplate、chunkTemplate、hotUpdateChunkTemplate、runtimeTemplate、moduleTemplate
        
        4. make事件 触发SingleEntryPlugin 插件执行 分析入口文件，创建模块对象保存到Compilation上

        5. 对module 进行build
            触发回调事件
                1. Compliation: buildModule
                2. Compliation: successModule
                3. Compliation: finishModules
            1. 调用loader进行处理 runLoaders
            2. 使用acom 生成AST, 遍历AST
            3. 如何 遇到require依赖， 创建Dependency加入依赖数组
            4. module处理完毕后 再处理依赖的module
            5. 异步对依赖的模块进行处理build，如果 依赖还有依赖，则进行递归处理

        6. 调用seal方法进行封装，逐次对module和chunk进行整理，生成编译后的源代码、合并、拆分

        7. template.getRenderMainifest.render()
            1. 通过模板chunk生成，_webpack_require()的格式
            2. MainTemplate 处理入口文件的module
            3. ChunkTemplate: 处理非首屏，需要异步加载的module
            4. 生成的资源保存再compilation.assets中

        8. emitAssets 把Assets输出到outpt的path中
        
#### webpack流程
    1. 初始化： 
        启动构建，读取与合并配置参数.
        实例化Compiler.
        实例化Plugin对象，调用apply方法，给每个插件传入compiler实例的引用，便于插件调用webpack提供的API，同时会绑定Compilation对象的回调钩子
        给每一个Entry实例化EntryPlugin,为后面该Entry的递归解析工作做准备
    2. 编译： 从Entry发出，对每个Module穿行调用对应的Loader去翻译文件内容，再找到对应Module依赖的Module，递归地进行编译处理
        1. before-run: 清除缓存
        2. run 启动一次新的编译
        3. watch-run 监听模式下启动的编译，可以获取到哪些文件发生了变化导致重新启动一次新的编译
        4. compile 告诉插件开启新的编译，并传入compiler对象， 代表 整个webpack 从启动到结束的生命周期
        5. complilation： 检测到文件变化，创建一个新的Compilation对象, 只是代表一次新的编译。
                1. 使用loader去转换一个模块
                2. 在用loader对一个模块转换完后，使用Acorn解析转换后的内容，输出对应的抽象语法树(AST),方便webpack后面对代码进行分析
                3. 从配置的入口模块开始，分析AST, 遇到require,import时，便将导入的模块加入到依赖的模块列表中，同时对新找出的依赖模块递归分析，最终整理出所有模块的依赖关系。
                4. 所有模块的及其依赖都通过Loader转换完成后，根据依赖关系生成Chunk.
        6. after-compile 一次Compilation执行完成，这里会根据编译结果，合并出我们最终生成的文件名和文件内容。
        7. invalid: 当遇到文件不存在时，文件编译错误等异常时会触发该事件，该事件不会导致webpack退出
    3. 输出： 对编译后的Module组合成Chunk,把Chunk转换成文件，输出到文件系统
        1. 生成好所有需要输出的文件, 询问插件哪些文件需要输出，哪些不需要
        2. emit 实际输出文件，最后可以通过插件修改输出内容的地方
        3. after-emit 文件输出完毕
        4. done 成功完成一次编译和输出流程



## webpack如何处理异步模块？
    1. 会提供__webpack_require方法用于加载被分割出去 需要异步加载Chunk对应的文件
    2. 会提供webpackJsonp函数用于从异步加载的文件中安装模块
    3. webpack会将import/export 替换成 webpack自身的写法

## webpack如何执行插件？
    1. 维护一个Tapable类，实现事件流机制，把各个插件串联到一起
    2. 插件接受两个参数 constructor中接受用户给插件传入的所有配置 ，apply原型方法上接受compile实例

## 如何量化这次webpack的升级
    1. speed-measure-webpack-plugin: 分析整个打包的总耗时，以及每一个loader和每一个plugins的耗时，从而快速定位到可以优化的Webpack配置
    2. webpack-bundle-analyzer: 直观的给出每个文件打包的大小以及各自的依赖

## webpack文件如何在浏览器运行
    加载完所有的依赖，会生成一个自执行函数，
## output.path 和 output.publicpath
    publicpath： 可以设置为静态资源打包后的实际存储的路径
    path: 打包输出的结果存储在哪

## webpack按需加载
    如何保证相同的文件只加载一次？
        会定义一个installedChunks对象(installedChunks[chunkId])，存取异步js的promise回调，如果已经加载过，则返回一个空数组的promise.all([]),如果在加载过程中，则返回已经存储过的此文件对应的promise

    怎么判断文件加载完成？文件加载完成，怎么通知所有引入文件的地方？
        1. 在主文件中定义一个全局数组，并重写其push方法，在异步文件中执行此全局数组的push方法，对push方法实现回调监听
