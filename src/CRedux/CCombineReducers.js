//创建一个组合多个reducer的高阶函数，返回一个组合后的reducers
//reducers的结构{reducer1: reducer1, reducer2: reducer2...}
function combineReducer(reducers) {
  //1.首先取到所有reducers的key
  const reducerKeys = Object.keys(reducers),
    len = reducerKeys.length;
  const finalReducers = {}; //存放所有有用的redecer
  //筛选所有有用的reducer
  for (let i = 0; i < len; i++) {
    const key = reducerKeys[i];
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  //存放所有有用的reducer key方便下面combination查找遍历
  const finalReducersKeys = Object.keys(finalReducers);
  return function combination(state = {}, action) {
    let hasChange = false,
      len = finalReducersKeys.length;
    const nextState = {};
    for (let i = 0; i < len; i++) {
      //1.先取出一个key
      const key = finalReducersKeys[i];
      //2.根据key找到对应的reducer
      const reducer = finalReducers[key];
      //3.执行当前action,得到最新的state
      const currentStateForKey = state[key];
      const nextStateForKey = reducer(currentStateForKey, action);
      if (typeof nextStateForKey === "undefined") return false;
      nextState[key] = nextStateForKey;
      //排除重复执行
      hasChange = hasChange || nextStateForKey !== currentStateForKey;
    }
    hasChange =
    hasChange || finalReducersKeys.length !== Object.keys(state).length;
    return hasChange ? nextState : state;
  };
}
export default combineReducer;
