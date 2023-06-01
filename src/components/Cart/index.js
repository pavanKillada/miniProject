import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import CartItemView from '../CartItemView'
import './index.css'
import CartContext from '../../ReactContext/CartContext'

class Cart extends Component {
  state = {}

  renderLoader = () => (
    <div className="cart-loader" data-testid="loader">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderEmptyView = () => (
    <div className="empty-cart-container">
      <img
        className="empty-cart-img"
        src="https://ik.imagekit.io/pavanKillada/Layer_2_emptyCart.png?updatedAt=1685617170620"
        alt="empty cart"
      />
      <h1 className="empty-cart-head">No Orders Yet!</h1>
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

  renderCartItemView = (List, onOrder) => {
    const {orderPlaced} = this.state
    let cartList = List
    if (orderPlaced) {
      cartList = []
    }
    let totalPrice = 0
    cartList.forEach(element => {
      totalPrice += element.totalCost
    })
    const onPlaceOrder = () => {
      onOrder()
    }

    return (
      <>
        <ul className="cart-item-list">
          {cartList.map(item => (
            <CartItemView key={item.id} itemDetails={item} />
          ))}
        </ul>
        <div className="total-order-container">
          <p className="order-text">
            Order Total :{' '}
            <span className="order-price">
              <BiRupee />
              {totalPrice}.00
            </span>
          </p>
          <button
            onClick={onPlaceOrder}
            className="order-now-btn place-order-btn"
            type="button"
          >
            Place Order
          </button>
        </div>
      </>
    )
  }

  renderOrderPlacedView = onGoHome => (
    <div className="empty-cart-container">
      <img
        className="order-placed-img"
        src="https://ik.imagekit.io/pavanKillada/Vectortick.png?updatedAt=1680172681119"
        alt="order placed"
      />
      <p className="empty-cart-head">Payment Successful</p>
      <p className="empty-cart-para">
        Thank you for ordering
        <br />
        Your payment is successfully completed.
      </p>
      <Link to="/">
        <button onClick={onGoHome} className="order-now-btn" type="button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  renderCartView = (
    cartList,
    isLoading,
    orderPlaced,
    onClickOrder,
    onClickGoHome,
  ) => {
    if (orderPlaced === false) {
      if (cartList.length === 0) {
        return this.renderEmptyView()
      }
      if (isLoading === true) {
        return this.renderLoader()
      }
      return this.renderCartItemView(cartList, onClickOrder)
    }
    return this.renderOrderPlacedView(onClickGoHome)
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            cartList,
            isLoading,
            orderPlaced,
            onClickOrder,
            onClickGoHome,
          } = value

          return (
            <div className="cart-bg-container">
              <Header />
              {this.renderCartView(
                cartList,
                isLoading,
                orderPlaced,
                onClickOrder,
                onClickGoHome,
              )}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default Cart
