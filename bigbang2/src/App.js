import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route,NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './Login';
import {Doctor} from './Doctor';
import Patient from './Patient';
import Admin from './Admin';
import AdminPage from './Adminpage';
import Home from './Home';
import { RegisterDoctor } from './RegisterDoctor';
import Approveddoc from './Approveddoc';
function App() {
  return (
<div>
    <ToastContainer theme='colored'></ToastContainer>
    <BrowserRouter>

    <nav class="navbar navbar-expand-lg "style={{ backgroundColor: 'LightBlue', color: '#FFFFFF' }} >
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/home">Home</a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link" href="/Admin">Admin</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/ApprovedDoc">approved doc</a>
        </li>
       
      </ul>
      <span class="navbar-text">
        <a class="nav-link" href="/Login">Login</a>
      </span><br/><br></br>
      <span class="navbar-text">
        <a class="nav-link" onClick={()=>{localStorage.removeItem("token")}}>Logout</a>
      </span>
    </div>
  </div>
</nav>

 <Routes>
 <Route path='/home' Component={Home}/>

  <Route path='/doctor' Component={Doctor}/>
  <Route path='/patient' Component={Patient}/>
  <Route path='/Login' Component={Login}/>
  <Route path='/Admin' Component={Admin}/>
  <Route path='/Adminpage' Component={AdminPage}/>
  <Route path='/RegDoc' Component={RegisterDoctor}/>
  <Route path='/ApprovedDoc' Component={Approveddoc}/>



 </Routes>
 </BrowserRouter>
     </div>
  );
}

export default App;
