import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

@connect(
    ({ user }) => ({isLogin: user.isLogin})
)
class PrivateRoute extends Component {
    render() {
        const {isLogin, component: Component, ...resPro} = this.props
        return (
            <Route {...resPro}
                render={
                    props => isLogin ? (<Component {...props} />)
                        : (<Redirect to={{pathname: '/login', state: {from: props.location.pathname}}}/>)
                }
            />
        )
    }
}

export default PrivateRoute
