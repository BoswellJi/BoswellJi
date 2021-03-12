const {LinkedList} = require('../../data-structure/linear-list/linked-list.js');

/**
 * 链表是否存在环
 * @param {*} head 
 * @returns 
 */
function hasCycle(head) {
  let fast = head;
  let slow = head;

  while (fast != null && fast.next != null) {
    fast = fast.next.next;
    slow = slow.next;

    if (fast == slow) return true;
  }

  return false;
}

const list = new LinkedList();

list.append(1);
list.append(2);
list.append(3);

const result = hasCycle(list.head);

console.log(result);

/**
 * 查找环的位置
 * @param {*} head 
 * @returns 
 */
function detectCycle(head) {
  let fast = head;
  let slow = head;

  // 找到快慢指针相遇的位置
  while (fast != null && fast.next != null) {
    fast = fast.next.next;
    slow = slow.next;

    if (fast == slow) break;
  }

  // 慢指针从头开始走
  slow = head;

  // 快慢指针再次相遇时就是环节点
  while(slow!=fast){
    fast = fast.next;
    slow = slow.next;
  }

  return slow;
}

/**
 * 找到链表的中间节点
 * @param {*} head 
 * @returns 
 */
function mid(head){
  let fast = head;
  let slow = head;

  while(fast!=null && fast.next!=null){
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow;
}

/**
 * 找到链表的第K个节点
 * @param {*} head 
 * @returns 
 */
function kNode(head){
  let fast = head;
  let slow = head;

  while(k--){
    fast = fast.next;
  }

  while(fast!=null){
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}