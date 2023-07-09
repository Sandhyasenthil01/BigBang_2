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
import Homepage from './Homepage';
import Patientreg from './Patientreg';
import Doctorid from './Docid';
import PatientById from './Patid';
import { Admincrud } from './Admincrud';
function App() {
  return (
<div>
    <ToastContainer theme='colored'></ToastContainer>
    <BrowserRouter>

  


 <Routes>
 <Route path='/' Component={Home}/>
 <Route path='/home' Component={Home}/>

  <Route path='/doctor' Component={Doctor}/>
  <Route path='/patient' Component={Patient}/>
  <Route path='/Login' Component={Login}/>
  <Route path='/Admin' Component={Admin}/>
  <Route path='/Adminpage' Component={AdminPage}/>
  <Route path='/RegDoc' Component={RegisterDoctor}/>
  <Route path='/ApprovedDoc' Component={Approveddoc}/>
  <Route path='/Homepage' Component={Homepage}/>
  <Route path='/Patientreg' Component={Patientreg}/>
  <Route path='/docid' Component={Doctorid}/>
  <Route path='/patid' Component={PatientById}/>
  <Route path='/admincrud' Component={Admincrud}/>






 </Routes>
 </BrowserRouter>
     </div>
  );
}

export default App;
