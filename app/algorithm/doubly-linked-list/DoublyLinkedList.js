class Node{

  constructor(val) {
    this.value = val;
    this.previous = null;
    this.next = null;
  }
  
}


class DoublyLinkedList{

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
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
    if (this.length === 0) return false;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return true;
    }

    let prevNode = this.tail.previous;
    prevNode.next = null;
    this.tail.previous = null;
    this.tail = prevNode;
    this.length--;
    return true;
    
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
  
}


let list = new DoublyLinkedList();
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);

console.log('原链表：', list.print());

list.pop()

console.log(list.print());