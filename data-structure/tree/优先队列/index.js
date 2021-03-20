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