import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import * as yup from "yup";
import axios from 'axios';
import USERBaseURL from '../Utils/userUrl';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom';
import img from './adminLogin/misc/SURGE1.jpg'

const theme = createTheme();


export default function Register() {
  const [valid, setValid] = React.useState()
  const [userin, setUserin] = React.useState()
  const [usermail, setUsermail] = React.useState()
  const navigate = useNavigate()
  
  const userRegister = yup.object().shape({
    firstName: yup.string().required("This field is required"),
    lastName: yup.string().required("This field is required"),
    mob: yup.number().min(999999999, "less than 10 numbers").max(12345678900, "10 number exceeded").required(),
    email: yup.string().email("Enter a valid email").required("This field is required"),
    password: yup.string().min(4, "too short password").required('password required'),
    confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required()
  })
const initialValues = {
    firstname: '',
    lastName: '',
    mob: '',
    email: '',
    password: '',
    confirmpassword: ''

  }

  let Submit = async (values, props) => {
    const userVal = {
      firstName: values.firstName,
      lastName: values.lastName,
      mob: values.mob,
      email: values.email,
      password: values.password,
      confirmpassword: values.confirmpassword
    }
    const isValid = await userRegister.isValid(userVal)
 
    if (!isValid) {
      setValid(false)
    }
    else {
      setValid(true)
      axios.post(`${USERBaseURL}userreg`, userVal).then((resp) => {
        console.log("kollam",resp);
        axios.post("http://localhost:3001/authenticate", { username:userVal.firstName }).then((r)=>{
                  }).catch((e) => console.log("Auth Error", e));
        if (resp.data.user) {
          setUserin(true)
        } else {
          if (resp.data.email) {
            setUsermail(true)
          } else {
            setUsermail(false)
            setUserin(false)
            navigate('/')
          }
        }

      })
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}  >
        <Container component="main" maxWidth="xs"   >

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
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color={'Grey'}>
              Anti-Surge Registration Panel
            </Typography>
            <Formik initialValues={initialValues} validationSchema={userRegister} onSubmit={Submit}>
              {
                (props) => (
                  <Form>
                    <Box noValidate sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        {userin ? <Alert severity="error" sx={{ borderRadius: "10" }}> User Already Registered !</Alert> : ''}
                        <Grid item xs={12} sm={6}>
                          < Field as={TextField}
                            autoComplete="given-name"
                            name="firstName"

                            fullWidth
                            id="firstName"
                            label="First Name *"
                            autoFocus
                            helperText={<ErrorMessage name="firstName" />}
                          />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                          < Field as={TextField}

                            fullWidth
                            id="lastName"
                            label="Last Name *"
                            name="lastName"
                            autoComplete="family-name"
                            helperText={<ErrorMessage name="lastName" />}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          < Field as={TextField}

                            fullWidth
                            id="mob"
                            label="Enter Mobile Number with country Code *"
                            name="mob"
                            autoComplete="mob"
                            helperText={<ErrorMessage name="mob" />}
                          />
                          {usermail ? <Alert severity="error" sx={{ borderRadius: "10" }}> Mail id Already Used !</Alert> : ''}
                        </Grid>
                        <Grid item xs={12}>
                          < Field as={TextField}

                            fullWidth
                            id="email"
                            label="Email Address *"
                            name="email"
                            autoComplete="email"
                            helperText={<ErrorMessage name="email" />}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          < Field as={TextField}

                            fullWidth
                            name="password"
                            label="Password*"
                            type="password"
                            id="password"
                            helperText={<ErrorMessage name="password" />}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          < Field as={TextField}

                            fullWidth
                            name="confirmpassword"
                            label="Re-Enter Password *"
                            type="password"
                            id="confirmpassword"
                            helperText={<ErrorMessage name="confirmpassword" />}
                          />
                        </Grid>

                      </Grid>
                      {valid ? '' : <Alert severity="error" sx={{ borderRadius: "10" }}> Fill Out All Star Fields !</Alert>}
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Register
                      </Button>
                      <Grid container justifyContent="flex-end">
                        <Grid item>
                          <Link onClick={() => navigate('/')} variant="body2">
                            Already have an account? Sign in
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Form>
                )
              }
            </Formik>

          </Box>

        </Container>
      </ThemeProvider></>

  );
}