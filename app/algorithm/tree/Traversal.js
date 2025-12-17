

/* 
代码测试在BinarySearchTree.js的traversal

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
function traversal(tree) {
  let queue = [tree.root];
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

**伪代码/pseudo code：**
- 创建变量visited（保存遍历过的node）
- 创建函数preOrder，输入是node，输出是遍历node的数组
- 如果node有值，将node放入visited；没值，返回
- 判断node是否有左右子节点
	- 有左子节点，递归调用自己preOder(左子节点)；没有左子节点，return。
	- 有右子节点，递归调用自己preOder(右子节点)；没有右子节点，return。

*/
function preOrder(root) {
  
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
      recurseNode(node);
    } else {
      return;
    }
  }

  recurseNode(root);

  return visited;
}
