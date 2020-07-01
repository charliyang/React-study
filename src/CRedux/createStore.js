export default function createStore(reducer, enhancer) {
    //加强store
  if (enhancer) {
      return enhancer(createStore)(reducer)
  }

  let currentState;
  let currentListeners = [];
  /**
   * 获取当前state
   */
  function getState() {
    return currentState;
  }
  /**
   * 修改状态
   * @param {Object} action
   */
  function dispatch(action) {
    currentState = reducer(currentState, action);
    //store已经发生了变化了
    //接下来，通知组件更新
    currentListeners.forEach((listener) => listener());
  }
  /**
   * 订阅事件
   * @param {Function} listener
   */
  function subscribe(listener) {
    currentListeners.push(listener);
    //简单点就是直接清空currentListener,开发中可以实现过滤
    return () => {
      currentListeners = [];
    };
  }
  //默认执行，赋初始值
  dispatch({ type: "KKKKREDUX/OOOOOO" });
  return {
    getState,
    dispatch,
    subscribe,
  };
}
