import React, { Component } from "react";

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  //挂在完成之后执行
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date(),
      });
    }, 1000);
  }
  // 组件卸载前清楚定时器ß
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { date } = this.state;
    return (
      <div>
        <h1>这是 ClassComponent</h1>
        <h2>{date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

export default ClassComponent;
