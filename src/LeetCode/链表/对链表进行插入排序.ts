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
export {};
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function insertionSortList(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head);
  let sortHead = dummy,
    unSortHead = head?.next;
  if (head) {
    head.next = null;
  }

  while (unSortHead) {
    let cur: ListNode | null = sortHead;
    // 找到 cur.next 比 unSortHead 大的，插入进去
    while ((cur?.next?.val ?? Number.MAX_SAFE_INTEGER) < unSortHead.val) {
      cur = cur?.next ?? null;
    }
    const nextUnSortHead = unSortHead.next;
    unSortHead.next = cur?.next ?? null;
    if (cur) {
      cur.next = unSortHead;
    }
    unSortHead = nextUnSortHead;
  }

  return sortHead.next;
}

const four = new ListNode(4);
const two = new ListNode(2);
const one = new ListNode(1);
const three = new ListNode(3);
four.next = two;
two.next = one;
one.next = three;
insertionSortList(four);
