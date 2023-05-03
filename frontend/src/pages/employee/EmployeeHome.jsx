import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'

import AdminHome from '../AdminHome'
import Employee from '../../Components/admin/mainpage/Employee'
import EmpHome from '../../Components/admin/mainpage/EmpHome'
import { selectEmpAuth } from '../../redux/features/employeeAuthSlice'
import Employeelogin from '../../Components/employee/EmployeeLogin'


export default function EmployeeHome() {
    const token=useSelector(selectEmpAuth)

   
        return (
          <>
        <Employeelogin/>
      
          </>
        )
       
        
}

