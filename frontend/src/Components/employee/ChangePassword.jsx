import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import axios from 'axios';
import BaseURL from '../../Utils/baseUrl';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
const theme = createTheme();


export default function ChangePassword(props) {
    const { state } = useLocation();

   const navigate = useNavigate()


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
       
    };
   
    const validate = yup.object().shape({
        password: yup.string().min(4, "too short password").required('password required'),
        confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required()
    })
   const initial = {
        password:'',
        confirmpassword:''
    }
    
     let Submit = async (values, props) =>{
        console.log(values);
        const passVal ={
            password:values.password,
            confirmpassword:values.confirmpassword
        }
        const pass={
            password:values.password,
            Mob:state
        }

        const isValidPass = await validate.isValid(passVal)
        
       
            if(isValidPass){
           
                axios.post(`${BaseURL}/empchangepass`,pass).then((resp)=>{
                 
                    if(resp.data.change){
                    
                        show()
                        navigate('/emplogin')
                    }else{
                      
                     
                    }
                })
               
            }else{
               
            }
            const show = () => {
                Toast.current.show({ severity: 'Success', summary: 'Success', detail: 'Password Changed Successfully' });
            }
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                     <Toast ref={Toast} />
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Formik initialValues={initial} validationSchema={validate} onSubmit={Submit} >
                        {
                            (props) => (
                                <Form>
                                    <Box noValidate onSubmit={handleSubmit}  sx={{ mt: 3 }}>
                                        <Grid container spacing={2}>


                                            <Grid item xs={12}>
                                                < Field as={TextField}
                                                  
                                                    fullWidth
                                                    name="password"
                                                    id="password"
                                                    label="Enter-new-password"
                                                   
                                                    helperText={<ErrorMessage name="password" />}

                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field as={TextField}
                                                 
                                                    fullWidth
                                                    name="confirmpassword"
                                                    label="Confirm-Password"
                                                    type="password"
                                                    id="confirmpassword"
                                                    helperText={<ErrorMessage name="confirmpassword" />}
                                                />
                                            </Grid>

                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Reset
                                        </Button>


                                    </Box>
                                </Form>
                            )
                        }
                    </Formik>

                </Box>

            </Container>
           
        </ThemeProvider>
    );
}