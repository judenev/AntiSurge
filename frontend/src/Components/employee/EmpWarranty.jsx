import React from 'react'


import { Box } from '@mui/material'
import WarrantyCheck from '../admin/mainpage/WarrantyCheck'
import EmpHome from '../admin/mainpage/EmpHome'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEmpAuth } from '../../redux/features/employeeAuthSlice'

function EmpWarranty() {
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
                    <Box component="main" sx={{ flexGrow: 1, p:10,pl:0 }}>
    
                    <WarrantyCheck/>
                    </Box>
                </Box>
      )


}

export default EmpWarranty