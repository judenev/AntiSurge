
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import BaseURL from '../../../Utils/baseUrl';

import { ToggleButton } from 'primereact/togglebutton';
import { Typography } from '@mui/material';
import empUrl from '../../../Utils/empUrl';

export default function Empleaveslist() {
  const [emp, setEmp] = React.useState([])
  const [checked, setChecked] = useState(false);

 async function render(){
 await axios.get(`${BaseURL}/empleavelist`).then((resp) => {
   
    setEmp(resp.data.list)
  })
} 
    React.useEffect(() => {
  render()
    }, [])




  return (
    <div className="card">
        <Typography variant='h4' >LEAVE APPROVAL</Typography>
      <DataTable value={emp} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
      <Column field="empname" header="Name" style={{ width: '20%' }}></Column>
        <Column field="FromDate" header="From" style={{ width: '20%' }}></Column>
        <Column field="ToDate" header="To" style={{ width: '20%' }}></Column>
        <Column field="Days" header="No.of.Days" style={{ width: '15%' }}></Column>
        <Column field="type" header="Type" style={{ width: '14%' }}></Column>
        <Column field="Reason" header="Reason for leave" style={{ width: '30%' }}></Column>
        <Column field="Approved" header="Approved Status" style={{ width: '20%' }} body={(rowData) => <ToggleButton id={rowData._id} checked={rowData.Approved} onChange={(e) => {
        
          let st = e.target.value
          let id = rowData._id
     
          axios.post(`${empUrl}/leavestatus`, { status: st, empid: id }).then((resp) => {
     
            render()
          })
        }} className="w-8rem" />}></Column>

      </DataTable>
    </div >
  );
}
