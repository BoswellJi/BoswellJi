
function Graph() {
	this.vertices = [];
	this.adjList = new Dictionary();
	this.time = 0;
}

Graph.prototype = {
	/**
	 * 添加顶点
	 * @param {*} v 
	 */
	addVertex(v) {
		vertices.push(v);
		adjList.set(v, []);
	},
	/**
	 * 添加边
	 * @param {*} v 
	 * @param {*} w 
	 */
	addEdge(v, w) {
		adjList.get(v).push(w);
		adjList.get(w).push(v);
	},
	/**
	 * 展示图
	 */
	toString = function () {
		var s = '';
		for (var i = 0; i < vertices.length; i++) {
			s + vertices[i] + '->';
			var neighbors = adjList.get(vertices[i]);
			for (var j = 0; j < neighbors.length; j++) {
				s += neighbors[j];
			}
			s += '\n';
		}
		return s;
	},
	/**
	 * 
	 */
	initializeColor() {
		var color = [];
		for (var i = 0; i < vertices.length; i++) {
			color[vertices[i]] = 'white';
		}
		return color;
	},
	/**
	 * 广度优先搜索
	 * @param {*} v 
	 * @param {*} cb 
	 */
	bfs(v, cb) {
		var color = initializeColor(),
			queue = new Queue();
		queue.enqueue(v);
		while (!queue.isEmpty()) {
			var u = queue.dequeue(),
				neighbors = adjList.get(u);
			color[u] = 'grey';
			for (var i = 0; i < neighbors.length; i++) {
				var w = neighbors[i];
				if (color[w] === 'white') {
					color[w] = 'grey';
					queue.enqueue(w);
				}
			}
			color[u] = 'black';
			cb && cb(u);
		}
	},
	/**
	 * 深度优先遍历
	 * @param {*} cb 
	 */
	dfs(cb) {
		var color = initializeColor();
		for (var i = 0; i < vertices.length; i++) {
			if (color[vertices[i]] === 'white') {
				dfsVisit(vertices[i], color, cb);
			}
		}
	},
	dfsVisit(u, color, cb) {
		color[u] = 'grey';
		cb && cb(u);
		var neighbors = adjList.get(u);
		for (var i = 0; i < neighbors.length; i++) {
			var w = neighbors[i];
			if (color[w] === 'white') {
				dfsVisit(w, color, cb);
			}
		}
		color[u] = 'black';
	},
	/**
	 * 最短路径问题
	 */
	BFS(v) {
		var color = initializeColor(),
			queue = new Queue(),
			d = [],
			pred = [];
		queue.enqueue(v);
		for (var i = 0; i < vertices.length; i++) {
			d[vertices[i]] = 0;
			pred[vertices[i]] = null;
		}
		while (!queue.isEmpty()) {
			var u = queue.dequeue(),
				neighbors = adjList.get(u);
			color[u] = 'grey';
			for (var i = 0; i < neighbors.length; i++) {
				if (color[w] == 'white') {
					color[w] = 'grey';
					d[w] = d[u] + 1;
					pred[w] = u;
					queue.enqueue(w);
				}
			}
			color[u] = 'black';
		}
		return {
			distances: d,
			predecessors: pred
		}
	},
	DFSVisit(u, color, d, f, p) {
		color[u] = 'grey';
		d[u] = ++time;
		var neighbors = adjList.get(u);
		for (var i = 0; i < neighbors.length; i++) {
			var w = neighbors[i];
			if (color[w] === 'white') {
				p[w] = u;
				DFSVisit(w, color, d, f, p);
			}
		}
		color[u] = 'black';
		f[u] = ++time;
	},
	DFS() {
		var color = initializeColor(),
			d = [],
			f = [],
			p = [];
		time = 0;
		for (var i = 0; i < vertices.length; i++) {
			if (color[vertices[i]] === 'white') {
				DFSVisit(vertices[i], color, d, f, p);
			}
		}
		return {
			discovery: d,
			finished: f,
			predecessors: p
		}
	}
};

var g = new Graph();
g.addVertex(1);
