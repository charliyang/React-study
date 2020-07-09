import React from 'react';
import {
    BrowserRouter as Router,
    Route, 
    Link,
    Switch,
    Prompt,
    withRouter,
    useRouteMatch,
} from 'react-router-dom'
import BttomNav from '../component/bottomNav'
  
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import UserPage from '../pages/UserPage'
import _404Page from '../pages/_404Page'
import PrivateRoute from './PrivateRoute';
import OlistPage from '../pages/OlistPage';
import CartPage from '../pages/CartPage';


export const routes = [
  {
    path: "/",
    exact: true,
    component: HomePage
  },
  {
    path: "/user",
    component: UserPage,
    auth: PrivateRoute
  },
  {
    path: "/cart",
    component: CartPage
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/olist",
    component: OlistPage
  },
  {
    component: _404Page
  }
]

export default function Routes(props) {
    return (
      <Router>
        <BttomNav />
      
        <Switch>
        {routes.map(Route_ =>
          Route_.auth
            ? (<Route_.auth key={Route_.path + "route"} {...Route_} />)
            : (<Route key={Route_.path + "route"} {...Route_} />)
        )}
        </Switch>
      </Router>
    )
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