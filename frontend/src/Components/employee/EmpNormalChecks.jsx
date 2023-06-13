import React from 'react'; 
import { Card } from 'primereact/card';
import FormLabel from '@mui/material/FormLabel';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Tooltip from '@mui/material/Tooltip';
import BaseURL from '../../Utils/baseUrl';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
export default function EmpNormalChecks() {
  let todel =[]
  const [selectedCity, setSelectedCity] = React.useState(null);
  const [services, setServices] = React.useState([])
  const cities = [
    { name: 'Motor', code: 'MT' },
    { name: 'Fan', code: 'FN' },
    { name: 'Mixi', code: 'MIXI' },
    { name: 'Table Fan', code: 'TFN' },

]
  React.useEffect(() => {
    axios.get(`${BaseURL}/normalserviceslist`).then((resp) => {
   
      setServices(resp.data.normalservices)
 

    })


  }, [])
  const deleteservice=(id,checked)=>{
    if(!checked){
      let index = todel.indexOf(id)
      todel.splice(index)
    }else{
      todel.push(id)
      
    }
  
   
  
  }
 

    return (
        <div className="card">
            <Card title="Normal Checklist">
             <Box>
             <FormControl component="fieldset">
            <FormLabel component="legend">Available Checks</FormLabel>
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
                        deleteservice(e.target.value,e.target.checked)
                      }}
                    />
                  </Tooltip>


                )

              })}


        <div className="card flex justify-content-center">
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="Select Model" className="w-full md:w-14rem" />
        </div>




            </FormGroup>
          </FormControl>  
                
            </Box>            
                
            </Card>
        </div>
    )
}