import React from 'react'
import { Box } from '@mui/system'
import AdminHome from '../AdminHome'
import Normalchecklist from '../../Components/admin/mainpage/Normalchecklist'

function Normal() {
  return (
    <Box sx={{ display: 'flex'}}>
    <AdminHome/>
    <Box style={{marginTop:"2%"}}   component="main" sx={{ flexGrow: 1, p: 5,pl:0 }}>

<Normalchecklist/>
    </Box>
</Box>
  )
}

export default Normal