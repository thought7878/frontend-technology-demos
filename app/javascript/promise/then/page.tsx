export default function Page() {
  function asyncOuter() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("外层数据");
      }, 1000);
    });
  }
  function asyncInner() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("内层数据");
      }, 1000);
    });
  }
  asyncOuter()
    .then((outerResult) => {
      console.log(outerResult);
      return asyncInner();
    })
    .then((innerResult) => {
      console.log(innerResult);
    });

  return "`then`中返回 Promise";
}
