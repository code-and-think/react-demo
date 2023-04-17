/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let res = null as ListNode | null;
  let tail = null as ListNode | null;
  let l1Node = l1;
  let l2Node = l2;
  let pre = 0;
  while (l1Node?.val != null || l2Node?.val != null) {
    const addRes = pre + (l1Node?.val ?? 0) + (l2Node?.val ?? 0);
    const nextNode = new ListNode(addRes % 10);

    if (tail == null) {
      res = nextNode;
      tail = nextNode;
    } else {
      tail.next = nextNode;
      tail = nextNode;
    }
    l1Node = l1Node?.next as any;
    l2Node = l2Node?.next as any;
    pre = parseInt(String(addRes / 10));
  }
  if (pre > 0 && tail) {
    tail.next = new ListNode(pre);
  }
  return res;
}

