import React, { useReducer, useEffect, useLayoutEffect } from 'react';
import {countReducer} from '../store'

export default function HooksPage(props) {
    const [state, dispatch] = useReducer(countReducer, 0)

    const click = () => {
        dispatch({type: 'ADD', payload: 2})
    }
    // useEffect异步，执行晚一点。官方建议使用useEffect
    useEffect(() => {
        console.log('useEffect', state); //charlie_log
    })
    // useLayoutEffect执行比useEffect早
    useLayoutEffect(() => {
        console.log('useLayoutEffect', state); //charlie_log
    })
    return (
        <div>
            <h3>HooksPage</h3>
            <p>{state}</p>
            <button onClick={click}>click</button>
        </div>
    );
}