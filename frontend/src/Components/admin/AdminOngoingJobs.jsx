import { Box } from '@mui/system'
import React from 'react'
import AdminHome from '../../pages/AdminHome'
import EmpOngoingJobs from './mainpage/EmpOngoingJobs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAdminAuth } from '../../redux/features/adminAuthSlice'

export default function AdminOngoingJobs() {
const navigate =useNavigate()
const token =useSelector(selectAdminAuth)

  React.useEffect(() => {
   
    if (token.token){
        return (
        
            <Box sx={{ display: 'flex'}}>
                <AdminHome/>
                <Box component="main" sx={{ flexGrow: 1, p: 6,pl:0 }}>
                <EmpOngoingJobs />
                </Box>
            </Box>
            
    
    
    )
    }else{
      navigate('/admin')
    }
   
  }, [])
    
}

