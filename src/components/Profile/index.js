import {Component} from 'react'
import {FaMobileAlt, FaRegAddressCard} from 'react-icons/fa'
import {ImProfile} from 'react-icons/im'
import {GiSaveArrow} from 'react-icons/gi'
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineMobile,
  AiFillEdit,
} from 'react-icons/ai'
import './index.css'
import Header from '../Header'

class Profile extends Component {
  state = {
    editing: false,
    name: 'K. Pavan Kumar',
    phone: '9030960865',
    email: 'killadapavankumar@gmail.com',
    address:
      'H-no. 8-373/1 road-6 sai baba nagar, padma nagar phase-2, quthbullapur, chintal, hyderabad, 500055.',
  }

  componentDidMount() {
    const userDetails = JSON.parse(localStorage.getItem('user_data'))
    if (userDetails !== null) {
      this.setState({
        name: userDetails.name,
        phone: userDetails.phone,
        email: userDetails.email,
        address: userDetails.address,
      })
    }
  }

  onUsername = event => {
    this.setState({name: event.target.value})
  }

  onEmail = event => {
    this.setState({email: event.target.value})
  }

  onPhoneNumber = event => {
    this.setState({phone: event.target.value})
  }

  onEdit = () => {
    this.setState({editing: true})
  }

  onAddress = event => {
    this.setState({address: event.target.value})
  }

  onSave = () => {
    const {name, phone, email, address} = this.state
    const userDetails = {
      name,
      phone,
      email,
      address,
    }
    localStorage.setItem('user_data', JSON.stringify(userDetails))
    this.setState({editing: false})
  }

  render() {
    const {editing, name, email, phone, address} = this.state
    return (
      <div className="profile-bg-container">
        <Header />
        <div className="profile-container">
          <div className="profile-img-and-name">
            <img
              className="profile-pic"
              src="https://ik.imagekit.io/pavanKillada/pavan2.jpeg?updatedAt=1685891805351"
              alt="profile pic"
            />
            <div>
              <h1 className="name">{name}</h1>
              <div className="ph-num">
                <FaMobileAlt />
                <p className="number">{phone}</p>
              </div>
            </div>
          </div>
          <div className="account-container">
            <div className="account-text-icon-container">
              <h1 className="account-head">ACCOUNT:</h1>
              <ImProfile className="account-head" />
            </div>
            <label className="profile-labels" htmlFor="username">
              USERNAME:
            </label>
            <div className="profile-details-container">
              {editing ? (
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="profile-inputs inputs-width"
                  id="username"
                  value={name}
                  onChange={this.onUsername}
                />
              ) : (
                <p id="username" className="profile-details inputs-width">
                  {name}
                </p>
              )}
              <AiOutlineUser className="icons" />
            </div>
            <hr className="hr" />
            <label className="profile-labels" htmlFor="phone">
              PHONE:
            </label>
            <div className="profile-details-container">
              {editing ? (
                <input
                  onChange={this.onPhoneNumber}
                  value={phone}
                  type="text"
                  placeholder="Enter your ph-no"
                  className="profile-inputs inputs-width"
                  id="phone"
                />
              ) : (
                <p id="phone" className="profile-details inputs-width">
                  {phone}
                </p>
              )}
              <AiOutlineMobile className="icons" />
            </div>
            <hr className="hr" />
            <label className="profile-labels" htmlFor="email">
              E-MAIL:
            </label>
            <div className="profile-details-container">
              {editing ? (
                <input
                  onChange={this.onEmail}
                  value={email}
                  id="email"
                  type="text"
                  placeholder="Enter your e-mail"
                  className="profile-inputs inputs-width"
                />
              ) : (
                <p id="email" className="profile-details inputs-width">
                  {email}
                </p>
              )}
              <AiOutlineMail className="icons" />
            </div>
            <hr className="hr" />
            <label className="profile-labels" htmlFor="address">
              ADDRESS:
            </label>
            <div className="profile-details-container">
              {editing ? (
                <input
                  onChange={this.onAddress}
                  value={address}
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  className="profile-inputs inputs-width"
                />
              ) : (
                <p id="address" className="profile-details inputs-width">
                  {address}
                </p>
              )}
              <FaRegAddressCard className="icons" />
            </div>
            <hr className="hr" />
            {!editing ? (
              <button onClick={this.onEdit} className="edit-btn" type="button">
                Edit
                <AiFillEdit />
              </button>
            ) : (
              <button onClick={this.onSave} className="edit-btn" type="button">
                Save
                <GiSaveArrow />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
