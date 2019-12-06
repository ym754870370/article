import Vuex from 'vuex';
import Vue from "vue";

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        count: 0,
        data: [
            {
              key: '1',
              name: '节点1',
              showChildren: false,
              children: [
                {
                  key: '1-1',
                  name: '节点1-1',
                  showChildren: false,
                  children: [
                    {
                      key: '1-1-1',
                      name: '节点1-1-1',
                      showChildren: false,
                      children: [],
                    }
                  ]
                },
                {
                  key: '1-2',
                  name: '节点1-2',
                  showChildren: false,
                  children: [
                    {
                      key: '1-2-1',
                      name: '节点1-2-1',
                      showChildren: false,
                      children: [],
                    },
                    {
                      key: '1-2-2',
                      name: '节点1-2-2',
                      showChildren: false,
                      children: [],
                    },
                    {
                      key: '1-2-3',
                      name: '节点1-2-3',
                      showChildren: false,
                      children: [],
                    }
                  ]
                }
              ]
            },
            {
              key: '2',
              name: '节点2',
              showChildren: false,
              children: [
                {
                  key: '2-1',
                  name: '节点2-1',
                  showChildren: false,
                  children: [
                    {
                      key: '2-1-1',
                      name: '节点2-1-1',
                      showChildren: false,
                      children: [],
                    }
                  ]
                },
                {
                  key: '2-2',
                  name: '节点2-2',
                  showChildren: false,
                  children: [
                    {
                      key: '2-2-1',
                      name: '节点2-2-1',
                      showChildren: false,
                      children: [],
                    },
                    {
                      key: '2-2-2',
                      name: '节点2-2-2',
                      showChildren: false,
                      children: [],
                    },
                    {
                      key: '2-2-3',
                      name: '节点2-2-3',
                      showChildren: false,
                      children: [],
                    }
                  ]
                }
              ]
            }
          ],
        node: {},
        targetNode: {},
        isTop: false,
        isOutside: true,
    },
    mutations: {
        changeState(state, data) {
          state[data.key] = data.value;
        },
        changeData(state, info) {
          const { targetList,  souceList } = info;
          const { data, isTop } = state;
          let souceInfo = data;
          const length = souceList.length;
          let sameParent = true;


          // 由于splice会改变原数据， 需要获取 放置节点 在改变后的 实际位置
          for(let i = 0 ; i < length; i++) {
            // 当拖拽元素 在 第一层时  如果 位置先于 放置节点 则 将放置节点数提前一位
            if(length === 1) {
              if (souceList[i] < targetList[i]) {
                targetList[i] = targetList[i] - 1;
              }
            }
            // 当拖拽元素 在大于一层 时  判断 拖拽元素 与 放置元素 是否属于同一父集 属于则 将对应 拖拽元素的 最后一位的 放置元素节点 提前一位
            if(length > 1 && i < length - 1 && i > 0) {
              if(targetList[i-1] !== souceList[i-1] || !sameParent) {
                sameParent = false;
              }
            } else {
              if(sameParent && i !== 0) {
                if (Number(souceList[i]) < Number(targetList[i])) {
                  targetList[i] = targetList[i] - 1;
                }
              }
            }
          }

          for(let i = 0; i < length; i++) {
              if(length - 1 === i) {
                  souceInfo = souceInfo.splice(souceList[i], 1);
              } else {
                  souceInfo = souceInfo[souceList[i]].children;
              }
          }
          let targetInfo = data;
          targetList.forEach((v, index) => {
              if(index === targetList.length -1) {
                  if(isTop) {
                      targetInfo.splice(v, 0, souceInfo[0]);
                  } else {
                      targetInfo.splice(v+1, 0, souceInfo[0]);
                  }
                  
              } else {
                  targetInfo = targetInfo[targetList[index]].children;
              }
          })
          state.data = data;
        },
        changeShowChildren(state, indexList) {
          const { data } = state;
          let res = data;
          for(let i = 0; i < indexList.length; i++) {
            if(i === indexList.length - 1) {
              res[indexList[i]].showChildren = !res[indexList[i]].showChildren;
            } else {
              res = res[indexList[i]].children;
            }
          }
          // state.data = res;
        }
    }
})

export default store;