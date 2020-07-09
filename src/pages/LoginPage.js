import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {login} from '../action/user'

@connect(
    ({ user }) => ({
        isLogin: user.isLogin,
        loading: user.loading,
        err: user.err
    }),
    { login }
)
class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    render() {
        const { isLogin, location, login, err, loading } = this.props
        const {name} = this.state
        if (isLogin) {
            //已经登录
            const { from = '/' } = location.state || {}
            return <Redirect to={from}/>
        }
        //没有登录
        return (
            <div>
                <h1>Login Page</h1>
                <input type="text" value={name} onChange={this.handleChange} />
                <button onClick={() => login({ name })}>{loading ? "loading..." : "click login"}</button>
                <p className="red">{err.msg}</p>
            </div>
        )
    }
}

export default LoginPage
