
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
          // continue;
        } else { // 无，则将新节点插入到当前节点右侧（循环终点）
          currentNode.right = newNode;
          return this;
        }
      } else if (newNode.value < currentNode.value) { // 若新节点值小
        // 检查当前节点的左侧是否有节点
        if (currentNode.left) { // 有，则currentNode移动到该节点，重复比较步骤
          currentNode = currentNode.left;
          // continue;
        } else { // 无，则将新节点插入到当前节点左侧（循环终点）
          currentNode.left = newNode;
          return this;
        }
      } else {// 若新节点值等于当前节点
        return this;
      }
    }
  }

  /* 
  
  **伪代码/pseudo code：**

  - 边界情况：如果没有root，return null
  - 循环开始，终止条件是currentNode有值
    - 比较currentNode.value与val的大小
      - 如果currentNode.value等于val
        - 找到了，return currentNode，终止循环
      - 如果currentNode.value小于val
        - currentNode.right是否存在
          - 是，currentNode移动到right，继续循环
          - 否，没找到，return null，终止循环
      - 如果currentNode.value大于val
        - currentNode.left是否存在
          - 是，currentNode移动到left，继续循环
          - 否，没找到，return null，终止循环
  */
  find(val) {
    // 边界情况：如果没有root，return null
    if (!this.root) return null;

    // 循环开始，终止条件是currentNode有值
    let currentNode = this.root;
    while (currentNode) {
      // 比较currentNode.value与val的大小
      // 如果currentNode.value等于val
      if (currentNode.value === val) {
        // 找到了，return currentNode，终止循环
        return currentNode;
      } else if (val>currentNode.value) {// 如果currentNode.value小于val
        // currentNode.right是否存在
        if (currentNode.right) {// 是，currentNode移动到right，继续循环
          currentNode = currentNode.right;
          continue;
        } else {// 否，没找到，return null，终止循环
          return null;
        }
      } else {// 如果currentNode.value大于val
        // currentNode.left是否存在
        if (currentNode.left) {// 是，currentNode移动到left，继续循环
          currentNode = currentNode.left;
          continue;
        } else {// 否，没找到，return null，终止循环
          return null;
        }
      }
    }
  }



  /* 

  **我的伪代码/Pseudo Code：**
  - 创建函数 traversal：
    - 输入是tree
    - 输出是包含树节点的数组
  - 创建变量queue（保存即将遍历的tree节点），初始值是tree.root；变量visited（保存已经遍历的tree节点）
  - while循环，终结条件是queue不为空
    - 取出queue的头节点（这里使用数组，链表还需修改头节点），放入visited
    - 判断刚操作的节点是否有左右子节点
      - 有，依次放入queue中
      - 没有，什么也不做

  */
  traversal() {
    let queue = [this.root];
    let visited=[]
    let currentNode = null;

    while (queue.length !== 0) {
      currentNode = queue.shift();
      visited.push(currentNode);
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    return visited;
  }


  /* 

  **我的伪代码/pseudo code：**
  - 创建函数preOrder，输入是node，输出是visited（遍历node的数组）
  - 创建变量visited（保存遍历过的node）
  - 如果node有值，将node放入visited；没值，返回
  - 判断node是否有左右子节点
    - 有左子节点，递归调用自己recurseNode(左子节点)；没有左子节点，什么也不做或return。
    - 有右子节点，递归调用自己recurseNode(右子节点)；没有右子节点，什么也不做或return。

  */
  preOrder(root) {
    
    let visited = [];
    function recurseNode(node) {
      if (!node) return;

      visited.push(node);

      if (node.left) {
        recurseNode(node.left);
      } else {
        return;
      }
      if (node.right) {
        recurseNode(node.right);
      } else {
        return;
      }
    }

    recurseNode(root);

    return visited;
  }


  /* 

  **我的伪代码/pseudo code：**
  - 创建函数postOrder，输入是node，输出是visited（遍历node的数组）
  - 创建变量visited（保存遍历过的node）
  - 边界条件：如果node没值，返回
  - 判断node是否有左右子节点
    - 有左子节点，递归调用自己recurseNode(左子节点)；没有左子节点，什么也不做或return。
    - 有右子节点，递归调用自己recurseNode(右子节点)；没有右子节点，什么也不做或return。
  - 将node放入visited
  */
  postOrder(root) {
    
    let visited = [];

    function recurseNode(node) {
      if (!node) return;
      if (node.left) recurseNode(node.left);
      if (node.right) recurseNode(node.right);
      // 后序遍历，放在最后处理
      visited.push(node);
    }

    recurseNode(root);
    return visited;
  }


  /* 

  **我的伪代码/pseudo code：**
  - 创建函数inOrder，输入是node，输出是visited（遍历node的数组）
  - 创建变量visited（保存遍历过的node）
  - 边界条件：如果node没值，返回
  - 有左子节点，递归调用自己recurseNode(左子节点)；没有左子节点，什么也不做或return。
  - 将node放入visited
  - 有右子节点，递归调用自己recurseNode(右子节点)；没有右子节点，什么也不做或return。
  */
  inOrder(root) {
    
    let visited = [];
    function recurseNode(node) {
      if (!node) return;

      if (node.left) recurseNode(node.left);
      visited.push(node);
      if (node.right) recurseNode(node.right);

    }

    recurseNode(root);

    return visited;
  }



  
}

const bst = new BinarySearchTree();

// bst.root = new Node(18);
// bst.root.left = new Node(10);
// bst.root.left.left = new Node(5);
// bst.root.left.right = new Node(12);

// insert
// bst.printTree(bst.root);
bst.insert(18).insert(10).insert(5).insert(12).insert(28).insert(22).insert(38);
bst.printTree(bst.root);

// find()
// console.log(bst.find(38));
// console.log(bst.find(23));
// console.log(bst.find(1));

// traversal()
// console.log(bst.traversal());

// preOrder()
// console.log(bst.preOrder(bst.root));
// postOrder()
// console.log(bst.postOrder(bst.root));
// inOrder()
console.log(bst.inOrder(bst.root));
