import React from 'react'

import { Box } from '@mui/system'
import UserHome from './UserHome'
import UserchecksNormal from '../Components/admin/mainpage/UserchecksNormal'
import UserchecksMinor from '../Components/admin/mainpage/UserchecksMinor'
import UserchecksMajor from '../Components/admin/mainpage/UserchecksMajor'




function UsermajorCheck() {
    return (
        <Box sx={{ display: 'flex' }}>
            <UserHome />
            <Box component="main" sx={{ flexGrow: 1, p: 10, pl: 0 }}>

                <UserchecksMajor />
            </Box>
        </Box>
    )
}

export default UsermajorCheck