
class Node{
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree{
  constructor() {
    this.root = null;
  }

  // 通过逆中序（右→根→左）+ 缩进模拟树的垂直结构（向右旋转90°看）
  printTree(root, space = 0, gap = 4) {
    if (!root) return;
    
    // 先打印右子树
    this.printTree(root.right, space + gap, gap);
    // 打印当前节点（带缩进）
    console.log(' '.repeat(space) + root.value);
    // 再打印左子树
    this.printTree(root.left, space + gap, gap);
  }



  /* 
  - 首先创建新节点
  - 从根节点开始检查
    - 若不存在节点，树为空（无根节点），新节点直接作为根节点
    - 若存在节点（根结点），*比较新节点与当前节点数值大小（循环起点）*
    - 若新节点值大
      - 检查当前节点右侧是否有节点
        - 有，则currentNode移动到该节点，重复比较步骤
        - 无，则将新节点插入到当前节点右侧（循环终点）
    - 若新节点值小
      - 检查当前节点的左侧是否有节点
        - 有，则currentNode移动到该节点，重复比较步骤
        - 无，则将新节点插入到当前节点左侧（循环终点）
    - 若新节点值等于当前节点
      - 返回整棵树（循环终点）
  
  */
  insert(val) {
    const newNode = new Node(val);

    // 若不存在节点，树为空（无根节点），新节点直接作为根节点
    if (!this.root) {
      this.root = newNode;
      return this;
    } 

    // 若存在节点（根结点），*比较新节点与当前节点数值大小（循环起点）*
    let currentNode = this.root;
    while (currentNode) {
      // 若新节点值大
      if (newNode.value > currentNode.value) {
        // 检查当前节点右侧是否有节点
        if (currentNode.right) { // 有，则currentNode移动到该节点，重复比较步骤
          currentNode = currentNode.right;
        } else { // 无，则将新节点插入到当前节点右侧（循环终点）
          currentNode.right = newNode;
          return this;
        }
      } else if (newNode.value < currentNode.value) { // 若新节点值小
        // 检查当前节点的左侧是否有节点
        if (currentNode.left) { // 有，则currentNode移动到该节点，重复比较步骤
          currentNode = currentNode.left;
          continue;
        } else { // 无，则将新节点插入到当前节点左侧（循环终点）
          currentNode.left = newNode;
          return this;
        }
      } else {// 若新节点值等于当前节点
        return this;
      }
    }
  }
  
}

const bst = new BinarySearchTree();

// bst.root = new Node(18);
// bst.root.left = new Node(10);
// bst.root.left.left = new Node(5);
// bst.root.left.right = new Node(12);

// insert
bst.printTree(bst.root);
bst.insert(18).insert(10).insert(5).insert(12).insert(28).insert(22).insert(38);
bst.printTree(bst.root);