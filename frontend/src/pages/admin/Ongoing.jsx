import { Box } from '@mui/material'
import React from 'react'
import Ongoingjobs from '../../Components/admin/mainpage/Ongoingjobs'
import AdminHome from '../AdminHome'

export default function Ongoing(){
  return (
    <Box sx={{ display: 'flex'}}>
    <AdminHome/>
    <Box component="main" sx={{ flexGrow: 1, p: 8,pl:0 }}>

    <Ongoingjobs/>
    </Box>
</Box>
)
}
