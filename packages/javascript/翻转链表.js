function reverseLinkedList(head) {
  let prev = null
  let current = head

  while (current !== null) {
    let next = current.next // 保存下一个节点
    current.next = prev // 反转当前节点的指针
    prev = current // 移动 prev 指针
    current = next // 移动 current 指针
  }

  return prev // new head of the reversed list
}

class Node {
  constructor(val, next) {
    this.val = val
    this.next = next
  }
}

const two = new Node(2, null)
const one = new Node(1, two)
const head = new Node(0, one)

console.log(head)

console.log(reverseLinkedList(head))
