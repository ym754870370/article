# 准备
## 数据类型
```
    基本类型
 1. undefined
 2. null
 3. number
 4. string
 5. boolean
 6. symbol
 7. bigInt

    引用类型
 8. object
```

## 检测数据类型的方式
```
  1. typeof
    [],null,对象都会判断成object
  2. instanceof
    只能判断引用类型
  3. constructor
    若构造函数的prototype被改变则判断失效
  4. Object.prototype.toString.call();
    因为数组，fuction等object的实例都重写了toString方法，所以需要用Object.prototype.toString,而不是 Object.toString;
```

## 检测数组的方法
```
    var cur = [];

    1. Object.prototype.toString.call(cur) === '[object Array]'

    2. cur.__proto__ === Array.prototype;

    3. Array.isArray(cur)

    4. cur instanceof Array

    5. Array.prototype.isPrototypeOf(obj);

```

## 为什么typeof null 为 object
```
    因为类型值都存储在32的单元中，object 用 000 记录，而null的值是 0，则和 000 其实一样，所以会返回object

```


## 0.1 + 0.2 !== 0.3
```
    因为双精度浮点数部分只有53位有效数字，而number遵循IEEE 754标准，使用64位固定长度来表示，则转化为十进制时就产生了误差
```

## 箭头函数区别
```
    1. 书写简洁
    2. 箭头函数继承来的this为上下文的this值，且不会改变
    3. 无arguments
    4. 无prototype
    5. 不能用作Generator函数，无法使用yeild
```

TODO: 待深入
## Proxy






## 什么是DOM 什么是BOM?
```
    DOM: 文档对象模型, 核心为 document


    BOM: 浏览器对象模型， 核心为 window

    window.document

```

## 什么是axios
```
    axios是一个处理ajax交互的库，对原生ajax在es6环境下做了封装。

```


TODO: 待深入
## 继承




## 内存泄漏
```
    1. 全局变量
    2. 计时器或毁掉函数
    3. DOM元素的引用不进行删除
    4. 闭包
```