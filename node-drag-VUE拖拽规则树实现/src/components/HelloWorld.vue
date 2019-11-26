<template>
  <div class="hello">
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
        :data-index-list="[...indexList, index]"
      >
        {{item.name}}
      </div>
      <Node class="node" v-show="item.children" :indexList="[...indexList, index]" :data="item.children" />
    </div>
  </div>
</template>

<script>
import Node from './HelloWorld.vue'
import { nextTick } from 'q';
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
    showClass(item) {
      if (this.$store.state.targetNode.key === item.key && !this.$store.state.isOutside) {
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
      const isOutside = this.$store.state.isOutside;
      this.$store.commit('changeState', {key: 'count',value: count});
      if(count === 0) {
        this.$store.commit('changeState', {key: 'isOutside',value: true});
      }
      
    },
    // enter元素后 监听鼠标的移动 判断 拖拽元素 是移动到 当前元素 上方还是 下方
    dragover(event) {
      const element = event.toElement;
      const isTop = !!(event.pageY <= (element.offsetTop + element.clientHeight/2));
      this.$store.commit('changeState', {key: 'isTop',value: isTop });
    },
    // end 结束时 拿到鼠标坐标点 判断是否在 拖拽区域内 在则进行 移动操作 不在则清除 节点信息
    dragend(event){
      const parent = document.querySelector('.drag-box');
      const isInX = !!(parent.offsetLeft <= event.pageX && event.pageX <= (parent.offsetLeft + parent.clientWidth));
      const isInY = !!(parent.offsetTop <= event.pageY && event.pageY <= (parent.offsetTop + parent.clientHeight));
      if(isInX && isInY) {
        const targetNode = this.$store.state.targetNode;
        const className = targetNode.className.split(' ')[1];
        const element = document.querySelector(`.${className}`);
        const targetList = element.dataset.indexList.split(',');
        const souceList = event.target.dataset.indexList.split(',');
        this.$store.commit('cahngeData', {targetList, souceList});
        this.$store.commit('changeState', {key: 'targetNode',value: {}});
      } else {
        this.$store.commit('changeState', {key: 'targetNode',value: {}});
      }
    },
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
  margin-left: 20px;
}
.drag {
  padding: 10px;
  border: 2px solid #fff;
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
</style>
