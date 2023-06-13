import { Box } from '@mui/system'
import React from 'react'
import Alljobstatus from '../../Components/admin/mainpage/Alljobstatus'

import AdminHome from '../AdminHome'
import EmpAlljobs from '../../Components/employee/EmpAlljobs'
import WarrantyCheck from '../../Components/admin/mainpage/WarrantyCheck'

export default function AdminWarranty() {
    return (
        
            <Box sx={{ display: 'flex'}}>
                <AdminHome />
                <Box style={{marginTop:"2%"}}  component="main" sx={{ flexGrow: 1, p: 6,pl:0 }}>

               <WarrantyCheck/>
                </Box>
            </Box>
            
    
    
    )
}

