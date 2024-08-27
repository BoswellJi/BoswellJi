class ListNode {
  constructor(val = 0, next = null) {
    this.val = val
    this.next = next
  }
}

function reverseKGroup(head, k) {
  let count = 0
  let current = head
  while (current && count !== k) {
    // 检查剩余节点是否足够k个
    current = current.next
    count++
  }
  if (count === k) {
    // 如果有足够的节点，则进行翻转
    current = reverseKGroup(current, k) // 递归处理剩余链表
    while (count--) {
      // 翻转当前k个节点
      let temp = head.next
      head.next = current
      current = head
      head = temp
    }
    head = current // 设置新的头节点
  }
  return head
}

// 辅助函数用于打印链表
function printList(node) {
  let result = ''
  while (node) {
    result += node.val + ' -> '
    node = node.next
  }
  result += 'null'
  console.log(result)
}

// 示例
const list = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
)
const reversed = reverseKGroup(list, 2)
printList(reversed)
