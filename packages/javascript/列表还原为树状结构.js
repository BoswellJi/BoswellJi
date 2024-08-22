/**
 * id	pid	data
    1	0	a
    2	1	b
    3	1	c
 */
function listToTree(list) {
  const record = {} // 用空间换时间，用于将所有项的 id 及自身记录到字典中
  const root = []
  const rootId = null

  list.forEach(item => {
    record[item.id] = item // 记录 id 与项的映射
    item.children = []
  })

  list.forEach(item => {
    if (item.pid === rootId) {
      root.push(item)
    } else {
      // 由于持有的是引用，record 中相关元素的修改，会在反映在 root 中。
      record[item.pid].children.push(item)
    }
  })

  return root
}
const list = [
  { pid: null, id: 1, data: '1' },
  { pid: 1, id: 2, data: '2-1' },
  { pid: 1, id: 3, data: '2-2' },
  { pid: 2, id: 4, data: '3-1' },
  { pid: 3, id: 5, data: '3-2' },
  { pid: 4, id: 6, data: '4-1' }
]
const root = listToTree(list)

console.log(root)

const a = {
  id: 1,
  pid: 0,
  data: 'a',
  children: [
    {
      id: 2,
      pid: 1,
      data: 'b',
      children: []
    },
    {
      id: 3,
      pid: 1,
      data: '',
      children: []
    }
  ]
}
