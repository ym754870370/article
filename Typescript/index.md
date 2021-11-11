## 基础学习

### 函数类型声明
```typescript
    const add = (x:number, z?: number): number => {
        return x + z;
    }

    interface Isum {
        (x: num, z?number)
    }

    let add2: (x: number, z?: number) => number = add;

```

### (联合类型 | )(类型断言as)(type guard typeof)

```typescript

let number: number | string
let str = number as string

```


### 类 声明 
```typescript
    // void 什么都不返回
    interface class1Interface {
        switch(trigger: boolean): void  {
        }
    }

    interface class2Interface {
        check(): void;
    }

    // 第一种： 列举出所有声明
    class ClassName1 implements class1Interface,class2Interface {
        switch(trigger: boolean) {

        }
        check() {}
    }
    // 第二种 继承声明
    interface extendInterface extends class1Interface {
        check(): void;
    }

    class ClassName2 implements extendInterface {
        switch(trigger: boolean) {

        }
        check() {}
    }

```

### enum 常量枚举

```typescript

const enum Direction {
    Up, 
    Down,
    Left,
    Right,
}

Direction.Up  // 0
Direction.Down  // 1
Direction.Left  // 2
Direction.Right  // 3


const enum Direction {
    Up = 10, 
    Down,
    Left,
    Right,
}

Direction.Up  // 10
Direction.Down  // 11
Direction.Left  // 12
Direction.Right  // 13


const enum Direction {
    Up = 'Up', 
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT',
}

Direction.Up  // Up
```


### 泛型

```typescript

    // 自定义 输入输出类型 且保证统一， 以 "T" 作为占位符 使用时入参类型动态填入类型值
    function echo<T>(args: T): T {
        return arg;
    }

    const str: string = 'str';
    const result = echo(str)


    const result = echo('str') // 类型推论

    function swap<T, U>(TUPLE: [T, U]): [U, T] {
        return [tuple[1], tuple[0]];
    }
    const result2 = swap(['string', 123]) 


```

### 约束泛型
```typescript

interface IWithLength {
    length: number,
}

function echoWithArr<T extends IWithLength>(arg: T): T[] {
    console.log(arg.length)
    return arg;
} 

function echoWithArr<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg;
} 

const arrs = echoWithArr([1, '2', 3])






interface KeyPair<T, U> {
    key: T,
    value: U,
}

let kp1: KeyPair<number, string> = {
    key: 1,
    value: 'str',
}
let kp1: KeyPair<string, number> = {
    key: 'str',
    value: 1,
} 

```

### 类型别名
```javascript

type TypeName = string | number;
let result: TypeName = '123';

```


### 交叉类型
```javascript

    interface IName {
        name: string,
    }

    type IPerson = IName & { age: number }
    let person: IPerson = { name: '123', age: 123 }

```