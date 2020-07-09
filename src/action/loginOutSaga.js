// 1. 调用异步操作 call
// 2. 状态更新 （dispatch) put
// 3. 做监听 take takeEvery

import { LOGOUT_SAGA, REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from './const'
import LogoutService from '../service/logout'
import {put, call, takeEvery} from 'redux-saga/effects'


//work sage
function* logoutHandle(action) {
    console.log('logoutHandle', action);
    
    yield put({
        type: REQUEST
    })
    try {
        //调用异步操作
        const res = yield call(LogoutService.logout, action.payload)
        yield put({
            type: LOGOUT_SUCCESS,
            payload: res
        })
    } catch (err) {
        console.log('handleLogout', err);
        yield put({
            type: LOGOUT_FAILURE,
            payload: err
        })
    }
}

//watcher sage
function* LogoutSaga() {
    // 方法一： 使用takeEvery
    console.log('LogoutSaga', "LogoutSaga----2"); //charlie_log
    yield takeEvery(LOGOUT_SAGA, logoutHandle)
}

//手写一个takeEvery，用take
// const takeEvery = (pattern, saga, ...args) =>
//   fork(function*() {
//     while (true) {
//       const action = yield take(pattern);
//       yield fork(saga, ...args.concat(action));
//     }
//   })
export default LogoutSaga