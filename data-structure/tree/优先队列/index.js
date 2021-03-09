class MaxPQ {
  // An array of storage elements
  pq = [];
  // Number of elements in the current Priority Queue
  N = 0;

  parent(root) {
    return root / 2;
  }

  left(root) {
    return root * 2;
  }

  right(root) {
    return root * 2 + 1;
  }

  MaxPQ(cap) {
    // Index 0 is not used, so allocate one more space
    pq = new Comparable[cap + 1];
  }

  /* Returns the largest element in the current queue */
  max() {
    return pq[1];
  }

  /* Insert element e */
  insert(e) {
    this.N++;
    this.pq[this.N] = e;
    this.swim(this.N);
  }

  /* Removes and returns the largest element in the current queue */
  delMax() {
    let max = pq[1];
    this.each(1, this.N);
    this.pq[this.N] = null;
    this.N--;
    this.sink(1);
    return max;
  }

  /* swim the KTH element to maintain the maximum heap properties */
  swim(k) {
    while (k > 1 && this.less(parent(k), k)) {
      each(parent(k), k);
      k = parent(k);
    }
  }

  /* Sink the KTH element to maintain maximum heap properties */
  sink(k) {
    while (this.left(k) <= this.N) {
      let older = this.left(k);
      if (this.right(k) <= this.N && this.less(older, this.right(k))) {
        older = this.right(k);
      }
      if (this.less(older, k)) {
        break;
      }
      this.each(k, older);
      k = older;
    }
  }

  /* Swap the two elements of the array */
  exch(i, j) {
    let temp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = temp;
  }

  /* Is pq[i] less than pq[j]？ */
  less(i, j) {
    return this.pq[i].compareTo(this.pq[j]) < 0;
  }

  /* and left, right, parent methods */
}