import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import BaseURL from "../../../Utils/baseUrl";
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const initialValues = {
  title: '',
  Content: '',
}
const checklist = yup.object().shape({
  title: yup.string().required(),
  Content: yup.string().required()
})
export default function MajorChecklist() {
  const [services, setServices] = React.useState([])
  const [age, setAge] = React.useState("");
  const [del, setDel] = React.useState([])
  let todel = []
  React.useEffect(() => {
    axios.get(`${BaseURL}/majorserviceslist`).then((resp) => {
   
      setServices(resp.data.normalservices)
    

    })


  }, [])


  const Submit = (values, props) => {


    axios.post(`${BaseURL}/majorserviceadd`, values).then(() => {
      setDel([])
    })

  }
  const deleteservice = (id, checked) => {
    if (!checked) {
     const index = todel.indexOf(id)
      todel.splice(index)
    } else {
      todel.push(id)

    }



  }
  const deleteconfirm = () => {
    axios.post(`${BaseURL}/majorservicedelete`, todel).then(() => {
      setDel([])
    })

  }



  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Major Checklist
          </Typography>
          <Formik initialValues={initialValues} validationSchema={checklist} onSubmit={Submit}>
            {
              (props) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={2}>
                      <InputLabel
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          fontWeight: 700
                        }}
                      >
                        Name
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      < Field as={TextField}
                        required
                        id="title"
                        name="title"
                        label="Name of the Check"
                        fullWidth
                        size="small"
                        autoComplete="off"

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
                        Details
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      < Field as={TextField}
                        id="outlined-multiline-static"
                        label="Details of the Check"
                        name="Content"
                        multiline
                        fullWidth
                        rows={4}
                      />
                    </Grid>




                    <Button type="submit" variant="contained" sx={{ backgroundColor: "#c5d1ae", marginLeft: "19%", fontSize: "10px", marginTop: "1%" }}>
                      Add
                    </Button>


                    <Grid item xs={12} sm={5} />
                  </Grid>
                </Form>
              )
            }
          </Formik>

          <FormControl component="fieldset">
            <FormLabel sx={{ padding: "4%", color: "#262624" }} component="legend">Available Checks</FormLabel>
            <FormGroup aria-label="position" row>
              {services.map((data) => {
                return (
                  <Tooltip title={data.Content} arrow>
                    <FormControlLabel

                      key={data._id}
                      value={data._id}
                      control={<Checkbox />}
                      label={data.title}
                      labelPlacement="end"

                      onClick={(e) => {
                
                        deleteservice(e.target.value, e.target.checked)


                      }}
                    />
                  </Tooltip>


                )

              })}

              <Button onClick={() => {
                deleteconfirm()

              }} variant="contained" sx={{ color: "#ff781f", marginLeft: "19%", fontSize: "12px" }}>
                Delete
              </Button>





            </FormGroup>

          </FormControl>
        </Box>
      </Paper>
    </React.Fragment>
  );
}