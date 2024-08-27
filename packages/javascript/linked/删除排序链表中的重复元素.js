class LinkNode {
  constructor(val = null, next = null) {
    this.val = val
    this.next = next
  }
}

function handleLink(head) {
  let cur = head
  while (cur && cur.next) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return head
}

const head = new LinkNode(1)
head.next = new LinkNode(2)
head.next.next = new LinkNode(3)
head.next.next.next = new LinkNode(3)

console.log(handleLink(head))
