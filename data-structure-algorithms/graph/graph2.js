/**
 * 图数据结构
 */
function Graph(v) {
  this.vertices = v;
  this.edges = 0;
  this.adj = [];
  for (let i = 0; i < this.vertices; i++) {
    this.adj[i] = [];
    this.adj[i].push('');
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
  }
};

/**
 * 搜索图
 */
