import {HiStar} from 'react-icons/hi'
import {BiRupee} from 'react-icons/bi'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import './index.css'

const FoodItem = props => {
  const {foodDetails, onAdd, onDash, onPlus} = props
  const {id, name, imageUrl, cost, foodType, rating, added} = foodDetails
  const onClickAdd = () => {
    onAdd(id)
  }
  const onClickDash = () => {
    onDash(id)
  }
  const onClickPlus = () => {
    onPlus(id)
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
            <button onClick={onClickDash} className="minus-btn" type="button">
              <BsDashSquare />
            </button>
            <p className="no-margin">{added}</p>
            <button onClick={onClickPlus} className="plus-btn" type="button">
              <BsPlusSquare />
            </button>
          </div>
        )}
      </div>
    </li>
  )
}
export default FoodItem
