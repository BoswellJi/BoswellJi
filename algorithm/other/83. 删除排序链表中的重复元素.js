// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/

var deleteDuplicates = function (head) {
  if (!head) {
    return head;
  }
  let tail = head;

  while (tail.next) {
    if (tail.val == tail.next.val) {
      tail.next = tail.next.next;
    } else {
      tail = tail.next;
    }
  }

  return head;
};

function Node(val, next) {
  this.val = val;
  this.next = next;
}

const head = new Node(1,
  new Node(2,
    new Node(3,
      new Node(3, null)
    )
  )
);

const link = deleteDuplicates(head);
console.log(link);