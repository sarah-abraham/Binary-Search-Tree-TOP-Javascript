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

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);