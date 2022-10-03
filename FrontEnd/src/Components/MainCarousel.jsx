import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import MainIMG from "../assets/images/004.jpg";
import GuideIMG from "../assets/images/005.jpg";

export default function MainCarousel() {
  return (
    <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block"
          style={{ height: 400, width: 420 }}
          src={MainIMG}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/serviceinfo">
          <img
            className="d-block"
            style={{ height: 400, width: 420 }}
            src={GuideIMG}
            alt="Second slide"
          />
        </Link>
      </Carousel.Item>
    </Carousel>
  );
}
