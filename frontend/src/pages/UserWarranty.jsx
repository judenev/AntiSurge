import React from 'react'

import { Box } from '@mui/system'
import UserHome from './UserHome'

import WarrantyCheck from '../Components/admin/mainpage/WarrantyCheck'




function UserWarranty() {
    return (
        <Box sx={{ display: 'flex' }}>
            <UserHome />
            <Box component="main" sx={{ flexGrow: 1, p: 10, pl: 0 }}>

                <WarrantyCheck/>
            </Box>
        </Box>
    )
}

export default UserWarranty