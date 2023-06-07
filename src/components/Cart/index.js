/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import CartItem from '../CartItem'
import './index.css'

class Cart extends Component {
  state = {
    cartList: [],
    orderPlaced: false,
  }

  componentDidMount() {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    if (cartData !== null) {
      this.setState({cartList: cartData})
    }
  }

  onClickGoHome = () => {
    this.setState({orderPlaced: false})
  }

  onClickCartItemDash = id => {
    const {cartList} = this.state
    const foodItem = cartList.find(item => item.id === id)
    if (foodItem.quantity <= 1) {
      const filteredList = cartList.filter(item => item.id !== id)
      localStorage.setItem('cartData', JSON.stringify(filteredList))
      this.setState({cartList: filteredList})
    } else {
      const updatedList = cartList.map(item => {
        if (item.id === id) {
          const obj = item
          obj.quantity -= 1
          obj.totalCost = obj.cost * obj.quantity
          return obj
        }
        return item
      })
      localStorage.setItem('cartData', JSON.stringify(updatedList))
      this.setState({cartList: updatedList})
    }
  }

  onClickPlaceOrder = () => {
    localStorage.setItem('cartData', JSON.stringify([]))
    this.setState({orderPlaced: true, cartList: []})
  }

  onClickCartItemPlus = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(item => {
      if (item.id === id) {
        const obj = item
        obj.quantity += 1
        obj.totalCost = obj.cost * obj.quantity
        return obj
      }
      return item
    })
    localStorage.setItem('cartData', JSON.stringify(updatedList))
    this.setState({cartList: updatedList})
  }

  renderEmptyView = () => (
    <div className="empty-cart-container">
      <img
        className="empty-cart-img"
        src="https://ik.imagekit.io/pavanKillada/Layer_2_emptyCart.png?updatedAt=1685617170620"
        alt="empty cart"
      />
      <h1 className="empty-cart-head">No Order Yet!</h1>
      <p className="empty-cart-para">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button className="order-now-btn" type="button">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderCartItemView = () => {
    const {cartList} = this.state

    let totalPrice = 0
    cartList.forEach(element => {
      totalPrice += element.totalCost
    })

    return (
      <div className="cart-list-item-trans-container">
        <ul className="cart-item-list">
          <li className="cart-items-heading-li">
            <p className="cart-item-heading">Item</p>
            <p className="cart-quantity-heading">Quantity</p>
            <p className="cart-price-heading">Price</p>
          </li>
          {cartList.map(item => (
            <CartItem
              key={item.id}
              onClickCartItemDash={this.onClickCartItemDash}
              onClickCartItemPlus={this.onClickCartItemPlus}
              itemDetails={item}
            />
          ))}
        </ul>
        <div className="total-order-container">
          <h1 className="order-text">
            Order Total:
            <span className="order-price">
              <p className="order-price" testid="total-price">
                <BiRupee />
                {totalPrice}
              </p>
            </span>
          </h1>
          <button
            onClick={this.onClickPlaceOrder}
            className="order-now-btn place-order-btn"
            type="button"
          >
            Place Order
          </button>
        </div>
      </div>
    )
  }

  renderOrderPlacedView = () => (
    <div className="empty-cart-container">
      <img
        className="order-placed-img"
        src="https://ik.imagekit.io/pavanKillada/Vectortick.png?updatedAt=1680172681119"
        alt="order placed"
      />
      <h1 className="empty-cart-head">Payment Successful</h1>
      <p className="empty-cart-para">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/">
        <button
          onClick={this.onClickGoHome}
          className="order-now-btn"
          type="button"
        >
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  renderCartView = () => {
    const {orderPlaced, cartList} = this.state
    if (orderPlaced !== true) {
      if (cartList.length !== 0) {
        return this.renderCartItemView()
      }
      return this.renderEmptyView()
    }
    return this.renderOrderPlacedView()
  }

  render() {
    return (
      <div className="cart-bg-container">
        <Header />
        {this.renderCartView()}
      </div>
    )
  }
}
export default Cart
