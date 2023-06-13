
import React, { useState,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import BaseURL from '../../../Utils/baseUrl';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';
import { Typography } from '@mui/material';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function Dummy() {
  const [emp, setEmp] = React.useState([])
  const [checked, setChecked] = useState("");
  const [visible, setVisible] = useState(false);
    const toast = useRef(null);
 async function render(){
 await axios.get(`${BaseURL}/getemployee`).then((resp) => {
    console.log(resp);
    setEmp(resp.data.employeelist)
  })
} 
    React.useEffect(() => {
  render()
    }, [])

    const accept = () => {
      console.log("ggg",checked);
      toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Removed Employee Succesfully', life: 3000 });
      axios.post(`${BaseURL}/employedelete/${checked}`)
  }

  const reject = () => {
      toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }

const remove =(data)=>{
  console.log(data,"removedara");

  setChecked(data._id)
}


  return (
    <div className="card">
      <Typography   variant='h4' > EMPLOYEE LIST</Typography>
      <Toast ref={toast} />
      <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to remove this Employee?" 
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
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
       <Column field="_id" header="Actions" style={{ width: '20%' }} body={(rowData)=>
                <Button onClick={() => (setVisible(true) ,remove(rowData))} icon="pi pi-check" label="Remove" />
            }></Column>
      </DataTable>
    </div >
  );
}
