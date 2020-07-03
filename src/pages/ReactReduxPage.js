import React, { Component } from 'react'
import {connect} from '../CRedux'
@connect(
    count => count,
)
class ReactReduxPage extends Component {
    render() {
        console.log('11111', this.props); //charlie_log
        const {count, dispatch} = this.props
        return (
            <div>
                <h3>ReactReduxPage</h3>
                <p>{count}</p>
                <button onClick={() => dispatch({type: "ADD", payload: 100})}>
                    dispatch add
                </button>
            </div>
        )
    }
}

export default ReactReduxPage