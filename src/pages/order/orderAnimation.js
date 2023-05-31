import { useEffect } from "react";
import { gsap, Power1, Elastic, Linear } from "gsap";
import './orderAnimation.css'

const TruckAnimation = () => {
  useEffect(() => {
    const mainAnimation = gsap.timeline({
      repeat: -1, // Repeat indefinitely
      repeatDelay: 0.1,
      onComplete: () => {
        mainAnimation.restart();
      }
    })
      // show load
      .addLabel("entranceOfElements")
      .to(".load", 0.8, { x: 20 }, "entranceOfElements")
      .to(".truck", 1.6, { x: -10 }, "entranceOfElements")
      // open doors and load load
      .addLabel("openDoorsAndLoad")
      .to(
        ".left__door",
        0.8,
        { rotation: 110, delay: 0.2, ease: Elastic.easeOut.config(1, 1) },
        "openDoorsAndLoad"
      )
      .to(".right__door", 0.8, { rotation: -110, ease: Elastic.easeOut.config(1, 1) }, "openDoorsAndLoad")
      .to(".load", 0.4, { x: 100, ease: Power1.easeInOut, delay: 0.6 }, "openDoorsAndLoad")
      // close doors
      .addLabel("closeDoors")
      .to(".left__door", 0.3, { rotation: 0, delay: 0.3 }, "closeDoors")
      .to(".right__door", 0.3, { rotation: 0 }, "closeDoors")
      .to(".load", 0, { display: "none" }, "closeDoors")
      // move and start lights
      .addLabel("letsGo")
      .to(".light__beam", 0.5, { opacity: 1, width: 60 }, "letsGo")
      .to(".truck", 1, { x: 100, ease: Linear.easeNone }, "letsGo")
      .to(".lane", 1, { x: 0, ease: Linear.easeNone }, "letsGo")
      .to(".lane", 0, { x: 30, repeat: Infinity, ease: Linear.easeNone, delay: 1 }, "letsGo")
      // nie animuje się za 2+ powtórzeniem
      .to(".lane", 0.2, { x: 0, repeat: Infinity, ease: Linear.easeNone, delay: 1 }, "letsGo")
      // nie animuje się za 2+ powtórzeniem
      .to(".truck", 1.5, { x: -130, delay: 1 }, "letsGo")
      .to(".truck", 1.3, { x: 500, delay: 3 }, "letsGo")
      .to(".lane", 1, { height: 3, delay: 3 }, "letsGo")
      .to(".lane", 0, { x: 30, repeat: 10, ease: Linear.easeNone, delay: 3 }, "letsGo")
      .to(".lane", 0.05, { x: 0, repeat: 10, ease: Linear.easeNone, delay: 3 }, "letsGo")
      .to(".lane", 0.2, { opacity: 0, delay: 3.5 }, "letsGo");

  
  }, []);

  return (
    <div className="container">
    <div className="road">
      <div className="load"></div>
      <div className="truck">
        <div className="load__area">
          <div className="door left__door"></div>
          <div className="door right__door"></div>
        </div>
        <div className="cockpit">
          <div className="cockpit__roof"></div>
          <div className="front__window"></div>
          <div className="light left__light">
            <div className="light__beam"></div>
          </div>
          <div className="light right__light">
            <div className="light__beam"></div>
          </div>
        </div>
      </div>
      <div className="lane"></div>
    </div>
  </div>
  )}
  export default TruckAnimation