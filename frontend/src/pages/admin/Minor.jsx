import React from 'react'
import MinorChecklist from '../../Components/admin/mainpage/MinorChecklist'
import { Box } from '@mui/system'
import AdminHome from '../AdminHome'
function Minor() {
  return (
    <Box sx={{ display: 'flex'}}>
    <AdminHome/>
    <Box style={{marginTop:"2%"}}  component="main" sx={{ flexGrow: 1, p: 5,pl:0 }}>

    <MinorChecklist/>
    </Box>
</Box>
  )
}

export default Minor