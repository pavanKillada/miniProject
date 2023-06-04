/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
import {MdCancel} from 'react-icons/md'
import Cookies from 'js-cookie'
import './index.css'

const navTabs = [
  {
    id: 'HOME',
    displayText: 'Home',
  },
  {
    id: 'PROFILE',
    displayText: 'Profile',
  },
  {
    id: 'CART',
    displayText: 'Cart',
  },
]

class Header extends Component {
  state = {
    showNavBars: false,
    activeTab: 'Home',
  }

  onLogoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickBar = () => {
    this.setState({showNavBars: true})
  }

  onClickCancel = () => {
    this.setState({showNavBars: false})
  }

  onClickTab = event => {
    this.setState({activeTab: event.target.textContent})
  }

  render() {
    const {showNavBars, activeTab} = this.state

    return (
      <div>
        <nav className="big-nav-header">
          <div className="nav-content-container">
            <Link className="links" to="/">
              <div className="nav-logo-container">
                <img
                  className="nav-logo"
                  src="https://ik.imagekit.io/pavanKillada/Frame_274app_logo.svg?updatedAt=1680172681164"
                  alt="website logo"
                />
                <h1 className="nav-logo-text">Tasty Kitchens</h1>
              </div>
            </Link>
            <ul className="header-nav-tabs">
              {navTabs.map(item => (
                <li key={item.id} tabid={item.id} className="tab">
                  <Link
                    className="links"
                    to={`/${
                      item.displayText === 'Home' ? '' : item.displayText
                    }`}
                  >
                    <p
                      onClick={this.onClickTab}
                      className={
                        activeTab === item.displayText
                          ? 'active-tab'
                          : 'inactive-tab'
                      }
                    >
                      {item.displayText}
                    </p>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={this.onLogoutBtn}
                  type="button"
                  className="logout-btn"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <nav className="small-nav-header">
          <Link className="links" to="/">
            <div className="nav-logo-container">
              <img
                className="nav-logo"
                src="https://ik.imagekit.io/pavanKillada/Frame_274app_logo.svg?updatedAt=1680172681164"
                alt="website logo"
              />
              <h1 className="nav-logo-text">Tasty Kitchens</h1>
            </div>
          </Link>
          <button className="bar-btn" onClick={this.onClickBar} type="button">
            <FaBars className="bar" />
          </button>
        </nav>
        {showNavBars && (
          <ul className="small-header-nav-tabs">
            <Link className="links" to="/">
              <li className="home-nav">Home</li>
            </Link>
            <Link className="links" to="/profile">
              <li className="cart-nav">Profile</li>
            </Link>
            <Link className="links" to="/cart">
              <li className="cart-nav">Cart</li>
            </Link>
            <li>
              <button
                onClick={this.onLogoutBtn}
                type="button"
                className="logout-btn"
              >
                Logout
              </button>
            </li>
            <li className="btn-li">
              <button
                onClick={this.onClickCancel}
                className="cancel-btn"
                type="button"
              >
                <MdCancel />
              </button>
            </li>
          </ul>
        )}
      </div>
    )
  }
}
export default withRouter(Header)
