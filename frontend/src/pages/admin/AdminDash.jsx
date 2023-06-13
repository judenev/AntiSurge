import { Box } from '@mui/system'
import React, { useEffect } from 'react'


import AdminHome from '../AdminHome'


import BarChart from '../../Components/Charts/PieChart'
import BaseURL from '../../Utils/baseUrl'
import axios from 'axios'

import { Bar, Pie } from 'react-chartjs-2'
import { CategoryScale, Chart, registerables } from "chart.js";
import PieChart from '../../Components/Charts/PieChart'
import { Typography } from '@mui/material'

Chart.register(...registerables);

export default function AdminDash() {

    const [checksData, setChecksData] = React.useState({
        labels: [],
        datasets: []
    })
    const [statusData, setStatusData] = React.useState({
        labels: [],
        datasets: []
    })
    const [catData, setCatData] = React.useState({
        labels: [],
        datasets: []
    })
    useEffect(() => {
        axios.get(`${BaseURL}/allchecks`).then((h) => {
            axios.get(`${BaseURL}/jobstatus`).then((m) => {
                axios.get(`${BaseURL}/jobcategory`).then((n) => {

        

                    setCatData({
                        labels: n.data.data.map((item) => item._id),
                        datasets: [{
                            label: "Category Analysis",
                            data: n.data.data.map((item) => item.count),
                            backgroundColor: ["grey", "orange", "green",'purple'],
                            borderColor:"black",
                            borderWidth:2
                        }]
                    })
                })



                setStatusData({
                    labels: m.data.data.map((item) => item._id),
                    datasets: [{
                        label: "job status",
                        data: m.data.data.map((item) => item.count),
                        backgroundColor: ["green", "orange", "green","blue"],
                        borderColor:"black",
                        borderWidth:2
                    }],

                })
            })

         

            setChecksData({
                labels: h.data.data.map((item) => item._id),
                datasets: [{
                    label: "JobsStatus",
                    data: h.data.data.map((item) => item.count),
                    backgroundColor: ["blue", "yellow", "red"]
                }]
            })
        })


    }, [])







    return (

        <Box sx={{ display: 'flex', width: "10" }}>
            <AdminHome />
            {checksData && <Box component="main" sx={{ flexGrow: 1, p: 8, pl: 3, display: 'flex' }}>

                <div style={{ width: "40vw" }}>
                    <div style={{ width: '40vw', height: '40vh' }}>

                        <Bar data={statusData} />
                    </div>

                    <div style={{ width: '40vw', height: '40vh' }}>

                        <Bar data={catData} />
                    </div>

                </div>

                <div style={{ width: '35vw' }}>
                    <Pie data={checksData} />
                    <h5 style={{ display:'flex',justifyContent:'center'}} >Service Analysis</h5>
                </div>










            </Box>

            }
        </Box>



    )
}

