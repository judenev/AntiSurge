
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
import React, { useRef } from "react";
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import empUrl from "../../../Utils/empUrl";
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography } from "@mui/material";
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import BaseURL from '../../../Utils/baseUrl';
import { selectEmpAuth } from '../../../redux/features/employeeAuthSlice';
import { selectUserAuth } from '../../../redux/features/userAuthSlice';

export default function UserchecksMinor() {
    let userId
    let userName
    const toast = useRef(null);
    const userAuthdata = useSelector(selectUserAuth)
    console.log("userdata", userAuthdata.token.data);
    userId = userAuthdata.token.token._id
    userName = userAuthdata.token.data.firstName
    const [date, setDate] = React.useState(null);
    const [reason, setReason] = React.useState('');
    let todel = []
    const [selectedCity, setSelectedCity] = React.useState(null);
    const [services, setServices] = React.useState([])
    const cities = [
        { name: 'Motor', code: 'MT' },
        { name: 'Fan', code: 'FN' },
        { name: 'Mixi', code: 'MIXI' },
        { name: 'Table Fan', code: 'TFN' },

    ]
    React.useEffect(() => {
        axios.get(`${BaseURL}/minorserviceslist`).then((resp) => {
            console.log(resp.data);
            setServices(resp.data.minorservices)


        })


    }, [])
    const deleteservice = (id, checked) => {
        if (!checked) {
            let index = todel.indexOf(id)
            todel.splice(index)
        } else {
            todel.push(id)

        }


        console.log("pushed value", todel);
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
                    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                    day = ("0" + date.getDate()).slice(-2);
                return [date.getFullYear(), mnth, day].join("/");
            }



            console.log();
            let estiMatedDate = convert(date)

            console.log("estimated date", estiMatedDate);




            const show = () => {
                toast.current.show({ severity: 'success', summary: "Ticket Generated" });
            }

            console.log("leave reason", reason.description);
            console.log("model", selectedCity);
            let JobReg = {
                Estimate: estiMatedDate,


                Instruction: reason.description,
                userId,
                userName,
                Approved: false
            }
            console.log("Service Registered", JobReg);
            // axios.post(`${empUrl}/employleave`, leave)



            data && show();
            formik.resetForm();

        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };


    return (
        <div className="card">

            <Card title="Minor Checklist" className="card flex">
                <Box>
                    <FormControl component="fieldset">
                        <Box sx={{ width: '1000px',display:'flex',justifyContent:'space-between' }}>
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
                                                        deleteservice(e.target.value, e.target.checked)
                                                    }}
                                                />
                                            </Tooltip>


                                        )

                                    })}

                                </FormGroup>
                            </Box>
                            <Box>

                                <Typography sx={{ color: "#262624", fontWeight: '600' }} color={'#262624'} >Please Select the Product Model</Typography>
                                <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                    placeholder="Select Model" className="w-full md:w-14rem mt:5rem" />
                            </Box>
                        </Box>
                    </FormControl>





                </Box>
                <Box>
                    <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2 p-5" >
                        <Typography sx={{ color: "#262624", fontStyle: "italic" }}>Please select the both date from this box</Typography>
                        <div className="card flex justify-content-center">
                            <Calendar required placeholder='Enter the Estimated Date' value={date} onChange={(e) => setDate(e.value)} showButtonBar />
                        </div>
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
                        <Button type="submit" variant="contained" sx={{ marginLeft: "19%", fontSize: "10px", marginTop: "1%" }}>
                            submit
                        </Button>
                    </form>
                </Box>


            </Card>

        </div >
    )
}