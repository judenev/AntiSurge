import React from 'react'

import { Box } from '@mui/system'
import AdminHome from '../AdminHome'
import MajorChecklist from '../../Components/admin/mainpage/MajorChecklist'
import Showemployees from '../../Components/admin/mainpage/EmpHome'
import Dummy from '../../Components/admin/mainpage/Dummy'
function Showemp() {
  return (
    <Box sx={{ display: 'flex'}}>
    <AdminHome/>
    <Box style={{marginTop:"2%"}}  component="main" sx={{ flexGrow: 1, p: 10,pl:0 }}>


   <Dummy/>
    </Box>
</Box>
  )
}

export default Showemp