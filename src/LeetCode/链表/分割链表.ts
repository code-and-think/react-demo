import * as _ from 'lodash';
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
// 对链表作 partition，并且保持相对位置
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function partition(head: ListNode | null, x: number): ListNode | null {
  const [lt, gt] = [new ListNode(), new ListNode()];
  let curLt = lt,
    curGt = gt;

  while (head?.val != null) {
    if (head.val >= x) {
      curGt.next = head;
      curGt = curGt.next;
    } else {
      curLt.next = head;
      curLt = curLt.next;
    }
    head = head.next;
  }
  // 作为新链表的尾巴，它的 next 必须是 null
  curGt.next = null;
  curLt.next = gt.next;

  return lt.next;
}
