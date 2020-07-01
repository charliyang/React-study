// 1. 引入store
// import { createStore } from "redux";
import { createStore } from "../CRedux/";
//2. 创建store
const store = createStore(counterFun);

//更改store状态的方法
function counterFun(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

//4. 导出store
export default store;
