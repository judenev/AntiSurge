import React from 'react'
import EmpHome from '../admin/mainpage/EmpHome'

import { Box } from '@mui/material'

import EmployeeAlljobs from '../admin/mainpage/EmployeeAlljobs'

function EmpAlljobs() {
    return (
        <Box sx={{ display: 'flex' }}>
            <EmpHome />
            <Box component="main" sx={{ flexGrow: 1, p: 10, pl: 0 }}>

                <EmployeeAlljobs />
            </Box>
        </Box>
    )
}

export default EmpAlljobs