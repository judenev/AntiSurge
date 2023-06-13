import React from 'react'
import Nonallocatedjobs from '../../Components/admin/mainpage/Nonallocatedjobs'
import AdminHome from '../AdminHome'
import { Box } from '@mui/system'

export default function NonAllocated() {
  return (
    <Box sx={{ display: 'flex'}}>
                <AdminHome />
                <Box  style={{marginTop:"2%"}} component="main" sx={{ flexGrow: 1, p: 8,pl:0 }}>

                <Nonallocatedjobs/>
                </Box>
            </Box>
  )
}

