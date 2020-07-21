import {TEXT, PLACEMENT, UPDATE, DELETION} from "./const";


// 下一个但愿任务
let nextUnitOfWork = null

//根节点
let wipRoot = null
//当前正在工作的节点
let wipFiber = null
//定义当前root
let currentRoot = null

let deletions = null


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

  deletions = []
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
  updateNode(node, {}, props);
  return node;
}

/**
 * 跟新一个Function组件
 * @param {node} fiber 
 */
function updateFunctionComponent(fiber) {
  //标记当点更新的fiber
  wipFiber = fiber
  // ！源码当中的是对象链表
  wipFiber.hooks = []
  wipFiber.hooksIndex = 0;
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
function reconcileChildren_old(workInProgressFiber, children) {
  let prevSibling = null
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child
  console.log('oldFiber', oldFiber)
  for (let i = 0; i < children.length; i++) {
    let child = children[i]
    let newFiber = null
    //比较节点
    let sameType = child && oldFiber && child.type === oldFiber.type
    if (sameType) {
      //类型相同复用, 更新
      newFiber = {
        type: child.type,
        props: child.props,
        node: oldFiber.node,
        base: oldFiber,
        return: workInProgressFiber,
        effectTag: UPDATE
      }
    }

    if (!sameType && child) {
      //类型不同，但是child存在，新增
      newFiber = {
        type: child.type,
        props: child.props,
        node: null,
        base: null,
        return: workInProgressFiber,
        effectTag: PLACEMENT
      }
    }

    if (!sameType && oldFiber) {
      //删除
      oldFiber.effectTag = DELETION
      deletions.push(oldFiber)
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
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

function placeChild(newFiber, lastPlacedIndex, newIndex, shouldTrackSideEffects) {
  newFiber.index = newIndex;
  if (!shouldTrackSideEffects) {
    // 初次渲染 不用考虑移动位置
    return lastPlacedIndex;
  }

  let base = newFiber.base;
  if (base !== null) {
    let oldIndex = base.index;
    if (oldIndex < lastPlacedIndex) {
      // This is a move.
      return lastPlacedIndex;
    } else {
      // This item can stay in place.
      return oldIndex;
    }
  } else {
    // This is an insertion.
    newFiber.effectTag = PLACEMENT;
    return lastPlacedIndex;
  }
}

function reconcileChildren(returnFiber, newChildren) {
  //记录上一次的fiber
  let prevNewFiber = null
  let oldFiber = returnFiber.base && returnFiber.base.child
  //记录上次插入位置
  let lastPlacedIndex = 0
  //遍历children的下标
  let newIndex = 0
  //记录oldFiber
  let nextOldFiber = null
  let shouldTrackSideEffects = true
  if (!oldFiber) {
    //oldFiber为null时证明是初次渲染
    shouldTrackSideEffects = false
  }

  //初次渲染
  if ((oldFiber === undefined)) {
    for (; newIndex < newChildren.length; newIndex++) {
      let newChild = newChildren[newIndex]
      const newFiber = {
        key: newChild.key,
        type: newChild.type,
        props: newChild.props,
        node: null,
        base: null,
        return: returnFiber,
        effectTag: PLACEMENT
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIndex, shouldTrackSideEffects)
      
      if (prevNewFiber === null) {
        //头结点
        returnFiber.child = newFiber
      } else {
        prevNewFiber.sibling = newFiber
      }
      prevNewFiber = newFiber
    }
    return
  }

  //更新
  for (; oldFiber !== null && newIndex < newChildren.length; newIndex++) {
    console.log('oldFiber', oldFiber)
    if (oldFiber.index > newIndex) {
      nextOldFiber = oldFiber
      oldFiber = null
    } else {
      nextOldFiber = oldFiber.sibling
    }
    let newChild = newChildren[newIndex]
    if (!(newChild.type === oldFiber.type && newChild.key === oldFiber.key)) {
      if (oldFiber === null) {
        oldFiber = nextOldFiber
      }
      break
    }
    const newFiber = {
      key: newChild.key,
      type: newChild.type,
      props: newChild.props,
      node: oldFiber.node,
      base: oldFiber,
      return: returnFiber,
      effectTag: UPDATE
    }
    if (shouldTrackSideEffects) {
      if (oldFiber && newFiber.base === null) {
        deletions.push({
          ...oldFiber,
          effectTag: DELETION
        })
      }
    }
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIndex,
      shouldTrackSideEffects
    );
    if (prevNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      prevNewFiber.sibling = newFiber;
    }
    prevNewFiber = newFiber;
    oldFiber = nextOldFiber
  }

  const existingChildren = mapRemainingChildren(returnFiber, oldFiber);
  for (; newIndex < newChildren.length; newIndex++) {
    let newChild = newChildren[newIndex];
    let newFiber = {
      key: newChild.key,
      type: newChild.type,
      props: newChild.props,
      return: returnFiber
    };
    const matchedFiber = existingChildren.get(
      newChild.key === null ? newIndex : newChild.key
    );
    if (matchedFiber) {
      newFiber = {
        ...newFiber,
        node: matchedFiber.node,
        base: matchedFiber,
        effectTag: UPDATE
      };
      shouldTrackSideEffects &&
        existingChildren.delete(newChild.key === null ? newIndex : newChild.key);
    } else {
      newFiber = {
        ...newFiber,
        node: null,
        base: null,
        effectTag: PLACEMENT
      };
    }
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIndex,
      shouldTrackSideEffects
    );
    if (prevNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      prevNewFiber.sibling = newFiber;
    }
    prevNewFiber = newFiber;
  }

  if (shouldTrackSideEffects) {
    existingChildren.forEach(child =>
      deletions.push({
        ...child,
        effectTag: DELETION
      })
    );
  }
}

function mapRemainingChildren(returnFiber, currentFirstChild) {
  const existingChildren = new Map();
  let existingChild = currentFirstChild;
  while (existingChild) {
    if (existingChild.key !== null) {
      existingChildren.set(existingChild.key, existingChild);
    } else {
      existingChildren.set(existingChild.index, existingChild);
    }
    existingChild = existingChild.sibling;
  }
  return existingChildren;
}

/**
 * 更新node节点
 * @param {node} node 
 * @param {Array} nextVal 
 */
function updateNode(node, prevVal, nextVal) {

  Object.keys(prevVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        let eventName = k.slice(2).toLowerCase();
        node.addEventListener(eventName, prevVal[k]);
      } else {
        if (!(k in nextVal)) {
          node[k] = ''
        }
      }
    });

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
  // console.log("fiber----", fiber)
}

/**
 * 执行当前任务，并且返回下一个任务
 * @param {node}} fiber 
 */
function performUnitOfWork(fiber) {
  //1. 执行当前任务
  const { type } = fiber
  if (typeof type === 'function') {
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
  deletions.forEach(commitWork);
  commitWork(wipRoot.child)
  //因为这里处于循环，提交完之后就要设置为null，否则会一直提交,置空前保存当前wipRoot
  currentRoot = wipRoot
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
  }else if (fiber.effectTag === DELETION && fiber.node !== null) {
    commitDeletions(fiber, parentNode);
  } else if (fiber.effectTag === UPDATE && fiber.node !== null) {
    updateNode(fiber.node, fiber.base.props, fiber.props);
  } 
  //处理子元素和兄弟元素
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function commitDeletions(fiber, parentNode) {
  if (fiber.node) {
    parentNode.removeChild(fiber.node)
  } else {
    commitDeletions(fiber.child, parentNode)
  }
}



/**
 * 创建useState
 * @param {any} init 
 */
export function useState(init) {
  const oldHook = wipFiber.base && wipFiber.base.hooks[wipFiber.hooksIndex]
  const hook = oldHook
    ? {
        state: oldHook.state,
        quene: oldHook.quene
      }
    : {
        state: init,
        quene: []
      }

  //模拟跟新
  hook.quene.forEach(action => {
    hook.state = action
  })
  const setState = (action) => {
    hook.quene.push(action)
    wipRoot = {
      node: currentRoot.node,
      props: currentRoot.props,
      base: currentRoot
    }
    nextUnitOfWork = wipRoot
    deletions = [];
  }

  wipFiber.hooks.push(hook)
  wipFiber.hooksIndex++
  return [hook.state, setState]
}

export default {render};
