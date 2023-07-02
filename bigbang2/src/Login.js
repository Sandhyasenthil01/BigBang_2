import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const [user_password, setPassword] = useState('');
  const [user_name, setUserName] = useState('');
  const [role, setRole] = useState('user'); // Default role is "user"
  const navigate = useNavigate();

  const proceedLoginUsingAPI = (e) => {
    e.preventDefault();
    const apiUrl = role === 'user' ? 'https://localhost:7211/api/Token/Patients' : 'https://localhost:7211/api/Token/Doctor';
    const inputObj = {
      user_name: user_name,
      user_password: user_password,
    };
    const input = role === 'user' ? inputObj : null;
    
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
            navigate('/patient'); 
          } else if (role === 'admin') {
            alert('logged in');
            navigate('/doctor'); 
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
    <div className="row justify-content-center">
      <div className="col-lg-4" style={{ marginTop: '100px' }}>
        <div className="card">
          <img
            src="https://i.pinimg.com/originals/ce/ea/46/ceea463b53268ae335d33d7a52c70ff9.jpg"
            className="card-img-top"
            alt="Card Image"
            style={{ width: '100%', height: '500px' }}
          />
        </div>
      </div>
      <div className="col-lg-4" style={{ marginTop: '100px' }}>
        <form onSubmit={proceedLoginUsingAPI} className="container">
          <div className="card" style={{ backgroundColor: '#F2F2F2', height: '500px' }}>
            <div className="card-header" style={{ backgroundColor: '#FFC107', color: '#FFFFFF' }}>
              <h2>User Login</h2>
                          </div>
            <div className="card-body">
              <div className="form-group">
                <label style={{ color: '#333333' }}>User Name <span className="errmsg">*</span></label>
                <input
                  value={user_name}
                  onChange={(e) => setUserName(e.target.value)}
                  className="form-control"
                  style={{ borderColor: '#FFC107' }}
                />
              </div>

              <div className="form-group">
                <label style={{ color: '#333333' }}>User Password <span className="errmsg">*</span></label>
                <input
                  type="password"
                  value={user_password}
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
                  <label className="form-check-label">User</label>
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
            <div className="card-footer text-center" style={{ backgroundColor: '#F2F2F2' }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: '#FFC107', borderColor: '#FFC107' }}
              >
                Login
              </button>
              |
              <Link
                className="btn btn-success"
                to={'/register'}
                style={{ backgroundColor: '#28A745', borderColor: '#28A745' }}
              >
                New User
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}