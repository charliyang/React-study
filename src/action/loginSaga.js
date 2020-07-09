// 1. 调用异步操作 call
// 2. 状态更新 （dispatch) put
// 3. 做监听 take takeEvery

import { LOGIN_SAGA, LOGIN_SUCCESS, REQUEST, LOGIN_FAILURE } from './const'
import LoginService from '../service/login'
import {put, call, take, fork} from 'redux-saga/effects'


//work sage
function* loginHandle(action) {
    console.log('loginHandle', action);
    
    yield put({
        type: REQUEST
    })
    try {
        //调用异步操作
        const res = yield call(LoginService.login, action.payload)
        const res2 = yield call(LoginService.getMoreUserInfo, res)
        yield put({
            type: LOGIN_SUCCESS,
            payload: res2
        })
    } catch (err) {
        console.log('handleLogin', err);
        yield put({
            type: LOGIN_FAILURE,
            payload: err
        })
    }
}

//watcher sage
function* LoginSaga() {
    // 方法一： 使用takeEvery
    yield takeEvery(LOGIN_SAGA, loginHandle)
    //方法二： 使用take
    // while (true) {
    //     const action = yield take(LOGIN_SAGA)
    //     //call 是阻塞型的
    //     //fork 物阻塞型
    //     // yield call(loginHandle, action)
    //     yield fork(loginHandle, action)
    //     console.log(action)
    // }
}

//手写一个takeEvery，用take
const takeEvery = (pattern, saga, ...args) =>
  fork(function*() {
    while (true) {
      const action = yield take(pattern);
      yield fork(saga, ...args.concat(action));
    }
  })
export default LoginSaga