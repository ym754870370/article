## MVC模式(数据 视图 控制器)
```
// 页面加载后创建MVC对象 并 自执行 生成对应的页面
$(function() {

  // 初始化
  var MVC = MVC || {};
  MVC.model = function(){}()
  MVC.view = function(){}()
  MVC.ctrl = function(){}()
})

... 
```
### model 数据层
```
MVC.model = function() {
  // 内部数据对象
  var M = {}

  // 通过请求获取的数据
  M.data = {}

  // 配置数据
  M.conf = {}

  return {
    getData: function(m) {
      return M.data[m]
    },
    getConf: function(c) {
      return M.conf[c]
    },

    setData: function(m, v) {
      M.data[m] = v;
      return this;
    },

    setConf: function(c, v) {
      M.data[c] = v;
      return this;
    }
  }
}
```
### view 视图层

```
MVC.view = function() {
  var M = MVC.model;
  
  // 内部视图创建方法对象
  var V = {}
  
  // 获取视图接口方法
  return function(v) {
    V[v]();
  }
}
```


### ctrl 控制器

特点： 交互逻辑 特效，  利用 Model 层的 配置数据变化 调用 View层 对应的 视图方法 和 Model层的data 去实现 对应的页面展示

```
MVC.ctrl = function() {

  var M = MVC.model;

  var V = MVC.view;

  // 创建 控制器方法对象
  var C = {}
}
```

## 个人理解
MVC 拆分成三层

1. Model 层中 存放 与服务端获取的 数据 Data 和 页面交互等所需要的 配置 参数对象 Conf

2. View 层 

   创建视图模块的方法： 利用Model 层中的数据Data 和 **配置参数Conf(条件)**  去用 **(用原生JS 或者 调用 HTML,CSS模板)** 生成 对应 的DOM 


3. Ctrl 层 的方法

    对视图中的 元素 增加 事件监听，当 产生某种 事件后 

    1. 去调用model 层中的 更改 配置参数 的方法 setConf 然后再调用视图层的方法 重新 生成 对应视图
      
        或者 

    2.  直接操作 视图层 的DOM  从而 实现一定的效果


弊端： 视图层 创建 视图 时 需要 频繁 调用 Model层的 数据，使得 视图层 和 模型层  耦合在一起，降低了 视图创建的 灵活性 和 复用性。·


![avatar](../IMG/mvc.jpg)