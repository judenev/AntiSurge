
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';

import { Column } from 'primereact/column';
import axios from 'axios';

import { ConfirmPopup } from 'primereact/confirmpopup';

import { Typography } from '@mui/material';
import { useSelector,  } from 'react-redux'

import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

import Estimation from './Estimation';
import empUrl from '../../../Utils/empUrl';
import { selectEmpAuth } from '../../../redux/features/employeeAuthSlice';

export default function EmployeeAlljobs() {
  const employedata = useSelector(selectEmpAuth)
  const [visible, setVisible] = useState(false);
 
  const [visible1, setVisible1] = useState(false);

  const toast = React.useRef(null);
  const buttonEl = React.useRef(null);

  const [jobs, setJobs] = React.useState('');
  const [showjob, setShowjob] = React.useState(false);
  const [allocated, setAllocated] = React.useState([])

  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(20);

  async function render() {
    axios.get(`${empUrl}alljob/0`,{
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
      <Typography style={{ marginTop: "2%" }} variant='h4'>ALL  REGISTERED JOBS</Typography>

      <DataTable value={allocated}
        totalRecords={totalRecords}
        lazy={true}
        paginator rows={5}
        first={page * 5}
        onPage={(event) => {
          console.log("PAGE CHANGED", event)
          axios.get(`${empUrl}alljob/${event.page}`,).then((resp) => {
            console.log("resp", resp.data.data[0].jobstatus[0]);
            setAllocated(resp.data.data)
            setPage(event.page);

          })
        }}

        tableStyle={{ minWidth: '50rem' }}>

        <Column field="serviceType" header="Service Type" style={{ width: '20%' }}></Column>
        <Column field="Estimate" header="Estimated On" style={{ width: '20%' }}></Column>
        <Column field="Category" header="Category" style={{ width: '18%' }}></Column>
        <Column field="Model" header="Model" style={{ width: '18%' }}></Column>

        <Column field="Status" header="Current Status" style={{ width: '18%' }}></Column>


      </DataTable>
      <Dialog header="Services" visible={visible1} onHide={() => setVisible1(false)}
        style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
        {



          showjob ? <Estimation {...jobs} /> : ''}
      </Dialog>


    </div >

  );

}
