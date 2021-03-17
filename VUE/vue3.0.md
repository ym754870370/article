# VUE3.0

## Proxy 深入响应式
```javascript
    const dinner = {
        meal: 'tacos'
    }

    const handler = {
        get(target, prop, receiver) {
            return Reflect.get(...arguments) // reflect保证原生行为可以正常执行
        }
    }

    const proxy = new Proxy(dinner, handler)
    console.log(proxy.meal)

```


## proxy/reflect和Object.defineProperty区别
### Object.defineProperty
  1. 只能劫持对象的属性，不对象新增属性需要遍历并重新绑定监听
  2. 对数组属性的监听成本过高且性能不佳
  3. 不能对ES6新增的数据结构set\map做出监听
  4. 兼容性不错
### Proxy
#### proxy
    1. 可以直接劫持对象达到监听的目的，并且返回的是一个新对象
    2. 兼容性较差

    3. proxy 对数组监听时，数组的push,pop等方法会调用两次get和set，一次设置值一次设置length,proxy将代理的数组转成了对象的形式，如下
      {
        0: '0',
        1: '1',
        length: 2,
        push: Array.prototype.push();
      }
  #### reflect
    1. 可以将this指向到接受对象
    2. Reflect对象一共有 13 个静态方法与proxy方法是一一对应的

## Setup

### setup如何生成data
```javascript


import { ref, toRefs, reactive }  from 'vue'
export default {
  name: 'Test',
  setup(){
    // 在setup中定义template模板使用的响应式变量，你得用ref或者reactive来定义
    // 这里的ref你可以理解成一个工厂类，传入的参数就是初始化的变量的值，跟组件的ref概念不能混淆
    // 定义单个变量，为了让大家明白意义，我跟vue2.0都进行下对比 
    // vue2.0,不管定义单个或者多个我们都是定义 在data里，如
    /*
       data(){
          return {
            name: '小哥哥'
          }
       }
    */
    // 在vue3.0中，如果你只需要定义一个响应式变量，那么你可以用以下ref
    // 可能你会疑惑既然是定义变量为什么不用let，var，而用const定义常量的，这里是因为你定义的是一个引用，name指向的永远是一个固定不变的指针地址
    const name = ref('小哥哥')
    // 注意点，这里要获取name的值怎么获取,通过定义的变量的。value
    console.log('拿到name的值：', name.value)
    // 检测某个值是不是响应式的可以用isRef
    
    // 每次都用.value去拿值的写法，是不是有点不适应，而且定义的变量多了我们也不可能定义一堆ref，看起来都丑
    // reactive 可以创建一个响应式数据，参数是一个对象
    const data = reactive({
       name: '帅的没人要'，// 这样创建的响应式数据就不用ref了，写起来是不是要方便点
        sex: '性别分不出'，
        arr: []
    })
    // 但是以上还是有个缺点，如果你在return里直接放上data,那你使用的时候每次都要data.name，data.sex也麻烦，<div>{{data.sex}}</div>
    // 你说你可以解构在return {...data} 如果你这样的，里面的数据都会变成非响应式的，vue3.0提供了一个满足你幻想的方法toRefs,使用了这个包装下，你就可以在return里使用解构了
    // 包装上面的data
    const  refData = toRefs(data)
    // 在data中都有个return ，这里当然也必须要有的，但是这里是所有方法计算属性都要通过这个返回
    // 有人疑惑，那我可以直接在这个return上定义变量吗，答案是可以，但是定义的变量不是响应式的，不可变化
    return {
      ...refData, // 你也可以直接在这里用...toRefs(data) 这样会简单点
      name,
      rules: [] //如果你有什么不会变化的数据，如规则啊，配置啊，可以直接在这定义而不需要通过ref和reactive
    }
    
  }
}


```


### setup如何使用method

```javascript

import { ref } from 'vue'
export default {
  name: 'Test',
  setup(){
    // 定义一个响应式数据
    const baby = ref('1岁bb')
   // 定义method,把方法名字在return里返回
   // 注意：这里用调用响应式的数据也就是您定义的vue2.0的data,不可以用this,这个setup函数在01里已经说明过了，这个时候相当于vue2.0的beforeCreate和created，这里一开始就会运行，还没有this的指向，是个undefined，访问所有你定义的响应式的变量都要.value去访问
    const wantToKnowBabysName = () => {
      console.log("oh,he is a " + baby.value)
    }
    const getData = () => {}
   // 对比vue2.0
   /*
   method: {
      wantToKnowBabysName(){
        console.log("oh,he is a " + baby.value)
      },
      getData() {
      }
    }
  */
   
    return {
      baby,
      wantToKnowBabysName,
      getData
    }
    
  }
}
```



### setup如何使用computed

```javascript

// 注意使用的时候引入computed
import { ref, computed} from 'vue'
export default {
  name: 'Test',
  setup(){
    // 定义一个响应式数据
    const baby = ref('嘎嘎嘎')
    // 定义翠花年龄
    const age = ref(28)
    // computed计算属性传入一个回调函数
    const areYouSureYouAreABaby = computed(() => {
      return `I'm sure,I'm a 300 month baby, ${baby.value}`
    })
    // set和get方式
    const setAge= computed({
      get() {
        return age.value + 10
      },
      set(v) {
        age.value = v - 10
      }
    })
   // 对比vue2.0
   /*
   computed: {
      areYouSureYouAreABaby (){
        return `I'm sure,I'm a 300 month baby, ${baby.value}`
      },
      setAge:{
        get(){
          return age + 10
        },
        set(v) {
          age = v - 10
        }
      }
    }
  */
   
    return {
      baby,
      age,
      areYouSureYouAreABaby 
    }
    
  }
}

```

### setup如何使用watch

```javascript

// 注意使用的时候引入watch
import { ref, watch, watchEffect } from 'vue'
export default {
  name: 'Test',
  setup(){
    // 定义一个响应式数据
    const baby = ref('嘎嘎嘎')
    const arr = ref(['翠花', '小红'])
    // 监听一个值的情况，有两种方式
    // watch 有三个参数：第一个是个getter（所谓getter写法就是你要写个getter函数）,第二个是个回调函数，第三个是个options(这个参数是放vue2.0的deep或者immediate等可选项)
    // 第一种：直接放ref
    watch(baby, () => {
      return `I'm sure,I'm a 300 month baby, ${baby.value}`
    })
   // 第二种：放ref的value值
   watch(() => baby.value, () => {
      return `I'm sure,I'm a 300 month baby, ${baby.value}`
    })
  
   // 监听多个值的时候 ,第一个参数是个数组，里面放监听的元素
   watch([baby,arr], (v, o) => { 
     // 这里的v,o也是数组，所以你取值的时候v[0],v[1]拿到第几个元素的变化
     ...
   }, {
    deep: true,
    immediate: true
   })
 // 或者写成
 watch([baby,arr], ([baby, arr], [prebaby,prearr]) => {
    ...
  })
   // 对比vue2.0
   /*
   watch: {
      baby(v, o) {
        
      },
      arr: {
        handle(v,o) {},
        deep: true,
        immediate: true,
        flush: 'pre' // 这个默认有三个参数，'pre'| 'post' | 'sync'，默认‘pre’组件更新前运行,'post'组件渲染完毕后执行，一般用于你需要去访问$ref的时候可以用这个，'sync'是一旦你的值改变你需要同步执行回调的时候用这个
      }
    }
  */
   // watch的写法跟vue2的$watch写法一样，可以参考
  // vue3.0 watchEffect 用法
  //  watchEffect 有两个参数，一个是副作用函数(就是外部的数据对这个函数产生影响的，通俗点说就是在这个函数内部使用了外面的变量等)，一个是options（）
//  在vue2.0中，我们一般在created里添加一些监听事件，比如你的$bus的一些事件监听，在setup中就可以在这个里面写
watchEffect((onInvalidate) => {
   // 这里的变化就相当于依赖了age.value，如果age变化了就会触发这个监听
   // 刚刚创建组件的时候会立即执行这个 
   const _age= `her age is ${age.value}`
   console.log(_age)
   //有时候你需要在这里挂载一些监听事件
   const handerClick = ()=>{}
   document.addEventlistener('click', handerClick)
   // 在vue2.0我们需要在destroy的时候remove它，这里提供了一个方法onInvalidate回调解决remove的问题
   onInvalidate(()=>{
       /*
        执行时机:  在副作用即将重新执行时，就是在每次执行这个watchEffect回调的时候会先执行这个,如果在setup()或生命周期钩子函数中使用watchEffect, 则在卸载组件时执行此函数。
       */
       document.removeEventListener('click',handerClick )
    })  
})
// 这个也是支持async,await的
const data = ref(null)
watchEffect(async onInvalidate => {
 // 假设个接口获取数据的
  data.value = await fetchData()
  onInvalidate(() => {...})
})
// 再来理解options：这里有三个参数flush,onTrigger,onTrack
watchEffect(onInvalidate => {
  onInvalidate(() => {...})
}, {
  flush: 'pre' // 跟watch一样，默认pre，组件更新前去调用
  onTrigger(e) {
    // 依赖项变化时候触发这个即依赖项的set触发的时候
  },
  onTrack(e) {
    // 依赖项被调用的时候触发这个即依赖项的get触发的时候
  }
})
    return {
      baby,
      areYouSureYouAreABaby,
      data 
    }
    
  }
}

```



## 组件通信方式
```
  父组件向子组件通信
    通过自定义属性的方式/props
  子组件向父组件通信
    通过自定义事件的方式，父组件通过接受这个事件来接收数据，子组件通过this.$emit的方式定义事件
  兄弟组件通信
    1. 借助于自定义事件和自定义属性的结合来实现
    2.发布、订阅的方式，借助于第三方插件
  不同组件间通信
    1. 使用自定义属性的方式，缺点传递过深
    2. 使用Vuex
    3.路由传参
    4.使用缓存的方式 cookie、session、localStorage
```