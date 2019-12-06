<template>
  <div class="hello">
    <div :class="`parent parent-${item.key}`" v-for="(item, index) in data" :key="item.key">
      <div
        :class="`drag drag-${item.key} ${showClass(item)}  ${dragClass(item)}`"
        draggable="true"
        @dragstart="dragstart"
        @dragleave="dragleave"
        @dragenter="dragenter"
        @dragend="dragend"
        @dragover="dragover"
        @drag="drag"
        @click="showChildrenSwitch([...indexList, index])"
        :data-key="item.key"
        :data-index-list="[...indexList, index]"
      >
        {{item.name}}
      </div>
      <!-- <div class="model-hover-box">
        <div class="model-hover-tag">编辑</div>
        <div class="model-hover">
          <p>添加子节点</p>
          <p>删除节点</p>
        </div>
      </div> -->
      
      <Node v-if="item.showChildren"  class="node" :indexList="[...indexList, index]" :data="item.children" />
    </div>
  </div>
</template>

<script>
import Node from './HelloWorld.vue'
export default {
  name: 'Node',
  props: {
    data: {},
    index: {
      type: Number,
      default: 0,
    },
    indexList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Node
  },
  methods: {
    // 展示子元素
    showChildrenSwitch(indexList) {
      this.$store.commit('changeShowChildren', indexList);
    },
    // 给拖拽元素 增加特别的 类名
    dragClass(item) {
       if (this.$store.state.node.key === item.key && !this.$store.state.isOutside) {
         return 'drag-node';
       }
       return '';
    },
    // 给 放置元素 增加 对应的样式
    showClass(item) {

      if (this.$store.state.targetNode.key === item.key && !this.$store.state.isOutside && this.$store.state.node.key !== item.key) {
        if(this.$store.state.isTop) {
          return 'showBorderTop';
        } else {
          return 'showBorderBottom';
        }
      }
      return '';
    },
    // 拖拽开始 拿到拖拽元素的有用信息 并存起来
    dragstart(event) {
      const node = {
        key: event.target.dataset.key,
        className: event.target.className,
      };
      this.$store.commit('changeState', {key: 'node',value: node});
    },
    // 当进入 要覆盖的元素时 先存下有用的信息
    dragenter(event) {
      event.preventDefault();
      const targetNode = {
        key: event.target.dataset.key,
        className: event.target.className,
      };
       // 由于 enter事件都是发生在leave前 所以用count来记录 是否真正的离开了
      const count = this.$store.state.count + 1;
      this.$store.commit('changeState', {key: 'targetNode',value: targetNode});
      this.$store.commit('changeState', {key: 'count',value: count});
      this.$store.commit('changeState', {key: 'isOutside',value: false});
    },
    // 当真正离开时 记录一下状态 去清除css hover的样式
    dragleave(event) {
      event.preventDefault();
      const count = this.$store.state.count - 1;
      this.$store.commit('changeState', {key: 'count',value: count});

      // 一种离开是 移出所有拖拽区域   另一种 是松开鼠标 结束拖拽时 触发 dragleave
      if(count === 0) {
        this.$store.commit('changeState', {key: 'isOutside',value: true});
      }
    },
    // enter元素后 监听鼠标的移动 判断 拖拽元素 是移动到 当前元素 上方还是 下方
    dragover(event) {
      let element = event.toElement;
      let x = 0, y = 0;
      const height = element.offsetHeight/2;
      while (element != null) {
          y += element.offsetTop;
          element= element.offsetParent;
      }
      const isTop = !!(event.pageY <= (y + height));
      this.$store.commit('changeState', {key: 'isTop',value: isTop });
    },
    // end 结束时 拿到鼠标坐标点 判断是否在 拖拽区域内 在则进行 移动操作 不在则清除 节点信息
    dragend(event){
      // console.log('event: ', event);

      // 问题来了 我为何不用 drag 监听坐标 而 是把 拖拽元素的 离开 拆成了两段
      const parent = document.querySelector('.drag-box');
      const isInX = !!(parent.offsetLeft <= event.pageX && event.pageX <= (parent.offsetLeft + parent.offsetWidth));
      const isInY = !!(parent.offsetTop <= event.pageY && event.pageY <= (parent.offsetTop + parent.offsetHeight));
      if(isInX && isInY) {
        const targetNode = this.$store.state.targetNode;
        const className = targetNode.className.split(' ')[1];
        // 或区域元素的父节点
        const parentElement = document.querySelector(`.parent-${targetNode.key}`);
        const node = this.$store.state.node;
        const nodeElemnt = document.querySelector(`.parent-${node.key}`);
        const targetElement = document.querySelector(`.${className}`);
        // 判断移动到的节点 是否 在 拖拽节点内部，如果在 则拒绝此次 拖拽
        if(nodeElemnt.contains(parentElement)) {
          return
        }
        const targetList = targetElement.dataset.indexList.split(',');
        const souceList = event.target.dataset.indexList.split(',');
        this.$store.commit('changeData', {targetList, souceList});
        this.$store.commit('changeState', {key: 'targetNode',value: {}});
      } else {
        this.$store.commit('changeState', {key: 'targetNode',value: {}});
      }
    },
    drag(event) {
      // if(event.pageY === 0 || event.pageX === 0) {
        // this.$store.commit('changeState', {key: 'isOutside',value: true});
      // }
    }
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin-left: 50px;
  text-align: left;
}
.node {
  margin-left: 40px;
}
.drag {
  padding: 10px;
  border: 2px solid #fff;
  cursor: pointer;
  position: relative;
  left: 10px;
  top: 10px;
}
.drag:hover {
  background-color: rgba(0,0,0,.1);
}

.showBorderTop {
  border-top: 2px solid blue;
}
.showBorderBottom {
  border-bottom: 2px solid blue;
}
.parent {
  position: relative;
  /* display: flex;
  flex-direction: column; */
}
.drag-node {
  color: #000;
}

/* .model-hover-box {
  position: absolute;
  z-index: 10;
  right: 20px;
  top: 0px;
  cursor: pointer;
}
.model-hover-tag {
  position: relative;
  z-index: 9;
}
.model-hover-box:hover .model-hover {
  display: block;
}
.model-hover {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100px;
  padding: 10px;
  display: none;
  background-color: #fff;
  border-radius: 2px;
  text-align: center;
} */
</style>
