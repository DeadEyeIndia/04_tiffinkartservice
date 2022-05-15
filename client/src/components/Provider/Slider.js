import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  //   console.log(length);
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="app__slides">
      <ChevronLeftIcon onClick={prevSlide} className="app__slideLeft" />
      <ChevronRightIcon onClick={nextSlide} className="app__slideRight" />
      {slides.map((slide, index) => (
        <>
          {index === current && (
            <img
              className="app__slideImage"
              key={index}
              src={slide?.url}
              alt={`${index} Slide`}
            />
          )}
        </>
      ))}
    </div>
  );
};

export default Slider;
