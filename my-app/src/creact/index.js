import {TEXT} from "./const";

function createElement(type, config, ...children) {
  if (config) {
    delete config.__self;
    delete config.__source;
  }
  const props = {
    ...config,
    children: children.map(child =>
      typeof child === "object" ? asignProps(child) : createTextNode(child)
    )
  };
  return {type, props};
}

function asignProps(child) {
  const { type, props } = child
  if (typeof type !== 'undefined' && type.defaultProps) {
    const { defaultProps } = type
    Object.assign(defaultProps, props)
    child.props = defaultProps
  }
  return child
}

function createTextNode(text) {
  return {
    type: TEXT,
    props: {
      children: [],
      nodeValue: text
    }
  };
}

export default {
  createElement
};
