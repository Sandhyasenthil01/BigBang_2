import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

export default function Login() {
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('user'); 

  const navigate = useNavigate();

  const proceedLoginUsingAPI = (e) => {
    e.preventDefault();

    const apiUrl = role === 'user' ? 'https://localhost:7211/api/Token/Patients' : 'https://localhost:7211/api/Token/Doctors';

    const inputObj = {
      user_name: userName,
      user_password: password,
    };

    const inputObj2 = {
      doc_name: userName,
      doc_password: password,
    };

    const input = role === 'user' ? inputObj : inputObj2;
    if (role !== 'user') {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      .then((res) => {
        if (res.ok) {
          return res.json(); 
        } else {
          throw new Error('Invalid credentials');
        }
      })
      .then((data) => {
        if (data !== 'Invalid credentials') {
          const { token, doctor } = data;
          alert('Success');

          localStorage.setItem('token', token);
          localStorage.setItem('doctor_Id', doctor);

          if (role === 'user') {
            navigate('/patid'); 
          } else if (role === 'admin') {
            navigate('/docid'); 
          }
        } else {
          toast.error('Invalid credentials');
        }
      })
      .catch((err) => {
        toast.error('Login Failed due to: ' + err.message);
      });
  }

  else {
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); 
        } else {
          throw new Error('Invalid credentials');
        }
      })
      .then((resp) => {
        if (resp !== 'Invalid credentials') {
          const { token, patient } = resp;

          localStorage.setItem('token', token);
          localStorage.setItem('patient_Id', patient);
         

          if (role === 'user') {
            navigate('/patid');
          } else if (role === 'admin') {
            alert('logged in');
            navigate('/docid');
          }
        } else {
          toast.error('Invalid credentials');
        }
      })
      .catch((err) => {
        toast.error('Login Failed due to: ' + err.message);
      });
  }
};
    
  return (
    <div>
        <Navbar />

    <div    className="login-page" style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/01/92/33/49/240_F_192334914_7GmOOgRJ0xUmm4KbYYb74MVBvvCmvVQs.jpg")', backgroundPosition: 'center', backgroundSize: 'cover' , backdropFilter: 'blur(15px)', minHeight: '100vh', minWidth: '100%' }}>
 
    <div className="row justify-content-center"  >
      <div className="col-lg-4" style={{ marginTop: '100px' }} >
        <div className="card" >
         
        </div>
      </div>
      <div className="container" >
  <div className="row justify-content-center" >
    <div className="col-lg-4">
      <form onSubmit={proceedLoginUsingAPI}>
        <div className="card">
          <h1 className="text-center">Hi! Login here</h1>
          <div className="card-body">
            <div className="form-group">
              <label style={{ color: '#333333' }}>User Name <span className="errmsg">*</span></label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="form-control"
                style={{ borderColor: '#FFC107' }}
              />
            </div>

            <div className="form-group">
              <label style={{ color: '#333333' }}>Password <span className="errmsg">*</span></label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                style={{ borderColor: '#FFC107' }}
              />
            </div>
            
            <div className="form-group">
              <label style={{ color: '#333333' }}>Role <span className="errmsg">*</span></label>
              <div className="form-check">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === 'user'}
                  onChange={() => setRole('user')}
                  className="form-check-input"
                />
                <label className="form-check-label">Patient</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  className="form-check-input"
                />
                <label className="form-check-label">Doctor</label>
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

    </div>
    </div>
    </div>
  );
}