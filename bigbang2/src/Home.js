import React from 'react';
import Carousel from './Carasouel';
import HoneycombCollage from './Honeycomg';
import Navbar from './Navbar';

const Home = () => {
  const slideItems = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
  ];  
  return (
    <div>
            <Navbar />

    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
     
      <div>
      <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '50px' }}>Aishwarya Healthcare</h1>

      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px' }}>
        The Aishwarya Institutes are regarded as one of the best  hospitals in India,
        performing a multitude of treatments and procedures in cardiology and cardiothoracic surgery.
        The scorecard shows an unmatched record of over 1,96,684 cardiac and cardiothoracic surgeries.
      </p><br></br><br></br><br></br>
      
        <div className="card-container" style={{ display: 'flex', justifyContent: 'flex-start' }}>

        <div className="card" style={{ width: '350px'} }>
          <div className="card-body">

            <h5 className="card-title">We care</h5>
            <img src="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="Example Image" height="200" width="300" />

            <p className="card-text">Best Clinical Outcomes</p>
          </div>
        </div>
        <div className="card" style={{ width: '350px'} }>
          <div className="card-body">
            <h5 className="card-title">We Treat</h5>
                      <img src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="Example Image" height="200" width="300"/>

            <p className="card-text">11,000+ Healing Hands</p>
          </div>
        </div>
        <div className="card" style={{ width: '350px'} }>
          <div className="card-body">
            <h5 className="card-title">Stay Healthy</h5>
            <img src="https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80" alt="Example Image" height="200" width="300"/>

            <p className="card-text">Most Advanced Healthcare Technology</p>
          </div>
        </div>
      

      </div>
     
      </div>
      <div className="card">
      <img src="  https://chennai.apollohospitals.com/wp-content/uploads/2021/06/apollohealthcare.jpg" alt="Example Image" height="500" width="600"/>
      <div className="card-body">
        <h5 className="card-title">Centres Of Excellence</h5>
        <p className="card-text">Largest network of the world’s finest and brightest medical experts who provide compassionate care using outstanding expertise and advanced technology.</p>
        <a href="/RegDoc" className="btn btn-primary">Register for Doctor</a>
      </div>
      <br></br>
    
      <a href="/Patientreg" className="btn btn-primary" >Register for patient</a>

    </div>
    </div>
    <Carousel />
    <br></br>
    <HoneycombCollage />
    <br></br>
    <footer style={{ backgroundColor: '#f8f9fa', padding: '20px', textAlign: 'center' }}>
    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', margin: '0' }}>
      &copy; {new Date().getFullYear()} Aishwarya Healthcare. All rights reserved.
    </p>
  </footer>
    </div>
  );
};

export default Home;
