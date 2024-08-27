class ListNode {
  constructor(val = null, next = null) {
    this.val = val
    this.next = next
  }
}

function hasCycle(head) {
  let fast = head
  let slow = head

  while (fast.next !== null) {
    slow = slow.next
    fast = fast.next.next

    if (slow == fast) {
      slow = head;

      while(slow!=fast){
        fast = fast.next;
        slow = slow.next;
      }

      return slow;
    }
  }

  return false
}

// 创建一个有环的链表
const node1 = new ListNode(1)
const node2 = new ListNode(2)
const node3 = new ListNode(3)
node1.next = node2
node2.next = node3
node3.next = node1 // 创建环

// 测试
console.log(hasCycle(node1)) // 应该输出 true
