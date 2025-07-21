import React, { useState, useEffect } from "react";
import "../styles/BannerCarousel.css";

const banners = [
  {
    image: "/assets/banner.jpeg",
    alt: "Live Gigs",
  },
  {
    image: "/assets/banner.jpeg",
    alt: "Rock Concert",
  },
  {
    image: "/assets/banner.jpeg",
    alt: "EDM Night",
  },
];

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000); // Auto-slide every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {banners.map((banner, idx) => (
          <div className="carousel-slide" key={idx}>
            <img src={banner.image} alt={banner.alt} />
          </div>
        ))}
      </div>

      <button className="arrow left" onClick={goToPrev}>❮</button>
      <button className="arrow right" onClick={goToNext}>❯</button>

      <div className="carousel-dots">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
