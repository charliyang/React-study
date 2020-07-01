import compose from './compose'

export default function CapplyMiddleware(...middlewares) {
    return createStore => reducer => {
        let store = createStore(reducer)
        // 这是原版的dispatch，这个dispatch只能接受plain object，不能处理异步、promise
        let dispatch = store.dispatch

        const midApi = {
            getState: store.getState,
            dispatch: (action, ...args) => dispatch(action, ...args)
        }
        //对每个中间件注入midApi,扩充milldeware
        const middlewareChins = middlewares.map(middleware => middleware(midApi))

        //加强dispach
        dispatch = compose(...middlewareChins)(store.dispatch)
        return {
            //返回一个加强版的store
            ...store,
            dispatch
        }
    }
}