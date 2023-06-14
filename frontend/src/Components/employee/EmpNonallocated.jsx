import React from 'react'
import EmpHome from '../admin/mainpage/EmpHome'
import Nonallocatedjobs from '../admin/mainpage/Nonallocatedjobs'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEmpAuth } from '../../redux/features/employeeAuthSlice'

function EmpNonallocated() {
  const navigate = useNavigate()
  const token = useSelector(selectEmpAuth)
  React.useEffect(() => {
    if (!token.token.token) {
      navigate('/employee');
    }
  }, [token.token.token, navigate]);

  if (!token.token.token) {
    return null; // or render a loading state if needed
  }



  return (
    <Box sx={{ display: 'flex' }}>
      <EmpHome />
      <Box component="main" sx={{ flexGrow: 1, p: 10, pl: 0 }}>

        <Nonallocatedjobs />
      </Box>
    </Box>
  )




}

export default EmpNonallocated