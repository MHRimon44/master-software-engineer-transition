// LeetCode 208: Implement Trie (Prefix Tree)
class TrieNode { children = new Map<string, TrieNode>(); isEnd = false; }
export class Trie {
  private root = new TrieNode();
  insert(word: string): void { let node = this.root; for (const ch of word) { let next = node.children.get(ch); if (!next) { next = new TrieNode(); node.children.set(ch,next); } node = next; } node.isEnd = true; }
  search(word: string): boolean { const node = this.walk(word); return node !== null && node.isEnd; }
  startsWith(prefix: string): boolean { return this.walk(prefix) !== null; }
  private walk(word: string): TrieNode | null { let node = this.root; for (const ch of word) { const next = node.children.get(ch); if (!next) return null; node = next; } return node; }
}
const trie = new Trie(); trie.insert('apple');
function check(actual: boolean, expected: boolean, name: string) { if (actual !== expected) throw new Error(`${name}: expected ${expected}, got ${actual}`); console.log('PASS',name); }
check(trie.search('apple'),true,'Exact word');
check(trie.search('app'),false,'Prefix is not full word');
check(trie.startsWith('app'),true,'Prefix exists');
trie.insert('app');check(trie.search('app'),true,'Inserted prefix');
check(trie.startsWith('ban'),false,'Missing prefix');
console.log('All Day 52 Trie tests passed');
