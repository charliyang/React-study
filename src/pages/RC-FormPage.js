import React, { Component } from 'react';
import { createForm } from 'rc-form'
import Input from '../component/Input'

@createForm()
class RCFromPage extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.form.setFieldsValue({username: 'charlie'})
    }
    submit = () => {
        const {getFieldsValue} = this.props.form
        console.log('submit', getFieldsValue())
    }
    render() {
    console.log('props', this.props)
    //   const {username, password} = this.state
        const {getFieldDecorator} = this.props.form
    return (
        
        <div>
            <h1>RCFromPage</h1>
            {getFieldDecorator('username')(<Input placeholder="Username" />)}
            {getFieldDecorator('password')(<Input placeholder="Password" />)}
            <button onClick={this.submit}>submit</button>
        </div>
    );
  }
}

export default RCFromPage
