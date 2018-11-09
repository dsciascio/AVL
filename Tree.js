class Node {
    constructor(value) {
        this._value = value;
        this._left = null;
        this._right = null;
        this._height = 1;
    }

    get left() { return this._left; }
    set left(left) { this._left = left; }

    get right() { return this._right; }
    set right(right) { this._right = right; }

    get value() { return this._value; }

    get height() { return this._height; }
    set height(height) { this._height = height; }
};

class Tree {
    constructor(){
        this.root = null;
    }

    //AVL
    height(node) { 
        if (node == null)
            return 0;

        return node.height;
    }; 

    getBalanceFactor(node) { 
        if (node == null)
            return 0;

        return this.height(node.right) - this.height(node.left);
    };

    insertNodeAVL(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            }
            else
                node.left = this.insertNodeAVL(node.left, newNode);
        }
        else {
            if (node.right === null){
                node.right = newNode;
            }
            else
                node.right = this.insertNodeAVL(node.right, newNode);
        }

        node.height = 1 + Math.max(this.height(node.left), this.height(node.right)); 
        var balanceFactor = this.getBalanceFactor(node);

        if (balanceFactor > 1) {
            if (newNode.value < node.right.value)
                node.right = this.rightRotate(node.right);

            return this.leftRotate(node);
        }
        if (balanceFactor < -1) {
            if (newNode.value > node.left.value)
                node.left = this.leftRotate(node.left);

            return this.rightRotate(node);
        }

        return node; 
    };

    insertAVL(value) {
            var newNode = new Node(value);

            if (this.root === null) {
                newNode.height = 1;
                this.root = newNode;
            }
            else
                this.insertNodeAVL(this.root, newNode);
    };
    
    rightRotate(parent) {         
        var left = parent.left;
        var leftRight = left.right;

        //Rotation 
        parent.left = leftRight;
        left.right = parent;

        //Update heights 
        parent.height = Math.max(this.height(parent.left), this.height(parent.right)) + 1;
        left.height = Math.max(this.height(left.left), this.height(left.right)) + 1;

        // Return new root 
        return left;        
    }; 

    leftRotate(parent) { 
        var right = parent.right;
        var rightLeft = right.left;

        //Rotation 
        parent.right = rightLeft;
        right.left = parent;

        //Update heights 
        parent.height = Math.max(this.height(parent.left), this.height(parent.right)) + 1;
        right.height = Math.max(this.height(right.left), this.height(right.right)) + 1;

        //Return new root 
        return right;        
    }; 
    
    //AVL

    //Insert BTS
    //insert(value) {
    //    var newNode = new Node(value);

    //    if (this.root === null)
    //        this.root = newNode;
    //    else

    //        this.insertNode(this.root, newNode);
    //};
        
    //insertNode(node, newNode)    {
    //    if (newNode.value < node.value) {
    //        if (node.left === null)
    //            node.left = newNode;
    //        else                
    //            this.insertNode(node.left, newNode);
    //    }        
    //    else {
    //        if (node.right === null)
    //            node.right = newNode;
    //        else                
    //            this.insertNode(node.right, newNode);
    //    }
    //};
    //Insert BTS

    print(node) {
        if (node) {
            this.print(node.left);            
            document.writeln(node.value);            
            this.print(node.right);
        }
        else
            return;
    };

    toString(node) {
        let str = '';
        if (node) {
            str = '[' + this.toString(node.left) + `, ${node.value}(${node.height}), ` + this.toString(node.right) + ']';
        }
        return str;
    }

    search(value)
    {
        if (this.root === null)
            return;
        else
            this.searchNode(this.root, value);
    };    

    existNode(node, value) {
        if (node.value === value) {         
            return true;
        }

        if (node.value > value) {
            if (node.left !== null)
                this.searchNode(node.left, value);
            else {
                return false;
            }
        }
        else {
            if (node.right !== null)
                this.searchNode(node.right, value);
            else {
                return false;
            }
        }
    };

    searchNode(node, value) {
        var valueExists = (this.existNode(node, value) ? "Exists: " : "Not Exists");

        document.writeln(valueExists + value);

        return;
    };
}

