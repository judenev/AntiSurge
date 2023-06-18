import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import img from './adminLogin/misc/SURGE1.jpg'
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import USERBaseURL from '../Utils/userUrl';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken } from '../redux/features/userAuthSlice';


const theme = createTheme();
const userlogin = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("This field is required"),
  password: yup.string().min(4, "too short password").required('password required'),
})
export default function UserLogin() {
  const dispatch = useDispatch()
  const [logged, setLogged] = React.useState(true)
  const initialValues = {
    email: '',
    password: '',
  }
  let navigate = useNavigate()
  const Submit = (values, props) => {
    axios.post(`${USERBaseURL}userlogin`, values).then((resp) => {
      if (!resp.data.userverified) {
        setLogged(false)
        navigate('/register')
      } else {
        dispatch(setUserToken(resp.data))
        navigate('/ongoingjob')
      }


    })



  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
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
              Anti-Surge User-Login
            </Typography>

            <Formik initialValues={initialValues} validationSchema={userlogin} onSubmit={Submit}>
              {
                (props) => (
                  <Form>
                    <Box noValidate sx={{ mt: 1 }}>
                      < Field as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"

                        autoComplete="false"
                        helperText={<ErrorMessage name="email" />}
                      />
                      < Field as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"

                        helperText={<ErrorMessage name="password" />}
                      />

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, background: 'black' }}
                      >
                        Sign In
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link onClick={() => {
                            navigate('/otp')
                          }} sx={{ color: 'black' }}>
                            Signin with OTP
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
      </Grid>
    </ThemeProvider>
  );
}