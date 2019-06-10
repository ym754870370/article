#### 1. 如何判别null?
    let a = null;
    typeof a === 'object' && !a; // true 为Null

#### 2. typeof function a(){} === 'function'; // true
     function是js的一个内置类型？实际上是object的一个‘子类型’

#### 3. JS没有真正意义上的整数
     42.0 === 42 // true

#### 4. 属性运算符 数值需要转化为变量 才可调用方法
     42.toFixed(3) // 报错
     42..toFixed(3) // 42.000 第一个.转化为属性 第二个.则搜索当前属

#### 5. window.isNaN() 缺陷  使用 Number.isNaN()
     window.isNaN()这个方法 只做了 参数 是否为数字 是否不是NaN的处理
     这就导致 所有非数字类型 也会返回true

#### 6. -0存在的意义
     - 相当于一个符号位，用来代表一些信息(比如移动的方向),为了防止这部分信息的丢失，所以保留了0值得符号位

####  7. 复制 和 引用
    简单值：null undefined 字符串 数字 布尔值 symbol
           利用值复制的方式进行传值

    复合值： 对象 函数
           利用引用复制的方式来传值

#### 8. 创建一定长度的数组
     Array.apply(null, {length: 3}) // [undefined, undefined, undefined] ，可被map遍历

     new Array(3) // [empty × 3]  不可被map遍历

#### 9. symbol类型 符号类型
    符号是具备唯一性的特殊值，用来命名对象属性不容易导致重名
    主要用来创建 私有 或 特殊属性, 它不与任何值相等

    显式转换可以 String(symbol) // 'Symbol()'
    隐式转换会报错 symbol + '' //TypeError

#### 10. 数组的 toString()
      会将所有单元字符串化，用','进行连接
      [1,2,3].toString(); // '1,2,3'

#### 11. JSON.stringify(a, b, c)
      在遇到undefined function symbol 时  会自动忽略
      当遇到包含循环引用的对象 时 会提示错误

      a: 必传参数
      b: 可选参数
          数组 则为 a 中需要被转化的参数名
          方法 则为处理参数的逻辑，返回需要被转化的参数
      c: 可选参数 指定输出的缩进格式

#### 12.快速拿到当前时间戳的方法
        timestamp = +new Date(); // 利用 + 进行强制转换
        Date.now() 、 Date().getTime()

#### 13. ~ 用处
      a.indexOf('a') != -1
      a.indexOf('a') 或 !== // 可以避免抽象渗漏 会将 -1 转换为假值0 其他全部转换为真值

#### 14. &&  ||  ? : 理解
      a && b 1次   a ? a : b  2次
      a || b 1次   a ? b : a  2次

      不同点，a执行次数的区别

      && 的优先级 高于 ||

#### 15. ES7中提到了 do 浏览器尚不支持
      可以将语句封装赋给变量
      a = do {
        if(true){
          b = 1 + 1
        }
      }
      a // 2

#### 16. HTML 创建 id DOM元素同时会创建同名的全局变量

#### 17. 什么是事件循环？
       事件循环把自身的工作分成一个个任务并顺序执行
       当有事件需要运行，事件循环就会运行，直到队列清空，事件循环的每一轮称为一个tick。

#### 18. 回调的缺点
    非线性，非顺序的，不容易理解，

#### 19 promise
     promise本身就是为了解决异步，对其中的发送请求，然后返回值后再执行resolve或者reject 不是很理解
     
     用promise去发起请求，请求成功或失败后调用promise内的resolve或reject作为回调函数，并传入参数

     promise是采用了 单决议的机制，且无法被外部取消

     promise在过程中出现错误，(如果不做好处理，存在类似于try catch一样，吞掉错误信息)
       1. 需要启用下一个 then方法 去捕捉
       2. 最后配置 catch方法去捕捉
       3. 最后配置 done方法去捕捉(还没有纳入ES6标准)

      .all([p1, p2]).then([p1res, p2res]),值得返回顺序和事件的调用顺序保持一致，与事件完成顺序无关

#### generater
      1. yield 需要通过 .next()去执行，那dva中的 请求是是怎么继续执行的，因为我们并没有手动写.next()???
      dva 其实分装了方法 put call,其内部实际调用了 .next()方法，使得我们使用起来无感知


```javascript

      function *smt(){
	let nv;	
	while(true) {
		if(nv === undefined) { nv =1;
		} else {
			nv = (3*nv) + 6;
		}
		yield nv; 
            }
      }
      for(var v of smt()) {
            console.log(v);
            // 跳出循环
            if(v > 500) { bteak;}
      }

      // 传递给变量后会存下之前的状态，第一次执行后每次都会从yield开始
      var it = smt()
      
      it.next().value;

      smt().next().value;

```
      async await 不太理解
      254 - 286 需要重新看，比较吃力，无法理解