import {Route, Switch} from 'react-router-dom'

import Login from './components/LoginPage'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/protectedRoute'
import RestaurantDetailItem from './components/RestaurantDetailItem'
import Profile from './components/Profile'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute exact path="/profile" component={Profile} />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={RestaurantDetailItem}
    />

    <Route component={NotFound} />
  </Switch>
)

export default App
