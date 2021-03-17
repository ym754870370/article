## webpack

提供足够多的构建功能的同时兼具性能优化，比如对构建产出文件的体积进行监控。

### web应用的性能和用户体验

  1. 依赖打包--分析文件依赖关系，将同步依赖文件打包到一起，减少HTTP请求数量
  2. 资源嵌入--比如小于10kb的图片编译为base64格式嵌入文档，减少一次HTTP请求
  3. 文件压缩--减小文件体积，缩短请求时间
  4. hash指纹--通过给文件名加入hash指纹，以应对浏览器的缓存策略

### 资源经过构建后有以下改动

  资源定位
  1. 域名/路径改变 --- 开发环境 与 线上环境的域名肯定是不同的，不同类型的资源甚至不属于不同的CDN服务器上
  2. 文件名改变 --- 经过构建之后文件名被加上hash指纹，内容的改动导致hash指纹的改变

### hash 与 chunkhash

hash：每次检测到项目文件有改动就会创建一个compilation(汇编),针对改动生成全新的编译文件。compilation对象是针对项目中所有参与构建的文件，换句话说就是，只要任何一个内容有改变，compilation对象便会改变，hash就会变，任何一个文件的改变 都会影响所有资源的缓存。

chunkhash：将模块分开， 同步模块， 主模块， 异步模块， 根据自身的代码内容计算得出hash值 

### webpack 2.6.0
    让 import() 支持 制定动态导入模块生成的chunk文件的名称,按需加载(去服务器请求)模块
    ```
      import(
        /* webpackChunkName: "my-chunk-name" */
        /*webpackMode: "lazy" */
        'module'
      )
    ```

### externals
```javascript

  // 声明组件包 不会被打包到bundle.js中  可以支持import引用 当前组件包没有会去 script或者父集依赖中调用
  externals: [
      {
          vue: {
              root: 'Vue',
              commonjs: 'vue',
              commonjs2: 'vue',
              amd: 'vue'
          },
          axios: 'axios',
          'byted-tea-sdk': 'byted-tea-sdk',
          'vue-i18n': 'vue-i18n',
      },
  ],
```


### loader 和 plugin 的区别
```
  loader: 转换器，要针对资源文件的加载，去编译或转化文件，执行顺序为最后一个先执行然后执行结果作为参数传递至上一个

  plugin: 扩展器，主要是偏向于工程层面，如扩展变量，优化性能，增加一些的功能，plugin可以通过其丰富的自定义功能和生命周期时间去控制打包流程的每个环节。

```