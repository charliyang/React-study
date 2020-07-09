import LoginService from "../service/login"
import {LOGIN_SAGA, LOGOUT_SAGA,LOGIN_SUCCESS, REQUEST, LOGIN_FAILURE} from "./const.js"
//不是用redux-saga-----
// export const login = userInfo => {
//     return async (dispatch) => {
//         dispatch({ type: REQUEST })
//         const res = await loginPromise(dispatch, userInfo)
//         if (res) {
//             getMoreUserInfo(dispatch, res)
//         }
//     }
// }

// const loginPromise = (dispatch, userInfo) => {
//     return LoginService.login(userInfo).then(res => {
//         return res
//     }, err => {
//         dispatch({type: LOGIN_FAILURE, payload: err})
//     })
// }


// const getMoreUserInfo = (dispatch, userInfo) => {
//     return LoginService.getMoreUserInfo(userInfo).then(
//         res => {
//           dispatch({type: LOGIN_SUCCESS, payload: res});
//         },
//         err => {
//           dispatch({type: LOGIN_FAILURE, payload: err});
//         }
//       );
// }


//使用redux-saga
export const login = userInfo => ({
    type: LOGIN_SAGA,
    payload: userInfo
})

export const logout = userInfo => ({
    type: LOGOUT_SAGA,
    payload: userInfo
})





