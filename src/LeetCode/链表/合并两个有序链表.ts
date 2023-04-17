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
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let cur = dummy;

  while (list1 || list2) {
    if (list1 && list2) {
      if (list1.val < list2.val) {
        cur.next = list1;
        cur = cur.next;
        list1 = list1.next;
      } else {
        cur.next = list2;
        cur = cur.next;
        list2 = list2.next;
      }
    } else if (list1) {
      cur.next = list1;
      cur = cur.next;
      list1 = list1.next;
    } else if (list2) {
      cur.next = list2;
      cur = cur.next;
      list2 = list2.next;
    }
  }

  return dummy.next;
}
