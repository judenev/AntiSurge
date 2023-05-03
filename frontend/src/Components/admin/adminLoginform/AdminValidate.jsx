import React from 'react'
import { useSelector } from 'react-redux'
import AdminHome from '../../../pages/AdminHome'
import Adminlogin from '../../../pages/adminLogin/AdminLogin'
import { selectAdminAuth } from '../../../redux/features/adminAuthSlice'
import "./adminloginform.css"
function AdminValidate() {
  const token=useSelector(selectAdminAuth)
  console.log(token);
 if(!token.token){
  return (
    <>
  <Adminlogin/>

    </>
  )
 }else{
  return (
    <>

  <AdminHome/>
    </>
  )
 }


}

export default AdminValidate