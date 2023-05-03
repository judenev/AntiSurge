
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import BaseURL from '../../../Utils/baseUrl';

import { ToggleButton } from 'primereact/togglebutton';

export default function Dummy() {
  const [emp, setEmp] = React.useState([])
  const [checked, setChecked] = useState(false);

 async function render(){
 await axios.get(`${BaseURL}/getemployee`).then((resp) => {
    console.log(resp);
    setEmp(resp.data.employeelist)
  })
} 
    React.useEffect(() => {
  render()
    }, [])





  return (
    <div className="card">
      <DataTable value={emp} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
        <Column field="Name" header="Name" style={{ width: '25%' }}></Column>
        <Column field="Username" header="Username" style={{ width: '25%' }}></Column>
        <Column field="Content" header="Qualifications" style={{ width: '25%' }}></Column>
        <Column field="Availability" header="Available" style={{ width: '20%' }} body={(rowData) => <ToggleButton id={rowData._id} checked={rowData.Availability} onChange={(e) => {
          console.log(rowData._id);
          let st = e.target.value
          let id = rowData._id
          console.log(st);
          axios.post(`${BaseURL}/empstatus`, { status: st, empid: id }).then((resp) => {
            console.log("response here",resp);
            render()
          })
        }} className="w-8rem" />}></Column>

      </DataTable>
    </div >
  );
}
