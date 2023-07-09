import React from 'react';
import './Honeycomb.css'

const HoneycombCollage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 col-md-4">
          <div className="hexagon">
            <img src="https://i.pinimg.com/474x/6b/3f/b5/6b3fb590ce6c50279a37624b904b056a.jpg" alt="Image 1" />
          </div>
        </div>
        <div className="col-6 col-md-4">
          <div className="hexagon">
            <img src="https://i.pinimg.com/474x/73/50/70/735070cae37271602d55dfb82eb02c10.jpg" alt="Image 2" />
          </div>
        </div>
        <div className="col-6 col-md-4">
          <div className="hexagon">
            <img src="https://i.pinimg.com/474x/7c/fb/97/7cfb972642d60bdc8541417d3fcb48ac.jpg" alt="Image 3" />
          </div>
        </div>
      
     
        
     
       
      </div>
    </div>
  );
};

export default HoneycombCollage;
