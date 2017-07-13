## NODE(节点)类型

#### node: 当前获得节点
#### node.
###### childNodes: 获取到当前节点内的所有子节点
###### parentNodes: 获取到当前节点的父节点
###### firstChild: 获取到当前节点的所有子节点的第一个(chrom和safri会把换行符当成一个节点)
###### lastChild: 获取到当前节点的所有子节点的最后一个(chrom和safri会把换行符当成一个节点)
###### nextSibling: 获取到当前节点的上一个兄弟节点(chrom和safri会把换行符当成一个节点)
###### previousSibling: 获取到当前节点的下一个兄弟节点(chrom和safri会把换行符当成一个节点)

###### appendChild(newNode): 在childNodes末尾添加一个节点
###### insertBefore(newNode, index): 在选中的位置添加一个节点
###### replaceChild(newNode, oldNode): 替换掉选中位置的节点，移除的节点仍然在文档中，只是指向它的所有指针都指向到新的替换节点
###### removeChild(node): 删除选中的节点，删除的节点仍然为文档所有，只不过在文档中已经没有了它的位置
###### cloneNode(node, Boolean): 克隆当前的节点，第二个参数为true时，进行深复制，会将当前节点的所有子树全部克隆，false时只克隆当前节点。
