import React, { useState,useEffect } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../../Firebase/firebase.config';
export default function Otp (props) {
   const [numb,setNumb]=useState('')
   const [otp, setOtp] = useState('')
useEffect(()=>{
  verify()
},[])


    function verify(){
      setNumb(props.numb)
      if(!window.recaptchaVerifier){
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
              console.log(response)
             // onsignUp()
            },
            'expired-callback': () => {
          
            }
          }, auth);
      }  
    }
  

  const handleChange = (newValue) => {
    console.log("kay kooi",numb);
   const phoneNumber = '+919048454995'
    setOtp(newValue)
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      console.log(error)
      // Error; SMS not sent
      // ...
    });
}
console.log(otp);



  return (
    <>
    <div id="recaptcha-container"></div>
    <MuiOtpInput value={otp} onChange={handleChange} />
    </>
    
  )
}