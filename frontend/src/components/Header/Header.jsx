import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <div class="header_left">
        <Link className="Link" to="/">
          Home
        </Link>
        <Link className="Link" to="/about">
          About
        </Link>
      </div>
      <div>CinéSphère</div>
      <div class="header_right">
        <Link className="Link" id='sign_in' to="/users">
          Sign in
        </Link>
        <Link className="Link" id='log_in' to="/Page_authentification">
          Log in
        </Link>
      </div>
    </div >
  );
};

export default Header;
