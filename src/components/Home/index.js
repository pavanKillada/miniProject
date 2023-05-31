import {Component} from 'react'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Cookies from 'js-cookie'
import {MdSort} from 'react-icons/md'
import {BsArrowLeftSquare, BsArrowRightSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import RestaurantItem from '../RestaurantItem'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 1,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    isLoading: true,
    bannerLoading: true,
    offers: [],
    restaurants: [],
    activePage: 1,
    limit: 9,
    sortOption: sortByOptions[0].value,
    totalRestaurants: 0,
  }

  componentDidMount() {
    this.getOffers()
    this.getRestaurants()
  }

  getOffers = async () => {
    this.setState({bannerLoading: true})
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.setState({
        offers: data.offers,
        bannerLoading: false,
      })
    }
  }

  getRestaurants = async () => {
    this.setState({isLoading: true})
    const {activePage, limit, sortOption} = this.state
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortOption}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.setState({
        restaurants: data.restaurants,
        totalRestaurants: data.total,
        isLoading: false,
      })
    }
  }

  onSelectSortOption = event => {
    this.setState({sortOption: event.target.value}, this.getRestaurants)
  }

  onLeftPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prev => ({activePage: prev.activePage - 1}),
        this.getRestaurants,
      )
    }
  }

  onRightPage = () => {
    const {totalRestaurants, activePage} = this.state
    if (activePage < Math.ceil(totalRestaurants / 9)) {
      this.setState(
        prev => ({activePage: prev.activePage + 1}),
        this.getRestaurants,
      )
    }
  }

  render() {
    const {
      offers,
      restaurants,
      activePage,
      totalRestaurants,
      isLoading,
      bannerLoading,
    } = this.state
    const settings = {
      dots: true,
      slidesTOShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      autoplaySpeed: 5000,
      pauseOnHover: true,
    }
    return (
      <div className="home-container">
        <Header />
        <div className="home-body-container">
          {bannerLoading ? (
            <div className="loader-container" data-testid="loader">
              <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
            </div>
          ) : (
            <div className="slider-container">
              <Slider {...settings}>
                {offers.map(offer => (
                  <div key={offer.id}>
                    <img
                      className="slide-imgs"
                      src={offer.image_url}
                      alt="todays special"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}
          <div className="home-body-content">
            <h1 className="content-heading">Popular Restaurants</h1>
            <p className="content-para">
              Select Your favorite restaurant special dish and make your day
              happy...
            </p>
            <div className="sort-container">
              <label className="sort-text" htmlFor="sort">
                <MdSort className="sort-img" />
                Sort by
              </label>
              <select onChange={this.onSelectSortOption}>
                {sortByOptions.map(eachOpt => (
                  <option key={eachOpt.id} value={eachOpt.value}>
                    {eachOpt.displayText}
                  </option>
                ))}
              </select>
            </div>
            {isLoading ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="TailSpin"
                  color="#F7931E"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              <ul className="rest-list">
                {restaurants.map(eachRes => (
                  <RestaurantItem
                    key={eachRes.id}
                    restaurantDetails={eachRes}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="page-container">
          <button
            className="arrow-btns"
            onClick={this.onLeftPage}
            type="button"
          >
            <BsArrowLeftSquare className="page-arrows" />
          </button>
          <p className="page-text">
            {activePage} of {Math.ceil(totalRestaurants / 9)}
          </p>
          <button
            className="arrow-btns"
            onClick={this.onRightPage}
            type="button"
          >
            <BsArrowRightSquare className="page-arrows" />
          </button>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home
