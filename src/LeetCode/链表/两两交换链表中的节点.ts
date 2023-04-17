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

function swapPairs(head: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  dummy.next = head;
  let [prev, mid, after] = [dummy, dummy.next, dummy.next?.next];

  while (mid && after) {
    mid.next = after.next;
    after.next = mid;
    prev.next = after;

    prev = mid;
    mid = prev?.next;
    after = mid?.next;
  }

  return dummy.next;
}
