import React from "react";
import "./profile.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhone, FaHome } from "react-icons/fa";
import LogoutIcon from '@mui/icons-material/Logout';
import DataGridDemo from "./userTabel";
import { useContext } from "react";
import userContext from "../context/userContext";
import axios from "axios";
import { useState } from "react";

const Profile = (props) => {
  const { user } = useContext(userContext);
  const [numberOfOrders, setNumberOfOrders] = useState(0); // State for storing the number of orders

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_URL}facility/logout`);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrdersCount = (count) => {
    setNumberOfOrders(count);
  };
  return (
    <main>
    <div className="profile">
      <section>
      <h1 className="title"> Facility name : {user.name}</h1>
        <header className="profile-header">
          <div className="profile-img">
            <img
              src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              width="200"
              alt="ProfileImage"
            />
          </div>
          <div className="profile-nav-info">
          
            <span className="info">
              <FaHome />{" "}
              <p id="state" className="state">
              address: <span>{user.address}</span>
              </p>
            </span>
            <span className="info">
              <FaPhone /> <p className="mobile-no">phone:<span> {user.phone}</span></p>
            </span>
            <span className="info">
              <FaEnvelope />
              <p className="user-mail">email:<span> {user.email}</span></p>
            </span>
          </div>
        </header>
      </section>
      <section className="main-bd">
        <div className="left-side">
          <div className="profile-side">
            <div className="user-bio">
              <div className="user-rating">
                <h3 className="rating">{numberOfOrders}</h3>
                <div className="appoin">Requested Order</div>
              </div>
              <div className="profile-btn">
                <Link to="/order">
                  <button className="bookBtn" id="bookBtn">
                   Get your order now 
                  </button>
                </Link>
              </div>
              <div className="profile-btn">
               
                  <button style={{height:40}}className="bookBtn" id="bookBtn" onClick={handleLogout}>
                  <LogoutIcon />  
                  </button>
               
              </div>
            </div>
          </div>
        </div>
        <div className="right-side">
          
         <DataGridDemo  onOrdersCount={handleOrdersCount} />
          
        </div>
      </section>
    </div>
    </main>
  );
};

export default Profile;
