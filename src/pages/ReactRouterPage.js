import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

class ReactRouterPage extends Component {
    render () {
        return (
            <div>
                <h1>this is a react-router</h1>
                <Router>
                    <Link to="/">首页</Link>
                    <Link to="/user">首页</Link>
                    <Route exact path="/" component={HomePage}></Route>
                    <Route path="/user" component={UserPage}></Route>
                </Router>
            </div>
        )
    }
}

export default ReactRouterPage


class HomePage extends Component {
    render () {
        return (
            <div>
                <h1>this is HomePage</h1>
            </div>
        )
    }
}


class UserPage extends Component {
    render () {
        return (
            <div>
                <h1>this is UserPage</h1>
            </div>
        )
    }
}


