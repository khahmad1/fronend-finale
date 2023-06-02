import React, { useState } from "react";
import {TextField} from "@mui/material";
import "./contact.css";
import { Button } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}inbox`, {
        name,
        email,
        message,
      })
      .then((res) => {
        toast.success("Message sent successfully");
        console.log(res.message);
      })
      .catch((err) => {
        toast.error("Message not sent successfully");
        console.log(err);
      });
  };
  return (
    <main className="container">
      <h1 className="title">Get In Touch</h1>
      <div className="form">
        <section className="inputs-form">
          <article className="inputs">
            <span>Contact Us</span>

            <TextField
              margin="normal"
              required
              id="email"
              label="Full Name"
              name="name"
              autoComplete="Name"
              multiline
              variant="outlined" // Added variant prop
              color="primary" // Added color prop
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              id="email"
              label="Your Email"
              type="email"
              name="email"
              autoComplete="email"
              autoFocus
              multiline
              variant="outlined" // Added variant prop
              color="primary" // Added color prop
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              id="message"
              label="Your Message"
              name="message"
              autoComplete="message"
              autoFocus
              multiline // Added multiline prop for a textarea-like input
              rows={4} // Set the number of rows for the multiline input
              variant="outlined" // Added variant prop
              color="primary" // Added color prop
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button
              onClick={handleSubmit}
              sx={{
                backgroundColor: "var(--primary)",
                fontSize: "16px",
                height: "45px",
                color: "#fff",
                "&:hover": {
                  color: "var(--primary)",
                  cursor: "pointer",
                  transform: "scale(1)",
                  transition: "0.2s ease-out",
                },
              }}
            >
              Send Message
            </Button>
          </article>
        </section>
        <section className="map">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1446303.9543015836!2d34.27058940680656!3d33.84241125844635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f1744ca9a33e9%3A0x717521ed5139eb60!2sMinistry%20Of%20Public%20Health%20(MOPH%20Lebanon)!5e0!3m2!1sen!2slb!4v1684874856645!5m2!1sen!2slb"
            height="100%"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </section>
      </div>
      <article className="information">
        <div className="icons">
          <LocationOnIcon
            className="icon"
            style={{ fontSize: 35, color: "#FFFFFF" }}
          />
          <span>123 Main Street, Beirut,Lebanon</span>
        </div>
        <div className="icons">
          <EmailIcon
            className="icon"
            style={{ fontSize: 35, color: "#FFFFFF" }}
          />
          <span>facility@gmail.com</span>
        </div>
        <div className="icons">
          <PhoneIcon
            className="icon"
            style={{ fontSize: 35, color: "#FFFFFF" }}
          />
          <span>+96181325449</span>
        </div>
      </article>
      <ToastContainer />
    </main>
  );
}
