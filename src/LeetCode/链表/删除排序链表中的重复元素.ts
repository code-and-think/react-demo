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
function deleteDuplicates(head: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  dummy.next = head;

  let [prev, mid, after] = [dummy, dummy.next, dummy.next?.next];

  while (mid) {
    if (mid.val !== after?.val) {
      // 出现重复节点
      if (mid.next !== after) {
        prev.next = after ?? null;
      } else {
        prev = mid;
      }
      mid = after ?? null;
    }
    after = after?.next;
  }

  return dummy.next;
}

const one = new ListNode(1);
const two = new ListNode(1);
const three = new ListNode(2);
const four = new ListNode(2);
one.next = two;
two.next = three;
three.next = four;
console.log(deleteDuplicates(null));
