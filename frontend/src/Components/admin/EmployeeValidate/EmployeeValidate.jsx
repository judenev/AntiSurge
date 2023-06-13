import React from 'react'
import { useSelector } from 'react-redux'





import { selectEmpAuth } from '../../../redux/features/employeeAuthSlice'
import { useNavigate } from 'react-router-dom'

import EmployeeHome from '../../../pages/employee/EmployeeHome'
import EmpHome from '../mainpage/EmpHome'
import EmployeeLogin from '../../employee/EmployeeLogin'
import EmpAlljobs from '../../employee/EmpAlljobs'

function EmployeeValidate() {
  const token=useSelector(selectEmpAuth)

 
 if(!token.token){
  return (
    <>
  <EmployeeLogin/>

    </>
  )
 }else{
  return (
    <>

  <EmpAlljobs/>
    </>
  )
 }


}

export default EmployeeValidate