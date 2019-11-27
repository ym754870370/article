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