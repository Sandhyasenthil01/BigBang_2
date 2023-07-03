import React from 'react'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Carousel from 'react-bootstrap/Carousel';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
export default function Homedb() {
  return (
    <div className="row justify-content-center">
    <div className="col-lg-4" style={{ marginTop: '100px' }}>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="image1.jpg" // Replace with the actual image source
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="image2.jpg" // Replace with the actual image source
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="image3.jpg" // Replace with the actual image source
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="image4.jpg" // Replace with the actual image source
            alt="Fourth slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
    {/* Rest of the code... */}
  </div>
  )
}
