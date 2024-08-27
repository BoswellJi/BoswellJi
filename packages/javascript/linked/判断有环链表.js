class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next; // 慢指针移动一步
    fast = fast.next.next; // 快指针移动两步

    if (slow === fast) {
      // 发现环
      return true;
    }
  }

  // 没有发现环
  return false;
}

// 创建一个有环的链表
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
node1.next = node2;
node2.next = node3;
node3.next = node1; // 创建环

// 测试
console.log(hasCycle(node1)); // 应该输出 true
