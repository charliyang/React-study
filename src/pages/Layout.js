import React, { Component } from 'react'
import TopBar from '../component/TopBar';
import BottomBar from '../component/BottomBar';

class Layout extends Component {
    componentDidMount() {
        const { title = 'Charlie' } = this.props
        document.title = title
    }
    render() {
        const { children, topBar, bottomBar } = this.props
        console.log('children', children);
        
        return (
            <div>
                {topBar && <TopBar />}
                {children.content}
                {children.text}
                <button onClick={children.btnClick}>点我</button>
                {bottomBar && <BottomBar/>}
            </div>
        )
    }
}

export default Layout