import { NavLink } from "react-router-dom";
import "./Nav.css";
import home from "../images/home.svg";
import discover from "../images/discover.svg";
import post from "../images/post.svg";
// import info from "../images/info.svg";
import profile from "../images/profile.svg";

export default function Nav() {
  return (
    <>
      <a className="skip-to-content-button" href="#main-content">
        Skip to Content
      </a>
      <nav>
        <NavLink to="/">
          <div className="nav-dual-coding">
            <img src={home} alt="" />
            <span>Home</span>
          </div>
        </NavLink>
        <NavLink to="/new-entry">
          <div className="nav-dual-coding">
            <img src={discover} alt="" />
            <span>New entry</span>
          </div>
        </NavLink>
        <NavLink to="/">
          <div className="nav-dual-coding">
            <img src={post} alt="" />
            <span>My journal</span>
          </div>
        </NavLink>
        <NavLink to="/">
          <div className="nav-dual-coding">
            <img src={profile} alt="" />
            <span>Profile</span>
          </div>
        </NavLink>
      </nav>
    </>
  );
}
