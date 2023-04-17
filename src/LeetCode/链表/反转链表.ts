export {};

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
// 反转整个链表
function reverse(head: ListNode | null) {
  let [prev, cur] = [null as ListNode | null, head];
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}

// 反转链表中的一部分
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  const dummy = new ListNode();
  dummy.next = head;
  let [slow, fast] = [dummy, head] as Array<ListNode | null>;
  for (let i = 0; i < right - left; i++) {
    fast = fast?.next ?? null;
  }
  for (let i = 1; i < left; i++) {
    slow = slow?.next ?? null;
    fast = fast?.next ?? null;
  }
  // prev 是反转后头节点指向的节点，默认情况下为 null，但是这里是反转范围的下一个节点
  let [prev, cur] = [fast?.next, slow?.next] as Array<ListNode | null>;
  // 反转链表的终止条件一定是 cur == null，所以末尾要断掉
  if (fast) {
    fast.next = null;
  }

  while (cur) {
    const next = cur.next;
    cur.next = prev ?? null;
    prev = cur;
    cur = next;
  }
  // 反转后的 prev 是头节点
  if (slow) {
    slow.next = prev ?? null;
  }

  return dummy.next;
}

// 判断回文
function isPalindrome(head: ListNode | null): boolean {
  const dummy = new ListNode();
  dummy.next = head;
  let [slow, fast] = [dummy, dummy.next] as Array<ListNode | null>;

  while (fast) {
    slow = slow?.next ?? null;
    fast = fast.next?.next ?? null;
  }

  let [prev, cur] = [null, slow?.next] as Array<ListNode | null>;
  if (slow) {
    slow.next = null;
  }
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }

  while (head && prev) {
    if (head.val !== prev.val) {
      return false;
    }
    head = head.next;
    prev = prev.next;
  }

  return true;
}

const one = new ListNode(1);
const two = new ListNode(2);
const three = new ListNode(2);
const four = new ListNode(1);
const five = new ListNode(3);

one.next = two;
two.next = three;
three.next = four;
four.next = five;
console.log(isPalindrome(one));