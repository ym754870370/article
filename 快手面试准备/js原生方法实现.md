## instanceOf 实现
```javascript

    function myInstanceOf(left, right) {
        let proto = Object.getPrototypeOf(left);
        let prototype = right.prototype;

        while(proto) {
            if (proto === prototype) {
                return true;
            }
            proto = Object.getPrototypeOf(proto)
        }
        return false;
    }

    数组，函数 instanceof Object 也为true
    [] instanceof Array 为true;
    ...
```

##  new 实现
```javascript
    
    function myNew(fn) {
        const obj = {};
        obj.__proto__ = fn.prototype;
        fn.call(obj);
        return fn;
    }
```

## call 实现