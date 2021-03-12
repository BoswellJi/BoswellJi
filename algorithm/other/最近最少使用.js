/**
 * 缓存淘汰策略
 * 最近最少使用
 * 1. 给定的缓存空间
 * 2. 先进先出（同等权重下）
 * 3. 最近使用，放到队列最后
 */

function LRU(max) {
  this.max = max;
  this.cache = new Map();
}

LRU.prototype = {
  get(key) {
    const { cache } = this,
      value = cache.get(key);
    if (!value) return;
    cache.delete(key);
    cache.set(key, value);
    return value;
  },
  add(key, value) {
    const { cache } = this;
    if (cache.size > this.max - 1) {
      const keys = cache.keys().next().value;
      cache.delete(keys);
    }
    cache.set(key, value);
  }
};

const lru = new LRU(4);
lru.add(1, 1);
lru.add(2, 2);
lru.add(3, 3);
lru.add(4, 4);
lru.get(2);
lru.get(2);
lru.get(2);
lru.add(5, 5);

console.log(lru.cache);