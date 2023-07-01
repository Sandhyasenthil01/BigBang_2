import React,{Component}from "react";
import { variables } from "./Variable";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from 'axios';
export class Doctor extends Component{
    constructor(props) {
        super(props);
        this.state = {
          Doctor: [],
          doctor_Name: "",
          doc_image: "",
          specialization: "",
          gender: "",
          experience:0,
          password:"",
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
      handlepassInputChange=(event) => {
        this.setState({ password: event.target.value });
      };
      handlestatusInputChange=(event) => {
        this.setState({ status: event.target.value });
      };
      handledocImageeditInputChange= (event) => {
        const file = event.target.files[0]; // Get the first file from the input
        this.setState({ doc_image: file });
      };
      handledocpassInputChange=(event) => {
        this.setState({password : event.target.value });
      };
      handledocexperiInputChange=(event) => {
        this.setState({experience : event.target.value });
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
      createItem = () => {
        const { doctor_Name, specialization, gender,experience,password, doc_image } = this.state;
        const formData = new FormData();
        formData.append("doctor_Name", doctor_Name);
        formData.append("specialization", specialization);
        formData.append("gender", gender);
        formData.append("experience", experience);
        formData.append("password", password);

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
              throw new Error("Failed to create the cake. HTTP status " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Doctor Created:", data);
            this.fetchDoctor();
            this.setState({
              doctor_Name: "",
              specialization: "",
              experience: 0,
              gender:"",
              password:"",
              doc_image: null,
            });
          })
          .catch((error) => {
            console.error("Error Creating the Doctor:", error);
          });
      };
      editItem = () => {
        const { doctor_Id,doctor_Name, specialization, gender,experience,password, doc_image  } = this.state;
      
        const formData = new FormData();
        formData.append('doctor_Id', doctor_Id);
        formData.append('doctor_Name', doctor_Name);
        formData.append('doc', 'doctor value'); 
        formData.append('specialization', specialization);
        formData.append('gender', gender);
        formData.append('experience', experience);
        formData.append('password', password);
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
              password:"",
              doc_image: null,
            });
      
            // Update the image source
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
    
    render(){
        const {
            Doctor,
            doc_image,
            doctor_Name,
            specialization,
            gender,
            experience,
            password,
            status,
            doctor_Id,
           
          } = this.state;
                 
        return(
           

            <div className="container">
 <h2 className="mb-4">Doctor List</h2>

<div className="row">
  {Doctor.map((doc) => (
    <div className="col-md-4 mb-4" key={doc.doctor_Id}>
      <div className="card card-small">
      <img
  src={`https://localhost:7211/uploads/${doc.doc_image}`}
  className="card-img-top doctor-image"
  alt={doc.doctor_Name}
/>
        <div className="card-body">
          <h5 className="card-title">{doc.doctor_Name}</h5>
          <p className="card-text">specialization: {doc.specialization}</p>
          <p className="card-text">Doctor Gender: {doc.gender}</p>
          <p className="card-text">Doctor Experience: {doc.experience}</p>
          <div className="btn-group" role="group">
          <td> <button type="button"
                className="btn btn"
                onClick={() =>
                  this.setState({doctor_Id: doc.doctor_Id, doctor_Name: doc.doctor_Name,doc_image:doc.doc_image,specialization:doc.specialization,experience:doc.experience,gender:doc.gender })
                }><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg> </button> </td>
            <td><button type="button"
                className="btn btn" onClick={() => this.deleteItem(doc.doctor_Id)}> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg></button></td>
          </div>

        </div>
      </div>
    </div>
  ))}
</div>
<div className="card mb-4 card-sm">
  <div className="card-body">
    <h5 className="card-title">Create New Doctor</h5>
    <div className="form-group">
      <label htmlFor="doctor_Name">Doctor Name:</label>
      <input
        type="text"
        className="form-control"
        id="doctor_Name"
        value={doctor_Name}
        onChange={this.handledocInputChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="doc_image">Doctor Image:</label>
      <input
        type="file"
        className="form-control"
        id="doc_image"
        onChange={this.handleimageInputChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="specialization">specialization</label>
      <input
        type="text"
        className="form-control"
        id="specialization"
        value={specialization}
        onChange={this.handlespecInputChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="gender">Doctor Gender:</label>
      <input
        type="text"
        className="form-control"
        id="gender"
        value={gender}
        onChange={this.handlegenderInputChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="experience">Doctor Experience:</label>
      <input
        type="number"
        className="form-control"
        id="experience"
        value={experience}
        onChange={this.handleexperiInputChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="password">Doctor Password:</label>
      <input
        type="text"
        className="form-control"
        id="password"
        value={password}
        onChange={this.handlepassInputChange}
      />
    </div>
    {/* <div className="form-group">
      <label htmlFor="status">Doctor Status:</label>
      <input
        type="number"
        className="form-control"
        id="status"
        value={status}
        onChange={this.handlestatusInputChange}
      />
    </div> */}
    <button className="btn btn-primary" onClick={this.createItem}>
      Create Doctor
    </button>
  </div>
</div>
<div className="card card-sm">
        <div className="card-body">
          <h5 className="card-title">Edit Doctor</h5>
          <div className="form-group">
            <label htmlFor="doctor_Id">Doctor Id:</label>
            <input
              type="text"
              className="form-control"
              id="doctor_Id"
              value={doctor_Id}
              onChange={this.handledocIdInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctor_Name">Doctor Name:</label>
            <input
              type="text"
              className="form-control"
              id="doctor_Name"
              value={doctor_Name}
              onChange={this.handledocnameInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialization">specialization:</label>
            <input
              type="text"
              className="form-control"
              id="specialization"
              value={specialization}
              onChange={this.handledocspecInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Doctor Gender:</label>
            <input
              type="text"
              className="form-control"
              id="gender"
              value={gender}
              onChange={this.handledocgenInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="experience">Doctor Experience:</label>
            <input
              type="number"
              className="form-control"
              id="experience"
              value={experience}
              onChange={this.handledocexperiInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Doctor Password:</label>
            <input
              type="text"
              className="form-control"
              id="password"
              value={password}
              onChange={this.handledocpassInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="doc_image">Doctor Image:</label>
            <input
              type="file"
              className="form-control"
              id="doc_image"
              onChange={this.handledocImageeditInputChange}
            />
          </div>

          {/* Button to trigger the editItem function */}
          <button className="btn btn-primary" onClick={this.editItem}>
            Update Doctor
          </button>
        </div>
      </div>
</div>
        )
    }
}