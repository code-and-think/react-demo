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

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
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

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
// 将排序链表转化为高度平衡的二叉搜索树
function sortedListToBST(head: ListNode | null): TreeNode | null {
  if (head == null) {
    return null;
  }
  // 找到中间节点作为根节点
  const dummy = new ListNode(0, head);
  let [preSlow, slow, fast] = [null, dummy, dummy.next] as Array<ListNode | null>;
  while (fast) {
    preSlow = slow;
    slow = slow?.next ?? null;
    fast = fast?.next?.next ?? null;
  }

  const root = new TreeNode(slow?.val);
  preSlow!.next = null;
  // 这里不能用 head 代替 dummy.next，因为在只有一个节点的时候，dummy.next 对应 preSlow，其 next 为 null 而不是 head
  root.left = sortedListToBST(dummy.next);
  root.right = sortedListToBST(slow?.next ?? null);

  return root;
}
