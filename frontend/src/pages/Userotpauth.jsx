
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import img from '../pages/adminLogin/misc/SURGE1.jpg'
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from "yup";



import { useDispatch, useSelector } from 'react-redux';

import { setUserToken } from '../redux/features/userAuthSlice';


import { MuiOtpInput } from 'mui-one-time-password-input'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../Firebase/firebase.config';

const theme = createTheme();
const userlogin = yup.object().shape({
  mob: yup.number().min(999999999, "less than 10 numbers").max(12345678900, "Number Not Valid").required(),

})
export default function Userotpauth() {
 
 const dispatch = useDispatch()
  const [logged, setLogged] = React.useState(true)
  const [otp, setOtp] = React.useState(false)
  const [otp2, setOtp2] = React.useState('')
  const [mobnum, setMobnum] = React.useState('')
 const initialValues = {
    mob: '',
  }
 const navigate = useNavigate()
  const Submit = (values, props) => {
    setOtp(true)

    setMobnum(values.mob)
 
    handleChange(values.mob)


  }

  const Submit2 = (values, props) => {


    OtpVerify()

  }




  function verify() {

    if (!window.recaptchaVerifier) {
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

    verify()
 
    const phoneNumber = `+91${newValue}`
    // setOtp(newValue)
    const appVerifier = window.recaptchaVerifier;
 
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
  
        // navigate('/Home')
        // ...
      }).catch((error) => {
        console.log(error)
        // Error; SMS not sent
        // ...
      });
  }
  console.log(otp);



  React.useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'Your data will be lost if you refresh the page!';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  function OtpVerify() {
    window.confirmationResult.confirm(otp2).then(async (resp) => {
 
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <div id="recaptcha-container"></div>
      {otp ? <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item

          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${img})`,

            backgroundRepeat: 'no-repeat',
            // backgroundColor: (t) =>
            //   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'black'
          }}
        />
        <Grid sx={{ background: 'grey' }} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,

              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Enter The Otp
            </Typography>

            <Formik initialValues={initialValues} validationSchema={userlogin} onSubmit={Submit2}>
              {
                (props) => (
                  <Form>
                    <Box noValidate sx={{ mt: 1 }}>

                      <MuiOtpInput onChange={(e) => setOtp2(e)} value={otp2} length={6} />


                      <Button

                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, background: 'grey' }}
                      >
                        Vlidate OTP
                      </Button>
                      <Grid container>

                        <Grid item>
                          <Link onClick={() => {
                            navigate('/register')
                          }} sx={{ color: 'white' }}>
                            {"Don't have an account? Sign Up"}
                          </Link>
                        </Grid>
                      </Grid>

                    </Box>
                  </Form>
                )
              }

            </Formik>


          </Box>
        </Grid>
      </Grid> : <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item

          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${img})`,

            backgroundRepeat: 'no-repeat',
            // backgroundColor: (t) =>
            //   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'black'
          }}
        />
        <Grid sx={{ background: 'grey' }} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,

              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Anti-Surge Otp Login
            </Typography>

            <Formik initialValues={initialValues} validationSchema={userlogin} onSubmit={Submit}>
              {
                (props) => (
                  <Form>
                    <Box noValidate sx={{ mt: 1 }}>

                      < Field as={TextField}

                        fullWidth
                        id="mob"
                        label="Enter Mobile Number *"
                        name="mob"
                        autoComplete="mob"
                        helperText={<ErrorMessage name="mob" />}
                      />


                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, background: 'black' }}
                      >
                        Send OTP Via SMS
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link onClick={() => {
                            navigate('/')

                          }} sx={{ color: 'black' }}>
                            Login with email
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link onClick={() => {
                            navigate('/register')
                          }} sx={{ color: 'black' }}>
                            {"Don't have an account? Sign Up"}
                          </Link>
                        </Grid>
                      </Grid>

                    </Box>
                  </Form>
                )
              }

            </Formik>


          </Box>
        </Grid>
      </Grid>}
    </ThemeProvider>
  );
}