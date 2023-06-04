import React, { useEffect, useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CommentIcon from "@mui/icons-material/Comment";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";
import axios from "axios";

function CardDash() {
  const [facilityCount, setFacilityCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facilityResponse = await axios.get(`${process.env.REACT_APP_URL}facility`);
        setFacilityCount(facilityResponse.data.response.length);
      } catch (error) {
        console.error('Error fetching facility data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await axios.get(`${process.env.REACT_APP_URL}order`);
        setOrderCount(orderResponse.data.response.length);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messageResponse = await axios.get(`${process.env.REACT_APP_URL}inbox`);
        setMessageCount(messageResponse.data.response.length);
      } catch (error) {
        console.error('Error fetching message data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminResponse = await axios.get(`${process.env.REACT_APP_URL}admin`);
        setAdminCount(adminResponse.data.response.length);
      } catch (error) {
        console.error('Error fetching message data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="all-card">
      <div className="card_dash">
        <div className="col">
          <p className="card-title text-title">Number Of Facility</p>
          <h2 className="card-text text-amount">{facilityCount}</h2>
        </div>
        <div className="col-auto">
          <div className="icon-shape icon-area">
            <Link to="/dashboard/facility">
              {" "}
              <WorkIcon sx={{ color: "#fff" }} />
            </Link>
          </div>
        </div>
      </div>

      <div className="card_dash">
        <div className="col">
          <p className="card-title text-title">Number Of Order</p>
          <h2 className="card-text text-amount">{orderCount}</h2>
        </div>
        <div className="col-auto">
          <div className="icon-shape icon-pie">
            <Link to="/dashboard/order">
              {" "}
              <FactCheckIcon sx={{ color: "#fff" }} />
            </Link>
          </div>
        </div>
      </div>

      <div className="card_dash">
        <div className="col">
          <p className="card-title text-title"> Your Messages </p>
          <h2 className="card-text text-amount">{messageCount}</h2>
        </div>
        <div className="col-auto">
          <div className="icon-shape icon-user">
            <Link to="/dashboard/message">
              {" "}
              <CommentIcon sx={{ color: "#fff" }} />
            </Link>
          </div>
        </div>
      </div>

      <div className="card_dash">
        <div className="col">
          <p className="card-title text-title">Your Admins</p>
          <h2 className="card-text text-amount">{adminCount}</h2>
        </div>
        <div className="col-auto">
          <div className="icon-shape icon-percent">
            <Link to="/dashboard/admin">
              {" "}
              <GroupsIcon sx={{ color: "#fff" }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDash;
