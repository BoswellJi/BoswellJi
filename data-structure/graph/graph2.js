/**
 * 图数据结构
 * 
 * 表达图数据结构，
 * 1. 要用顶点和边的方案，使用对象表示顶点的方式随着顶点的增大，会暂用大量内存；
 * 
 * 2. 保存顶点和边
 * 
 * 3. 顶点保存再数组中，可以通过数组索引引用他们
 */

/**
 * 顶点
 * @param {*} label 
 */
function Vertex(label) {
  this.label = label;
  this.wasVisited = false;
}

/**
 * 表示图的类
 * @param {*} v 
 */
function Graph(v) {
  // 一个图多少顶点(数量)
  this.vertices = v;
  // 一个图多少条边
  this.edges = 0;
  // 长度与图的顶点数量相同的数组，用来记录顶点的数量
  this.adj = [];
  // 标记每个顶点是否被查询过
  this.marked = [];

  // 给每个元素添加数组
  for (let i = 0; i < this.vertices; i++) {
    // 用来存储所有相邻顶点
    this.adj[i] = [];
    this.marked[i] = false;
  }
}

Graph.prototype = {
  addEdge(v, w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
  },
  /**
   * 每个顶点到临近顶点的边
   */
  showGraph() {
    for (let i = 0; i < this.vertices; i++) {
      let str = i + '->';
      for (let j = 0; j < this.vertices; j++) {
        if (this.adj[i][j] != undefined) {
          console.log(str + this.adj[i][j] + '  ');
        }
      }
    }
  },
  /**
   * 深度优先搜索(找到所有顶点)
   * @param {*} v 
   */
  dfs(v) {
    this.marked[v] = true;
    if (this.adj[v] != undefined) {
      for (let i = 0, len = this.adj[v].length; i < len; i++) {
        if (!this.marked[i]) {
          this.dfs(i);
        }
      }
    }
  },
  /**
   * 广度优先搜索
   * @param {*} s 
   */
  bfs(s) {
    const queue = [];
    this.marked[s] = true;
    queue.push(s);
    while (queue.length > 0) {
      const v = queue.shift();
      if (v == undefined) {
        console.log('visisted:' + v);
      }
      for (let i = 0, len = this.adj[v].length; i < len; i++) {
        if (!this.marked[i]) {
          this.edgeTo[w] = v;
          this.marked[w] = true;
          queue.push(w);
        }
      }
    }
  }
};

const g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);

g.showGraph();
g.dfs(0);