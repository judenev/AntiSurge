
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


import EmployeeLogin from './Components/employee/EmployeeLogin';
import UsernormalCheck from './pages/UsernormaCheck';
import UsermajorCheck from './pages/UsermajorCheck';
import UserminorCheck from './pages/UserminorCheck';
import EmployeeLeave from './pages/employee/EmployeeLeave';
import EmpNonallocated from './Components/employee/EmpNonallocated';
import EmpAllocated from './Components/employee/EmpAllocated';

import DirectChatPage from './Components/Chats/DirectChatPage';

import ChatsUser from './Components/user/ChatsUser';
import EmpAlljobs from './Components/employee/EmpAlljobs';
import AdminAlljobs from './Components/admin/AdminAlljobs';
import AdminOngoingJobs from './Components/admin/AdminOngoingJobs';
import AdminNonAllocatedJobs from './Components/admin/AdminNonAllocatedJobs';
import AdminDash from './pages/admin/AdminDash';
import EmpCompletedJobs from './Components/employee/EmpCompleteJobs';
import PrintInvoice from './Components/Invoice/PrintInvoice';
import AdminEmployeeMonitoring from './Components/admin/AdminEmployeeMonitoring';
import EmpWarranty from './Components/employee/EmpWarranty';
import AdminWarranty from './pages/admin/AdminWarranty';
import UserWarranty from './pages/UserWarranty';
import AdminCompletejobs from './Components/admin/AdminCompletejobs';





function App() {
  
  return (
   < >
   <BrowserRouter>
   <Routes>
  <Route path="/" element={<UserValidate/>} />
  <Route path="/UserChats" element={<ChatsUser/>}/>
  <Route path="/Home" element={<UserHome/>} />
  <Route path='/admin' element={<AdminValidate/>} />
  <Route path='/admin/Home' element={<AdminHome/>} />
  <Route path='/otp' element={<Userotpauth/>} />
  <Route path='/register' element={<Register/>} />
  <Route path ='/ongoingjob' element ={<Ongoing/>}/>
  <Route path ='/nonallocated' element ={<NonAllocated/>}/>
  <Route path ='/alljob' element ={<Alljobs/>}/>
  <Route path ='/dashboard' element ={<Dashboard/>}/>
  <Route path ='/admin/services' element ={<Servicelist/>}/>
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
   <Route path ='/admin/empleavelist' element ={<Leaves/>}/>
   <Route path ='/empnormal' element ={<EmpNormalCheck/>}/>
   <Route path ='/userNormalcheck' element ={<UsernormalCheck/>}/>
   <Route path ='/userMinorcheck' element ={<UserminorCheck/>}/>
   <Route path ='/userMajorcheck' element ={<UsermajorCheck/>}/>
   <Route path ='/employee/Chats' element ={<DirectChatPage/>}/>
   <Route path ='/admin/estimation' element ={<Estimation/>}/>
   <Route path ='/employee/otp' element ={<EmployeeOtp/>}/>
   <Route path ='/employee/changepass' element ={<ChangePassword/>}/>
   <Route path ='/employee/nonallocated' element ={<EmpNonallocated/>}/>
   <Route path ='/employee/ongoingjob' element ={<EmpAllocated/>}/>
   <Route path ='/employee/alljob' element ={<EmpAlljobs/>}/>
   <Route path ='/admin/alljob' element ={<AdminAlljobs/>}/>
   <Route path ='/admin/ongoingjob' element ={<AdminOngoingJobs/>}/>
   <Route path ='/admin/nonallocated' element ={<AdminNonAllocatedJobs/>}/>
   <Route path ='/admin/dash' element ={<AdminDash/>}/>
   <Route path ='/employee/completejobs' element ={<EmpCompletedJobs/>}/>
   <Route path ='/employee/print' element ={<PrintInvoice/>}/>
   <Route path ='/admin/employeemonitor' element ={<AdminEmployeeMonitoring/>}/>
   <Route path ='/admin/warranty' element ={<AdminWarranty/>}/>
   <Route path ='/employee/warranty' element ={<EmpWarranty/>}/>
   <Route path ='/warrantycheck' element ={<UserWarranty/>}/>
   <Route path ='/admin/completejobs' element ={<AdminCompletejobs/>}/>
   
  
  </Routes>
  </BrowserRouter>

  </> 
  );
}

export default App;
