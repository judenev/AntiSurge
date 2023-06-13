import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import * as yup from "yup";
import axios from 'axios'
import BaseURL from '../../Utils/baseUrl';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdminAuth, setAdminToken } from '../../redux/features/adminAuthSlice';




const theme = createTheme();
const adminvalid = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(14).required()
})
export default function AdminLogin() {
  const token= useSelector(selectAdminAuth)
  let dispatch= useDispatch()
  const [logged, setLogged] = useState(true)
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const adminVal = {
      email: data.get('email'), 
      password: data.get('password'),
    }
   
    let isValid = await adminvalid.isValid(adminVal)
    if (isValid) {
     let email = data.get('email')
     let password =data.get('password')
     
      axios.post(`${BaseURL}/adminlogin`,adminVal).then((resp)=>{
      
      if(!resp.data.Adminlogged){
        
        setLogged(false)
        
      }else{  
        dispatch(setAdminToken(resp.data))
        navigate('/admin/dash') 
    }})

    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src="data:image/png;base64,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">

          </Avatar>
          <Typography component="h1" variant="h5">
            Log into Anti-Surge Admin Panel
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              {logged ? '': <Alert severity="error"> Sorry Admin Not Found !</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
           
            </Grid>
          </Box>
        </Box>
      
      </Container>
    </ThemeProvider>
  );
}