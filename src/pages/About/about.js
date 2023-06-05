import React from "react";
import { useEffect } from "react";
import img1 from "../../components/heroSection/Hero1.png";
import img from "../../components/heroSection/Hero2.png";
import "./about.css";
function AboutPage() {
  useEffect(() => {}, []);
  return (
    <div>
      <div className="package">
        <div className="About">
          <div className="Left">
            <h1>About us</h1>
            <hr />
            <p>
              Medical Bridge is empowering the Medical management and he is
              dedicated to revolutionizing The way healthcare services are
              delivered across the nation It is the bridge between the
              facilities and the companies of medicine.. With a singular focus
              on ensuring every hospital and clinic has uninterrupted access to
              vital medical supplies, we strive to elevate the quality of care
              provided to patients.
            </p>
            <p>
              Our vision is to establish a comprehensive and efficient system
              that streamlines the procurement, distribution, and management of
              medical supplies throughout Lebanon. By leveraging advanced
              technologies and robust logistics, we empower healthcare
              facilities to focus on what matters most – saving lives and
              improving patient outcomes.
            </p>
          </div>
          <div className="Right">
            <img src={img} alt="About Us" />
          </div>
          <div className="clear"></div>
        </div>

        <div className="mission">
          <div className="Left">
            <img src={img1} alt="Mission" />
          </div>
          <div className="Right">
            <h1>Our Goals</h1>
            <hr />
            <p>
              Through our Medical Supply Management System, we aim to address
              the longstanding challenges faced by healthcare providers,
              including stock shortages, delayed deliveries, and inefficient
              inventory management. By establishing a centralized platform, we
              facilitate seamless communication between suppliers and healthcare
              facilities, enabling timely replenishment of essential medical
              resources.
            </p>
            <p>
              Our system utilizes data-driven analytics to anticipate demand,
              optimize inventory levels, and identify trends in medical supply
              consumption. This empowers healthcare administrators and
              policymakers with valuable insights to make informed decisions,
              leading to improved resource allocation and cost-efficiency.
            </p>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
