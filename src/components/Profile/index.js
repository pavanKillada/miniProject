import {Component} from 'react'
import {FaMobileAlt} from 'react-icons/fa'
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

  onSave = () => {
    this.setState({editing: false})
  }

  render() {
    const {editing, name, email, phone} = this.state
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
                  className="profile-inputs"
                  id="username"
                  value={name}
                  onChange={this.onUsername}
                />
              ) : (
                <p id="username" className="profile-details">
                  {name}
                </p>
              )}
              <AiOutlineUser />
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
                  placeholder="Enter your name"
                  className="profile-inputs"
                  id="phone"
                />
              ) : (
                <p id="phone" className="profile-details">
                  {phone}
                </p>
              )}
              <AiOutlineMobile />
            </div>
            <hr className="hr" />
            <label className="profile-labels" htmlFor="email">
              E_MAIL:
            </label>
            <div className="profile-details-container">
              {editing ? (
                <input
                  onChange={this.onEmail}
                  value={email}
                  id="email"
                  type="text"
                  placeholder="Enter your name"
                  className="profile-inputs"
                />
              ) : (
                <p id="email" className="profile-details">
                  {email}
                </p>
              )}
              <AiOutlineMail />
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
