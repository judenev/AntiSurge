
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
import { useSelector, useDispatch } from 'react-redux'
import { selectEmpAuth } from "../../../redux/features/employeeAuthSlice";
import { Dialog } from 'primereact/dialog';
export default function EmpLeave() {
    let empid
    let empname
    const toast = useRef(null);
    const employedata = useSelector(selectEmpAuth)
    console.log("employeedata", employedata.token);
    empid = employedata.token.id
    empname = employedata.token.user
    const [dates, setDates] = React.useState(null);
    const [reason, setReason] = React.useState('');
    const [full, setFull] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const[half,setHalf]= React.useState(false)
    const formik = useFormik({
        initialValues: {
            description: ''
        },
        validate: (data) => {
           
            setReason(data)
            let errors = {};

            if (!data.description) {
                errors.description = 'Reason for Leave is Required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            function convert(str) {
                const date = new Date(str),
                    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                    day = ("0" + date.getDate()).slice(-2);
                return [date.getFullYear(), mnth, day].join("/");
            }
        if(half){
            const Date = convert(dates)
  
            const show = () => {
                toast.current.show({ severity: 'success', summary: `Leave Submitted and Applied for Half Day ` });
            }

            const leave = {
                FromDate: Date,
                ToDate: "-/-/-/",
                Days: 1,
                Reason: reason.description,
                empid,
                empname,
                type:"HalfDay",
                Approved: false
            }

            axios.post(`${empUrl}/employleave`, leave, {
                headers: {
                    Authorization: `Bearer${employedata.token.token}`
                }
            }

            )
        
            data && show();
            formik.resetForm();
            setHalf(false)
        }else{
       

            function getDifferenceInDays(date1, date2) {
                const diffInMs = Math.abs(date2 - date1);
                return diffInMs / (1000 * 60 * 60 * 24);
            }

      
            const fromDate = convert(dates[0])
           const toDate = convert(dates[1])
      

            console.log(getDifferenceInDays(fromDate, toDate))
            const date1 = new Date(fromDate);
            const date2 = new Date(toDate);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const daysonleave = diffDays + 1
         

            const show = () => {
                toast.current.show({ severity: 'success', summary: `Leave Submitted and Applied for ${daysonleave} Days ` });
            }
         
          const leave = {
                FromDate: fromDate,
                ToDate: toDate,
                Days: daysonleave,
                Reason: reason.description,
                empid,
                empname,
                type:"Full Day",
                Approved: false
            }
            
            axios.post(`${empUrl}/employleave`, leave, {
                headers: {
                    Authorization: `Bearer${employedata.token.token}`
                }
            })


           
            data && show();
            formik.resetForm();
        }

            

        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="card flex justify-content-center">
            <Card  >
                <Typography variant="h4" >LEAVE APPLY FORM</Typography>
                {full ? ""
                    : <Box sx={{ marginTop: "2%" }}>
                        <Button label="Apply for Half Day" onClick={()=>{
                           setHalf(true)
                            setVisible(true)
                          
                        }} severity="secondary" rounded />  <Typography style={{ marginLeft: "20%" }} variant="h6">Or</Typography> <Button label="Apply for Full Day" onClick={() => { setFull(true) }} severity="secondary" rounded />

                    </Box>
                }
                  <Dialog header="Half Day Leave Form" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                  <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2 p-5" >


                        <Toast ref={toast} />
                        <Typography>Please enter reason for leave</Typography>

                        <div className="card flex justify-content-center" style={{ margin: '1%' }}>

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

                        <div className="card flex " >
                            <Calendar style={{ paddingLeft: ' 0% !important' }} value={dates} panelStyle={{ fontSize: "10px !important" }} onChange={(e) => setDates(e.value)}  placeholder="Select the Date Range" readOnlyInput />
                        </div>
                        <Box><Button label="Submit" type="submit" icon="pi pi-check" /></Box>

                    </form>
                            </Dialog>

                {getFormErrorMessage('description')}
                {full ? <Box sx={{ paddingLeft: '5%' }}  >

                    <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2 p-5" >


                        <Toast ref={toast} />
                        <Typography>Please enter reason for leave</Typography>

                        <div className="card flex justify-content-center" style={{ margin: '1%' }}>

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

                        <div className="card flex " >
                            <Calendar style={{ paddingLeft: ' 0% !important' }} value={dates} panelStyle={{ fontSize: "10px !important" }} onChange={(e) => setDates(e.value)} selectionMode="range" placeholder="Select the Date Range" readOnlyInput />
                        </div>
                        <Box><Button label="Submit" type="submit" icon="pi pi-check" /></Box>

                    </form>
                </Box> : ""}

            </Card>

        </div>
    )
}
