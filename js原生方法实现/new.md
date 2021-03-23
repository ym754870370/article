

## new 原理
1. 创建一个新对象
2. 这个新对象会被执行 原型连接
3. 将构造函数的作用域复制给新对象，this指向这个新对象
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象

```javascript
function new(func) {
  let target = {};
  target._proto_ = func.prototype;
  let res = func.call(target);
  if(typeof(res) == "object" || typeof(res) == "function") {
    return res
  }
  return target
}
```