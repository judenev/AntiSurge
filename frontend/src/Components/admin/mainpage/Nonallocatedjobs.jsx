
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';

import { Column } from 'primereact/column';
import axios from 'axios';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { ToggleButton } from 'primereact/togglebutton';
import { Typography } from '@mui/material';

import USERBaseURL from '../../../Utils/userUrl';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import Estimation from './Estimation';

export default function Nonallocatedjobs() {
  const [visible, setVisible] = useState(false);
  const [visibles, setVisibles] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const toast = React.useRef(null);
  const buttonEl = React.useRef(null);
  const [modaldata, setModaldata] = React.useState([])
  const [jobs, setJobs] = React.useState('');
  const [showjob, setShowjob] =React.useState(false);
  const [allocated, setAllocated] = React.useState([])
const navigate=useNavigate()
  async function render() {
    axios.get(`${USERBaseURL}nonallocated`,).then((resp) => {
      console.log("resp", resp.data);
      setAllocated(resp.data.data)
    })
  }
  React.useEffect(() => {
    render()
  }, [])


  const accept = () => {

    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    setShowjob(true)
    setVisible1(true)
  };

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    setShowjob(false) 
  };


  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmPopup target={buttonEl.current} visible={visible} onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
      <Typography>NON ALLOCATED JOBS</Typography>

      <DataTable value={allocated} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>

        <Column field="serviceType" header="Service Type" style={{ width: '20%' }}></Column>
        <Column field="Estimate" header="Estimated On" style={{ width: '20%' }}></Column>
        <Column field="Category" header="Category" style={{ width: '18%' }}></Column>
        <Column field="Model" header="Model" style={{ width: '18%' }}></Column>

        <Column field="Status" header="Current Status" style={{ width: '18%' }}></Column>
        <Column field="_id" header="Viewmore" style={{ width: '18%' }} body={(rowData) => <div className="card flex justify-content-center">
          <Button value={rowData} label="View" icon="pi pi-external-link" onClick={() => {
            setVisibles(true)
            setModaldata([rowData])
            console.log("bb", modaldata);
          }} />
          <Dialog header="Services" visible={visibles} style={{ width: '40vw' }} onHide={() => setVisibles(false)}>
            <h3 className='mt-0 mb-2'> Name: {modaldata[0] && modaldata[0].userName}</h3>
            <h3 className='mt-0'> Job id: {modaldata[0] && modaldata[0]._id}</h3>

            {modaldata[0] && modaldata[0].jobstatus ?
              <table className='mx-auto' style={{ borderStyle: 'outset', width: "80%", borderCollapse: 'collapse' }}>
                <tr style={{ borderStyle: 'outset', padding: "0.5rem" }}>
                  <th style={{ borderStyle: 'outset', padding: "0.5rem" }}>Job</th>
                  <th style={{ borderStyle: 'outset', padding: "0.5rem" }}>Status</th>
                </tr>
                {Object.keys(modaldata[0].jobstatus).map((job) => <tr style={{ borderStyle: 'outset', padding: "0.5rem" }}><td style={{ borderStyle: 'outset', padding: "0.5rem" }}>{job} </td> <td className='text-center' style={{ borderStyle: 'outset', padding: "0.5rem" }}>{modaldata[0].jobstatus[job]}</td></tr>)}
              </table>

              : ""}

          </Dialog>
        </div>}>

        </Column>
        <Column field="Actions" header="Actions" style={{ width: '18%' }} body={(rowData) => <div className="card flex justify-content-center">
          <Button ref={buttonEl} onClick={() => (setVisible(true),console.log("vv",rowData._id),axios.get(`${USERBaseURL}estimate/${rowData._id}`).then((res)=>{
            console.log("koi",res.data.data.jobstatus);
            setJobs(res.data.data)
             
            
            
          }))} label="Estimate" />
        
        </div>}></Column>
      </DataTable>
      <Dialog header="Header" visible={visible1} onHide={() => setVisible1(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                  { showjob? <Estimation {...jobs}/>:''}
            </Dialog>
      

    </div >

  );

}
