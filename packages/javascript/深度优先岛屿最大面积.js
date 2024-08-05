function maxAreaOfIsland(grid) {
  const rows = grid.length
  const cols = grid[0].length
  let maxArea = 0

  function dfs(row, col) {
    // 边界检查和是否为陆地检查
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      grid[row][col] === 0
    ) {
      return 0
    }

    // 将当前单元格标记为已访问
    grid[row][col] = 0

    // 计算面积
    let area = 1
    area += dfs(row - 1, col) // 上
    area += dfs(row + 1, col) // 下
    area += dfs(row, col - 1) // 左
    area += dfs(row, col + 1) // 右

    return area
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1) {
        const area = dfs(row, col)
        maxArea = Math.max(maxArea, area)
      }
    }
  }

  return maxArea
}

// 示例
const grid = [
  [0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 0, 0, 0],
  [1, 1, 0, 0, 1],
  [0, 0, 0, 1, 1]
]

console.log(maxAreaOfIsland(grid)) // 输出 5
