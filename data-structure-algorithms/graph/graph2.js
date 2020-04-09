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
function Vertex(label){
  this.label = label;
  this.wasVisited = false;
}

function Graph(v) {
  this.vertices = v;
  this.edges = 0;
  this.adj = [];
  this.marked = [];
  for (let i = 0; i < this.vertices; i++) {
    this.adj[i] = [];
    this.adj[i].push('');
    this.marked[i] = false;
  }
}

Graph.prototype = {
  addEdge(v, w) {
    this.adj[v].push(w);
    this.addEdge[w].push(v);
    this.edges++;
  },
  showGraph() {
    for (let i = 0; i < this.vertices; i++) {
      for (let j = 0; j < this.vertices; j++) {
        if (this.adj[i][j] !== undefined) {
          console.log(this.adj[i][j] + '  ');
        }
      }
    }
  },
  /**
   * 深度优先搜索
   * @param {*} v 
   */
  dfs(v) {
    this.marked[v] = true;
    if (this.adj[v] !== undefined) {
      console.log('vertex:' + v);
      for (let key in this.adj[v]) {
        if (!this.marked[key]) {
          this.dfs(key);
        }
      }
    }
  }
};