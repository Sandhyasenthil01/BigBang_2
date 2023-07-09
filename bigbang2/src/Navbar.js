import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
      <a className="navbar-brand" href="#">
          <img src="https://i.pinimg.com/474x/30/7e/69/307e6906c251d91bb6202b3dd4736d7a.jpg" alt="Brand Image" height={60} width={70}/>
        </a>        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Admin">Admin</a>
            </li>
            
            
          </ul>
        </div>
        <Link className="btn btn-primary" to={"/Login"}>Login</Link>
        <span class="navbar-text" style={{ marginLeft: '10px', fontSize: '20px' }}>
        <a class="nav-link" onClick={() => { localStorage.removeItem("token") }} href="/home">Logout</a>
      </span>
      </div>
    </nav>
  );
};

export default Navbar;
