class Node{

  constructor(val) {
    this.value = val;
    this.previous = null;
    this.next = null;
  }
  
}

/**
 *
 *
 * @class DoublyLinkedList
 */
class DoublyLinkedList{

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }


  print() {
    let listStr = '';
    let current = this.head;
    while (current) {
      listStr = listStr + '<->' + current.value;
      current = current.next;
    }
    return listStr;
  }

  push(val) {
    let node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.previous = this.tail;
      this.tail = node;  
    }
    
    this.length++;
    return this;
  }

  /*
  从尾部删除node。
  1 <-> 2 <-> 3
  h           t 
  伪代码/pseudo code：
    - 边界情况：链表没有node，return false
    - 头部情况：
      - 更新head为null，tail为null
      - length为0
      - return true
    - 中间情况：
      - 找到tail的前一个node
      - 前一个node.next=null，tail.prev=null?
      - 更新tail为前一个node
      - 更新length-1
      - return true
  */
  pop() {
    if (this.length === 0) return null;

    let poppedNode = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
    } else {
      let prevNode = this.tail.previous;
      prevNode.next = null;
      this.tail.previous = null;
      this.tail = prevNode;
      this.length--;
    }
    
    return poppedNode;
    
  }


  /* 
  移除链表开头的节点。
  1 <-> 2 <-> 3
  h           t 
  伪代码/pseudo code：
    - 边界情况：
    - 链表没有node：return null。
    - 只有一个node：head=null，tail=null，length=0。
    - 其他情况：
      - newHead=head.next
      - head.next=null，newHead.previous=null
      - 更新head=newHead
      - 更新length-1
  */
  shift() {
    if (!this.head) return null;

    let shiftedNode = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
    } else {
      let newHead = this.head.next;
      this.head.next = null;
      newHead.previous = null;
      this.head = newHead;
      this.length--;
    }

    return shiftedNode;
  }

  /*
  向双向链表的开头添加一个节点。
  1 <-> 2 <-> 3
  h           t 

  伪代码/pseudo code：
  - 新建Node对象  
  - 如果是空list
    - head/tail为新Node对象
    - length+1
  - 如果不是空list
    - head.previous=newNode
    - newNode.next=head
    - head=newNode
    - length+1
  */
  unshift(val) {
    let newNode = new Node(val);
    if (this.length === 0) {
      this.head = this.tail = newNode;
    } else {
      this.head.previous = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;

    return newNode;
  }

  /*
  根据index，获取对应的node。
  0 <-> 1 <-> 2 <-> 3
  h                 t 

  伪代码/pseudo code：
  - edge case：
    - 如果list为空，return null
    - 如果index<0||index>=length，return null

  - 根据index、length，判断是从头部开始还是尾部开始，如果index<length/2，从头部开始，否则从尾部开始
  - 使用for循环，从头部开始，找node：
    - 终止条件是i<length
    - 计数currentIndex从第一个节点（0）开始，每循环一次加1，直到index===currentIndex，退出循环，返回当前的node
    - 判断是否index===currentIndex，是：return当前的node；否：继续下一次循环
  - 使用for循环，从尾部开始，找node：  
    - 计数currentIndex从最后一个节点（length-1）开始，每循环一次减去1，直到index===currentIndex，退出循环，返回当前的node
    - 判断是否index===currentIndex，是：return当前的node；否：继续下一次循环，currentNode = currentNode.previous;

  - 整个循环都没找到，return null ？？？

  */
  get(index) {
    if (this.length === 0) return null;
    if (index < 0 || index >= this.length) return null;

    let currentNode;
    if (index < this.length/2) {
      currentNode = this.head;
      for (let currentIndex = 0; currentIndex < this.length; currentIndex++) {
        console.log('currentIndex:', currentIndex);
        if (index === currentIndex) {
          return currentNode;
        }
        currentNode = currentNode.next;
      }
    } else {
      currentNode = this.tail;
      for (let currentIndex = this.length - 1; currentIndex >= 0; currentIndex--) {
        console.log('currentIndex:', currentIndex);
        if (index === currentIndex) {
          return currentNode;
        }
        currentNode = currentNode.previous;
      }
    }
    
    // return null;
  }

  /* 
  根据index，更新节点的值
  0 <-> 1 <-> 2 <-> 3

  伪代码/pseudo code：
  - index边界情况：index<0||index>=length return null
  - 获取index节点node：get(index)
  - 修改node.value=val
  - return node
  */
  set(index, val) {
    if (index < 0 || index >= this.length) return null;

    let node = this.get(index);
    if (node) {
      node.value = val;
      return node;
    }
    return null;
  }

  /* 
  在指定index，插入节点。
  0 <-> 1 <-> 2 <-> 3
  h   1              t 
  
  伪代码/pseudo code：
  - index的边界情况：
    - index<0||index>length return null
  - 如果list为空：
    - 调用unshift() 或 push()
  - 在头部插入(index===0)：
    - 调用unshift()
  - 在尾部插入：
    - 调用push()
  - 在中间插入：
    - 根据index，找到对应的节点oldNode=get(index)。如果没有oldNode，return null
    - 根据val，创建新节点newNode
    - 获取前一个节点prevNode=oldNode.previous
    - 修改prevNode.next=newNode; newNode.previous=prevNode; newNode.next=oldNode; oldNode.previous=newNode; length++;
    - return newNode
    

  */
  insert(index, val) {
    // index的边界情况
    if (index < 0 || index > this.length) return null;
    
    // 如果list为空
    if (this.length === 0) return this.unshift(val);

    // 在头部插入
    if (index === 0) return this.unshift(val);

    // 在尾部插入
    if (index === this.length) return this.push(val);

    // 在中间插入
    let oldNode = this.get(index);
    if (!oldNode) return null;
    let newNode = new Node(val);
    let prevNode = oldNode.previous;
    prevNode.next = newNode;
    newNode.previous = prevNode;
    newNode.next = oldNode;
    oldNode.previous = newNode;
    this.length++;
    
    return newNode;
  }

  /* 
  根据index，删除节点。
    0 <-> 1 <-> 2 <-> 3
    h           d      t 
  
  伪代码/pseudo code：
  - 边界情况：如果index<0||index>=length，return null

  - 删除头部：
    - 如果index===0，调用shift()
  - 删除尾部：
    - 如果index===length-1，调用pop()
  - 删除中间：
    - 根据index找到要删除的节点deletingNode；获取前一个节点prevNode；获取后一个节点nextNode；
    - 改变prevNode的关系：prevNode.next=nextNode
    - 改变deletingNode的关系：deletingNode.previous=null;deletingNode.next=null;
    - 改变nextNode的关系：nextNode.previous=prevNode;
    - length--;
    - return deletingNode
  */
  remove(index) {
    if (index < 0 || index >= this.length) return null;

    // 删除头部
    if (index === 0) return this.shift();

    // 删除尾部
    if (index === this.length - 1) return this.pop();
    
    // 删除中间
    let deletingNode = this.get(index);
    let prevNode = deletingNode.previous;
    let nextNode = deletingNode.next;
    prevNode.next = nextNode;
    deletingNode.previous = null;
    deletingNode.next = null;
    nextNode.previous = prevNode;
    this.length--;

    return deletingNode;
  }
}


let list = new DoublyLinkedList();
list.push(0);
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);

console.log('原链表：', list.print());

// list.pop()
// list.shift();
// list.unshift(0);



// console.log(list.print());

// console.log(list.get(3));
// console.log(list.get(5));
// console.log(list.get(2));
// console.log(list.get(1));

// list.insert(0,0);
// console.log(list.print());
// console.log(list);

list.remove(0)
console.log(list.print());
console.log(list);
