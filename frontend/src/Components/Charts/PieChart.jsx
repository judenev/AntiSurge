import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Bar, Pie} from 'react-chartjs-2'
import BaseURL from '../../Utils/baseUrl'
import { Box } from '@mui/material'
function PieChart({chartData}) {
const [data, setdata] = useState(() => {
  return {
    labels: [],
    datasets: []
  }
})
useEffect(() => {
  setdata(chartData)
},[])

// console.log(chartData);
  return (


    <Pie data={data}/>

  

        
 
  
  )
}

export default PieChart
