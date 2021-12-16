## indexDB 学习

### 概念： 非关系型数据库，key value形式存储方式

### 连接数据库
```javascript
    const request = window.indexedDB.open(
        'name', // 数据库名称 
        1       // 版本号
    )
```


### onupgradeneeded 执行
#### 当数据库初建或更改version时可以调用

```javascript
    request.onupgradeneeded = function(event) {
        const thisDb = e.target.result;

        // 判断表是否存在 不存在则创建表
        // 如果存在仍执行创建 则会导致错误
        if (!thisDb.objectStoreNames.contains(tableName)) {
            const objectStore = thisDb.createObjectStore(
                tableName,               // tableName: 表名
                {
                    keyPath: 'id',       // keyPath: 索引键名
                    autoIncrement: true  // 支持自动生成key
                }
            );
        }
    }
```


### onsuccess
#### 当访问数据库成功时执行
```javascript
    // 注意： 一次打开indexedDB 是有生命周期的，无法将  transaction objectStore 缓存到外层进行使用
    //       每次使用需要重新 open 数据库 走 onsuccess方法

    request.onsuccess = function(event) {
        const thisDb = e.target.result;

        if (db.objectStoreNames.contains(tableName)) {
            // 必须通过 transaction 向数据库提出事务要求
            // transaction 有三种可用模式：readonly，readwrite，和 versionchange。
            const transaction = db.transaction([tableName], "readwrite");

            // objectStore 是 indexedDB 的数据存储机制，和 SQL 的表的地位一致
            const objectStore = transaction.objectStore(tableName);

        }
    }
```


### onerror
#### 当访问数据库失败时执行
```javascript
    request.onerror = function(event) {
        const thisDb = e.target.result;

     
    }
```


### cursor 游标 迭代器
#### 一个用来记录数组正在被操作的某个下标位置的迭代器
```javascript

    request.onsuccess = function(event) {
        const db = e.target.result;
        let transaction = db.transaction(['myObjectStore'], 'readonly')
        let objectStore = transaction.objectStore('myObjectStore')

        // 通过游标可以去除库中所有的索引及数据
        let request = objectStore.openCursor()
        let results = []
        request.onsuccess = e => {
            let cursor = e.target.result
            if (cursor) {
                // cursor.key  key值也可取
                results.push(cursor.value)
                cursor.continue()
            }
            else {
                // 所有的object都在results里面
            }
        }
    }
```

### 获取数据  get
```javascript
   
    request.onsuccess = function(event) {
        const db = e.target.result;
        let transaction = db.transaction(['myObjectStore'], 'readonly')
        let objectStore = transaction.objectStore('myObjectStore')

        // 获取数据
        let request = objectStore.get('100001')
        request.onsuccess = e => {
            let obj = e.target.result
        }
    }
```


### 添加数据  add
```javascript
    
    request.onsuccess = function(event) {
        const db = e.target.result;
        let transaction = db.transaction(['myObjectStore'], 'readwrite')
        let objectStore = transaction.objectStore('myObjectStore')

        // 新增
        let request = objectStore.add({
            id: '100001',
            name: 'Zhang Fei',
        });
    }
```

### 更新数据  put
```javascript
    
    request.onsuccess = function(event) {
        const db = e.target.result;
        let transaction = db.transaction(['myObjectStore'], 'readwrite')
        let objectStore = transaction.objectStore('myObjectStore')

        // 更新
        let request = objectStore.put({
            id: '100001',
            name: 'Zhang Fei11111',
        });
    }
```

### 删除数据  delete
```javascript
  
    request.onsuccess = function(event) {
        const db = e.target.result;
        let transaction = db.transaction(['myObjectStore'], 'readwrite')
        let objectStore = transaction.objectStore('myObjectStore')

        // 删除
        let request = objectStore.delete('100001');
    }
```


## 借鉴地址：https://www.tangshuang.net/3735.html#title-9-6