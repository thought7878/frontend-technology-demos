class Node{

  constructor(val) {
    this.value = val;
    this.next = null;
  }
  
}


class SinglyLinkedList{

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    // if(val !== null)

    let node = new Node(val);

    if (!this.head) {
      this.head = node;
      this.tail = node;
      this.length++;
      return true;
    }
    this.tail.next = node;
    this.tail = node;
    this.length++;

    return true;
  }
  
}