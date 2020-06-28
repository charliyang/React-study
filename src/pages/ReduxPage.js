import React, { Component } from 'react'
import store from '../store'

class ReduxPage extends Component {
    componentDidMount() {
        store.subscribe(() => {
            this.forceUpdate()
        })
    }
    render() {
        console.log('store', store);
        
        return (
            <div>
                <h1>这是一个Redux页面</h1>
                <p>{store.getState()}</p>
                <button onClick={() => store.dispatch({type: 'ADD'})}>add</button>
            </div>
        )
    }
}

export default ReduxPage