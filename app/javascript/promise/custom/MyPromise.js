// 定义三种状态
const state = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class MyPromise {
  // 构造函数，在new Promise的时候立刻执行，通常需要花费一些时间
  constructor(executor) {
    this.state = state.PENDING; // 初始化状态为pending
    this.value = undefined; // 初始化value为undefined
    this.onFulfilledCbs = []; // 存放onFulfilled回调函数,因为可能有多个then
    this.onRejectedCbs = []; // 存放onRejected回调函数

    try {
      executor(this.resolve, this.reject); //立刻执行executor
    } catch (error) {
      this.reject(error); // 如果执行executor时出错，直接reject
    }
  }

  runAllCallbacks = () => {
    // 如果状态是fulfilled，依次执行存入的onFulfilled函数们
    if (this.state === state.FULFILLED) {
      this.onFulfilledCbs.forEach((cb) => cb(this.value));
      this.onFulfilledCbs = []; // 执行完后清空
    }
    // 如果状态是rejected，依次执行存入的onRejected函数们
    if (this.state === state.REJECTED) {
      this.onRejectedCbs.forEach((cb) => cb(this.value));
      this.onRejectedCbs = [];
    }
  };

  // resolve函数，因为使用箭头函数，所以这里的this指向MyPromise实例；如果使用普通函数，需要在new Promise时绑定this
  resolve = (value) => {
    if (this.state !== state.PENDING) return;

    if (value instanceof MyPromise) {
      value.then(this.resolve, this.reject);
      return;
    }
    this.state = state.FULFILLED;
    this.value = value;
    this.runAllCallbacks();
  };

  // reject函数
  reject = (error) => {
    if (this.state !== state.PENDING) return;

    if (error instanceof MyPromise) {
      error.then(this.resolve, this.reject);
      return;
    }
    this.state = state.REJECTED;
    this.value = error;
    this.runAllCallbacks();
  };

  // then方法，接受两个参数，onFulfilled和onRejected
  then(onFulfilled, onRejected) {
    if (onFulfilled == null && onRejected == null) return;

    if (this.state == state.FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.state == state.REJECTED) {
      onRejected(this.value);
    }

    if (this.state == state.PENDING) {
      this.onFulfilledCbs.push(onFulfilled);
      this.onRejectedCbs.push(onRejected);
    }

    this.runAllCallbacks();
  }

  catch(onRejected) {
    this.then(null, onRejected);
  }
}

// 测试
const myPromise = new MyPromise((resolve, reject) => {
  console.log(this, "this");
  setTimeout(() => {
    resolve("Hello, Promise!"); // 1秒后resolve
  }, 1000);
});

// 多个then，每个then都接收了一个回调函数，这些回调函数会被存入对应的数组，等待resolve或reject后依次执行
myPromise.then((value) => {
  console.log("First then:", value); // 1秒后输出Hello, Promise!
});

myPromise.then((value) => {
  console.log("Second then:", value); // 1秒后输出Hello, Promise!
});

myPromise.then((value) => {
  console.log("Third then:", value); // 1秒后输出Hello, Promise!
});
