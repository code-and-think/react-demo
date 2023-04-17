import * as _ from 'lodash';

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let curNode = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!curNode.next[word[i]]) {
        curNode.next[word[i]] = new TrieNode(word[i]);
      }
      curNode = curNode.next[word[i]];
    }
    curNode.wordEndCount++;
  }

  search(word: string): boolean {
    let curNode = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!curNode.next[word[i]]) {
        return false;
      }
      curNode = curNode.next[word[i]];
    }
    return curNode.wordEndCount > 0;
  }

  startsWith(prefix: string): boolean {
    let curNode = this.root;
    for (let i = 0; i < prefix.length; i++) {
      if (!curNode.next[prefix[i]]) {
        return false;
      }
      curNode = curNode.next[prefix[i]];
    }
    return true;
  }
}

class TrieNode {
  char: string | undefined;
  next: Record<string, TrieNode>;
  wordEndCount: number;

  constructor(char?: string) {
    this.char = char;
    this.next = {};
    this.wordEndCount = 0;
  }
}
