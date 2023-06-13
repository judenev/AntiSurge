import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserAuth } from '../../redux/features/userAuthSlice'
import UserLogin from '../../pages/UserLogin'
import UserHome from '../../pages/UserHome'
import Ongoing from '../../pages/admin/Ongoing'
function UserValidate() {
let token  =useSelector(selectUserAuth)
console.log("userToken",token);
if(!token.token){
  
  return (
    <>
  <UserLogin/>
    </>
  )

}else{
  return (
    <>
  <Ongoing/>
    </>
  )

}
 
}

export default UserValidate
