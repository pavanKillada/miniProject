/* eslint-disable react/no-unknown-property */
import {HiStar} from 'react-icons/hi'
import {BiRupee} from 'react-icons/bi'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import './index.css'

const FoodItem = props => {
  const {foodDetails, onAdd, onDash, onPlus} = props
  const {id, name, imageUrl, cost, rating, quantity} = foodDetails
  const onClickAdd = () => {
    const newCartItem = {
      id: foodDetails.id,
      name: foodDetails.name,
      imageUrl: foodDetails.imageUrl,
      cost: foodDetails.cost,
      quantity: foodDetails.quantity,
      totalCost: foodDetails.cost * foodDetails.quantity,
    }
    onAdd(newCartItem)
  }
  const onClickDash = () => {
    onDash(id)
  }
  const onClickPlus = () => {
    onPlus(id)
  }
  return (
    <li testid="foodItem" className="food-item">
      <img src={imageUrl} alt={name} className="rest-item-img" />
      <div>
        <h1 className="rest-item-name">{name}</h1>
        <div className="rest-item-rating-container">
          <p className="cuisine rest-item-rating-container price">
            <BiRupee />
            {cost}
          </p>
          <div className="rest-item-rating-container">
            <HiStar className="rating-star" />
            <p className="rating-point">{rating}</p>
          </div>
        </div>

        {quantity <= 0 ? (
          <button onClick={onClickAdd} className="add-btn" type="button">
            ADD
          </button>
        ) : (
          <div className="quantity-container">
            <button
              onClick={onClickDash}
              className="minus-btn"
              type="button"
              testid="decrement-count"
            >
              <BsDashSquare />
            </button>
            <p testid="active-count" className="no-margin">
              {quantity}
            </p>
            <button
              onClick={onClickPlus}
              className="plus-btn"
              type="button"
              testid="increment-count"
            >
              <BsPlusSquare />
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default FoodItem
