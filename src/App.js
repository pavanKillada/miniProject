import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import CartContext from './ReactContext/CartContext'

import Login from './components/LoginPage'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/protectedRoute'
import RestaurantDetailItem from './components/RestaurantDetailItem'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
    isLoading: false,
    orderPlaced: false,
  }

  onClickGoHome = () => {
    this.setState({orderPlaced: false})
  }

  onClickCartItemDash = id => {
    const {cartList} = this.state
    const foodItem = cartList.find(item => item.id === id)
    if (foodItem.added <= 1) {
      const filteredList = cartList.filter(item => item.id !== id)
      this.setState({cartList: filteredList})
    } else {
      const updatedList = cartList.map(item => {
        if (item.id === id) {
          const obj = item
          obj.added -= 1
          obj.totalCost = obj.cost * obj.added
          return obj
        }
        return item
      })
      this.setState({cartList: updatedList})
    }
  }

  onClickPlaceOrder = () => {
    this.setState({orderPlaced: true, cartList: []})
  }

  onClickCartItemPlus = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(item => {
      if (item.id === id) {
        const obj = item
        obj.added += 1
        obj.totalCost = obj.cost * obj.added
        return obj
      }
      return item
    })
    this.setState({cartList: updatedList})
  }

  addCartItem = product => {
    this.setState({isLoading: true})
    const {cartList} = this.state
    const updatedList = cartList.filter(item => item.id !== product.id)
    this.setState({cartList: [...updatedList, product], isLoading: false})
  }

  render() {
    const {cartList, isLoading, orderPlaced} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          onClickCartItemDash: this.onClickCartItemDash,
          onClickCartItemPlus: this.onClickCartItemPlus,
          isLoading,
          orderPlaced,
          onClickOrder: this.onClickPlaceOrder,
          onClickGoHome: this.onClickGoHome,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute
            exact
            path="/restaurants/:id"
            component={RestaurantDetailItem}
          />
          <Route component={NotFound} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
