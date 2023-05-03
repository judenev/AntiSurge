
import React, { useRef } from "react";
import { useFormik } from 'formik';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { Box, Typography } from "@mui/material";
import axios from "axios";
import empUrl from "../../../Utils/empUrl";
import { useSelector,useDispatch } from 'react-redux'
import { selectEmpAuth } from "../../../redux/features/employeeAuthSlice";

export default function EmpLeave() {
    let empid
    let empname
    const toast = useRef(null);
    const employedata = useSelector(selectEmpAuth)
    console.log("employeedata",employedata.token);
      empid=employedata.token.id
      empname=employedata.token.user
    const [dates, setDates] = React.useState(null);
    const [reason, setReason] = React.useState('');
    
 

    const formik = useFormik({
        initialValues: {
            description: ''
        },
        validate: (data) => {
            console.log(data);
            setReason(data)
            let errors = {};

            if (!data.description) {
                errors.description = 'Reason for Leave is Required.';
            }

            return errors;
        },
        onSubmit: (data) => {
           
            function convert(str) {
                var date = new Date(str),
                    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                    day = ("0" + date.getDate()).slice(-2);
                return [date.getFullYear(), mnth, day].join("/");
            }

            function getDifferenceInDays(date1, date2) {
                const diffInMs = Math.abs(date2 - date1);
                return diffInMs / (1000 * 60 * 60 * 24);
            }

            console.log(dates);
            let fromDate = convert(dates[0])
            let toDate = convert(dates[1])
            console.log(fromDate, toDate);

            console.log(getDifferenceInDays(fromDate, toDate))
            const date1 = new Date(fromDate);
            const date2 = new Date(toDate);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            let daysonleave = diffDays + 1
            console.log( daysonleave + " days");
            const show = () => {
                toast.current.show({ severity: 'success', summary: `Leave Submitted and Applied for ${daysonleave} Days `});
            }

            console.log("leave reason",reason.description);
            let leave ={
                FromDate:fromDate,
                ToDate:toDate,
                Days:daysonleave,
                Reason:reason.description,
                empid,
                empname,
                Approved:false
            }
            console.log("full leave object",leave);
            axios.post(`${empUrl}/employleave`,leave,{headers:{
                Authorization:`Bearer ${employedata.token.token}`
            }})


            console.log(fromDate);
            data && show();
            formik.resetForm();

        }
    });
   
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="card flex justify-content-center">
            <Card title="Leave Apply Form">
            {getFormErrorMessage('description')}
                <Box sx={{paddingLeft:'5%'}} >
                
                <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2 p-5" >
              
               
                <Toast ref={toast} />
                <Typography>Please enter reason for leave</Typography>

                <div className="card flex justify-content-center" style={{margin:'1%'}}>
                    
                <InputTextarea
                    autoResize
                    inputId="description"
                    name="description"
                    placeholder="Reason for Leave"
                    rows={10}
                    cols={100}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('description') })}
                    value={formik.values.description}
                    onChange={(e) => {
                        formik.setFieldValue('description', e.target.value);
                    }}
                />
                </div>
                <Typography>Please select the both date from this box</Typography>

                <div className="card flex justify-content-center" style={{margin:'1%'}}>
                    <Calendar value={dates} panelStyle={{fontSize:"10px !important"}}  onChange={(e) => setDates(e.value)} selectionMode="range" placeholder="Select the Date Range" readOnlyInput />
                </div>
               <Box><Button label="Submit" type="submit" icon="pi pi-check" /></Box>
                
            </form>
                </Box>
         
</Card>
            
        </div>
    )
}
