import React from 'react'

export default class LifeCycle extends React.Component {
    componentDidMount() {
        console.log('componentDidMount', this); //charlie_log
        if (this.props.onMount) {
            this.props.onMount.call(this, this)
        }
    }
    componentWillUnmount() {
        console.log('componentWillUnmount', this); //charlie_log
        if (this.props.unOnMount) {
            this.props.unOnMount.call(this, this)
        }
    }
    render() {
        return null
    }
}
