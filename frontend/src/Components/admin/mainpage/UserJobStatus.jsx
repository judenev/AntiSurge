
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
import USERBaseURL from '../../../Utils/userUrl';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAuth } from '../../../redux/features/userAuthSlice';
import ReactDOMServer from "react-dom/server"
import html2pdf from "html2pdf.js/dist/html2pdf.bundle"

export default function UserJobStatus() {
  const [visible, setVisible] = useState(false);
  const [visibles, setVisibles] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const toast = React.useRef(null);
  const buttonEl = React.useRef(null);
  const [modaldata, setModaldata] = React.useState([])
  const [jobs, setJobs] = React.useState('');
  const [showjob, setShowjob] = React.useState(false);
  const [allocated, setAllocated] = React.useState([])
  const navigate = useNavigate()
  const userData = useSelector(selectUserAuth)

  const userId = userData.token.data._id
  async function render() {
    axios.get(`${USERBaseURL}userestimate/${userId}`, userId).then((resp) => {
      console.log("Estresp", resp.data);
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
// printing invoice==========================================================================
const pdfJSX = () => {
 
   
  return (
    <>
      <header>

        <h1> INVOICE </h1>
        <address>
          <p> Anti-Surge </p>
          <p> #429, First Floor </p>
          <p> Kochi </p>
          <p> +911231453212 </p>
        </address>



      </header>
      <body>
        <article>
          <address>
            <p> Anti-Surge Pvt Lmtd </p>
          </address>

          <table className="firstTable">
            <tr>
              <th><span >Invoice #</span></th>
              <td><span >{modaldata.JobId}</span></td>
            </tr>
            <tr>
              <th><span >Date</span></th>
              <td><span >{modaldata.WarrantyDate}</span></td>
            </tr>
            <tr>
              <th><span >Payable Amount</span></th>
              <td><span id="prefix" >₹</span><span>{modaldata.total}</span></td>
            </tr>
          </table>

          <table className="secondTable">
            <thead>
              <tr>
                <th><span >Service Type</span></th>
             
                <th><span >Attended By</span></th>
                <th><span >Model</span></th>
                <th><span >Price</span></th>
                <th><span >InWarranty</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><a class="cut">-</a><span >{modaldata.serviceType}</span></td>
                <td><span >{modaldata.Attended}</span></td>
               
                <td><span >{modaldata.Model}</span></td>
                <td><span data-prefix>₹</span><span>{modaldata.total}</span></td>
                {modaldata.Warranty ?<td><span >yes</span></td>:<td><span >No</span></td>}
              </tr>
            </tbody>
          </table>
          <table className="firstTable">
            <tr>
              <th><span >Total</span></th>
              <td><span data-prefix>₹</span><span>{modaldata.total}</span></td>
            </tr>
            <tr>
              <th><span >Amount Paid</span></th>
              <td><span data-prefix>₹</span><span >{modaldata.total}</span></td>
            </tr>

          </table>
        </article>

        <aside>
          <h1 id="notes">Additional Notes</h1>
          <div >
            <p>Amount will vary according to the parts price variations and labour cost</p>
          </div>
        </aside>

      </body>
    </>
  )
}

function printHandler () {
  
  const printElement = ReactDOMServer.renderToString(pdfJSX());
  // const printElement = pdfJSX();

  html2pdf().from(printElement).save();
}

// =========================================================================
  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmPopup target={buttonEl.current} visible={visible} onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
      <Typography variant='h4'>APPLIED JOBS STATUS</Typography>

      <DataTable value={allocated} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>

        <Column field="serviceType" header="Service Type" style={{ width: '18%' }}></Column>
        <Column field="Estimate" header="Estimated On" style={{ width: '18%' }}></Column>
        <Column field="Category" header="Category" style={{ width: '16%' }}></Column>
        <Column field="Model" header="Model" style={{ width: '16%' }}></Column>

        <Column field="Status" header="Current Status" style={{ width: '15%' }}></Column>
        <Column field="_id" header="Actions" style={{ width: '15%' }} body={(rowData) => <div className="card flex justify-content-center">
          <Button  value={rowData} label="View More"  onClick={() => {
            setVisibles(true)
            setModaldata(rowData)
            if (rowData.Status === "Applied" || rowData.Status === "Not Approved") {
              setJobs(false)
            } else {
              setJobs(true)
            }
            console.log("bb", rowData);
          }} />
         
          <Dialog header="Services" visible={visibles} style={{ width: '50vw' }} onHide={() => setVisibles(false)}>
            <h3 className='mt-0 mb-2'> Name: {modaldata && modaldata.userName}</h3>
            <h3 className='mt-0'> Job id: {modaldata && modaldata.JobId}</h3>
         
            {modaldata.completed?<Button style={{marginBottom:"1%"}} label="Download Invoice >" onClick={()=>{printHandler(modaldata)}} severity="help" outlined />:""}
            {jobs && modaldata.jobstatus ?

              <DataTable value={modaldata.jobstatus} tableStyle={{ minWidth: '21rem' }}>
                <Column field="title" header="Job"></Column>
                <Column field="status" header="Current Status"></Column>
                <Column field="price" header="Amount in ₹"></Column>
                
              </DataTable>


              : <DataTable value={modaldata.jobstatus} tableStyle={{ minWidth: '21rem' }}>
                <Column field="title" header="Job"></Column>
                <Column field="status" header="Current Status"></Column>


              </DataTable>}

            {!modaldata.Estimation&& modaldata.Applied ?"": <div><Button style={{ padding: "1%", marginTop: "1%" }} onClick={() => {
              setVisibles(false)
              let data = {
                JobId: modaldata._id,

              }
              axios.post(`${USERBaseURL}approved/${modaldata._id}`, data).then((resp) => {
                console.log("resp after aprroved", resp);
              })
            }}>Approve</Button>
              <Button onClick={() => {
                setVisibles(false)
                axios.post(`${USERBaseURL}reject/${modaldata._id}`).then((resp) => {

                })
              }} style={{ padding: "1%", marginTop: "1%", marginLeft: "2%", backgroundColor: "red" }} >Reject</Button></div>}
          </Dialog>
        </div>}>

        </Column>

      </DataTable>



    </div >

  );

}
