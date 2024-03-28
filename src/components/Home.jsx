import React from 'react';
import { Carousel } from 'react-bootstrap';

const Home = () => (
  <div className="carousel-container">
    {' '}
    <Carousel interval={2500} fluid>
      <Carousel.Item>
        <img
          className="d-block w-100 crsl-image"
          src={`${process.env.PUBLIC_URL}/assets/img-1.jpg`}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 crsl-image"
          src={`${process.env.PUBLIC_URL}/assets/img-8.png`}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 crsl-image"
          src={`${process.env.PUBLIC_URL}/assets/makeup-1.jpg`}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 crsl-image"
          src={`${process.env.PUBLIC_URL}/assets/skin-3.jpg`}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 crsl-image"
          src={`${process.env.PUBLIC_URL}/assets/per-1.webp`}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 crsl-image"
          src={`${process.env.PUBLIC_URL}/assets/men-1.avif`}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 crsl-image"
          src={`${process.env.PUBLIC_URL}/assets/kids-3.jpg`}
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  </div>
);

export default Home;
