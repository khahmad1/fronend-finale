import React from "react";
import { Outlet} from "react-router-dom";
import SideBar from "../components/sideBar/sideBar";
import "./routes.css";

function Admin() {


  // Check if the token is valid
 
    return (
      <div className="adminContainer">
        <SideBar />
        <section className="visitor-main">
          <Outlet/>
        </section>
      </div>
    );

}

export default Admin;



