import { Box } from '@mui/system'
import React from 'react'


import AdminHome from '../AdminHome'
import Employee from '../../Components/admin/mainpage/Employee'
import Empleaveslist from '../../Components/admin/mainpage/Empleaveslist'



export default function Leaves() {
    return (
        
            <Box sx={{ display: 'flex'}}>
                <AdminHome />
                <Box style={{marginTop:"2%"}}  component="main" sx={{ flexGrow: 1, p:10,pl:0 }}>

                <Empleaveslist/>
                </Box>
            </Box>
            
    
    
    )
}

