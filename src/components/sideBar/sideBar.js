import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sideBar.css";

import VaccinesIcon from "@mui/icons-material/Vaccines";
import CommentIcon from "@mui/icons-material/Comment";
import CategoryIcon from "@mui/icons-material/Category";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import WorkIcon from "@mui/icons-material/Work";
import logo from "./logo.png";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";

function SideBar() {
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_URL}admin/logout`);
      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const [showLogoutText, setShowLogoutText] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaQueryChange = (mq) => {
      setShowLogoutText(!mq.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    setShowLogoutText(!mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <nav className="sidebar">
      <img
        src={logo}
        alt="logo"
        width={180}
        height={200}
        className="logo-expand"
      />
      <main className="side-wrapper">
        <section className="side-menu">
          <Link
            className={`sidebar-link discover ${
              activeLink === "dashboard" ? "is-active" : ""
            }`}
            to="dashboard"
            onClick={() => handleLinkClick("dashboard")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.135 20.773v-3.057c0-.78.637-1.414 1.423-1.414h2.875c.377 0 .74.15 1.006.414.267.265.417.625.417 1v3.057c-.002.325.126.637.356.867.23.23.544.36.87.36h1.962a3.46 3.46 0 002.443-1 3.41 3.41 0 001.013-2.422V9.867c0-.735-.328-1.431-.895-1.902l-6.671-5.29a3.097 3.097 0 00-3.949.072L3.467 7.965A2.474 2.474 0 002.5 9.867v8.702C2.5 20.464 4.047 22 5.956 22h1.916c.68 0 1.231-.544 1.236-1.218l.027-.009z" />
            </svg>
            <span className="media">Dashboard</span>
          </Link>
          <Link
            className={`sidebar-link trending ${
              activeLink === "admin" ? "is-active" : ""
            }`}
            to="admin"
            onClick={() => handleLinkClick("admin")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.158 8.233a4.207 4.207 0 01-4.209 4.234 4.207 4.207 0 01-4.21-4.234A4.206 4.206 0 0111.95 4a4.206 4.206 0 014.21 4.233zM11.95 20c-3.431 0-6.36-.544-6.36-2.72 0-2.177 2.91-2.74 6.36-2.74 3.431 0 6.361.544 6.361 2.72S15.399 20 11.949 20zm6.008-11.69a5.765 5.765 0 01-.984 3.24.158.158 0 00.107.245 3.4 3.4 0 00.483.046c1.643.044 3.118-1.02 3.525-2.621.604-2.379-1.168-4.514-3.425-4.514-.245 0-.48.026-.708.073-.031.007-.064.021-.082.05-.022.034-.006.08.016.11a5.807 5.807 0 011.068 3.37zm2.721 5.203c1.104.217 1.83.66 2.131 1.304a1.923 1.923 0 010 1.67c-.46.998-1.944 1.319-2.52 1.402-.12.018-.215-.086-.203-.206.295-2.767-2.048-4.08-2.654-4.381-.026-.014-.032-.034-.03-.047.003-.009.013-.023.033-.026 1.312-.024 2.722.156 3.243.284zM6.438 11.84c.164-.004.325-.019.483-.046a.158.158 0 00.106-.245 5.765 5.765 0 01-.984-3.24c0-1.25.39-2.416 1.068-3.372.022-.03.037-.075.016-.11-.017-.027-.051-.042-.082-.05a3.52 3.52 0 00-.71-.072c-2.255 0-4.027 2.135-3.423 4.514.407 1.6 1.882 2.664 3.525 2.621zm.159 1.414c.003.013-.003.033-.028.047-.607.302-2.95 1.614-2.656 4.38.013.121-.082.224-.201.207-.577-.083-2.06-.404-2.52-1.402a1.917 1.917 0 010-1.67c.3-.644 1.026-1.087 2.13-1.305.522-.127 1.93-.307 3.244-.283.02.003.03.017.03.026z"
              />
            </svg>
            <span className="media">Admin</span>
          </Link>
          <Link
            className={`sidebar-link ${
              activeLink === "order" ? "is-active" : ""
            }`}
            to="order"
            onClick={() => handleLinkClick("order")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <FactCheckIcon />
            </svg>
            <span className="media">Order</span>
          </Link>
          <Link
            className={`sidebar-link ${
              activeLink === "category" ? "is-active" : ""
            }`}
            to="category"
            onClick={() => handleLinkClick("category")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <CategoryIcon />
            </svg>
            <span className="media">Category</span>
          </Link>
          <Link
            className={`sidebar-link ${
              activeLink === "medicine" ? "is-active" : ""
            }`}
            to="medicine"
            onClick={() => handleLinkClick("medicine")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <VaccinesIcon />
            </svg>
            <span className="media">Medicine</span>
          </Link>
          <Link
            className={`sidebar-link ${
              activeLink === "facility" ? "is-active" : ""
            }`}
            to="facility"
            onClick={() => handleLinkClick("facility")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <WorkIcon />
            </svg>
            <span className="media">Facility</span>
          </Link>
          <Link
            className={`sidebar-link ${
              activeLink === "message" ? "is-active" : ""
            }`}
            to="message"
            onClick={() => handleLinkClick("message")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <CommentIcon />
            </svg>
            <span className="media">Message</span>
          </Link>
        </section>
      </main>
      <div
  style={{
    display: "flex",
    alignItems: "center",
  }}
>
  <LogoutIcon
    style={{ color: "#fff", marginLeft: "0.7em", display: "inline", cursor: "pointer" }}
    onClick={handleLogout}
  />
  {showLogoutText && (
    <span
      style={{
        color: "#fff",
        fontSize: 20,
        marginLeft: "1em",
        cursor: "pointer",

      }}
      onClick={handleLogout}
    >
      Logout
    </span>
  )}
</div>

    </nav>
  );
}

export default SideBar;
