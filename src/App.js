import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route, 
  Link,
  Switch,
  Prompt,
  withRouter,
  useRouteMatch,
} from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import UserPage from './pages/UserPage'
import _404Page from './pages/_404Page'


function App() {
  return (
    <div className="App"> 
      <Router>
        <Link to="/">首页</Link>
        <Link to="/login">登录</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/product/1">商品</Link>
      
        <Switch>
          <Route exact path='/'
            // children={Child}
            component={HomePage}
          />
          <Route path='/login' component={LoginPage} />
          <Route path='/user' component={UserPage} />
          <Route path='/product/:id' render={() => <Product/>} />
          <Route component={_404Page}/>
        </Switch>
      </Router>
    </div>
  );
}

// 类组件实现product
@withRouter
class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirm: true,
    }
  }
  render() {
    const { id } = this.props.match.params
    return (
      <div>
        <p>{id}</p>
        <Prompt when={this.state.confirm} message='hi Are you sure you want to leave?'/>
      </div>
    )
  }
}


// 函数实现Product
// function Product(props) {
//   const match = useRouteMatch()
//   const { url, params } = match
//   const { id } = params
//   console.log('match', match); //charlie_log
//   console.log('props', props); //charlie_log
//   return (
//     <div>
//       Productid: {id}
//       <Link to={url + '/detail'} />
//       <Route path={url + '/detail'} component={detail}/>
//     </div>
//   )
// }

// function detail() {
//   return (
//     <div>
//       <h1>this is detail</h1>
//     </div>
//   )
// }

// function Child() {
//   return (
//     <div>
//       <h1>这是一个Child</h1>
//     </div>
//   )
// }

export default App;
