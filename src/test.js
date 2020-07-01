//什么时reduce
const arr = [1, 2, 3, 4];
let reducer = (a, b) => a + b;
console.log(arr.reduce(reducer));

//聚合函数
function f1(a) {
  console.log("a", a);
  return a;
}

function f2(b) {
  console.log("b", b);
  return b;
}

function f3(c) {
  console.log("c", c);
  return c;
}
function compose(...funcs) {  
    //方式1，显然方式已更优雅
    return funcs.reduce((a,b) => (...args) => a(b(...args)))
    //方式2
    // return funcs.reduce((a, b) => {
    //     return (...args) => a(b(...args))
    // })
}
const res = compose(f1, f2, f3)('charlie')
console.log(res)

//柯里化

//1.普通函数处理加法
function add(x, y) {
    return x+y
}
//2.柯里化处理
function addKli(x) {
    return function(y) {
        return x+y
    }
}

const res1 = addKli(1)  //保存了当前x
const res2 = res1(2)
console.log(res2) // 结果为3