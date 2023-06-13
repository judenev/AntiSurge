import * as React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";


import Button from "@mui/material/Button";



import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import BaseURL from "../../../Utils/baseUrl";
import axios from "axios";


import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';

const checklist = yup.object().shape({
  Name: yup.string().required("This field is required"),
  Username: yup.string().email("Enter a valid email").required("This field is required"),
  Password: yup.string().min(4, "too short password").required('password required'),
  Mob: yup.number().min(999999999, "less than 10 numbers").max(12345678900, "Number Not Valid").required(),
  Content: yup.string().required(),
  Switch: yup.boolean()

})
export default function Employee() {
  const [aval, setAval] = React.useState(false);
  let initialValues = {
    Name: '',
    Username: '',
    Password: '',
    Content: '',
    Mob: '',
    Availability: false,
  }
  const [services, setServices] = React.useState([])
  const [age, setAge] = React.useState("");
  const [rel, setRel] = React.useState(false);
  const [del, setDel] = React.useState([])
  const [open, setOpen] = React.useState(false);

  let todel = []



  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const Submit = (values, props) => {


    setOpen(true);
    axios.post(`${BaseURL}/employeeadd`, values).then((response) => {

      setRel(!false)
    })

  }
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  })
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const deleteservice = (id, checked) => {
    if (!checked) {
      const index = todel.indexOf(id)
      todel.splice(index)
    } else {
      todel.push(id)

    }



  }




  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Employee Registration
          </Typography>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Employe Registered Succesfully!
            </Alert>
          </Snackbar>
          <Formik initialValues={initialValues} validationSchema={checklist} onSubmit={Submit}>
            {
              (props) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={2} sm={2}>
                      <InputLabel
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          fontWeight: 700
                        }}
                      >
                        Full Name
                      </InputLabel>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                      < Field as={TextField}
                        required
                        id="Name"
                        name="Name"
                        label="Enter Full Name"

                        size="small"
                        autoComplete="off"
                        helperText={<ErrorMessage name="Name" />}

                      />


                    </Grid>

                    <Grid item xs={12} sm={2}>
                      <InputLabel
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          fontWeight: 700
                        }}
                      >
                        Username
                      </InputLabel>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                      < Field as={TextField}
                        required
                        id="username"
                        name="Username"
                        label="Username"

                        size="small"
                        autoComplete="off"
                        helperText={<ErrorMessage name="Username" />}
                      />

                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <InputLabel
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          fontWeight: 700
                        }}
                      >
                        Password
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      < Field as={TextField}
                        id="password"
                        label="Password"
                        name="Password"


                        rows={4}
                        helperText={<ErrorMessage name="Password" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <InputLabel
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          fontWeight: 700
                        }}
                      >
                        Mob
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      < Field as={TextField}
                        id="Mob"
                        label="Contact Number"
                        name="Mob"


                        rows={4}
                        helperText={<ErrorMessage name="Mob" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <InputLabel
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          fontWeight: 700
                        }}
                      >
                        Qualification
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      < Field as={TextField}
                        id="outlined-multiline-static"
                        label="Content"
                        name="Content"
                        multiline
                        fullWidth
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <InputLabel
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          fontWeight: 700
                        }}
                      >
                        Availability
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      < Field as={Switch} {...label}
                        name="Availability"
                        value={props.values.Switch}

                        onValueChange={value =>
                          props.setFieldValue('switch', true)
                        }
                      />


                    </Grid>



                    <Button type="submit" variant="contained" sx={{ color: "#ff781f", marginLeft: "19%", fontSize: "10px" }}>
                      Add
                    </Button>


                    <Grid item xs={12} sm={5} />
                  </Grid>
                </Form>
              )
            }
          </Formik>


        </Box>
      </Paper>
    </React.Fragment>
  );
}