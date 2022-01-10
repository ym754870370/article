## 常见的事件修饰符
```

    .stop: 同 event.stopPrapagation() 防止事件冒泡
    .prevent: 同 event.preventDefault() 防止默认事件行为被触发
    .capture: 与事件冒泡的方向相反，事件捕获由外到内
    .self: 只会触发自己范围内的事件，不包含子元素
    .once: 只会触发一次

```

TODO: 待深入
## v-model







TODO: 待深入
## keep-alive
```javascript
    



```





## Vue template到render的过程
```
    template => ast => render函数

    
    Vue在模板编译版本的码中会执行compileToFunctions 将template转化为render函数：

    1. 调用parse方法将template转化为ast
        AST元素节点分为：1. 普通元素 2. 表达式 3. 纯文本    
    2. 对静态节点做优化
        分析出静态节点，并打上标记，后面渲染可以直接跳过，静态节点生成的DOM永远不会改变
    3. 生成代码
        gennerate将AST编译成render字符串并将静态部分放到staticRenderFns中，最后通过new Function(``render``)生成render函数
```


## Vue 模板的编译原理
```
    1. 解析阶段，用大量正则表达式对tempalte字符串进行解析，将标签，指令，属性等转化为抽象语法书AST
    2. 优化阶段： 遍历AST对象，找到静态节点并标记，后期便于diff比较时优化runtime的性能
    3. 将最终的AST生成render函数字符串


```