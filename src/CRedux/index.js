import React, { useContext, useEffect, useReducer, useLayoutEffect } from 'react'

const Context = React.createContext()

export const connect = (
    mapStateToProps = state => state,
    mapDispatchToProps
) => WrapperComponent => props => {
    const store = useContext(Context)
    const { getState, dispatch, subscribe } = store
    const stateProps = mapStateToProps(getState())

    let dispatchProps = {
        dispatch
    }
    if (typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(dispatch)
    } else if (typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreator(mapDispatchToProps, dispatch)
    }


    // 函数组件实现forceUpdate的方法
    const [, forceUpdate] = useReducer(x => x + 1, 0)

    useEffect(() => {
        const unsubscribe = subscribe(() => {
            forceUpdate()
        })
        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [store, subscribe])
    return <WrapperComponent {...props} {...stateProps} {...dispatchProps}/>
}

export function Provider({ children, store }) {
    return <Context.Provider value={store}>{children}</Context.Provider>
}



function bindActionCreator(creater, dispatch) {
    return (...args) => dispatch(creater(...args))
}

/**
 * 自定义bindActionCreaters函数
 * @param {Object} creaters 
 * @param {Function} dispatch 
 */
export default function bindActionCreators(creaters, dispatch) {
    let obj = {}
    for (let key in creaters) {
        obj[key] = bindActionCreator(creaters[key], dispatch)
    }
}

/**
 * 自定义一个useSelector Hooks
 * @param {Function} selector 
 */
export function useSelector(selector) {
    const store = useStore()
    const { getState, subscribe } = store
    const selectState = selector(getState())
    // 函数组件实现forceUpdate的方法
    const [, forceUpdate] = useReducer(x => x + 1, 0)
    useLayoutEffect(() => {
        const unSubscribe = subscribe(() => {
            forceUpdate()
        })
        return () => {
            if (unSubscribe) {
                unSubscribe()
            }
        }
    }, [store])
    return selectState
}

export function useDispatch() {
    const store = useStore()
    return store.dispatch
}

export function useStore() {
    const store = useContext(Context)
    return store
}
