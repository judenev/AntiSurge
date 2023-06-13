import { Box } from '@mui/system'
import React from 'react'
import AdminHome from '../../pages/AdminHome'
import { Bar, Pie } from 'react-chartjs-2'
import { CategoryScale, Chart, registerables } from "chart.js";
import axios from 'axios';
import empUrl from '../../Utils/empUrl';
import { Typography } from '@mui/material';
Chart.register(...registerables);







export default function AdminEmployeeMonitoring() {
    const [empdata, setEmpdata] = React.useState({
        labels: [],
        datasets: []
    })
   React.useEffect(()=>{
    axios.get(`${empUrl}empworkstatus`).then((data)=>{
    
      setEmpdata({
        labels: data.data.empData.map((item) => item.Name),
        datasets: [{
            label: "Employee Anlaysis",
            data: data.data.empData.map((item) => item.article),
            backgroundColor: ["grey", "orange", "green",'purple'],
            borderColor:"black",
            borderWidth:2
        }]
    })
    })
   },[])
    return (
        
            <Box sx={{ display: 'flex'}}>
                <AdminHome/>
                <Box component="main" sx={{ flexGrow: 1, p: 6,pl:0 }}>
                <div style={{ width: '50vw', height: '100vh',marginTop:"3%" }}>

                  <Bar data={empdata} />
                  <Typography variant='h4'> Employee  Work Load Analyis</Typography>
                  </div>
                </Box>
            </Box>
            
    
    
    )
}

