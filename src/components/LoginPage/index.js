import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', fetchError: ''}

  authorizeUser = async () => {
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({fetchError: data.error_msg})
    }
  }

  onUserInput = event => {
    this.setState({username: event.target.value})
  }

  onPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    this.authorizeUser()
  }

  render() {
    const {username, password, fetchError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-container">
          <form onSubmit={this.onSubmitForm}>
            <img
              className="logo"
              src="https://ik.imagekit.io/pavanKillada/Frame_274app_logo.svg?updatedAt=1680172681164"
              alt="website logo"
            />
            <h1 className="tasty-kitchens">Tasty Kitchens</h1>
            <div className="login-mini-page">
              <h1 className="login-text">Login</h1>
              <img
                src="https://ik.imagekit.io/pavanKillada/Rectangle_1457shortBg.png?updatedAt=1680172681202"
                alt="website login"
                className="mini-cover"
              />
            </div>
            <div className="inputs-container">
              <label htmlFor="username">USERNAME</label>
              <input
                onChange={this.onUserInput}
                type="text"
                id="username"
                value={username}
              />
              <br />
              <label htmlFor="password">PASSWORD</label>
              <input
                onChange={this.onPasswordInput}
                type="password"
                id="password"
                value={password}
              />
              <br />
              {fetchError !== '' && <p className="error-msg">{fetchError}</p>}
              <button type="submit" className="login-btn">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="login-side-container"> </div>
      </div>
    )
  }
}
export default Login
