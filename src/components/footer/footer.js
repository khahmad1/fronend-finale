import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../context/userContext";
import { List, ListItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";
// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }
function Footer() {
  const { token } = useContext(userContext);

  return (
    <footer className="footer">
      <section className="row">
        <div className="column">
          <h4 className="connect">About Us</h4>
          <p className="pra">
            Our Medical Bridge is dedicated to revolutionizing the way
            healthcare services are delivered across the nation. With a singular
            focus on ensuring every hospital and clinic .
          </p>
        </div>

        <div className="column">
          <h4 className="connect">Quick Links</h4>
          <ul className="ul">
            <li>
              {token ? (
                <Link to="/profile">
                  <i className="fa fa-angle-right"></i> Profile
                </Link>
              ) : (
                <Link to="/signIn">
                  <i className="fa fa-angle-right"></i> Sign In
                </Link>
              )}
            </li>

            <li>
              <Link to="/order">
                <i className="fa fa-angle-right"></i> Order
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <i className="fa fa-angle-right"></i> Contact us
              </Link>
            </li>
          </ul>
        </div>

        <div className="column">
          <h4 className="connect">Connect with Us</h4>
          <List className="social-icons">
            <ListItem>
              <Link to="https://www.facebook.com/">
                <FontAwesomeIcon icon={faFacebookF} />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="https://www.instagram.com/">
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="https://twitter.com/">
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="https://web.whatsapp.com/">
                <FontAwesomeIcon icon={faWhatsapp} />
              </Link>
            </ListItem>
          </List>
        </div>
      </section>
      <section className="copyright">
        <p>© 2023 All Rights Reserved</p>
      </section>
    </footer>
  );
}

export default Footer;
