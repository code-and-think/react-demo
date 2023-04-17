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
// 排序链表，对链表的归并排序
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
export function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;

  const dummy = new ListNode(-1, head);
  // 选出中间的元素
  let [slow, fast] = [dummy, head] as Array<ListNode | null>;

  while (fast) {
    fast = fast.next?.next ?? null;
    slow = slow?.next ?? null;
  }

  // 分别排序
  const rightHead = slow?.next ?? null;
  if (slow) {
    slow.next = null;
  }
  let left = sortList(head);
  let right = sortList(rightHead);

  // 合并
  const ans = new ListNode(-1);
  let cur = ans;

  while (left || right) {
    if (left && right) {
      if (left.val <= right.val) {
        cur.next = left;
        left = left.next;
      } else {
        cur.next = right;
        right = right.next ?? null;
      }
    } else if (left) {
      cur.next = left;
      left = left.next;
    } else {
      cur.next = right;
      right = right?.next ?? null;
    }
    cur = cur.next as any;
  }

  return ans.next;
}

const four = new ListNode(4);
const two = new ListNode(2);
const one = new ListNode(1);
const three = new ListNode(3);
four.next = two;
two.next = one;
one.next = three;

const ans = sortList(four);
console.log(ans);
