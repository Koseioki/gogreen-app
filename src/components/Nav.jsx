import { NavLink } from "react-router-dom";
import "./Nav.css";
import home from "../images/home.svg";
import newEntry from "../images/new-entry.svg";
import myJournal from "../images/my-journal.svg";
import me from "../images/me.svg";

export default function Nav() {
  return (
    <>
      <a className="skip-to-content-button" href="#main-content">
        Skip to Content
      </a>
      <nav className="navigation">
        <NavLink to="/">
          <div className="nav-dual-coding">
            <img src={home} alt="" />
            <span>Home</span>
          </div>
        </NavLink>
        <NavLink to="/new-entry">
          <div className="nav-dual-coding">
            <img src={newEntry} alt="" />
            <span>New entry</span>
          </div>
        </NavLink>
        <NavLink to="/my-journal">
          <div className="nav-dual-coding">
            <img src={myJournal} alt="" />
            <span>My journal</span>
          </div>
        </NavLink>
        <NavLink to="*">
        <div className="nav-dual-coding">
          <img src={me} alt="" />
          <span>Me</span>
        </div>
        </NavLink>
      </nav>
    </>
  );
}
