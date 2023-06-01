import {HiStar} from 'react-icons/hi'
import {BiRupee} from 'react-icons/bi'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import './index.css'
import CartContext from '../../ReactContext/CartContext'

const FoodItem = props => (
  <CartContext.Consumer>
    {value => {
      const {addCartItem, onClickCartItemDash, onClickCartItemPlus} = value
      const {foodDetails, onAdd, onDash, onPlus} = props
      const {id, name, imageUrl, cost, foodType, rating, added} = foodDetails
      const onClickAdd = () => {
        onAdd(id)
        const newCartItem = {
          id: foodDetails.id,
          name: foodDetails.name,
          imageUrl: foodDetails.imageUrl,
          cost: foodDetails.cost,
          added: foodDetails.added,
          totalCost: foodDetails.cost * foodDetails.added,
        }
        addCartItem(newCartItem)
        console.log(newCartItem.totalCost)
      }
      const onClickDash = () => {
        onDash(id)
        onClickCartItemDash(id)
      }
      const onClickPlus = () => {
        onPlus(id)
        onClickCartItemPlus(id)
      }

      return (
        <li className="rest-item">
          <img src={imageUrl} alt={name} className="rest-item-img" />
          <div>
            <h1 className="rest-item-name">{name}</h1>
            <div className="rest-item-rating-container">
              <p className="cuisine rest-item-rating-container price">
                <BiRupee />
                {cost}.00
              </p>
              <div className="rest-item-rating-container">
                <HiStar className="rating-star" />
                <p className="rating-point">
                  {rating.toString().length === 1 ? `${rating}.0` : rating}
                </p>
              </div>
            </div>

            {added <= 0 ? (
              <button onClick={onClickAdd} className="add-btn" type="button">
                ADD
              </button>
            ) : (
              <div className="quantity-container">
                <button
                  onClick={onClickDash}
                  className="minus-btn"
                  type="button"
                >
                  <BsDashSquare />
                </button>
                <p className="no-margin">{added}</p>
                <button
                  onClick={onClickPlus}
                  className="plus-btn"
                  type="button"
                >
                  <BsPlusSquare />
                </button>
              </div>
            )}
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default FoodItem
