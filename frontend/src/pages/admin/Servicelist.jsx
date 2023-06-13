import React from 'react'
import AdminHome from '../AdminHome'
import { Box } from '@mui/system'
import Services from '../../Components/admin/mainpage/Services'

function Servicelist() {
  return (
    <Box sx={{ display: 'flex'}}>
    <AdminHome/>
    <Box style={{marginTop:"2%"}}  component="main" sx={{ flexGrow: 1, p:10}}>

     <Services/>
    </Box>
</Box>
  )
}

export default Servicelist