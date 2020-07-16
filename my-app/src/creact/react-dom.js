import {TEXT, PLACEMENT} from "./const";


// 下一个但愿任务
let nextUnitOfWork = null

//根节点
let wipRoot = null

// vnode虚拟dom
// node真实dom节点
// 把vnode变成node，然后把node插入到父容器中
function render(vnode, container) {
  // console.log("vnode", vnode); //sy-log
  // vnode->node
  // const node = createNode(vnode);
  // container.appendChild(node);
  wipRoot = {
    node: container,
    props: {
      children:[vnode]
    }
  }
  //进入任务单元
  nextUnitOfWork = wipRoot
}

// 根据传入的vnode，返回node
function createNode(vnode) {
  const {type, props} = vnode;
  let node;
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else {
    node = document.createDocumentFragment();
  }
  updateNode(node, props);
  return node;
}

/**
 * 跟新一个Function组件
 * @param {node} fiber 
 */
function updateFunctionComponent(fiber) {
  const { type, props } = fiber
  const children = [type(props)]
  reconcileChildren(fiber, children)
}

/**
 * 更新一个类组件
 * @param {node} fiber 
 */
function updateClassComponent(fiber) {
  const { type, props } = fiber
  const component = new type(props)
  const children = [component.render()]
  reconcileChildren(fiber, children)
}

// 遍历子节点
function reconcileChildren(workInProgressFiber, children) {
  let prevSibling = null
  for (let i = 0; i < children.length; i++) {
    let child = children[i]
    let newFiber = {
      type: child.type,
      props: child.props,
      node: null,
      base: null,
      return: workInProgressFiber,
      effectTag: PLACEMENT
    }

    //形成链表结构
    if (i === 0) {
      workInProgressFiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
  }
}

/**
 * 更新node节点
 * @param {node} node 
 * @param {Array} nextVal 
 */
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        let eventName = k.slice(2).toLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

//实现fiber-----------

/**
 * 
 * @param {node} fiber 
 */
function updateHostComponent(fiber) {
  //创建一个node
  if (!fiber.node) {
    fiber.node = createNode(fiber)
  }
  //协调子元素
  const { children } = fiber.props
  reconcileChildren(fiber, children)
  console.log("fiber----", fiber)
}

/**
 * 执行当前任务，并且返回下一个任务
 * @param {node}} fiber 
 */
function performUnitOfWork(fiber) {
  //1. 执行当前任务
  const { type } = fiber
  if (typeof type === 'function') {
    console.log('performUnitOfWork-function', fiber)
    type.isReactComponent ? updateClassComponent(fiber) : updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }
  //2. 返回下一个单元任务
  //2.1 有子元素返回子元素
  if (fiber.child) {
    return fiber.child
  }
  //2.2 没有子元素返回兄弟
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.return
  }
}

/**
 * 执行任务，任务是个链表
 * @param {Date} deadLine 当前空闲时间以及回调是否在超时时间前已经执⾏行行的状态
 */
function workLoop(deadLine) {
  //由下一个任务，当前任务还没有执行完成
  while (nextUnitOfWork && deadLine.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  if (!nextUnitOfWork && wipRoot) {
    //执行fiber的第二个阶段，commit phase
    commitRoot()
  }
  requestIdleCallback(workLoop)
}

/**
 * 浏览器空闲的函数栈
 * @param {Array} workLoop 任务队列
 */
requestIdleCallback(workLoop)

function commitRoot() {
  commitWork(wipRoot.child)
  //因为这里处于循环，提交完之后就要设置为null，否则会一直提交
  wipRoot = null
}

function commitWork(fiber) {
  if (!fiber) {
    return
  }
  let parentFiber = fiber.return
  while (!parentFiber.node) {
    parentFiber = parentFiber.return
  }
  const parentNode = parentFiber.node
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    parentNode.appendChild(fiber.node) 
  }
  //处理子元素和兄弟元素
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

export default {render};
