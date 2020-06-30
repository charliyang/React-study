import React, { Component } from "react";

export default function createForm(Cmp) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.options = {};
    }

    getFieldDecorator = (field, option) => (InputCmp) => {
      this.options[field] = option;
      return React.cloneElement(InputCmp, {
        name: field,
        value: this.state[field] || "",
        onChange: this.handleChange,
      });
    };

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({
        [name]: value, //提问这里为甚是数组包着name
      });
    };
    setFieldsValue = (newStore) => {
      this.setState(newStore);
    };

    getFieldsValue = () => {
      return this.state;
    };

    validateFields = (callback) => {
      let err = [];
      for (let field in this.options) {
        //判断state[field]是否是undefined
        //this.options的结构：{username: {rules: {required: true, message: 'xxxxx'}}}
        //根据field找出校验规则，去判断state中的field是否有值
        let rules = this.options[field].rules;
        if (
          rules.required &&
          (this.state[field] === undefined || this.state[field] === "")
        ) {
          // err.push({[field]: rules.message})
          err.push(`${rules.message}`);
        }
      }
      if (err.length === 0) {
        callback(null, this.state);
      } else {
        callback(err, this.state);
      }
    };

    getForm = () => {
      return {
        form: {
          getFieldDecorator: this.getFieldDecorator,
          setFieldsValue: this.setFieldsValue,
          getFieldsValue: this.getFieldsValue,
          validateFields: this.validateFields,
        },
      };
    };
    render() {
      return <Cmp {...this.props} {...this.getForm()} />;
    }
  };
}
