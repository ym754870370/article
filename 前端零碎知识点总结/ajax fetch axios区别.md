## ajax fetch axios的区别

jQuery.ajax提供 了对jsonp的支持

axios则没有

axios是对ajax也就是XMLHttpRequest(XHR)的一层封装

fetch 则是 和 XMLHttpRequest 同级的 JS原生API

axios与fetch 都基于promise实现

fetch 默认不携带cookie

fetch在 http 状态为 400, 500等不会 reject

fetch 自身不支持超时timeout处理

fetch 不支持 jsonp

JSONP是外链一个js资源，并不是真正的ajax

JSONP 更应该理解成 跨域的一种方式