class BaseNode {
    constructor(value) {
        this._value = value;
        this._left = null;
        this._right = null;
        this._height = 1;
    }

    get left() { return this._left; }    

    get right() { return this._right; }    

    get value() { return this._value; }

    get height() { return this._height; }

    get balanceFactor() {
        return null;
    };

    insertNodeAVL(value) { }
}

class NullNode extends BaseNode {
    constructor() {
        //this._value = null;
        //this._left = null;
        //this._right = null;
        super();
        this._height = 0;
    }

    get balanceFactor() {
        return 0;
    };

    insertNodeAVL(value) {
        return new Node(value);
    };
};

class Node extends BaseNode {
    constructor(value) {
        //this._value = value;        
        super(value);
        //this._value = value;        
        this._left = new NullNode();
        this._right = new NullNode();
        this._height = 1;
    }

    get left() { return this._left; }
    set left(left) { this._left = left; }

    get right() { return this._right; }
    set right(right) { this._right = right; }

    get value() { return this._value; }

    get height() { return this._height; }
    set height(height) { this._height = height; }

    get balanceFactor() {
        return this.right.height - this.left.height;
    }

    rightRotate() {
        const left = this.left;
        const leftRight = left.right;

        //Rotation 
        this.left = leftRight;
        left.right = this;

        //Update heights 
        this.height = Math.max(this.left.height, this.right.height) + 1; 
        left.height = Math.max(left.left.height, left.right.height) + 1; 

        // Return new root 
        return left;
    };

    leftRotate() {
        const right = this.right;
        const rightLeft = right.left;

        //Rotation 
        this.right = rightLeft;
        right.left = this;

        //Update heights 
        this.height = Math.max(this.left.height, this.right.height) + 1; 
        right.height = Math.max(right.left.height, right.right.height) + 1; 

        //Return new root 
        return right;
    }; 

    insertNodeAVL(value) {
        if (value < this.value) {
            this.left = this.left.insertNodeAVL(value);                
        }
        else if (value > this.value) {
            this.right = this.right.insertNodeAVL(value);
        }

        this.height = 1 + Math.max(this.left.height, this.right.height); 
        var balanceFactor = this.balanceFactor;        

        if (balanceFactor > 1) {
            if (value < this.right.value)
                this.right = this.right.rightRotate();

            return this.leftRotate();
        }
        if (balanceFactor < -1) {
            if (value > this.left.value)
                this.left = this.left.leftRotate();

            return this.rightRotate();
        }

        return this;
    };
};

class Tree {
    constructor() {
        this.root = new NullNode();
    }

    insertAVL(value) {
        this.root = this.root.insertNodeAVL(value);
    };
    
    toString(node) {
        let str = '';
        if (node.height) {
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

