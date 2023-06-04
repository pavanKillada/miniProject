/* eslint-disable react/no-unknown-property */
import {BiRupee} from 'react-icons/bi'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'

import './index.css'

const CartItem = props => {
  const {itemDetails, onClickCartItemDash, onClickCartItemPlus} = props
  const {id, imageUrl, name, quantity, totalCost} = itemDetails
  const onDash = () => {
    onClickCartItemDash(id)
  }
  const onPlus = () => {
    onClickCartItemPlus(id)
  }
  return (
    <li testid="cartItem" className="cart-list-item">
      <div className="cart-list-item-container" testid="cartItem">
        <img src={imageUrl} alt={name} className="cart-list-item-img" />
        <div className="cart-list-item-content">
          <h1 className="cart-list-item-name">{name}</h1>
          <div className="cart-list-item-buttons">
            <button
              className="cart-list-item-dash"
              onClick={onDash}
              type="button"
              testid="decrement-quantity"
            >
              <BsDashSquare />
            </button>
            <p testid="item-quantity" className="cart-list-item-quantity">
              {quantity}
            </p>
            <button
              className="cart-list-item-plus"
              onClick={onPlus}
              type="button"
              testid="increment-quantity"
            >
              <BsPlusSquare />
            </button>
          </div>
          <p testid="total-price" className="cart-list-item-cost">
            <BiRupee />
            {totalCost}.00
          </p>
        </div>
      </div>
    </li>
  )
}

export default CartItem
