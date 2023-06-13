import { Box } from '@mui/system'
import React from 'react'




import AdminHome from '../../pages/AdminHome'
import Nonallocatedjobs from './mainpage/Nonallocatedjobs'





export default function AdminNonAllocatedJobs() {
    return (
        
            <Box sx={{ display: 'flex'}}>
                <AdminHome/>
                <Box component="main" sx={{ flexGrow: 1, p: 6,pl:0 }}>
                  <Nonallocatedjobs/> 
                </Box>
            </Box>
            
    
    
    )
}

