import React from 'react'
import EmpHome from '../admin/mainpage/EmpHome'
import Nonallocatedjobs from '../admin/mainpage/Nonallocatedjobs'
import { Box } from '@mui/material'

function EmpNonallocated() {
  return (
    <Box sx={{ display: 'flex'}}>
                <EmpHome/>
                <Box component="main" sx={{ flexGrow: 1, p:10,pl:0 }}>

                <Nonallocatedjobs/>
                </Box>
            </Box>
  )
}

export default EmpNonallocated