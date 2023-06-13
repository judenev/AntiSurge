import { Box } from '@mui/material'
import React from 'react'
import Ongoingjobs from '../../Components/admin/mainpage/Ongoingjobs'
import AdminHome from '../AdminHome'
import UserJobStatus from '../../Components/admin/mainpage/UserJobStatus'
import UserHome from '../UserHome'

export default function Ongoing(){
  return (
    <Box sx={{ display: 'flex'}}>
    <UserHome/>
    <Box style={{marginTop:"2%"}} component="main" sx={{ flexGrow: 1, p: 8,pl:0 }}>

    <UserJobStatus/>
    </Box>
</Box>
)
}
