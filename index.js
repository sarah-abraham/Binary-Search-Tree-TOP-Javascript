class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(arr){
        this.arr = [...new Set(arr)].sort((a, b) => a - b);
        this.root = this.buildTree(this.arr);
        prettyPrint(this.root);
    }

    buildTree(arr){
        if (arr.length === 0){
            return null;
        };
    
        const mid = Math.floor(arr.length / 2);
        const root = new Node(arr[mid]);
        root.left = this.buildTree(arr.slice(0, mid));
        root.right = this.buildTree(arr.slice(mid + 1));

        return root;
    }

    insert(value) {
        this.root = this.insertNode(this.root, value);
    }

    insertNode(root, value) {
        if (root === null) {
            return new Node(value);
        }

        if (value < root.value) {
            root.left = this.insertNode(root.left, value);
        } else if (value > root.value) {
            root.right = this.insertNode(root.right, value);
        }

        return root;
    }

    deleteItem(value) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(root, value) {
        if (root === null) {
            return null;
        }

        if (value < root.value) {
            root.left = this.deleteNode(root.left, value);
        } else if (value > root.value) {
            root.right = this.deleteNode(root.right, value);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }

            root.value = this.minValue(root.right);
            root.right = this.deleteNode(root.right, root.value);
        }

        return root;
    }

    minValue(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }

    find(value) {
        return this.findNode(this.root, value);
    }

    findNode(root, value) {
        if (root === null || root.value === value) {
            return root;
        }

        if (value < root.value) {
            return this.findNode(root.left, value);
        } else {
            return this.findNode(root.right, value);
        }
    }

    levelOrder(callback) {
        const result = [];
        if (this.root === null) {
            return result;
        }

        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();
            if (callback) {
                callback(node);
            } else {
                result.push(node.value);
            }

            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }

        return result;
    }
    inOrder(callback) {
        const result = [];
        this.inOrderTraversal(this.root, callback, result);
        return callback ? null : result;
    }

    inOrderTraversal(node, callback, result) {
        if (node !== null) {
            this.inOrderTraversal(node.left, callback, result);
            if (callback) {
                callback(node);
            } else {
                result.push(node.value);
            }
            this.inOrderTraversal(node.right, callback, result);
        }
    }

    preOrder(callback) {
        const result = [];
        this.preOrderTraversal(this.root, callback, result);
        return callback ? null : result;
    }

    preOrderTraversal(node, callback, result) {
        if (node !== null) {
            if (callback) {
                callback(node);
            } else {
                result.push(node.value);
            }
            this.preOrderTraversal(node.left, callback, result);
            this.preOrderTraversal(node.right, callback, result);
        }
    }

    postOrder(callback) {
        const result = [];
        this.postOrderTraversal(this.root, callback, result);
        return callback ? null : result;
    }

    postOrderTraversal(node, callback, result) {
        if (node !== null) {
            this.postOrderTraversal(node.left, callback, result);
            this.postOrderTraversal(node.right, callback, result);
            if (callback) {
                callback(node);
            } else {
                result.push(node.value);
            }
        }
    }

    height(node) {
        if (node === null) {
            return -1;
        }
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node, current = this.root, level = 0) {
        if (current === null) {
            return -1;
        }
        if (current === node) {
            return level;
        }
        const leftDepth = this.depth(node, current.left, level + 1);
        if (leftDepth !== -1) {
            return leftDepth;
        }
        return this.depth(node, current.right, level + 1);
    }

    isBalanced() {
        return this.checkBalanced(this.root);
    }

    checkBalanced(node) {
        if (node === null) {
            return true;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        }

        return this.checkBalanced(node.left) && this.checkBalanced(node.right);
    }

    rebalance() {
        const values = this.inOrder(); 
        this.root = this.buildTree(values);
    }

    isBalanced() {
        return this.checkBalanced(this.root);
    }

    checkBalanced(node) {
        if (node === null) {
            return true;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        }

        return this.checkBalanced(node.left) && this.checkBalanced(node.right);
    }

    rebalance() {
        const values = this.inOrder(); // Get all values in sorted order
        this.root = this.buildTree(values);
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const tree = new Tree([5,2,20,50,80,10,15,30,1]);
console.log("Is the tree balanced?");
console.log(tree.isBalanced());

console.log("Level order traversal:");
console.log(tree.levelOrder());

console.log("Pre-order traversal:");
console.log(tree.preOrder());

console.log("Post-order traversal:");
console.log(tree.postOrder());

console.log("In-order traversal:");
console.log(tree.inOrder());

tree.insert(150);
tree.insert(200);
tree.insert(250);
prettyPrint(tree.root);

console.log("Is the tree balanced");
console.log(tree.isBalanced());

console.log("Rebalancing the tree:");
tree.rebalance();
prettyPrint(tree.root);

console.log("Is the tree balanced");
console.log(tree.isBalanced());


