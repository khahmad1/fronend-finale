import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "./Hero1.png";
import img2 from "./Hero2.png";
import img3 from "./Hero3.png";

import { useTransition, animated } from "react-spring";
import "./hero.css";
import { Button } from "@mui/material";

const images = [img1, img2, img3];

function HeroSectionHome() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animateText, setAnimateText] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimateText(false);
    }, 1000);

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const transitions = useTransition(images[currentImageIndex], {
    from: { opacity: 0, transform: "translate3d(100% , 0,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    config: { duration: 1000 },
  });

  return (
    <>
      <section className="home_hero_body">
        <div className="left">
          <h3 className={`hero-title ${animateText ? "animated-text" : ""}`}>
          Med Bridge: Empowering Medical Management<br/> with Seamless Efficiency
          </h3>
          <p className="description">
          Medical Bridge is empowering the Medical management and he is<br/>
            dedicated to revolutionizing The way healthcare services are<br/>
            delivered across the nation It is the bridge between the facilities<br/>
            and the companies of medicine.
          </p>
          <Link className="learn" to="/about">
            <Button
              sx={{
                mt: 6,
                mb: 2,
                backgroundColor: "var(--primary)",
                fontSize: "16px",
                height: "45px",
                color: "#fff",
                border: "1px solid var(--primary)",
                float: "left",
                "&:hover": {
                  color: "var(--primary)",
                  background: "transparont",
                  cursor: "pointer",
                  transition: "0.2s ease-out",
                },
              }}
            >
              Learn More
            </Button>
          </Link>
        </div>
        <div className="right">
          <div className="image-container-hero">
            {transitions((style, item) =>
              item ? (
                <animated.img
                  className="slider-item-img"
                  src={item}
                  style={style}
                  alt={`Image ${currentImageIndex + 1}`}
                />
              ) : null
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSectionHome;
