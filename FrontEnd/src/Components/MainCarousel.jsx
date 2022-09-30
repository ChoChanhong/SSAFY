import React from "react";
import { Carousel } from "react-bootstrap";

export default function MainCarousel() {
  return (
    <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block"
          style={{ height: 200, width: 150 }}
          src="img/001.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 style={{ color: "black" }}>사용자가이드</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          style={{ height: 200, width: 150 }}
          src="img/002.png"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3 style={{ color: "black" }}>사용자가이드</h3>
        </Carousel.Caption>
      </Carousel.Item>
      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
}
