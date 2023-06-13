import React from 'react'

import { Box } from '@mui/system'
import AdminHome from '../AdminHome'
import MajorChecklist from '../../Components/admin/mainpage/MajorChecklist'
function Major() {
  return (
    <Box sx={{ display: 'flex'}}>
    <AdminHome/>
    <Box style={{marginTop:"2%"}}  component="main" sx={{ flexGrow: 1, p: 5,pl:0 }}>

     <MajorChecklist/>
    </Box>
</Box>
  )
}

export default Major