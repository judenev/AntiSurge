import React from 'react'
import EmpHome from '../admin/mainpage/EmpHome'

import { Box } from '@mui/material'
import CompleteJobs from '../CompleteJobs'

function EmpCompletedJobs() {
  return (
    <Box sx={{ display: 'flex'}}>
                <EmpHome/>
                <Box component="main" sx={{ flexGrow: 1, p:10,pl:0 }}>

                <CompleteJobs/>
                </Box>
            </Box>
  )
}

export default EmpCompletedJobs