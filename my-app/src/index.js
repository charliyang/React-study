// import {Component} from 'react';
// import ReactDOM from 'react-dom';
import React from './creact/';
import ReactDOM from './creact/react-dom'
import Component from './creact/Component'
import './index.css';

//class组件
class ClassComponent extends Component {
  static defaultProps = {
    color: 'red'
  }
  render() {
    return (
      <div className="border">
        ClassComponent-{this.props.name}
        <button onClick={() => { console.log("lslsls") }}>click</button>
        <p className={this.props.color}>{this.props.color}</p>
      </div>
    )
  }
}

//函数组件
function FunctionComponent(props) {
  return <div className="border">FunctionCommponent-{props.name}
    <button onClick={() => {console.log("omg")}}>click</button>
  </div>
}

const jsx = (
  <div className="border">
    <p>张三</p>
    <a href="https://baidu.com">baisud</a>
    <FunctionComponent name="lisi" />
    <ClassComponent name="lalall"/>
  </div>
)


ReactDOM.render(
  jsx,
  document.getElementById('root')
);

