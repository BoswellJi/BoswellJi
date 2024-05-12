// https://leetcode-cn.com/problems/merge-two-sorted-lists/

/**
 * @param {ListNode} l1 {val:1,next:node}
 * @param {ListNode} l2
 * @return {ListNode}
 */

function ListNode(val, node) {
  this.val = val;
  this.next = node;
}

function mergeTwoLists(l1, l2) {
  if (l1 === null) {
    return l2;
  } else if (l2 === null) {
    return l1;
  } else if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
}

function mergeTwoLists(l1, l2) {
  const preHead = new ListNode(-1);
  let pre = preHead;

  while (l1 != null && l2 != null) {
    if (l1.val <= l2.val) {
      pre.next = l1;
      l1 = l1.next;
    } else {
      pre.next = l2;
      l2 = l2.next;
    }
    // 获取链表中的最后一个节点
    pre = pre.next;
  }
  // 获取后面剩余的节点（两个链表不一样长
  pre.next = l1 === null ? l2 : l1;

  return preHead.next;
}

const tail1 = new ListNode(3, null);
const node1 = new ListNode(2, tail1);
const head1 = new ListNode(1, node1);

const tail2 = new ListNode(4, null);
const node2 = new ListNode(3, tail2);
const head2 = new ListNode(2, node2);

const link = mergeTwoLists(head1, head2);
console.log(link);
