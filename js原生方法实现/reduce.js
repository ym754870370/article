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
