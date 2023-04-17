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
/**
 Do not return anything, modify head in-place instead.
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function reorderList(head: ListNode | null): void {
  const dummy = new ListNode();
  dummy.next = head;
  // 寻找中间点
  let [slow, fast] = [dummy, dummy.next] as [ListNode | null, ListNode | null];

  while (fast) {
    slow = slow?.next ?? null;
    fast = fast?.next?.next ?? null;
  }

  // 从中间点 slow 的下一个 slow.next 开始反向
  let [prev, cur] = [null as ListNode | null, slow?.next];
  if (slow) {
    slow.next = null;
  }

  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }

  // 穿插
  while (prev && head) {
    const [prevNext, headNext] = [prev.next, head?.next];
    head.next = prev;
    prev.next = headNext;
    prev = prevNext;
    head = headNext;
  }
}

const one = new ListNode(1);
const two = new ListNode(2);
const three = new ListNode(3);
const four = new ListNode(4);
const five = new ListNode(5);

one.next = two;
two.next = three;
three.next = four;

reorderList(one);
