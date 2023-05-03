import React from 'react'

import { Box } from '@mui/system'
import AdminHome from '../AdminHome'
import MajorChecklist from '../../Components/admin/mainpage/MajorChecklist'

import Dummy from '../../Components/admin/mainpage/Dummy'
import EmpHome from '../../Components/admin/mainpage/EmpHome'
import Empleave from '../../Components/admin/mainpage/EmpLeave'
function EmployeeLeave() {
  return (
    <Box sx={{ display: 'flex'}}>
    <EmpHome/>
    <Box component="main" sx={{ flexGrow: 1, p: 10,pl:0 }}>

     <Empleave/>
 
    </Box>
</Box>
  )
}

export default EmployeeLeave