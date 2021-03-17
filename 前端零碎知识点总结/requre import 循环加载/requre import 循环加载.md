# JavaScript 模块的循环加载

## requrire 
```javascript
    require命令第一次加载改脚本就会执行整个脚本，并生成一个对象。

    {
        id: '', // 模块名
        exports: { ... }, // 模块输出的各个接口
        loaded: true, // 当前模块脚本是否执行完毕
        filename: '/home/ruanyf/tmp/a.js', // 文件的绝对路径
        paths: [
            '/home/ruanyf/tmp/node_modules',
            '/home/ruanyf/node_modules',
        ], // 可能是当前模块的位置集合
        parent: { Object }, // 父模块
     }

    做的事情： 
    1. Resolution ／ 解析路径 得出真正的绝对路径
         Module._resolveFilename() // 确定模块的绝对路径，如果是内置模块则不含路径返回
    2. Loading ／ 加载代码
         module.load() // 加载模块
        2.1 Wrapping ／ 包装
            function (exports, require, module, __filename, __dirname) {
                const m = 1;
                module.exports.m = m;
            }
        2.2 Evaluation ／ 评估执行
        2.3 Caching ／ 缓存



```
## require循环加载
```
    a执行加载b时，会中断a的执行，去执行b文件，b文件中再加载a，就会导致b中调用的a没有被完全执行，就会造成循环加载的坑。
```


## import
```javascript
    ES6模块的运行机制，遇到模块加载命令import时，不会去执行模块，而是只生成一个引用等到真的要用到时，再去模块内取值。


```





## import/export 和 require/exports区别
```
   1. import/export  浏览器有一定程度支持，使用上需要在<script>上增加type="module
      require/exports CommonJs只在node层运行使用
   2. require/exports 是运行时动态加载(运行时加载)，
      import/export 是静态编译(编译时存储引用),可以利用promise特性 上线动态加载
   3. require/exports 输出的是一个值的拷贝，import/export 模块输出的是值的引用
   4. import/export 导出的模块默认调用严格模式.
      require/exports 默认不使用严格模式，可以自定义是否使用严格模式


```