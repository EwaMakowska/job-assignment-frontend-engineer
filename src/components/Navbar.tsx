import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export function Navbar(): JSX.Element {
  const user = useAuthStore((s) => s.user);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink exact className="nav-link" activeClassName="active" to="/">
              Home
            </NavLink>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to={`/profile/${user.username}`}
                >
                  {user.image && (
                    <img src={user.image} alt="" className="user-pic" />
                  )}
                  {user.username}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/logout"
                >
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/login"
              >
                Sign in
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
