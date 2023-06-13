import { Box } from '@mui/system'
import React from 'react'
import Alljobstatus from '../../Components/admin/mainpage/Alljobstatus'



import AdminHome from '../../pages/AdminHome'

import EmployeeAlljobs from './mainpage/EmployeeAlljobs'

export default function AdminAlljobs() {
    return (
        
            <Box sx={{ display: 'flex'}}>
                <AdminHome/>
                <Box component="main" sx={{ flexGrow: 1, p: 6,pl:0 }}>
                <EmployeeAlljobs />
                </Box>
            </Box>
            
    
    
    )
}

