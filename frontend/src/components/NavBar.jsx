import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        <Link to="/">
          <img src="src/assets/img/logo-white.png" alt="" id="icon" />
        </Link>
        <Link to="/profil">
          <img src="/src/assets/img/profil.png" alt="" id="user" />
        </Link>
      </nav>
    </div>
  );
}
export default NavBar;
