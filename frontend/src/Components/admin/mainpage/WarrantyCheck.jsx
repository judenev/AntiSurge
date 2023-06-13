import React, { useRef } from "react";
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Typography } from "@mui/material";
import { Column } from "primereact/column";
import { DataTable } from 'primereact/datatable';
import axios from "axios";
import empUrl from "../../../Utils/empUrl";
import { Messages } from 'primereact/messages';
import { useSelector } from "react-redux";
import { selectEmpAuth } from "../../../redux/features/employeeAuthSlice";
export default function WarrantyCheck() {
  const [wardata, setWardata] = React.useState([])
const[found,setFound] = React.useState(false)
const[warday,setWarday] = React.useState('')
const msgs = useRef(null);
const employedata = useSelector(selectEmpAuth)
function notFound(){

    msgs.current.show([

        {sticky: true, severity: 'error', detail: 'Sorry No Job Found', closable: false}
    ]);

}

    const toast = useRef(null);

   

    let formik = useFormik({
        initialValues: {
            value: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.value) {
                errors.value = 'JobId is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            let obj = data.value
 
           axios.get(`${empUrl}warrantycheck/${obj}`,{
            headers: {
                Authorization: `Bearer ${employedata.token.token}`
            }
        }).then((resp)=>{
         
           if(resp.data.found){

               setWardata([resp.data.data])
               setWarday(resp.data.warranty)
               setFound(true)

              
               msgs.current.clear();
              
           }else{
             setFound(false)
             notFound()
             
           }
           })
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (<>
      <div className="card flex justify-content-center">
      <Messages ref={msgs} />
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
            <Typography variant="h5">Warranty Check Page</Typography>
                <span className="p-float-label">
                    <Toast ref={toast} />
                    <InputText
                    style={{width:"50%"}}
                        id="value"
                        name="value"
                        value={formik.values.value}
                        onChange={(e) => {
                            formik.setFieldValue('value', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('value') })}
                    />
                    <label htmlFor="input_value">Enter Job ID</label>
                </span>
                {getFormErrorMessage('value')}
                <Button type="submit" style={{width:"20%"}} label="Submit" />
            </form>
     

        </div>
        <div style={{backgroundColor:"white", marginTop:"2%"}}>
     <Typography variant="h6">Results</Typography>

   {wardata[0] && wardata[0].Warranty ?<Typography sx={{color:"green"}}  variant="h6">{`In-Warranty and ${warday} days remains`}</Typography>:
     <Typography sx={{color:"red"}}variant="h6">Out-Off Warranty</Typography>}
<DataTable value={wardata} paginator rows={2} rowsPerPageOptions={[5]} tableStyle={{ minWidth: '50rem' }}>

<Column field="JobId" header="Job Id" style={{ width: '20%' }}></Column>
<Column field="Estimate" header="Estimated On" style={{ width: '20%' }}></Column>
<Column field="WarrantyDate" header="Delivered Date" style={{ width: '18%' }}></Column>


<Column field="Attended" header="Attended By" style={{ width: '18%' }}></Column>


</DataTable>
        </div>
      </>
      
              
    )
}