# 树

* 以边相连接的节点集合，每个节点存储对应的值；
* 树就是不包含回路的连通无向图。（回路：最终可以绕回根节点的路径，树是不可以的）`任意两点之间有且只有一条路径的无向图`；

## 特定

* 一棵树中得任意两个节点`有且仅有唯一`的一条路经连通；
* 一棵树有n个节点，那它一定有n-1条边；
* 一个树中，加一个边将会构成回路；

* 根节点

* 叶子节点

* 树高

* 根节点触发，到子节点的最长路径长度

* 节点深度

* 节点到根节点路径长度

## 术语

* 树尺寸：树中节点的数量；
* 有序树：
* 宽度: 一层节点的数量；


## 二叉树

* 它的每个节点最多有两个子节点，左数和右数；

* 遍历方式：
  + 深度优先遍历（DFS）
    - 定义：沿着特定路径遍历到叶子节点，再回溯（backtracking）进入临近路径继续遍历；
    - 距父节点值相对子节点输入顺序不同：先序，中序，后序；

  + 广度优先遍历（BFS）
    - 按照节点深度逐层遍历树结构；

* 完全二叉树和满二叉树