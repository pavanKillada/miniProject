import {BsTwitter, BsInstagram} from 'react-icons/bs'
import {AiFillFacebook} from 'react-icons/ai'
import {FaPinterestSquare} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer">
    <div className="footer-logo-container">
      <img
        src="https://ik.imagekit.io/pavanKillada/Frame_275whiteLogo.png?updatedAt=1680172681053"
        alt="footer-logo"
        className="footer-logo"
      />
      <h1 className="footer-logo-text">Tasty Kitchens</h1>
    </div>
    <p className="footer-para">
      The only thing we are serious about is food.
      <br /> Contact us on
    </p>
    <div className="contact-container">
      <FaPinterestSquare className="contacts" />
      <BsInstagram className="contacts" />
      <BsTwitter className="contacts" />
      <AiFillFacebook className="contacts" />
    </div>
  </div>
)
export default Footer
