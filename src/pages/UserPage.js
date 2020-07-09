import React, { Component } from 'react'
import { connect } from 'react-redux'
import {logout, login} from '../action/user'

@connect(
    ({ user, out }) => ({ user, out }),
    {login}
)
class UserPage extends Component {
    render() {
        const { user, out } = this.props
        const { id, name, score } = user.userInfo
        const { loading, err } = out.userInfo
        console.log('userPage', this.props); //charlie_log
        return (
            <div>
                <h3>UserPage</h3>
                <p>id: {id}</p>
                <p>name: {name}</p>
                <p>score: {score}</p>
                <button onClick={() => login({name:'小明'})}>{
                    loading ? "loading..." : "click logout"
                }</button>
                {/* <p className="red">{err.msg}</p> */}
            </div>
        )
    }
}

export default UserPage
