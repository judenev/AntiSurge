
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';

import { Column } from 'primereact/column';
import axios from 'axios';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { ToggleButton } from 'primereact/togglebutton';
import { Typography } from '@mui/material';

import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import empUrl from '../Utils/empUrl';
import { useSelector, useDispatch } from 'react-redux'
import { selectEmpAuth } from '../redux/features/employeeAuthSlice';


export default function CompleteJobs() {
  const [visible, setVisible] = useState(false);
  
  const [visibles, setVisibles] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [approved, setApproved] = useState(false);
  const toast = React.useRef(null);
  const buttonEl = React.useRef(null);
  const [modaldata, setModaldata] = React.useState([])
  const [jobs, setJobs] = React.useState('');
  const [showjob, setShowjob] = React.useState(false);
  const [allocated, setAllocated] = React.useState([])
  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(20);
  const navigate = useNavigate()
  const employedata = useSelector(selectEmpAuth)
  async function render() {
    axios.get(`${empUrl}completejobs/0`,{
      headers: {
          Authorization: `Bearer ${employedata.token.token}`
      }
    }).then((resp) => {
    

      setAllocated(resp.data.data)
      setTotalRecords(resp.data.count)

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
      <Typography style={{marginTop:"2%"}} variant='h4'>COMPLETED JOBS</Typography>

      <DataTable value={allocated} 
       totalRecords={totalRecords}
       lazy={true}
       paginator rows={5}
       first={page * 5}
       onPage={(event) => {
       
         axios.get(`${empUrl}completejobs/${event.page}`,).then((resp) => {
        
           setAllocated(resp.data.data)
           setPage(event.page);

         })
       }}
       tableStyle={{ minWidth: '50rem' }}>

        <Column field="serviceType" header="Service Type" style={{ width: '20%' }}></Column>
        <Column field="Estimate" header="Estimated On" style={{ width: '20%' }}></Column>
        <Column field="WarrantyDate" header="Completed On" style={{ width: '20%' }}></Column>
        <Column field="Category" header="Category" style={{ width: '18%' }}></Column>
        <Column field="Model" header="Model" style={{ width: '18%' }}></Column>
        <Column field="Status" header="Current Status" style={{ width: '18%' }}></Column>
       
 
      </DataTable>


      



    </div >

  );

}
