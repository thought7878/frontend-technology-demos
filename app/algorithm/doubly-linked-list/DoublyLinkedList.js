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
  
}