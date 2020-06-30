import React, { Component } from "react";
// import { createForm } from "rc-form";
import Input from "../component/Input";
import createForm from "../component/MyRCForm/";

const nameRules = {
  required: true,
  message: "请输入姓名",
};
const passwordRules = {
  required: true,
  message: "请输入密码",
};
@createForm
class MyRCForm extends Component {
  componentDidMount() {
    this.props.form.setFieldsValue({ username: "charlie" });
  }
  submit = () => {
    const { getFieldsValue, validateFields } = this.props.form;
    console.log("submit", getFieldsValue());
    validateFields((err, val) => {
      if (err) {
        console.log("err", err[0]);
      } else {
        console.log("检验成功");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h1>MyRCForm</h1>
        {getFieldDecorator("username", { rules: nameRules })(
          <Input placeholder="Username" />
        )}
        {getFieldDecorator("password", { rules: passwordRules })(
          <Input placeholder="Password" />
        )}
        <button onClick={this.submit}>submit</button>
      </div>
    );
  }
}

export default MyRCForm;
