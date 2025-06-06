import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <div class="header_left">
        <Link className="Link" id="home" to="/">
          Home
        </Link>
        <Link className="Link" id="about" to="/about">
          About
        </Link>
        <Link className="Link" id="about" to="/admin">
          Admin
        </Link>
      </div>
      <div className="logo_font">
        <img src="../../logo.png" alt="logo" className="logo_top" />
        <p className="title_top">CinéSphère</p>
      </div>
      <div className="header_right">
        <Link className="Link" id="sign_in" to="/users">
          Sign in
        </Link>
        <Link className="Link" id="log_in" to="/Page_authentification">
          Log in
        </Link>
      </div>
    </div >
  );
};

export default Header;
