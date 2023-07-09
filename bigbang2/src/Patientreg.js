import React, { Component } from "react";
import axios from "axios";
import Navbar from './Navbar';
  
  import { Link } from "react-router-dom";

class Patientreg extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      Doctor:[],
      patient_Id: 0,
      doctor_Id: 0,
      doctor: null,
      patient_Name: "",
      patient_Age: 0,
      gender: "",
      health_Issue: "",
      phone_number: "",
      address: "",
      user_name: "",
      user_password: ""

    };
  }

 
 
  componentDidMount() {
    this.fetchDoctor();
}


  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createPatient = () => {
    const {
      doctor_Id,
      patient_Name,
      patient_Age,
      gender,
      health_Issue,
      phone_number,    
      address,
      user_name,
      user_password
    } = this.state;

    const patient = {
      doctor_Id,
      patient_Name,
      patient_Age,
      gender,
      health_Issue,
      phone_number,
      address,
      user_name,
      user_password
    
    };
   

    axios
      .post("https://localhost:7211/api/Patient",patient)
      .then((response) => {
        console.log("Patient created:", response.data);
        this.fetchPatients();
        this.resetForm();
      })
      .catch((error) => {
        console.error("Error creating patient:", error);
      });
  };

  
  resetForm = () => {
    this.setState({
      patient_Id: 0,
      doctor_Id: 0,
      doctor: null,
      patient_Name: "",
      patient_Age: 0,
      gender: "",
      health_Issue:"",
      phone_number: "", 
      address: "",
      user_name: "",
      user_password: ""
      
    });
  };
  fetchDoctor() {
    axios.get('https://localhost:7211/api/Doctor/Accepted status')
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


  render() {
    const {
      patients,
      patient_Id,
      doctor_Id,
      doctor,
      patient_Name,
      patient_Age,
      gender,
      health_Issue,
      phone_number,
      address,
      user_name,
      user_password
    
    } = this.state;
    const { Doctor } = this.state;


return (
  <div>
  <Navbar/>
  <br></br>
  <div style={{ backgroundImage: 'url("https://t3.ftcdn.net/jpg/05/78/82/40/240_F_578824012_fBT61z1FImkRuVyzOTiCQIfz45y5XAHz.jpg")', backgroundPosition: 'center', backgroundSize: 'cover' , backdropFilter: 'blur(15px)', minHeight: '100vh', minWidth: '100%' }}>
  <div className="container">
  <div className="card card-sm">
    <div className="card-body">

    <div>
      <h3>Registration Patients</h3>
      <Link type="button" className="btn btn-primary" to="/ApprovedDoc">Find doctors</Link>

      <form>
     
          <div className="mb-3">
          <label htmlFor="doctor_Id" className="form-label">
            Doctor
          </label>
          <select
            className="form-control"
            id="doctor_Id"
            name="doctor_Id"
            value={doctor_Id}
            onChange={this.handleInputChange}
          >
            <option value="">Select Doctor</option>
            {Doctor.map((doctor) => (
              <option key={doctor.doctor_Id} value={doctor.doctor_Id}>
                {doctor.doctor_Id} - {doctor.doctor_Name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="doctor_Id" className="form-label">
          Patient Name
          </label>
          <input
            type="text"
            className="form-control"
            id="patient_Name"
            name="patient_Name"
            value={patient_Name}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="patient_Age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="patient_Age"
            name="patient_Age"
            value={patient_Age}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
          gender
          </label>
          <input
            type="text"
            className="form-control"
            id="gender"
            name="gender"
            value={gender}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="health_Issue" className="form-label">
          Health Issue
          </label>
          <input
            type="text"
            className="form-control"
            id="health_Issue"
            name="health_Issue"
            value={health_Issue}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">
          phone number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone_number"
            name="phone_number"
            value={phone_number}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
         Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={address}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="user_name" className="form-label">
      User name
          </label>
          <input
            type="text"
            className="form-control"
            id="user_name"
            name="user_name"
            value={user_name}
            onChange={this.handleInputChange}
          />
        </div>
         <div className="mb-3">
          <label htmlFor="user_password" className="form-label">
      User password
          </label>
          <input
            type="text"
            className="form-control"
            id="user_password"
            name="user_password"
            value={user_password}
            onChange={this.handleInputChange}
          />
        </div>

        {patient_Id === 0 ? (
          <Link type="button" className="btn btn-primary" onClick={this.createPatient} to={"/Login"}>
            Register
          </Link>
        ) : (
          <button type="button" className="btn btn-primary" onClick={this.updatePatient}>
            Update Patient
          </button>
        )}

        <button type="button" className="btn btn-secondary" onClick={this.resetForm}>
          Cancel
        </button>
      </form>
    </div>

   </div>

</div>  
</div>
  </div>
  </div>
);
}
}

export default Patientreg;


