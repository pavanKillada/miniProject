import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer">
    <div className="footer-logo-container">
      <img
        src="https://ik.imagekit.io/pavanKillada/Frame_275whiteLogo.png?updatedAt=1680172681053"
        alt="website-footer-logo"
        className="footer-logo"
      />
      <h1 className="footer-logo-text">Tasty Kitchens</h1>
    </div>
    <p className="footer-para">
      The only thing we are serious about is food.
      <br /> Contact us on
    </p>
    <div className="contact-container">
      <FaPinterestSquare testid="pintrest-social-icon" className="contacts" />
      <FaInstagram testid="instagram-social-icon" className="contacts" />
      <FaTwitter testid="twitter-social-icon" className="contacts" />
      <FaFacebookSquare testid="facebook-social-icon" className="contacts" />
    </div>
  </div>
)
export default Footer
