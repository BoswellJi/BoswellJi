class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function getCycleLength(head) {
  let slow = head;
  let fast = head;

  // 检测链表是否有环
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // 有环，计算环的长度
      let current = slow;
      let length = 0;

      // 继续遍历直到再次回到相遇的节点
      do {
        current = current.next;
        length++;
      } while (current !== slow);

      return length;
    }
  }

  // 如果没有环，返回 0 表示无环
  return 0;
}

// 创建一个有环的链表用于测试
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2; // 创建环，环的起始节点是 node2

// 测试
const cycleLength = getCycleLength(node1);
console.log(cycleLength); // 应该输出 3，因为环的长度是 3
