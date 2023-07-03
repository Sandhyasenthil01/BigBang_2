import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';
export default function Login() {
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('user'); // Default role is "user"

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

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
      .then((res) => res.text())
      .then((resp) => {
        console.log(resp);

        if (resp !== 'Invalid credentials') {
          toast.success('Success');
          localStorage.setItem('token', resp);
          
          if (role === 'user') {
            navigate('/patient'); // Redirect to the "/cake" route after successful user login
          } else if (role === 'admin') {
            navigate('/doctor'); // Redirect to the "/customers" route after successful admin login
          }
        } else {
          toast.error('Invalid credentials');
        }
      })
      .catch((err) => {
        toast.error('Login Failed due to: ' + err.message);
      });
  };
  return (
    <div    className="login-page" style={{ backgroundImage: 'url("https://i.pinimg.com/474x/75/fc/31/75fc31621d02bcb0d34dcf20ac29feae.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
 
    <div className="row justify-content-center"  >
      <div className="col-lg-4" style={{ marginTop: '100px' }} >
        <div className="card" >
          <img
            src="https://i.pinimg.com/474x/49/bb/9a/49bb9aa80efee91ac5b22f29367485ef.jpg"
            className="card-img-top"
            alt="Card Image"
            style={{ width: '100%', height: '500px' }}
          />
        </div>
      </div>
      <div className="col-lg-4" style={{ marginTop: '100px' }} >
        <form onSubmit={proceedLoginUsingAPI} className="container">
          <div className="card" style={{ backgroundColor: '#F2F2F2', height: '500px' }}>
           <h1>Hi! Login here</h1>
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
              <button
                type="submit"
                className="btn btn-primary" >
                Login
              </button>
              
             
            </div>
        </form>
      </div>
    </div>
    </div>
  );
}