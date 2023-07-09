import React, { Component } from "react";
import axios from "axios";
import { variables } from "./Variable";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './Navbar';

class Doctorid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: null,
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
    this.getDoctorById();
  }

  getDoctorById = () => {
    const Doctor_Id = localStorage.getItem("doctor_Id");

    axios
      .get(`${variables.API_URL}Doctor/${Doctor_Id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const doctor = response.data;
        this.setState({ doctor });
      })
      .catch((error) => {
        console.error("Error fetching Doctor by ID:", error);
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
  handleusernameInputChange=(event) => {
    this.setState({ doc_name: event.target.value });
  };
  handlepassInputChange=(event) => {
    this.setState({ doc_password: event.target.value });
  };
  handlestatusInputChange=(event) => {
    this.setState({ status: event.target.value });
  };
  handledocImageeditInputChange= (event) => {
    const file = event.target.files[0]; 
    this.setState({ doc_image: file });
  };
  handledocpassInputChange=(event) => {
    this.setState({doc_password : event.target.value });
  };
  handledocexperiInputChange=(event) => {
    this.setState({experience : event.target.value });
  };
  handledocexperipasInputChange=(event) => {
    this.setState({doc_name : event.target.value });
  };
  handledocgenInputChange=(event) => {
    this.setState({gender : event.target.value });
  };
  handledocspecInputChange=(event) => {
    this.setState({specialization : event.target.value });
  };
  handledocnameInputChange=(event) => {
    this.setState({doctor_Name : event.target.value });
  };
  handledocIdInputChange=(event) => {
    this.setState({doctor_Id : event.target.value });
  };
  editItem = () => {
    const { doctor_Id,doctor_Name, specialization, gender,experience,doc_name,doc_password, doc_image  } = this.state;
  
    const formData = new FormData();
    formData.append('doctor_Id', doctor_Id);
    formData.append('doctor_Name', doctor_Name);
    formData.append('doc', 'doctor value'); 
    formData.append('specialization', specialization);
    formData.append('gender', gender);
    formData.append('experience', experience);
    formData.append('doc_name', doc_name);
    formData.append('doc_password', doc_password);
    formData.append('imageFile', doc_image);
  
    axios.put(variables.API_URL + `Doctor/${doctor_Id}`, formData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.data)
      .then((data) => {
        console.log('Doctor Updated:', data);
        this.fetchDoctor();
        this.setState({
          doctor_Id: 0,
          doctor_Name: '',
          specialization: '',
          gender: "",
          experience:0,
          doc_name:"",
          doc_password:"",
          doc_image: null,
        });
  
        const imageElement = document.getElementById('doc_image');
        if (imageElement) {
          imageElement.src = data.doc_image;
        }
      })
      .catch((error) => {
        console.error('Error Updating the Doctor:', error);
      });
  };
  deleteItem = (doctor_Id) => {
    fetch(variables.API_URL + `Doctor/${doctor_Id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Doctor Deleted:", data);
        this.fetchCake();
      })
      .catch((error) => {
        console.error("Error Deleting the Doctor:", error);
      });
  };
  render() {
    const { doctor } = this.state;
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
             
    return (
        <div style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/05/98/60/81/240_F_598608101_mPdGSxcFrdy44xgPiuZFXY1kvDVrZVRc.jpg")', backgroundPosition: 'center', backgroundSize: 'cover' , backdropFilter: 'blur(15px)', minHeight: '100vh', minWidth: '100%' }}>
            <Navbar />
      <div className="container">
        <h2>Doctor Details</h2>

        {doctor ? (
          <table className="table">
            <thead>
              <tr>  
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Gender</th>
                <th>Experience</th>
                <th>Status</th>
                <th>username</th>

                <th>password</th>


              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{doctor.doctor_Name}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.gender}</td>
                <td>{doctor.experience}</td>
                <td>{doctor.status}</td>
                <td>{doctor.doc_name}</td>
                <td>{doctor.doc_password}</td>

               
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Loading doctor details...</p>
        )}
      </div>


      
      </div>
    );
  }
}

export default Doctorid;
