import React, { useEffect, useState } from "react";
import Navbar from './Navbar';

function AdminPage() {

  const [activeSection, setActiveSection] = useState('content');
  const [doctors, setDoctors] = useState([]);
  const [notApprovedDoctors, setNotApprovedDoctors] = useState([]);

  useEffect(() => {
    fetchApprovedDoctors();
    fetchNotApprovedDoctors();

  }, []);


  const fetchApprovedDoctors=()=>{
    fetch('https://localhost:7211/api/Doctor/Accepted status', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .then(
        data => setDoctors(data),
        console.log(doctors))
      .catch(error => console.log(error));
  }

const fetchNotApprovedDoctors=()=>{
  fetch('https://localhost:7211/api/Doctor/Requested status', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  })
      .then(response => response.json())
      .then(data => setNotApprovedDoctors(data))
      .catch(error => console.log(error));
  }

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <>
    <Navbar/>
    <header className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "grey", color: "#fff" }}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-1 mb-lg-0 justify-content-center">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="doctorsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "#fff", fontSize: "16px" }}>
                  Doctors
                </a>
                <ul className="dropdown-menu" aria-labelledby="doctorsDropdown">
                  <li><a className="dropdown-item" onClick={() => handleSectionClick('doctors')}>Requested Doctors</a></li>
                  <li><a className="dropdown-item" onClick={() => handleSectionClick('getDoctors')}>Activated Doctors</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admincrud" style={{ color: "#fff", fontSize: "16px" }}>Edit Doctors</a>
              </li>
            </ul>
            <span class="navbar-text" style={{ marginLeft: '10px', fontSize: '20px' }}>
        <a class="nav-link" onClick={() => { localStorage.removeItem("token") }}  href="/home">Logout</a>
      </span>          </div>
        </div>
      </header>

  
  
  
      {activeSection === 'content' && (
        <div className="content">
          <div className="context">
            <h1>Welcome admin!!</h1>
          </div>
        </div>
      )}
  
      {activeSection === 'doctors' && (
        <div style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/05/59/79/11/240_F_559791137_JecfqH0O4QfrCqLoboVGMGxS5vHayQ58.jpg")', backgroundPosition: 'center', backgroundSize: 'cover' , backdropFilter: 'blur(15px)', minHeight: '100vh', minWidth: '100%' }}>
        <div className="doctors" >
          <section className="my-background-radial-gradient overflow-hidden">
            <div className="my-doctors-container container">
              <div className="my-page-heading">
                <h2>Requested Doctors</h2>
                <hr />
              </div>
              <div className="container">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                  {notApprovedDoctors.map(doctor => (
                    <div key={doctor.doctor_Id} className="col">
                      <div className="card my-bg-glass">
                        <div className="card-body">
                        <img
                          src={`https://localhost:7211/uploads/${doctor.doc_image}`}
                          className="card-img-top"
                          alt=""
                          style={{ width: '200px', height: '200px' }}/>

                        <div className="flex flex-wrap">
                          <br/>
                        <span className="inline-block w-1/2">
                        <p className="text-sm text-gray-600">Name: {doctor.doctor_Name}</p>
                          <p className="text-sm text-gray-600">Specialization: {doctor.specialization}</p>
                          <p className="text-sm text-gray-600">Gender: {doctor.gender}</p>
                        </span>
                        <span className="inline-block w-1/2">
                          <p className="text-sm text-gray-600">Experience: {doctor.experience} years</p>
                          <p className="text-sm text-gray-600">doc_name: {doctor.doc_name}</p>
                          <p className="text-sm text-gray-600">Status: {doctor.status}</p>
                        </span>
                      </div><hr/>
                          
                          <div className="d-flex justify-content-center">
                          
                            <button type="button" className="btn btn-success me-2" onClick={() =>{
                              const requestBody = {
                              "id": doctor.doctor_Id
                              };
                              console.log(requestBody);

                              fetch("https://localhost:7211/api/Doctor/Update status", {
                              method: "PUT",
                              headers: {
                                  "Accept": "application/json",
                                  "Content-Type": "application/json"
                              },
                              body: JSON.stringify(requestBody)
                              })
                              .then(response => response.json())
                              .then(data => {
                              console.log(data); 
                              fetchNotApprovedDoctors();
                              fetchApprovedDoctors();
                              })
                              .catch(error => console.log(error));
                          }}>Accept</button>


                            <button type="button" className="btn btn-danger" onClick={() =>{
                              const requestBody = {
                                "id": doctor.doctor_Id
                              };
                              console.log(requestBody);

                              fetch("https://localhost:7211/api/Doctor/Decline Doctor", {
                              method: "PUT",
                              headers: {
                                  "Accept": "application/json",
                                  "Content-Type": "application/json"
                              },
                              body: JSON.stringify(requestBody)
                              })
                              .then(response => response.json())
                              .then(data => {
                              console.log(data); 
                              fetchNotApprovedDoctors();
                              fetchApprovedDoctors();
                              })
                              .catch(error => console.log(error));
                          }}>Decline</button>


                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        </div>
        </div>
      )}
  
      {activeSection === 'getDoctors' && (
        <div style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/05/98/60/81/240_F_598608101_mPdGSxcFrdy44xgPiuZFXY1kvDVrZVRc.jpg")', backgroundPosition: 'center', backgroundSize: 'cover' , backdropFilter: 'blur(15px)', minHeight: '100vh', minWidth: '100%' }}> 
        <div className="getDoctors">
          <section className="my-background-radial-gradient overflow-hidden">
            <div className="my-doctors-container container">
              <div className="my-page-heading">
                <h2>Activated Doctors</h2>
                
                <hr />
              </div>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                  {doctors.map(doctor => (
                    <div key={doctor.doctor_Id} className="col">
                    
                      <div className="card my-bg-glass">
                      <br/>
                      <img
                  src={`https://localhost:7211/uploads/${doctor.doc_image}`}
                  className="card-img-top "
                  alt=""
                  style={{
                    width: '200px',
                    height: '200px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                />

                <div className="card-body">
            <h5 className="card-title">{doctor.doctor_Name}</h5>
            <div className="flex flex-wrap">
              <span className="inline-block w-1/2">
                <p className="text-sm text-gray-600">Specialization: {doctor.specialization}</p>
                <p className="text-sm text-gray-600">Gender: {doctor.gender}</p>
              </span>
              <span className="inline-block w-1/2">
                <p className="text-sm text-gray-600">Experience: {doctor.experience} years</p>
                <p className="text-sm text-gray-600">doc_name: {doctor.doc_name}</p>
                <p className="text-sm text-gray-600">Status: {doctor.status}</p>
              </span>
            </div>
          </div>
        </div>
      </div>   
      
  ))}
</div>
            </div>
            
          </section>
        </div>
        </div>
      )}
    </>
  );  
}

export default AdminPage;