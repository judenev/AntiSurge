
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';

import { Column } from 'primereact/column';
import axios from 'axios';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { ToggleButton } from 'primereact/togglebutton';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'

import USERBaseURL from '../../../Utils/userUrl';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import Estimation from './Estimation';
import empUrl from '../../../Utils/empUrl';
import { selectEmpAuth } from '../../../redux/features/employeeAuthSlice';

export default function EmpOngoingJobs() {
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
    axios.get(`${empUrl}ongoingjobs/0`,{
      headers: {
          Authorization: `Bearer ${employedata.token.token}`
      }
  }).then((resp) => {
    

      setAllocated(resp.data.data)
      setTotalRecords(resp.data.count)

    })
  }
  const toast1 = React.useRef(null);

  function show() {
    toast1.current.show({ severity: 'success', detail: 'Job Marked as Completed' });
  };
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
    <div className="card" style={{ backgroundColor: "#f0ede4", borderRadius: "10px" }}>
      <Toast ref={toast} />
      <Toast ref={toast1} />
      <ConfirmPopup target={buttonEl.current} visible={visible} onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
      <Typography style={{ marginTop: "2%" }} variant='h4'>ONGOING JOBS</Typography>

      <DataTable
        value={allocated}
        totalRecords={totalRecords}
        lazy={true}
        paginator rows={5}
        first={page * 5}
        onPage={(event) => {
          axios.get(`${empUrl}ongoingjobs/${event.page}`,).then((resp) => {
         

            setAllocated(resp.data.data)
           
            setPage(event.page);
          })
        }} tableStyle={{ minWidth: '50rem' }}>
       
        <Column field="serviceType" header="Service Type" style={{ width: '20%' }}></Column>
        <Column field="Estimate" header="Estimated On" style={{ width: '20%' }}></Column>
        <Column field="Category" header="Category" style={{ width: '18%' }}></Column>
        <Column field="Model" header="Model" style={{ width: '18%' }}></Column>

        <Column field="Status" header="Current Status" style={{ width: '18%' }}></Column>
        <Column field="_id" header="Viewmore" style={{ width: '18%' }} body={(rowData) => <div className="card flex justify-content-center">
          <Button value={rowData} label="View" icon="pi pi-external-link" onClick={() => {
            setVisibles(true)
            setModaldata(rowData)

     
          }} />
          <Dialog header="Services" visible={visibles} style={{ width: '50vw' }} onHide={() => setVisibles(false)}>
            <h3 className='mt-0 mb-2'> Name: {modaldata && modaldata.userName}</h3>
            <h3 className='mt-0'> Job id: {modaldata && modaldata.JobId}</h3>

            {modaldata && modaldata.jobstatus ?
              <DataTable value={modaldata.jobstatus} tableStyle={{ minWidth: '21rem' }}>
                <Column field="title" header="Job"></Column>
                <Column field="status" header="Current Status"></Column>
                <Column field="_id" header="Status" body={
                  (rowData) => modaldata.completed ? "Job Completed" : <div className="card flex justify-content-center">

                    <Button value={rowData} label="complete" onClick={() => {
                      const obj = {
                        rowData,
                        modaldata
                      }
                      axios.post(`${empUrl}servicestatuschange`, obj)
                      const qq = modaldata
                      modaldata.jobstatus.Status = 'Completed'
                      setModaldata(qq)
                      rowData.Status = 'Completed'
                   
                    }} />
                    <Button style={{ marginLeft: "1%" }} value={rowData} label="Accept" onClick={() => {
                      let obj = {
                        rowData,
                        modaldata
                      }
                      axios.post(`${empUrl}servicestatuschanges`, obj)
                     
                    }} />
                  </div>


                } >

                </Column>
              </DataTable>


              : ""}

          </Dialog>
        </div>}>

        </Column>
        <Column field="Actions" header="Actions" style={{ width: '18%' }} body={(rowData) => <div className="card flex justify-content-center">


          {!rowData.Approved ? <Button ref={buttonEl} onClick={() => (axios.post(`${empUrl}complete/${rowData._id}`).then((res) => {
           
            show()



          }))} label="Completed" /> : <Button ref={buttonEl} onClick={() => (setVisible(true), console.log("vv", rowData._id), axios.get(`${USERBaseURL}estimate/${rowData._id}`).then((res) => {
            console.log("koi", res.data.data.jobstatus);
            setJobs(res.data.data)



          }))} label="Estimate" />}

        </div>}></Column>
      </DataTable>




      <Dialog header="Services" visible={visible1} onHide={() => setVisible1(false)}
        style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
        {



          showjob ? <Estimation {...jobs} /> : ''}
      </Dialog>


    </div >

  );

}
