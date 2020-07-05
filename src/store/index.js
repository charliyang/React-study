// 1. 引入store
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import promise from "redux-promise";
//2. 创建store
const store = createStore(counterFun, applyMiddleware(thunk, logger, promise));

//更改store状态的方法
function counterFun(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - action.payload || 1;
    default:
      return state;
  }
}

//4. 导出store
export default store;
