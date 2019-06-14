##  promise
     promise本身就是为了解决异步，对其中的发送请求，然后返回值后再执行resolve或者reject 不是很理解
     
     用promise去发起请求，请求成功或失败后调用promise内的resolve或reject作为回调函数，并传入参数

     promise是采用了 单决议的机制，且无法被外部取消

     promise在过程中出现错误，(如果不做好处理，存在类似于try catch一样，吞掉错误信息)
       1. 需要启用下一个 then方法 去捕捉
       2. 最后配置 catch方法去捕捉
       3. 最后配置 done方法去捕捉(还没有纳入ES6标准)

      .all([p1, p2]).then([p1res, p2res]),值得返回顺序和事件的调用顺序保持一致，与事件完成顺序无关

      promise具备三种状态： pending  fulfilled  rejected

```javascript
      function Promise(callback) {
            const self = this;
            self.status = 'PENDING';
            self.data = undefined; // Promise的值

            self.onResolvedCallback = [];
            self.onRejectedCallback = [];
            callback(resolve, reject);

            function resolve(value){
                  if(self.status == 'PENDING') {
                        self.status = 'FULFILLED';
                        self.data = value;
                        for(let i = 0; i < self.onResolvedCallback.length; i++) {
                              self.onResolvedCallback[i](value)
                        }
                  }

            }

            function reject(error){
                  if(self.status == 'PENDING') {
                        self.status = 'REJECTED';
                        self.data = error;
                        // 依次执行失败之后的函数栈
                        for(let i = 0; i < self.onResolvedCallback.length; i++) {
                              self.onResolvedCallback[i](value)
                        }
                  }
            }
      }

      Promise,prototype.then = function(onResolved, onRejectd) {
            const self = this;
            let promise2;

            // 根据标准，如果then的参数不是function,则我们需要忽略它，此处以如下方式处理
            onResolved = typeof onResolved === 'function' ? onResolved : function(value){}; 
            onRejectd = typeof onRejectd === 'function' ? onRejectd : function(reason){};

            if(self.status === 'resolved') {
                  return promise2 = new Promise(function(resolve, reject){
                        try {
                              const x = onResolved(self.data)

                              // 如果 .then()传入的依然是promise方法则直接区它的结果做为promise2的结果
                              if (x instanceof Promise) {
                                    x.then(resolve, reject);
                              }
                              resolve(x)
                        } catch (e) {
                              reject(e) // 如果出错则以捕获到的错误做为promise的结果
                        }
                  })
            }

            if(self.status === 'rejected') {
                  return promise2 = new Promise(function(resolve, reject){
                        try {
                              const x = onRejectd(self.data)

                              // 如果 .then()传入的依然是promise方法则直接区它的结果做为promise2的结果
                              if (x instanceof Promise) {
                                    x.then(resolve, reject);
                              }
                        } catch (e) {
                              reject(e) // 如果出错则以捕获到的错误做为promise的结果
                        }
                  })
            }

            if(self.status === 'pending') {
                  return promise2 = new Promise(function(resolve, reject) {
                        self.onResolvedCallback.push(function(value) {
                              try {
                                    const x = onResolved(self.data);
                                    if(x instanceof Promise) {
                                          x.then(resolve, reject)
                                    }
                              } catch (e) {
                                    reject(e)
                              }
                        })

                        self.onRejectedCallback.push(function(reason) {
                              try {
                                    const x = onRejected(self.data);
                                    if(x instanceif Promise) {
                                          x.then(resolve, reject)
                                    }
                              } catch (e) {
                                    reject(e)
                              }
                        })
                  })
            } 
      }

```

