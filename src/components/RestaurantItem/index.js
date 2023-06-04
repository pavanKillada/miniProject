/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import {HiStar} from 'react-icons/hi'
import './index.css'

const RestaurantItem = props => {
  const {restaurantDetails} = props
  const {id, name, cuisine} = restaurantDetails
  const userRating = restaurantDetails.user_rating
  const imageUrl = restaurantDetails.image_url
  const totalReviews = userRating.total_reviews
  const {rating} = userRating
  return (
    <Link className="Link" to={`/restaurant/${id}`}>
      <li testid="restaurant-item" className="rest-item">
        <img src={imageUrl} alt="restaurant" className="rest-item-img" />
        <div>
          <h1 className="rest-item-name">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="rest-item-rating-container">
            <HiStar className="rating-star" />
            <p className="rating-point">
              {rating}
              <span className="total-ratings"> ({totalReviews} ratings)</span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurantItem
