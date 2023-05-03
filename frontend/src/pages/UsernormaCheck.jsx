import React from 'react'

import { Box } from '@mui/system'
import UserHome from './UserHome'
import UserchecksNormal from '../Components/admin/mainpage/UserchecksNormal'




function UsernormalCheck() {
  return (
    <Box sx={{ display: 'flex'}}>
<UserHome/>
    <Box component="main" sx={{ flexGrow: 1, p: 10,pl:0 }}>

    <UserchecksNormal/>
    </Box>
</Box>
  )
}

export default UsernormalCheck