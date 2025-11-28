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
}


let list = new DoublyLinkedList();
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);

console.log('原链表：', list.print());

// list.pop()
// list.shift();
list.unshift(0);

console.log(list.print());