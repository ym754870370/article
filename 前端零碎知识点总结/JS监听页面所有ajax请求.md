
## JS监听：
在开发Chrome扩展的时候偶然搜到的

```javascript
var originOpen = XMLHttpRequest.prototype.open;
var originSend = XMLHttpRequest.prototype.send;

// 重写open
XMLHttpRequest.prototype.open = function () {
  // this.addEventListener('loadend', function(){ });
  // this.addEventListener('readystatechange', function (obj) { });

  this.addEventListener('load', function (obj) {
    var url = obj.target.responseURL; // obj.target -> this
    console.log('load', url, this.status, this.response);
  });

  originOpen.apply(this, arguments);
};

// 重写send
XMLHttpRequest.prototype.send = function () {
  console.log('send', arguments);
  originSend.apply(this, arguments);
};
```
原理非常简单，上面的代码是修改 XMLHttpRequest 原型上的 open 方法，在 open 方法中获取到当前的 xhr 对象实例，并监听 load/loaded 事件，这样就能在数据响应时获取返回结果了；

如果需要监听 send 方法，也是同理，可以在 send 方法中获取到一些请求的信息；或者在发送之前修改一些数据、请求头之类的；

最早想过这个问题，当时设想的是直接覆盖 onreadystatechange，但是它属于事件，是没法进行覆盖的，行不通，实际中没有用到此功能，也就没有深究；原来一直都忽略了 open、send 方法；

需要说一点，这种方式只能监听 XMLHttpRequest 发出的请求，JSONP 这类请求就监听不到了；


## CHROME插件监听

//监听所有请求
chrome.webRequest.onBeforeRequest.addListener (
 
    function(details) {
    
        chrome.tabs.query({active:true},function(tab){
            // 当前页面的url
            var pageUrl = tab[0].url;
            // 在这可以写判断逻辑，将请求cancel掉，或者将请求打印出来
            console.log("current url -> " + pageUrl);
        });
 
    },
     
    {urls:["http://log.m.xxxxxx.com/*"]},  //监听页面请求,你也可以通过*来匹配。
    ["blocking"] 
