import React, { Component } from 'react'
import { RouterContext } from './Context'

export default class Link extends Component {
    static contextType = RouterContext

    //禁止a标签的默认事件
    forbidOriginClick = e => {
        e.preventDefault()
        this.context.history.push(this.props.to)
    }
    render() {
        const { to, children, ...others } = this.props
        return (
            <a href={to} {...others} onClick={this.forbidOriginClick}>
                {children}
            </a>
        )
    }
}
