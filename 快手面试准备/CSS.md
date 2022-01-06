## 选择器
```
id选择器

class选择器
属性选择器
伪类选择器

标签选择器
伪元素选择器

相邻兄弟选择器
子选择器
通配符选择器
通配符选择器
```

## 隐藏元素的方法
```
    1. display: none;
    2. visibility: none;
    3. position: relative; z-index: -1;
    4. position: absolute;
    5. opacity: 0;
    6: transform: scale(0,0) 缩小

    // TODO:了解
    7. clip/clip-path 裁剪
```


## link和@import区别
```
    1. link引入CSS,在页面载入时同步加载，@import需要页面完全载入后才会加载
    2. link是XHTML标签，无兼容问题，@import是css2.1提出，低版本浏览器不支持
    3. link 支持使用js去控制dom修改样式，@import不支持
```

## 改变位置建议使用translate 而不是定位
```
    transform或opcity不会触发浏览器重新布局或重绘，只会触发复合。
```


## CSS3有哪些新特性？
```
    1. 圆角
    2. 阴影和反射
    3. 文字特效
    4. 文字渲染
    5. 增加了旋转，缩放，定位，倾斜，动画，多背景
    6. 线性渐变
    7. 新增选择器(:not(.input))
    8. 伪元素的语法改成使用双冒号::
```

## css 预处理器 和 后处理器
```
预处理器： less,sass,stylus

后处理器： postCss，主要给css属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

使用原因：
    1. 结构清晰，便于扩展
    2. 书写方便，增加编码效率，轻松实现多重继承
    3. 屏蔽浏览器私有语法的差异
    4. 完美兼容CSS代码
```

## :: 和 : 的区别
```
1. (:) 用于CSS3 伪类 (::) 用于CSS3伪元素


```