import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiStar} from 'react-icons/hi'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'
import FoodItem from '../FoodItem'

const fetchStatus = {
  failed: 'FAILED',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetailItem extends Component {
  state = {
    restaurantDetails: {},
    fetching: fetchStatus.inProgress,
    foodItems: [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({fetching: fetchStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const restaurantDetails = {
        rating: data.rating,
        id: data.id,
        name: data.name,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        reviewsCount: data.reviews_count,
        opensAt: data.opens_at,
        location: data.location,
        itemsCount: data.items_count,
        foodItems: data.food_items,
      }
      let {foodItems} = restaurantDetails
      foodItems = foodItems.map(item => ({
        id: item.id,
        name: item.name,
        cost: item.cost,
        foodType: item.food_type,
        imageUrl: item.image_url,
        rating: item.rating,
        quantity: 0,
        totalCost: item.cost * item.quantity,
      }))
      this.setState({
        restaurantDetails,
        fetching: fetchStatus.success,
        foodItems,
      })
    } else {
      this.setState({fetching: fetchStatus.failed})
    }
  }

  onClickAdd = product => {
    const {foodItems} = this.state
    const foodIndex = foodItems.findIndex(item => item.id === product.id)
    const food = foodItems[foodIndex]
    food.quantity = 1
    food.totalCost = food.cost * food.quantity
    foodItems.splice(foodIndex, 1, food)
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    if (cartList === null) {
      localStorage.setItem('cartData', JSON.stringify([{food}]))
    } else {
      const updatedList = cartList.filter(item => item.id !== product.id)
      localStorage.setItem('cartData', JSON.stringify([...updatedList, food]))
    }
    this.setState({foodItems})
  }

  onClickDash = id => {
    const {foodItems} = this.state
    const foodIndex = foodItems.findIndex(item => item.id === id)
    const food = foodItems[foodIndex]
    food.quantity -= 1
    foodItems.splice(foodIndex, 1, food)
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const foodItem = cartList.find(item => item.id === id)
    if (foodItem.quantity <= 1) {
      const filteredList = cartList.filter(item => item.id !== id)
      localStorage.setItem('cartData', JSON.stringify(filteredList))
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
    }
    this.setState({foodItems})
  }

  onClickPlus = id => {
    const {foodItems} = this.state
    const foodIndex = foodItems.findIndex(item => item.id === id)
    const food = foodItems[foodIndex]
    food.quantity += 1
    foodItems.splice(foodIndex, 1, food)
    const cartList = JSON.parse(localStorage.getItem('cartData'))
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
    this.setState({foodItems})
  }

  renderRestaurantDetails = () => {
    const {restaurantDetails, foodItems} = this.state
    const {
      rating,
      name,
      costForTwo,
      cuisine,
      imageUrl,
      reviewsCount,
      location,
    } = restaurantDetails
    return (
      <>
        <div className="rest-detail-item-banner">
          <div className="rest-details-banner-content">
            <img
              className="rest-detail-item-banner-img"
              src={imageUrl}
              alt="restaurant"
            />
            <div className="banner-content">
              <h1 className="restaurant-name">{name}</h1>
              <p className="banner-content-paras">{cuisine}</p>
              <p className="banner-content-paras">{location}</p>
              <div className="rating-cost-container">
                <div className="rating-box">
                  <p className="no-margin">
                    <HiStar />
                    {rating}
                  </p>
                  <p className="no-bm banner-content-paras">
                    {reviewsCount}+ Ratings
                  </p>
                </div>
                <div className="cost-box">
                  <p className="no-margin">
                    <BiRupee />
                    {costForTwo}
                  </p>
                  <p className="banner-content-paras no-bm">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="rest-details-ul">
          {foodItems.map(item => (
            <FoodItem
              onDash={this.onClickDash}
              onPlus={this.onClickPlus}
              onAdd={this.onClickAdd}
              foodDetails={item}
              key={item.id}
            />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="rest-detail-loader" testid="restaurant-details-loader">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  render() {
    const {fetching} = this.state
    return (
      <div className="rest-detail-item-bg-container">
        <Header />
        {fetching === fetchStatus.inProgress
          ? this.renderLoader()
          : this.renderRestaurantDetails()}
        <Footer />
      </div>
    )
  }
}
export default RestaurantDetailItem
