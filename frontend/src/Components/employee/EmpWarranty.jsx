import React from 'react'


import { Box } from '@mui/material'
import CompleteJobs from '../CompleteJobs'
import WarrantyCheck from '../admin/mainpage/WarrantyCheck'
import EmpHome from '../admin/mainpage/EmpHome'

function EmpWarranty() {
  return (
    <Box sx={{ display: 'flex'}}>
                <EmpHome/>
                <Box component="main" sx={{ flexGrow: 1, p:10,pl:0 }}>

                <WarrantyCheck/>
                </Box>
            </Box>
  )
}

export default EmpWarranty