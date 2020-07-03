import React, { useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux'
import { useSelector, useDispatch } from '../CRedux'

function ReactReduxHooksPage(props) {
    const count = useSelector(({ count }) => count)
    const dispatch = useDispatch()
    const add = useCallback(() => {
        dispatch({type: 'ADD', payload: 3})
    }, [])
    return (
        <div>
            <h3>ReactReduxHooksPage</h3>
            <p>{count}</p>
            <button onClick={add}>add</button>
        </div>
    );
}
export default  ReactReduxHooksPage