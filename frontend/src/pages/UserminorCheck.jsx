import React from 'react'

import { Box } from '@mui/system'
import UserHome from './UserHome'
import UserchecksNormal from '../Components/admin/mainpage/UserchecksNormal'
import UserchecksMinor from '../Components/admin/mainpage/UserchecksMinor'




function UserminorCheck() {
    return (
        <Box sx={{ display: 'flex' }}>
            <UserHome />
            <Box component="main" sx={{ flexGrow: 1, p: 10, pl: 0 }}>

                <UserchecksMinor />
            </Box>
        </Box>
    )
}

export default UserminorCheck