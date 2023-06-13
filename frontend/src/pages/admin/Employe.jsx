import { Box } from '@mui/system'
import React from 'react'


import AdminHome from '../AdminHome'
import Employee from '../../Components/admin/mainpage/Employee'



export default function Employe() {
    return (
        
            <Box sx={{ display: 'flex'}}>
                <AdminHome />
                <Box style={{marginTop:"2%"}}  component="main" sx={{ flexGrow: 1, p:10,pl:0 }}>

                <Employee/>
                </Box>
            </Box>
            
    
    
    )
}

