import React, { Component } from 'react';
import store from '../store'

export default class ReduxPage extends Component {
    componentDidMount() {
        this.unSubscriber = store.subscribe(() => {
            this.forceUpdate()
        })
    }
    click = () => {
        store.dispatch({type: 'ADD'})
    }

    componentWillUnmount() {
        if (this.unSubscriber) {
            this.unSubscriber()
        }
    }

  render() {
    return (
        <div>
            <h1>ReduxPage</h1>
            <p>{store.getState()}</p>
            <button onClick={this.click}>点我</button>
        </div>
    );
  }
}
