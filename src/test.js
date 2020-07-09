//generator函数测试
function* HelloWorldGenerator() {
  yield 'hello'
  yield 'world'
  return 'end'  //return 表示结束
}

const hw = HelloWorldGenerator()
// console.log(hw.next()); //charlie_log
// console.log(hw.next()); //charlie_log
// console.log(hw.next()); //charlie_log
// console.log(hw.next()); //charlie_log

let a = 0;

function* fun() {
  let aa = yield (a = 1 + 1)
  return aa
}

console.log('a', a); //charlie_log
const f = fun()
// console.log('fun', f.next()); //charlie_log
console.log('fun1', a); //charlie_log