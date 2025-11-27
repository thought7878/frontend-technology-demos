
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


  /*

- 函数reverse，输入是list，输出是reversedList
- 边界条件：list为null/undefined/length=0，return null/undefined；list为只有1个元素，
- 循环遍历list，while的终止条件是current != null
	- 如果current是head，current.next=null
	- 如果current是tail，
	- 其他情况，
		- 保存前一个节点（previous），保存下一个节点（next）；
		- 将当前节点的下一节点指向前一节点previous，current.next=previous；
		- 更新previous为current，更新current为next，更新next为next.next；

1->2->3->4  null
p  c  n 
   p  c  n
      p  c  n 
         p  c    n
*/

  reverse() {
    let list = this;
    
    if (!list) {
      return undefined;
    } else if(list.length===1) {
      return list;
    }  

    let prev = null;
    let current = list.head;
    let next = list.head.next;
  
    while (current) {
      current.next = prev;
      prev = current;
      current = next;
      next = next?.next;
    }
    
    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;

    return list;
  }
  
}



let list = new SinglyLinkedList();
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
console.log('before: ',list);

list.reverse();
console.log('reversed: ',list);