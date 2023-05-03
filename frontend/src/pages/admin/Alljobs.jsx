import { Box } from '@mui/system'
import React from 'react'
import Alljobstatus from '../../Components/admin/mainpage/Alljobstatus'

import AdminHome from '../AdminHome'

export default function Alljobs() {
    return (
        
            <Box sx={{ display: 'flex'}}>
                <AdminHome />
                <Box component="main" sx={{ flexGrow: 1, p: 6,pl:0 }}>

                <Alljobstatus/>
                </Box>
            </Box>
            
    
    
    )
}

