class Node {
  constructor (value = null, parent = null) {
    this.left = null;
    this.right = null;

    this.value = value;
    this.parent = parent;
  }
}

class Bst {
  constructor () {
    this.root = null;
  }

  insert (value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }
    return this._insertNode(value, this.root);
  }

  _insertNode (value, node) {
    if (value < node.value) {
      if (node.left) {
        return this._insertNode(value, node.left);
      }
      let newNode = new Node(value, node);
      node.left = newNode;
      return newNode;
    } else if (value > node.value) {
      if (node.right) {
        return this._insertNode(value, node.right);
      }
      let newNode = new Node(value, node);
      node.right = newNode;
      return newNode;
    }
    return null;
  }

  findMin() {
    if (!this.root) return null;
    return this._findMinNode(this.root);
  }

  _findMinNode(node) {
    if (node.left) {
      return this._findMinNode(node.left);
    }
    return node;
  }

  findMax() {
    if (!this.root) return null;
    return this._findMaxNode(this.root);
  }

  _findMaxNode(node) {
    if (node.right) {
      return this._findMaxNode(node.right);
    }
    return node;
  }

  print() {
    if (!this.root) return null;
    this._traverseNodeInOrder(this.root);
  }

  _traverseNodeInOrder(node) {
    if (node.left) {
      this._traverseNodeInOrder(node.left);
    }
    console.log(node.value);
    if (node.right) {
      this._traverseNodeInOrder(node.right);
    }
  }

  remove(value) {
    if (!this.root) return null;
    return this._removeNode(value, this.root);
  }

  _removeLeafNode(node) {
    if (node.parent.left === node) {
      node.parent.left = null;
    } else if (node.parent.right === node) {
      node.parent.right = null;
    }
    return node;
  }

  _removeNodeWithOneChild(node) {
    if (node.left) {
      if (node.parent.left === node) {
        node.parent.left = node.left
      } else if (node.parent.right === node) {
        node.parent.right = node.left
      }
      node.left = null;
      return node;
    } else if (node.right) {
      if (node.parent.left === node) {
        node.parent.left = node.right
      } else if (node.parent.right === node) {
        node.parent.right = node.right
      }
      node.right = null;
      return node;
    }
    return null;
  }

  _removeNodeWithTwoChildren(node) {
    let predecessor = this._findMaxNode(node.left);
    let tempNodeValue = node.value;

    node.value = predecessor.value;
    predecessor.value = tempNodeValue;

    console.log(predecessor);

    // TODO: something doesnt work with node parents
    return this._checkNodeChildrenAndRemove(predecessor);

    // for future development - manage to swap whole nodes, not just values

    // if (node.parent.left === node) {
    //   node.parent.left = predecessor;
    // } else if (node.parent.right === node) {
    //   node.parent.right = predecessor;
    // }

    // predecessor.left = node.left;
    // predecessor.right = node.right;

    // node.left = predecessor.left;
    // node.right = null;

    // predecessor.parent = node.parent;
    // preParent.right = node;

    // return this._removeNode(node);
  }

  _checkNodeChildrenAndRemove(node) {
    // 1. leaf node - no children
    if (!node.left && !node.right) {
      return this._removeLeafNode(node);
    // 2. has one child - left || right
    } else if (node.left && !node.right || !node.left && node.right) {
      return this._removeNodeWithOneChild(node);
    // 3. has 2 children - left && right
    } else if (node.left && node.right) {
      return this._removeNodeWithTwoChildren(node);
    }
  }

  _removeNode(value, node) {
    // 0 find value:
    if (value < node.value) {
      if (node.left) {
        return this._removeNode(value, node.left);
      }
      return this._removeNode(value, node);
    } else if (node > node.value) {
      if (node.right) {
        return this._removeNode(value, node.right);
      }
      return this._removeNode(value, node);
    } else if (value === node.value) {
      return this._checkNodeChildrenAndRemove(node);
    }
  }
}

let bst = new Bst();
bst.insert(10);
bst.insert(12);
bst.insert(8);
bst.insert(9);
bst.insert(6);
bst.insert(7);
bst.insert(4);
bst.insert(5);
bst.insert(3);
bst.insert(2);
bst.print();

console.log('---');

console.log('min: ', bst.findMin().value);
console.log('max: ', bst.findMax().value);

console.log('---');

console.log('removed: ', bst.remove(2).value);
console.log('removed: ', bst.remove(3).value);
console.log('removed: ', bst.remove(4).value); // node with 1 child
console.log('removed: ', bst.remove(6).value); // node with 2 children
bst.print();