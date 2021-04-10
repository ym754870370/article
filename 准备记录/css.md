### CSS:
1. 响应式布局
    如何定义Rem  在html 标签下设置 font-size标准
2. flex布局
```css
    父盒子属性：
    flex-direction: row / column / row-reverse / column-reverse;主轴的排列顺序 如 从左到右 从上到下
    flex-wrap: wrap(换行) / nowrap(不换行) / wrap-reverse(第一行在下方);
    flex-flow: <flex-direction> || <flex-wrap> 集合上面两个参数

    justify-content: center;水平居中 space-evenly 间距完全相同 space-around 均匀分布，行首到第一个元素和行尾到最后一个元素的间距是 元素之间的一半
    align-item: center;垂直居中
    align-content: flex-start | flex-end | center | space-between | space-around | stretch; 定义了多行排列布局方式

    子盒子属性
    order: <number>  决定盒子排列顺序，数值越大越在后面
    flex-grow:当父级盒子大于所有子盒子面积时，子盒子索取父级盒子的剩余空间来放大自己
    flex-basis:设置该元素的宽度，会覆盖width的值
    flex-shrink:当父级盒子小于子盒子面积时，子盒子会缩小自身的宽度
    flex: <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> 上面三个属性的集合

    align-self: auto | flex-start | flex-end | center | baseline | stretch; 可以覆盖父级的align-items属性；决定自己的位置；
```

3. BFC 块级格式化上下文 block fomatting context

    作用： 1. 形成一个独立的容器，容器内的元素不会影响容器外的元素
          2. 同一个BFC下的相邻盒子的margin会发生重叠
          3. 计算BFC高度时，会把float元素计算在内
          4. BFC的区域不会与float box 重叠

    如何产生：
          1. 根元素，即html
          2. float 不为None时
          3. overflow 不为visible时
          4. position absolute fixed
          5. display 值为 inline-block table-cell table-caption

4. 盒模型
    IE盒模型 border-box：width 指content+padding+border 三个部分
    W3C盒模型 content-box: width 指content的作用

5. 元素优先级
    !important => 内联 => ID => Class => 伪类/属性 => 元素选择器 => 通配符 => 继承样式

6. 用过的伪类

7. 清除浮动的方法

8. 隐藏方式
    1. visibilisty: hidden
    2. display: none
    3. opcity: 0
    4. position: absolute 移动到视图区域外
    5. z-index

9. 水平垂直居中的方法