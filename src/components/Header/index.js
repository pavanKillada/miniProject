import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
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
        <Link className="links" to="/">
          <li className="home-nav">Home</li>
        </Link>
        <Link className="links" to="/cart">
          <li className="cart-nav">Cart</li>
        </Link>
        <li>
          <button onClick={onLogoutBtn} type="button" className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
