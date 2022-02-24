/**
 * ## 二进制堆实现优先队列

* 主要操作是`下沉和上浮`来维护二进制堆的特性；
* 二进制堆是一种存储在数组中的特殊的二叉树类型；（完全二叉树）
* 数组的第一个数为空；
* 堆顶 堆底；
* arr[1]为根节点；

* 二进制堆分为最大堆，最小堆；

## 两个主要应用

* 堆排序；
* 优先队列；

## 优先队列

* 插入或者删除元素，元素都是自动排序，底层原理是二进制堆操作；
* 主要操作的上浮和下沉是为了维护堆的结构；


* 是否存在元素：         检查队列是否没有元素；
* 根据权重插入元素：      根据关联权重添加元素到队列中；
* 拉取最高权重的元素：    从队列移除有最高权重的元素，并且返回它；
 */

class MaxPQ {
  constructor() {
    this.pq = [];
    // 元素的数量
    this.N = 0;
  }

  // 父节点索引
  parent(root) {
    return root / 2;
  }

  // 左子树索引
  left(root) {
    return root * 2;
  }

  // 右子树索引
  right(root) {
    return root * 2 + 1;
  }

  // 最大堆的第一个元素就是最大值
  max() {
    return this.pq[1];
  }

  /* Insert element e */
  insert(e) {
    this.N++;
    this.pq[this.N] = e;
    this.swim(this.N);
  }

  /* Removes and returns the largest element in the current queue */
  delMax() {
    let max = this.max();
    this.each(1, this.N);
    this.pq[this.N] = null;
    this.N--;
    this.sink(1);
    return max;
  }

  /* swim the KTH element to maintain the maximum heap properties */
  swim(k) {
    // 节点索引>1 && 节点的父节点小于节点本身
    while (k > 1 && this.less(this.parent(k), k)) {
      this.each(this.parent(k), k);
      k = this.parent(k);
    }
  }

  /* Sink the KTH element to maintain maximum heap properties */
  sink(k) {
    while (this.left(k) <= this.N) {
      // 获取左子节点索引
      let older = this.left(k);
      // k的左节点小于k的右节点 && 右节点索引小于N
      if (this.right(k) <= this.N && this.less(older, this.right(k))) {
        older = this.right(k);
      }
      // 小于K节点
      if (this.less(older, k)) {
        break;
      }
      // 交换
      this.each(k, older);

      // 接着向下比较
      k = older;
    }
  }

  /* Swap the two elements of the array */
  each(i, j) {
    let temp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = temp;
  }

  /* Is pq[i] less than pq[j]？ */
  less(i, j) {
    return this.pq[i] - this.pq[j] < 0;
  }
}

const pq = new MaxPQ();

pq.insert(2);
pq.insert(4);
pq.insert(3);
pq.insert(4);
pq.insert(5);
pq.insert(6);

console.log(pq);