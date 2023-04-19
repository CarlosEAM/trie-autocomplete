// Root class
class TrieRoot {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let node = this.root;
    for (let i=0; i < word.length; i++) {
      if (node.child[word[i]] == undefined) {
        node.child[word[i]] = new TrieNode();
      }
      node = node.child[word[i]];
    }
    node.isWord = true;
  }
  search(prefix) {
    let node = this.root;
    for (let i=0; i < prefix.length; i++) {
      if (node.child[prefix[i]]) {
        node = node.child[prefix[i]];
      }else{
        return false;
      }
    }
    // return if its a word sas boolean
    return node.isWord;
  }
  delete(prefix) {
    let node = this.root;
    let leaf = undefined, prop = undefined;
    for (let i=0, len=prefix.length; i<len; i++) {
      // check if letter exists to escape early
      if (node.child[prefix[i]] == undefined) return false;
      // for a leaf to be valid, it needs 2 things
      // 1. isWord==false, 2. child.length==1, otherwise we reset the leaf back to {}
      if (leaf == undefined && Object.keys(node.child[prefix[i]].child).length == 1 && !node.isWord) {
        leaf = node;
        prop = prefix[i]
      }
      node = node.child[prefix[i]];
    }
    // make sure its a valid word before we continue
    if (node.isWord) {
      // check if its a leaf or node
      if (Object.keys(node.child).length > 1) {
        node.isWord = false;
      }else{
        // Time to delete the leaf along the way
        delete leaf.child[prop];
      }
      return true;
    }else {
      return false
    };
  }
}

// trie node class
class TrieNode {
  constructor() {
    this.child = {}
    this.isWord = false;
  }
}

const tRoot = new TrieRoot();

module.exports = {
  TrieRoot, TrieNode
}