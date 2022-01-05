import React, { useState, useEffect } from "react";
import BtnSlider from "./BtnSlider";
import sliderData from "./sliderData";
import "./MainSlider.scss";
import { Link } from "react-router-dom";

export default function MainSlider() {
  const [slideIndex, setSlideIndex] = useState(1);
  // 앞으로
  const nextSlide = () => {
    if (slideIndex !== sliderData.length) {
      setSlideIndex(slideIndex + 1);
    } else {
      setSlideIndex(1);
    }
  };
  // 이전으로
  const prevSlide = () => {
    if (slideIndex === 1) {
      setSlideIndex(sliderData.length);
    } else {
      setSlideIndex(slideIndex - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (slideIndex !== sliderData.length) {
        setSlideIndex(slideIndex + 1);
      } else {
        setSlideIndex(1);
      }
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  });

  const changePage = () => {
    console.log("changed");
    var link = "www.yahoo.com";
    window.location.assign(link);
  };
  return (
    <div className="MainSlider">
      <ul>
        {sliderData.map((obj, index) => {
          return (
            <li
              key={obj.id}
              className={slideIndex === index + 1 ? "slide-active" : "slide"}
            >
              <img
                src={obj.img}
                className="image"
                onClick={() => changePage()}
              />
            </li>
          );
        })}
      </ul>
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />
    </div>
  );
}