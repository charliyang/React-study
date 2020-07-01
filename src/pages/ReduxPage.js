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
    asyAdd = () => {
        store.dispatch((dispatch, getState) => {
            console.log("getState", getState()); //sy-log
            // 模拟dispatch的延迟
            // ajax(()=>{
            //   dispatch({type: "ADD"});
            // })
            setTimeout(() => {
              dispatch({type: "ADD"});
            }, 1000);
          })
    }

    promiseMinus = () => {
        store.dispatch(Promise.resolve({type: "MINUS",
        payload: 100}))
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
            <button onClick={this.asyAdd}>asyAdd</button>
            <button onClick={this.promiseMinus}>promiseMinus</button>
        </div>
    );
  }
}
