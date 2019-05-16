#### react单向数据流 实现
```
  function child(props){
      this.props = props
  }
  function parent(props){ 
          this.props = props              
          this.state = '这是父函数的一个状态'
          this.childNodes  = new child(this.state); 
  }
  console.log(new parent('这是一个属性'));
```

#### 作用
    降低组件间通信的代码耦合

#### context ??? 不是很理解