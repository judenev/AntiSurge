
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
    console.log(resp.data.list);
    setEmp(resp.data.list)
  })
} 
    React.useEffect(() => {
  render()
    }, [])




  return (
    <div className="card">
        <Typography>Leave Approval</Typography>
      <DataTable value={emp} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
      <Column field="empname" header="Name" style={{ width: '20%' }}></Column>
        <Column field="FromDate" header="From" style={{ width: '20%' }}></Column>
        <Column field="ToDate" header="To" style={{ width: '20%' }}></Column>
        <Column field="Days" header="No.of.Days" style={{ width: '20%' }}></Column>
        
        <Column field="Reason" header="Reason for leave" style={{ width: '30%' }}></Column>
        <Column field="Approved" header="Approved" style={{ width: '20%' }} body={(rowData) => <ToggleButton id={rowData._id} checked={rowData.Approved} onChange={(e) => {
          console.log(rowData._id);
          let st = e.target.value
          let id = rowData._id
          console.log(st);
          axios.post(`${empUrl}/leavestatus`, { status: st, empid: id }).then((resp) => {
            console.log("response here",resp.data.leave);
            render()
          })
        }} className="w-8rem" />}></Column>

      </DataTable>
    </div >
  );
}
