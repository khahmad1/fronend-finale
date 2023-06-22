import React, { useState } from "react";
import "./nav.css";
import { Link, useLocation } from "react-router-dom";
import order from "./order.png";
import InfoIcon from "@mui/icons-material/Info";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { Home } from "@mui/icons-material";
import { useContext } from "react";
import cartContext from "../context/cardContext";
import { useEffect } from "react";
import userContext from "../context/userContext";
import Button from "@mui/material/Button";
import { BiLogIn } from "react-icons/bi";
import logo from "./LOGO KHARMA1.png";

function Navbar() {
  const { token } = useContext(userContext);
  const { items } = useContext(cartContext);
  const location = useLocation(); // Get current location

  const [isMobileNav, setIsMobileNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState(""); // Track active link

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Update active link when location changes
    const path = location.pathname;
    setActiveLink(path.substring(1));
  }, [location]);

  const toggleMobileNav = () => {
    setIsMobileNav(!isMobileNav);
  };

  return (
    <nav
      className={`navbar ${isMobileNav ? "mobile-nav" : ""} ${
        isScrolled ? "scroll" : ""
      }`}
    >
      <ul className="start">
        <div>
          <div viewBox="0 0 200 60">
            <img src={logo} alt="logo" width={200} height={70} />
          </div>
        </div>
      </ul>

      <ul className="end">
        <li
          className={`home ${activeLink === "" ? "is-active" : ""}`}
          onClick={() => setActiveLink("")}
        >
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/">
            <Home />
          </Link>
        </li>
        <li
          className={`about ${activeLink === "about" ? "is-active" : ""}`}
          onClick={() => setActiveLink("about")}
        >
          <Link className="nav-link" to="/about">
            About Us
          </Link>
          <Link className="nav-link" to="/about">
            <InfoIcon />
          </Link>
        </li>

        <li
          className={`contact ${activeLink === "contact" ? "is-active" : ""}`}
          onClick={() => setActiveLink("contact")}
        >
          <Link className="nav-link" to="/contact">
            Contact us
          </Link>
          <Link  to="/contact"className="nav-link">
            <ContactPhoneIcon />
          </Link>
        </li>

        <li className="checkout">
          <Link className="nav-link" to="/order">
            <img src={order} alt="order" />
            <span style={{ color: "#06023b" }}>
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </Link>
          <Link className="nav-link" to="/order">
            <img src={order} alt="order" />
            <span>1</span>
          </Link>
        </li>

        <li className="user">
          {token ? (
            <Link className="nav-link" to="/profile">
              <AccountCircleOutlinedIcon
                style={{
                  color: "var(--primary)",
                  width: "30px",
                  height: "30px",
                  marginRight: "5px",
                }}
              />
            </Link>
          ) : (
            <Link className="" to="/signIn">
              <Button
                sx={{
                  backgroundColor: "var(--primary)",
                  fontSize: "16px",
                  height: "45px",
                  color: "#fff",
                  width: 125,
                  border: "1px solid var(--primary)",
                  "&:hover": {
                    color: "var(--primary)",
                    cursor: "pointer",
                    transition: "0.2s ease-out",
                  },
                }}
              >
                Sign-In
              </Button>
            </Link>
          )}
          {token ? (
            <Link className="nav-link" to="/profile">
              <AccountCircleOutlinedIcon
                style={{
                  color: "var(--primary)",
                  width: "30px",
                  height: "30px",
                  marginRight: "5px",
                }}
              />
            </Link>
          ) : (
            <Link
              className="nav-link"
              to="/signIn"
              style={{ textDecoration: "none" }}
            >
              <AccountCircleOutlinedIcon
                style={{
                  color: "var(--primary)",
                  width: "30px",
                  height: "30px",
                  marginRight: "5px",
                }}
              />
            </Link>
          )}
        </li>
        <li className="user">
          {token ? (
            <link></link>
          ) : (
            <Link className="" to="/signUp">
              <Button
                sx={{
                  backgroundColor: "var(--primary)",
                  fontSize: "16px",
                  height: "45px",
                  width: 125,
                  color: "#fff",
                  border: "1px solid var(--primary)",
                  "&:hover": {
                    color: "var(--primary)",
                    cursor: "pointer",
                    transform: "scale(1)",
                    transition: "0.2s ease-out",
                  },
                }}
              >
                sign-Up
              </Button>
            </Link>
          )}
          {token ? (
            <Link></Link>
          ) : (
            <Link
              className="nav-link"
              to="/signUp"
              style={{ textDecoration: "none" }}
            >
              <BiLogIn
                style={{
                  color: "var(--primary)",
                  width: "30px",
                  height: "30px",
                  marginRight: "5px",
                }}
              />
            </Link>
          )}
        </li>

        <div
          id="mobile-menu"
          className={`menu-toggle ${isMobileNav ? "is-active" : ""}`}
          onClick={toggleMobileNav}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
