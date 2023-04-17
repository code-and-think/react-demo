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
import * as _ from 'lodash';
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (head == null) return null;

  let len = 0,
    cur: ListNode | null = head,
    lastNode: ListNode | null = null;
  while (cur) {
    len++;
    lastNode = cur;
    cur = cur.next ?? null;
  }

  k %= len;

  const dummy = new ListNode(0, head);
  let [slow, fast] = [dummy, head] as Array<ListNode | null>;

  while (k) {
    fast = fast?.next ?? null;
    k--;
  }

  while (fast) {
    slow = slow?.next ?? null;
    fast = fast.next;
  }

  const newHead = slow?.next ?? null;
  slow!.next = null;

  if (newHead) {
    lastNode!.next = head;
    return newHead;
  }

  return head;
}
