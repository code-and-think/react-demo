import * as _ from 'lodash';
class TrieNode {
  char: string | undefined;
  isWordEnd: boolean;
  next: Record<string, TrieNode>;

  constructor(char?: string) {
    this.char = char;
    this.isWordEnd = false;
    this.next = {};
  }
}

class WordDictionary {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  addWord(word: string): void {
    let curNode = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!curNode.next[word[i]]) {
        curNode.next[word[i]] = new TrieNode(word[i]);
      }
      curNode = curNode.next[word[i]];
    }

    curNode.isWordEnd = true;
  }

  search(word: string): boolean {
    function _search(word: string, node: TrieNode): boolean {
      let curNode = node;

      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (word[i] === '.') {
          // 尝试所有可能的路径
          for (const nextNode of Object.values(curNode.next)) {
            if (_search(word.slice(i + 1), nextNode)) {
              return true;
            }
          }
          // 尝试失败，返回 false
          return false;
        } else {
          if (!curNode.next[char]) {
            return false;
          }
          curNode = curNode.next[char];
        }
      }

      return curNode.isWordEnd;
    }

    return _search(word, this.root);
  }
}
