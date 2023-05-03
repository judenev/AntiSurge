import React from 'react'

import { Box } from '@mui/system'
import AdminHome from '../AdminHome'
import MajorChecklist from '../../Components/admin/mainpage/MajorChecklist'

import Dummy from '../../Components/admin/mainpage/Dummy'
import EmpHome from '../../Components/admin/mainpage/EmpHome'

import EmpNormalChecks from '../../Components/employee/EmpNormalChecks'
function EmpNormalCheck() {
  return (
    <Box sx={{ display: 'flex'}}>
    <EmpHome/>
    <Box component="main" sx={{ flexGrow: 1, p: 10,pl:0 }}>

     <EmpNormalChecks/>
 
    </Box>
</Box>
  )
}

export default EmpNormalCheck