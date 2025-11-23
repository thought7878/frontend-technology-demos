
/*

**我的伪代码：**
- 需要两个循环，
- 内部循环：要比较相邻两元素大小
	- 如果左侧元素>右侧，交换两元素的位置
	- 否则（左侧元素<=右侧），当前指针元素右移一位
	- 循环终结条件：最多次数是<=arr.length-1 或 <arr.length，最佳值是<arr.length-外部循环次数（外部循环完成一次就找到了未排序最大值，下次内部循环没必要再跟上次值比较了，上次已经比较了）
- 外部循环：
	- 每次从数组头开始，进行内部循环
	- 循环终结条件：最多次数是<=arr.length-1 或 <arr.length，

 */
function bubbleSort(arr) {

  for (let i = 0; i < arr.length; i++){
    
    for (let j = 0; j < arr.length - i; j++){
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}

console.log('排序结果：',bubbleSort([3,4,1,5,2]));