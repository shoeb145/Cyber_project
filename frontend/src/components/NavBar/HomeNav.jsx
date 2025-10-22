import React from "react";
import { Link } from "react-router-dom";

function HomeNav(props) {
  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <div className="brand">
          <a href="#" className="brand-link" aria-label="Secuby home">
            <img
              src="https://framerusercontent.com/images/U2I7fLtX2zVVMKW9URIZ9olX0.svg"
              alt="Secuby Logo"
              className="logo"
            />
          </a>
        </div>

        <nav className="main-nav" aria-label="Primary">
          <ul className="nav-list">
            <li>
              <a className="nav-link" href="#features">
                All Pages
              </a>
            </li>
            <li>
              <a className="nav-link" href="#solutions">
                Services
              </a>
            </li>
            <li>
              <a className="nav-link" href="#pricing">
                Review
              </a>
            </li>
            <li>
              <a className="nav-link" href="#about">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          <Link className="login-link  " to="/signup">
            <span className="text-amber-400"> Dashboard</span>
          </Link>
          <a className="cta primary-cta" href="#contact">
            Get demo
          </a>
          <button
            className="mobile-menu-button"
            aria-label="Open menu"
            type="button"
            aria-expanded="false"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default HomeNav;
