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
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let res = new ListNode(-1, head);
  let prev = res;
  let after = res;
  for (let i = 0; i < n; i++) {
    after = after?.next as any;
  }

  while (after?.next) {
    after = after.next;
    prev = prev?.next as any;
  }

  prev.next = prev?.next?.next as any;

  return res.next;
}
