/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Cookies from 'js-cookie'
import {MdSort} from 'react-icons/md'
import {AiOutlineSearch} from 'react-icons/ai'
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
    searchInput: '',
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
    const {activePage, limit, sortOption, searchInput} = this.state
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?search=${searchInput.toLowerCase()}&offset=${offset}&limit=${limit}&sort_by_rating=${sortOption}`
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
    if (response.status === 404) {
      this.setState({restaurants: [], totalRestaurants: 0, isLoading: false})
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

  onSearchRest = event => {
    this.setState(
      {searchInput: event.target.value, activePage: 1},
      this.getRestaurants,
    )
  }

  renderRestaurantsListView = () => {
    const {restaurants, isLoading, totalRestaurants} = this.state
    if (isLoading) {
      return (
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
        </div>
      )
    }
    return totalRestaurants === 0 ? (
      <div className="empty-view-container">
        <img
          className="empty-img"
          src="https://assets.materialup.com/uploads/7dd9ebb6-bcb9-442b-8572-3e7d21418e36/preview.jpg"
          alt="empty result"
        />
        <h1 className="empty-head">No Results Found</h1>
        <p className="empty-para">
          The Restaurant your trying to find is unavailable, try another name.
        </p>
      </div>
    ) : (
      <ul className="rest-list">
        {restaurants.map(eachRes => (
          <RestaurantItem key={eachRes.id} restaurantDetails={eachRes} />
        ))}
      </ul>
    )
  }

  render() {
    const {
      offers,
      activePage,
      totalRestaurants,
      bannerLoading,
      searchInput,
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
            <div
              className="loader-container"
              testid="restaurants-offers-loader"
            >
              <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
            </div>
          ) : (
            <div className="slider-container">
              <Slider {...settings}>
                {offers.map(offer => (
                  <li key={offer.id}>
                    <img
                      className="slide-imgs"
                      src={offer.image_url}
                      alt="offer"
                    />
                  </li>
                ))}
              </Slider>
            </div>
          )}
          <div className="home-body-content">
            <div className="home-headings-sorting-container">
              <div>
                <h1 className="content-heading">Popular Restaurants</h1>
                <p className="content-para">
                  Select Your favorite restaurant special dish and make your day
                  happy...
                </p>
              </div>
              <div className="sort-container">
                <div className="input-container">
                  <input
                    className="search-input"
                    value={searchInput}
                    onChange={this.onSearchRest}
                    type="search"
                    placeholder="Search Restaurants"
                  />
                  <AiOutlineSearch />
                </div>
                <div className="sort-text-container">
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
              </div>
            </div>
            {this.renderRestaurantsListView()}
          </div>
        </div>
        <div className="page-container">
          <button
            className="arrow-btns"
            onClick={this.onLeftPage}
            type="button"
            testid="pagination-left-button"
          >
            <BsArrowLeftSquare className="page-arrows" />
          </button>
          <div className="page-text">
            <span testid="active-page-number">
              {activePage} of {Math.ceil(totalRestaurants / 9)}
            </span>
          </div>
          <button
            className="arrow-btns"
            onClick={this.onRightPage}
            type="button"
            testid="pagination-right-button"
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
