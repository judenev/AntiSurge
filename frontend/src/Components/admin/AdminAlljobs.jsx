import { Box } from '@mui/system'
import React from 'react'




import AdminHome from '../../pages/AdminHome'

import EmployeeAlljobs from './mainpage/EmployeeAlljobs'
import { useSelector } from 'react-redux'
import { selectAdminAuth } from '../../redux/features/adminAuthSlice'
import { useNavigate } from 'react-router-dom'

export default function AdminAlljobs() {
    const navigate =useNavigate()
    const token =useSelector(selectAdminAuth)
   React.useEffect(() => {
        if (token.token){
            return (
        
                <Box sx={{ display: 'flex'}}>
                    <AdminHome/>
                    <Box component="main" sx={{ flexGrow: 1, p: 6,pl:0 }}>
                    <EmployeeAlljobs />
                    </Box>
                </Box>
                
        
        
        )
          }else{
            navigate('/admin')
          }
    
      
    }, [])
    
  
}

