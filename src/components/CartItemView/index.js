import {BiRupee} from 'react-icons/bi'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import CartContext from '../../ReactContext/CartContext'

import './index.css'

const CartItemView = props => (
  <CartContext.Consumer>
    {value => {
      const {onClickCartItemDash, onClickCartItemPlus} = value
      const {itemDetails} = props
      const {id, imageUrl, name, added, totalCost} = itemDetails
      const onDash = () => {
        onClickCartItemDash(id)
      }
      const onPlus = () => {
        onClickCartItemPlus(id)
      }

      return (
        <li className="cart-list-item">
          <img src={imageUrl} alt={name} className="cart-list-item-img" />
          <div>
            <p className="cart-list-item-name">{name}</p>
            <div className="cart-list-item-buttons">
              <button
                className="cart-list-item-dash"
                onClick={onDash}
                type="button"
              >
                <BsDashSquare />
              </button>
              <p className="cart-list-item-quantity">{added}</p>
              <button
                className="cart-list-item-plus"
                onClick={onPlus}
                type="button"
              >
                <BsPlusSquare />
              </button>
            </div>
            <p className="cart-list-item-cost">
              <BiRupee />
              {totalCost}.00
            </p>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)
export default CartItemView
