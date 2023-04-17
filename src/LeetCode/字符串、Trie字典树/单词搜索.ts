import * as _ from 'lodash';

class TrieNode {
  char?: string;
  next: Record<string, TrieNode>;
  isWordEnd: boolean;

  constructor(char?: string) {
    this.char = char;
    this.next = {};
    this.isWordEnd = false;
  }
}

class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }
  insert(word: string) {
    let curNode = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!curNode.next[word[i]]) {
        curNode.next[word[i]] = new TrieNode(word[i]);
      }
      curNode = curNode.next[word[i]];
    }
    curNode.isWordEnd = true;
  }
}

// 判断单词列表中有多少个处于 board 中
function findWords(board: string[][], words: string[]): string[] {
  const [n, m] = [board.length, board[0].length];
  const trie = new Trie();
  const inPath = Array.from({ length: n }, () => Array(m).fill(false));
  const ans = [] as string[];

  for (const word of words) {
    trie.insert(word);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      __traverse(trie.root, i, j, '');
    }
  }

  function __traverse(parentNode: TrieNode, i: number, j: number, parentStr: string) {
    if (i >= 0 && i < n && j >= 0 && j < m && !inPath[i][j] && parentNode.next[board[i][j]]) {
      const curNode = parentNode.next[board[i][j]];
      if (curNode.isWordEnd) {
        curNode.isWordEnd = false;
        ans.push(parentStr + board[i][j]);
      }
      inPath[i][j] = true;
      for (const [nextI, nextJ] of [
        [i + 1, j],
        [i - 1, j],
        [i, j + 1],
        [i, j - 1],
      ]) {
        __traverse(curNode, nextI, nextJ, parentStr + board[i][j]);
      }
      inPath[i][j] = false;
    }
  }

  return ans;
}

console.log(
  findWords(
    [
      ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    ],
    ['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa', 'aaaaaaaa', 'aaaaaaaaa', 'aaaaaaaaaa']
  )
);
