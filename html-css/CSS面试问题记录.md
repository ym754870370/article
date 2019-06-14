## CSS面试问题记录

###  1. css的引入方式
```
   1. <link>

   2. @import

   3. <style>内联样式
```
###  2. CSS选择器
```
1.  p,h1 元素选择器

2.  ID选择器

3. 类选择器

4. 通配选择器 *

5. 属性选择器

    li[class] {}

    li[class="ming"]{}

    li[class~="ing"]{}

    <li></li>
    <li class="ming"></li>

```

### 3. src 与 href的区别
```
  src用于替换元素，source的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签的位置

  href则是在当前文档与引用资源之间确定联系
```

###  4. CSS选择器优先级
```
  第一等级:  代表内联样式， style="",权值为 1,0,0,0
  
  第二等级:  代表 ID选择器， #id, 权值是0,1,0,0

  第三等级:  代表class | 伪类 | 属性 选择器 权值是0,0,1,0

  第四级别： 代表 标签 | 伪元素选择器
```

### 5. 相对长度单位
```
  px: 根据屏幕分辨率 像素

  em： 浏览器初始文字的默认尺寸是14px,根据父元素字体的大小而改变

  rem: 相对于<html>的字体大小单位

  vw: 视口宽度 1/100

  vh: 视口高度 1/100

  vmin: vw和vh的最小值

  vmax: vw和vh的最大值

```

### 6.BFC(Block Fromatting Context)块级格式化上下文
```
常见用途

   1. 清除元素内部浮动

   2. 解决外边距合并问题

   3. 制作自适应两栏布局

如何创建块级格式化上下文
1. float 不为 none 的情况
2. position 不为 static 或者 relative 的情况
3. display 的值时 inline-block、table-cell、flex、table-caption、inline-flex
4. overflow 的 值不为 visible

overflow: hidden

```

### 7. 清除浮动的方式
```
  .clearFloat::after {
    content: ' ';
    display: block;
    clear: both;
  }
```

### 8. 常用的媒体类型
```
  @media all {}  适用于所有设备

  @media handheld  {} 适用于手持设备

  @media screen {} 适用于计算机屏幕

  @media projection {} 投影仪

  @media print {} 预览模式下的屏幕上的文档视图

  
  CSS3媒体查询

  @media (min-width: 600px) and (max-width: 900px)

```