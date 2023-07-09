import React ,{Component}from "react";
import { variables } from "./Variable";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import './Marquee.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './Gallery.css';
import Navbar from './Navbar';

import axios from 'axios';
export class RegisterDoctor extends Component{
    constructor(props) {
        super(props);
        this.state = {
          Doctor: [],
          doctor_Name: "",
          doc_image: "",
          specialization: "",
          gender: "",
          experience:0,
          doc_name:"",
          doc_password:"",
          status:null,
          doctor_Id: null,
        };
      }
      
      componentDidMount() {
        this.fetchDoctor();
      }
      fetchDoctor() {
        axios.get(variables.API_URL + 'Doctor', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then((response) => {
            const data = response.data;
            const Doctor = data.map((Doctor) => {
              const { Patient, ...rest } = Doctor;
              return { ...rest, Patient };
            });
            this.setState({ Doctor });
                 
          })
          .catch((error) => {
            console.error('Error fetching Doctors:', error);
          });
      }
      

      createItem = () => {
        const { doctor_Name, specialization, gender,experience,doc_name,doc_password, doc_image } = this.state;
        const formData = new FormData();
        formData.append("doctor_Name", doctor_Name);
        formData.append("specialization", specialization);
        formData.append("gender", gender);
        formData.append("experience", experience);
        formData.append("doc_name", doc_name);
        formData.append("doc_password", doc_password);
        formData.append("imageFile", doc_image);
        fetch("https://localhost:7211/api/Doctor", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to create the Doctor. HTTP status " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Doctor Created:", data);
            alert('Success');

            toast.success('Posted Successfully', {
              style: {
                background: '#87FC57',
                color: 'white'
              }
            }); 
            this.fetchDoctor();
            this.setState({
              doctor_Name: "",
              specialization: "",
              experience: 0,
              gender:"",
              doc_name:"",
              doc_password:"",
              doc_image: null,
            });
          })
          .catch((error) => {
            console.error("Error Creating the Doctor:", error);
          });
      };

      handledocInputChange= (event) => {
        this.setState({ doctor_Name: event.target.value });
      };
      handleimageInputChange= (event) => {
        const file = event.target.files[0]; 
        this.setState({ doc_image: file });
      };
      handlespecInputChange= (event) => {
        this.setState({ specialization: event.target.value });
      };
      handlegenderInputChange= (event) => {
        this.setState({ gender: event.target.value });
      };
      handleexperiInputChange=(event) => {
        this.setState({ experience: event.target.value });
      };
      handleexpInputChange=(event) => {
        this.setState({ doc_name: event.target.value });
      };
      handlepassInputChange=(event) => {
        this.setState({ doc_password: event.target.value });
      };
      render(){
        const {
            Doctor,
            doc_image,
            doctor_Name,
            specialization,
            gender,
            experience,
            doc_name,
            doc_password,
            status,
            doctor_Id,
           
          } = this.state;
          return(
    <div>
        <Navbar />

      <br></br> <br></br> <br></br> 
    <div className="gallery">
    <h1 className="gallery-title">Apollo Healthcare for Doctors</h1>

      <div className="image-container">
        <img src=" https://i.pinimg.com/474x/7b/b4/8b/7bb48b16c3481ebe7e0ecbe58119982d.jpg" alt="Image 1" className="gallery-image" />
        <div className="image-overlay">
          <div className="image-text">Grow</div>
        </div>
      </div>
      <div className="image-container">
        <img src="https://i.pinimg.com/474x/46/3e/e8/463ee85d7aecb285c201b3ef94549e03.jpg" alt="Image 2" className="gallery-image" />
        <div className="image-overlay">
          <div className="image-text">Heal</div>
        </div>
      </div>
      <div className="image-container">
        <img src="https://i.pinimg.com/474x/ea/bd/79/eabd7927022213124fa25d713e538db6.jpg" alt="Image 3" className="gallery-image" />
        <div className="image-overlay">
          <div className="image-text">Trust</div>
        </div>
      </div>
    </div>
      <div className="marquee">
      <p> All eligible Health Facilities can register for Digital Health Incentive Scheme.Please drop a mail to abdm.incentives@nha.gov.in in case of issues in registration for Digital Health Incentive Scheme.</p>
    </div>
            <div className="container d-flex justify-content-center align-items-center">
      
          <div className="col-8 mx-auto">
          <div className="card" style={{backgroundImage: "url('')",
  backgroundSize: 'cover',backgroundPosition: 'center',backgroundColor: '#eaf2f8', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div className="card-body">
          <h5 className="card-title" style={{ color: 'black' }}>Create New Doctor</h5>
          <div className="form-group" style={{ color: 'black' }}>
            <label htmlFor="doctor_Name">Doctor Name:</label>
            <input
              type="text" 
              className="form-control"
              id="doctor_Name"
              value={doctor_Name}
              onChange={this.handledocInputChange}
            />
          </div>

          <div className="form-group" style={{ color: 'black' }}>
            <label htmlFor="doc_image">Doctor Image:</label>
            <input
              type="file"
              className="form-control"
              id="doc_image"
              onChange={this.handleimageInputChange}
            />
          </div>

          <div className="form-group" style={{ color: 'black' }}>
            <label htmlFor="specialization">specialization</label>
            <input
              type="text"
              className="form-control"
              id="specialization"
              value={specialization}
              onChange={this.handlespecInputChange}
            />
          </div>

          <div className="form-group" style={{ color: 'black' }}>
            <label htmlFor="gender">Doctor Gender:</label>
            <input
              type="text"
              className="form-control"
              id="gender"
              value={gender}
              onChange={this.handlegenderInputChange}
            />
          </div>
          <div className="form-group" style={{ color: 'black' }}>
            <label htmlFor="experience">Doctor Experience:</label>
            <input
              type="number"
              className="form-control"
              id="experience"
              value={experience}
              onChange={this.handleexperiInputChange}
            />
          </div>
          <div className="form-group" style={{ color: 'black' }}>
            <label htmlFor="experience">Doctor username:</label>
            <input
              type="text"
              className="form-control"
              id="experience"
              value={doc_name}
              onChange={this.handleexpInputChange}
            />
          </div>
          <div className="form-group" style={{ color: 'black' }}>
            <label htmlFor="doc_password">Doctor Password:</label>
            <input
              type="password"
              className="form-control"
              id="doc_password"
              value={doc_password}
              onChange={this.handlepassInputChange}
            />
          </div>
          <Link className="btn btn-primary"to={'/login'} style={{ backgroundColor: '#1976d2' }} onClick={this.createItem}>
            Create Doctor
          </Link>
        </div>
      </div>
      </div>
  </div>

  

  </div>
          )
    }
}