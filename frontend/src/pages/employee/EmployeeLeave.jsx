import React from 'react'

import { Box } from '@mui/system'

import EmpHome from '../../Components/admin/mainpage/EmpHome'
import Empleave from '../../Components/admin/mainpage/EmpLeave'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEmpAuth } from '../../redux/features/employeeAuthSlice'
function EmployeeLeave() {
  const navigate =useNavigate()
const token =useSelector(selectEmpAuth)

React.useEffect(() => {
  if (!token.token.token) {
    navigate('/employee');
  }
}, [token.token.token, navigate]);

if (!token.token.token) {
  return null; // or render a loading state if needed
}
 

      return (
        <Box sx={{ display: 'flex'}}>
        <EmpHome/>
        <Box component="main" sx={{ flexGrow: 1, p: 10,pl:0 }}>
    
         <Empleave/>
     
        </Box>
    </Box>
      )

 
}

export default EmployeeLeave