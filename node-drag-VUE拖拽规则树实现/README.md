## 实现前 我所思考的一些问题点
### 1. 拖拽有哪些事件？
#### 绑定在拖拽目标上
| 事件名称 | 事件描述 |
| :-------- | --------:|
| dragstart | 当目标开始被拖拽时触发 |
| drag | 当目标在被拖拽移动时触发 |
| dragend | 当目标拖拽结束时触发 |

#### 绑定在放置目标上
| 事件名称 | 事件描述 |
| :-------- | --------:|
| dragenter | 当拖拽目标被拖拽进入放置目标时触发 |
| dragover | 当拖拽目标在被拖拽移动时经过放置目标时触发 |
| dragleave | 当拖拽目标在拖拽中离开放置目标时触发 |
| drop | 当放置目标被放置一个拖拽目标时触发 |
| dragexist | 当一个元素不再是被选取中的拖曳元素时触发(Firefox 特殊触发事件， 触发顺序: dragexist->dragleave->drop) |

### 2.如何获取拖动元素移动并覆盖到的目标元素？
* 利用 **dragEnter(event) =>  event.toElement** 可以拿到

### 3.如何时刻确定要移动的目标元素？
* dragEnter事件触发时进行绑定 
* dragLeave事件触发时进行解绑

### 4.如何判断是放在覆盖元素的上方还是下方呢？
* 拿到覆盖元素的node节点数据，通过 clientY 和最终拖拽结束时的 clientY 进行比较,就可以判断出上下关系
* drag和dragover方法 都可以实时的获取数据

### 5. 获取到DOM元素 如何 确实 树型数据节点呢？ 如何让两者产生绑定？
* 利用HTML 中的 **data-** 属性进行存值，给每一个 节点设置 唯一的类名，通过drag拿到dom节点的类名 再去 获取对应节点的 data- 数据

    
### 6. 如何判断元素到底是移动到 要覆盖的元素上方 还是 下方呢？
    通过dragover 中的 事件值判断 
    event.pageY <= (event.toElement.clientHeight/2 + event.toElement.offsetTop)
    true 则在上
    false 则在下

### 7. 如何快速锁定我拖拽的目标和覆盖的目标 在在树形数组中的位置呢？
```
利用HTML中的 data-path去存储每次遍历的index
    <div v-for="(item, index) in data" :key="item.key">
      <div
        :class="`drag drag-${item.key} ${showClass(item)}`"
        draggable="true"
        @dragstart="dragstart"
        @dragleave="dragleave"
        @dragenter="dragenter"
        @dragend="dragend"
        @dragover="dragover"
        :data-key="item.key"
        :data-path="`${path || path === 0 ? `${path}-` : ''}${index}`"
      >
        {{item.name}}
      </div>
 
 <node :path="`${path || path === 0 ? `${path}-` : ''}${index}`">
 
 这样可以存下当前元素的 每一次的index 从而快速锁定元素 
```

## 开发中遇到的问题
### 1. dragenter 与 dragleave的执行顺序和想象中存在差距！！
    执行顺序： 
        A -> B
        想象中执行顺序
        dragenterA -> dragleaveA -> dragenterB ->  dragleaveB
        真实执行顺序
        dragenterA -> dragenterB -> dragleaveA ->  dragleaveB
        
### 2. 鼠标松开就会触发leave事件，那我们如何判断 最后一次leave是鼠标在 覆盖元素上松开 还是 离开覆盖区域后松开呢？
我的想法
* 对父集的盒子进行监听，绑定 mouseenter 与 mouseleave 时间 判断最后一次松开鼠标是要进行节点替换 还是 不进行操作

实际情况
* 当选中元素时，只要鼠标未松开移出，mouseleave就不会被触发,当执行drag事件时，mouse事件都不会触发

#### 解决方法： 利用 dragend事件拿到 结束时的 pageX,pageY 然后与父盒子的offsetLeft 和 clientWidth 与 offsetTop 和 clientHeight  进行比较 判断 鼠标 是在 父盒子中结束 还是 在 父盒子外结束
```javascript
const isInX = !!(parent.offsetLeft <= event.pageX && event.pageX <= (parent.offsetLeft + parent.clientWidth));
const isInY = !!(parent.offsetTop <= event.pageY && event.pageY <= (parent.offsetTop + parent.clientHeight));
```

### node节点 循环的文件 **node.vue**

### vuex store数据处理文件 **store.js**

### 初始引入node节点文件   **App.vue**
