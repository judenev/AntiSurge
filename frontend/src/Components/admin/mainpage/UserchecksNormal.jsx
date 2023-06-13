
import { Card } from 'primereact/card';
import FormLabel from '@mui/material/FormLabel';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from "@mui/material/FormControl";

import Tooltip from '@mui/material/Tooltip';
import { Form, useFormik } from 'formik';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useRef, useEffect } from "react";
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import empUrl from "../../../Utils/empUrl";
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography } from "@mui/material";
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import { Messages } from 'primereact/messages';
import { selectEmpAuth } from '../../../redux/features/employeeAuthSlice';
import { selectUserAuth } from '../../../redux/features/userAuthSlice';
import { InputText } from "primereact/inputtext";
import USERBaseURL from '../../../Utils/userUrl';
import BaseURL from '../../../Utils/baseUrl';
export default function UserchecksNormal() {

    let userId
    let userName
    const toast = useRef(null);
    const msgs = useRef(null);
    const userAuthdata = useSelector(selectUserAuth)
    console.log("userdata", userAuthdata.token.data);
    userId = userAuthdata.token.data._id
    userName = userAuthdata.token.data.firstName
    const [date, setDate] = React.useState(null);
    const [reason, setReason] = React.useState('');
    const [todel, setTodel] = React.useState([])
    const [value, setValue] = React.useState('');
    const [err, setErr] = React.useState(false);
    const [reg, setReg] = React.useState(false)
    const [selectedCity, setSelectedCity] = React.useState(null);
    const [services, setServices] = React.useState([])
    const cities = [
        { name: 'Motor' },
        { name: 'Fan' },
        { name: 'Mixi' },
        { name: 'Table Fan' },

    ]

    useEffect(() => {
        axios.get(`${BaseURL}/normalserviceslist`).then((resp) => {
            console.log(resp.data);
            setServices(resp.data.normalservices)


        })


    }, [])
    const deleteservice = (id, checked) => {
        if (!checked) {
            let index = todel.indexOf(id)
            todel.splice(index)
        } else {
            todel.push(id)

        }

        return todel
    }

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
            console.log("kooi", data);
            function convert(str) {
                var date = new Date(str),
                    mnth = ("" + (date.getMonth() + 1)).slice(-2),
                    day = ("" + date.getDate()).slice(-2);
                return [date.getFullYear(), mnth, day].join("/");
            }




            let estiMatedDate = convert(date)


            // ==========================================================


            const dates = new Date();

            const day = dates.getDate();
            const month = dates.getMonth() + 1;
            const year = dates.getFullYear();

            // This arrangement can be altered based on how we want the date's format to appear.

            const currentDates = `${year}/${month}/${day}`;


            const fromDate = new Date(currentDates)
            const toDate = new Date(estiMatedDate);



            function getDifferenceInDays(date1, date2) {
                const diffInMs = Math.abs(date2 - date1);
                return diffInMs / (1000 * 60 * 60 * 24);
            }



            // ==========================================================

            const show = () => {
                toast.current.show({ severity: 'success', summary: "Ticket Generated" });
            }


            const JobReg = {
                serviceType: "Normal Checks",
                Estimate: estiMatedDate,
                Applied: true,
                Category: selectedCity.name,
                Model: value,
                joblist: todel,
                Instruction: reason.description,
                userId,
                userName,
                Approved: true,
                Status: 'Applied',
                total: 0,
                Estimation: false,
                Warranty: false,
                WarrantyDate: "",
                Attended: "",
                JobId: "none",
                completed: false,


            }

            axios.post(`${USERBaseURL}jobreg`, JobReg, {
                headers: {
                    Authorization: `Bearer ${userAuthdata.token.token}`
                }
            }).then((resp) => {

                if (resp.data.Repeat) {
                    console.log(resp.data.Repeat)
                    setErr(true)
                    msgs.current.show(

                        { sticky: true, severity: 'error', summary: 'Sorry Same Checks Found', closable: false }
                    );


                } else {

                    setErr(false)

                }
            })



            data && show();
            formik.resetForm();

        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);




    return (
        <div className="card">
            <Toast ref={toast} />
            <Card title="Normal Checklist" className="card flex">
                <Box>
                    <FormControl component="fieldset">
                        <Box sx={{ width: '1000px', display: 'flex', justifyContent: 'space-between' }}>
                            <Box >
                                <FormLabel sx={{ color: "#262624", fontWeight: '600' }} >Available Checks</FormLabel>
                                <FormGroup aria-label="position" row>
                                    {services.map((data) => {
                                        return (
                                            <Tooltip title={data.Content} arrow>
                                                <FormControlLabel

                                                    key={data._id}
                                                    value={data.title}
                                                    control={<Checkbox />}
                                                    label={data.title}
                                                    labelPlacement="end"
                                                    onClick={(e) => {
                                                        setTodel(deleteservice(e.target.value, e.target.checked))
                                                    }}
                                                />
                                            </Tooltip>


                                        )

                                    })}

                                </FormGroup>
                            </Box>
                            <Box>

                                {err && <Messages ref={msgs} />}
                                <Typography sx={{ color: "#262624", fontWeight: '600' }}  >Please Select the Product Category</Typography>
                                <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                    placeholder="Select Model" className="w-full md:w-14rem mt:5rem" />
                                <Typography sx={{ color: "#262624", fontWeight: '600' }}  >Please Enter the Product Model</Typography>
                                <InputText required value={value} onChange={(e) => setValue(e.target.value)} />
                            </Box>
                        </Box>
                    </FormControl>





                </Box>
                <Box style={{ marginTop: "2%" }} >
                    <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2 p-5" >
                        <Typography sx={{ color: "#262624", fontStyle: "italic" }}>Please select the both date from this box</Typography>
                        <Box className="card flex d-flex justify-content"  >
                            <Calendar required placeholder='Enter the Estimated Date' value={date} onChange={(e) => setDate(e.value)} showButtonBar />

                        </Box>

                        <Typography sx={{ color: "#262624", fontStyle: "italic" }}>Instructions if any:</Typography>
                        <InputTextarea
                            autoResize
                            inputId="description"
                            name="description"
                            placeholder="Enter your Instructions"
                            rows={10}
                            cols={100}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('description') })}
                            value={formik.values.description}
                            onChange={(e) => {
                                formik.setFieldValue('description', e.target.value);
                            }}
                        />

                        <Button type="submit" variant="contained" sx={{ marginLeft: "0%", fontSize: "10px", marginTop: "1%", width: "10%" }}>
                            Submit
                        </Button>
                    </form>
                </Box>


            </Card>

        </div >
    )
}