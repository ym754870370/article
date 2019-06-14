if(!Array.prototype.reduce) {
    Array.prototype.reduce = function(callback) {
        'use strict'
        if(this === null) {
            throw new TypeError('Error!');
        }

        if(typeof callback !== 'function') {
            throw new TypeError(callback + 'is not a function');
        }

        var t = Object(this);
        var len = t.length >>> 0;
        var k = 0;
        var value;

        if(arguments.length == 2) {
            value = arguments[1];
        } else {
            while (k < len && !(k in t)) {
                k++;
            }
            if(k >= len) {
                throw new TyoeError('Reduce of empty array with no initial value');
            }
            value = t[k++];
        }
        for(; k < len; k++) {
            if(k in t) {
                value = callback(value, t[k], k, t);
            }
        }
        return value;
    }
}


Array.prototype.fakeReduce = function(fn, base) {
    if(typeof fn !== "function") {
        throw new TypeError("not function");
    }

    let initialArr = this;
    let arr = initialArr.concat(); // 得到数组的副本

    if (base) {
        arr.unshift(base); // 将基础值 插入
    }

    let index, newValue;

    while (arr.length > 1) {
        index = initialArr.length - arr.length + 1;  // 如果有基础知识 index 则从 0 开始 没有则从 1开始
        newValue = fn.call(null, arr[0], arr[1], index, initialArr);

        arr.splice(0, 2, newValue); // 每次执行完后 删除 前两个元素 并 将算出值 更新到 第一个元素
    }

    return newValue;
}
