import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

export default function Admin() {
  const [admin_Password, passwordupdate] = useState('');
  const [admin_name, userNameupdate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLoginusingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('proceed');
      let inputobj = {
        admin_name: admin_name,
        admin_Password: admin_Password,
      };
      console.log(JSON.stringify(inputobj));
      fetch('https://localhost:7211/api/Token/Admin', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(inputobj),
      })
        .then((res) => {
          return res.text();
        })
        .then((resp) => {
          console.log(resp);
          toast.success('Success');
          localStorage.setItem('token', resp);
          navigate('/Adminpage');
        })
        .catch((err) => {
          toast.error('Login Failed due to :' + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (admin_name === '' || admin_name === null) {
      result = false;
      toast.warning('Please Enter Username');
    }
    if (admin_Password === '' || admin_Password === null) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  };

  return (
    <div>
  <Navbar />
    <div className="container"  style={{ backgroundImage: 'url("https://t3.ftcdn.net/jpg/03/15/01/78/240_F_315017893_he0IiXr73XKZtbTCjUtlgDGB8E8CbMK8.jpg")', backgroundPosition: 'center', backgroundSize: 'cover' , backdropFilter: 'blur(15px)', minHeight: '100vh', minWidth: '100%' }}>
      <div className="row justify-content-center mt-5" >
        <div className="col-lg-6">
          <div className="card"style={{marginTop: '200px'}}>
            <div className="card-header" >
              <h2 className="text-center">Admin Login</h2>
            </div>
            <div className="card-body" >
              <form onSubmit={ProceedLoginusingAPI}>
                <div className="form-group">
                  <label htmlFor="admin_name">Admin Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="admin_name"
                    value={admin_name}
                    onChange={(e) => userNameupdate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="admin_Password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="admin_Password"
                    value={admin_Password}
                    onChange={(e) => passwordupdate(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-warning">
                    Login
                  </button>
               
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
