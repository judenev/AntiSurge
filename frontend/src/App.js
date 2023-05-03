
import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import UserHome from './pages/UserHome';
import AdminHome from './pages/AdminHome';
import Register from './pages/Register';
import AdminValidate from './Components/admin/adminLoginform/AdminValidate';
import UserValidate from './Components/user/UserValidate';
import Userotpauth from './pages/Userotpauth';
import Alljobs from './pages/admin/Alljobs';
import NonAllocated from './pages/admin/NonAllocated';
import Ongoing from './pages/admin/Ongoing';
import Dashboard from './pages/admin/Dashboard';
import Servicelist from './pages/admin/Servicelist';
import Minor from './pages/admin/Minor';
import Normal from './pages/admin/Normal';
import Major from './pages/admin/Major';
import Employe from './pages/admin/Employe';
import Showemp from './pages/admin/Showemp';
import Dummy from './Components/admin/mainpage/Dummy';

import EmployeeValidate from './Components/admin/EmployeeValidate/EmployeeValidate';

import EmpHome from './Components/admin/mainpage/EmpHome';

import Leaves from './pages/admin/Leaves';
import EmpNormalCheck from './pages/employee/EmpNormalCheck';

import io from "socket.io-client";


import Chats from './Components/employee/Chats';

import Estimation from './Components/admin/mainpage/Estimation';
import EmployeeOtp from './Components/employee/EmployeeOtp';
import ChangePassword from './Components/employee/ChangePassword';
import EstimationAdmin from './pages/admin/EstimationAdmin';

import EmployeeLogin from './Components/employee/EmployeeLogin';
import UsernormalCheck from './pages/UsernormaCheck';
import UsermajorCheck from './pages/UsermajorCheck';
import UserminorCheck from './pages/UserminorCheck';
import EmployeeLeave from './pages/employee/EmployeeLeave';

 const  socket = io.connect("http://localhost:3001")



function App() {
  
  return (
   < >
   <BrowserRouter>
   <Routes>
  <Route path="/" element={<UserValidate/>} />
  <Route path="/Home" element={<UserHome/>} />
  <Route path='/admin' element={<AdminValidate/>} />
  <Route path='/admin/Home' element={<AdminHome/>} />
  <Route path='/otp' element={<Userotpauth/>} />
  <Route path='/register' element={<Register/>} />
  <Route path ='/ongoingjob' element ={<Ongoing/>}/>
  <Route path ='/nonallocated' element ={<NonAllocated/>}/>
  <Route path ='/alljob' element ={<Alljobs/>}/>
  <Route path ='/dashboard' element ={<Dashboard/>}/>
  <Route path ='/services' element ={<Servicelist/>}/>
  <Route path ='/services/minorcheck' element ={<Minor/>}/>
  <Route path ='/services/normalcheck' element ={<Normal/>}/>
  <Route path ='/services/majorcheck' element ={<Major/>}/>
  <Route path ='/addemp' element ={<Employe/>}/>
  <Route path ='/showemp' element ={<Showemp/>}/>
  <Route path ='/dummy' element ={<Dummy/>}/>
  <Route path ='/employee' element ={<EmployeeValidate/>}/>
  <Route path ='/employee/home' element ={<EmpHome/>}/>
  <Route path ='/employee/leave' element ={<EmployeeLeave/>}/>
   <Route path ='/emplogin' element ={<EmployeeLogin/>}/>
   <Route path ='/empleavelist' element ={<Leaves/>}/>
   <Route path ='/empnormal' element ={<EmpNormalCheck/>}/>
   <Route path ='/userNormalcheck' element ={<UsernormalCheck/>}/>
   <Route path ='/userMinorcheck' element ={<UserminorCheck/>}/>
   <Route path ='/userMajorcheck' element ={<UsermajorCheck/>}/>
   <Route path ='/employee/Chats' element ={<Chats/>}/>
   <Route path ='/admin/estimation' element ={<Estimation/>}/>
   <Route path ='/employee/otp' element ={<EmployeeOtp/>}/>
   <Route path ='/employee/changepass' element ={<ChangePassword/>}/>
   
   
  </Routes>
  </BrowserRouter>

  </> 
  );
}

export default App;
