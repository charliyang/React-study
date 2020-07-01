import isPromise from 'is-promise'
import {isFSA} from 'flux-standard-action'

/**
 * 异步中间件
 * @param {*} param0 
 */
export default function promise({ dispatch }) {
    return next => action => {
      if (!isFSA(action)) {
        return isPromise(action) ? action.then(dispatch) : next(action);
      }
  
      return isPromise(action.payload)
        ? action.payload.then(res => dispatch({...action, payload: res}))
        : next(action);
    };
  }