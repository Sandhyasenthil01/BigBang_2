import React from 'react';
import './Caras.css'
const Carousel = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <ul className="carousel-indicators">
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
      </ul>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://t3.ftcdn.net/jpg/02/70/78/96/240_F_270789669_ME6OAZmJEQA7xGTMesmyRPQ8BtpnGiOS.jpg" className="d-block w-100" alt="Carousel Image 1"  height={500} width={600}/>
          <div className="carousel-caption">
            <h3>Pioneers of Healthcare</h3>
          </div>
        </div>
        <div className="carousel-item">
          <img src="https://t4.ftcdn.net/jpg/01/43/18/17/240_F_143181795_W4wcwoVGC7AaU4g3AQRGOcdLp2CxVFTs.jpg" className="d-block w-100" alt="Carousel Image 2" height={500} width={800}/>
          <div className="carousel-caption">
            <h3>More than 3 branches</h3>
        </div>
        </div>
        <div className="carousel-item">
          <img src="https://t3.ftcdn.net/jpg/02/26/21/20/240_F_226212015_dnPtHKQ3hw4g5SNz0dvo3aiOKstd9KBc.jpg" className="d-block w-100" alt="Carousel Image 3" height={500} width={600}/>
          <div className="carousel-caption">
            <h3>Best Doctors</h3>
          </div>
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </a>
    </div>
  );
};

export default Carousel;
