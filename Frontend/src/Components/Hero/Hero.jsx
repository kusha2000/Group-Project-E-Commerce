import React from "react";
import "./Hero.css";
import hero from "../Assets/hero_image.png";
import arrow_icon from "../Assets/arrow.png";


const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
       
        <div>
        <p>New Collections for everyone</p>
        </div>

        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;