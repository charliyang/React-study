import React, { Component } from 'react'
import { connect } from 'react-redux'

class ReactReduxPage extends Component {
    render() {
        const { num, add } = this.props
        return (
            <div>
                <h1>这是一个React-Redux页面</h1>
                <p>{num}</p>
                <button onClick={add}>add</button>
            </div>
        )
    }
}

export default connect(
    state => ({ num: state }),
    {
        add: () => ({type: 'ADD'})
    }
)(ReactReduxPage)