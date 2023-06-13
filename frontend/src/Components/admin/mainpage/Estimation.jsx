import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { InputNumber } from 'primereact/inputnumber';
import 'primeflex/primeflex.css';
import axios from 'axios';
import BaseURL from '../../../Utils/baseUrl';
import { Box } from '@mui/material';




export default function Estimation(props) {

   
    const [products, setProducts] = useState([]);
    const [sum1, setSum1] = useState(0);
    const [labour, setLabour] = useState(700)
    let tot
    useEffect(() => {
        axios.get(`${BaseURL}/normalserviceslist`).then((resp) => {





            setProducts(props.jobstatus)




        })

    }, []);

    const final = () => {
       
        const tot = (sum1 + labour)
        const o = {
            products,
            tot,
            userid: props.userId,
            status: "Not Approved",
            jobid: props._id
        }
        axios.post(`${BaseURL}/userestimation`, o)
        props.onAuth(false)
    }


    const itemTemplate = (product, index) => {
 
        return (
            <div className="col-8">
                <form  >
                    <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">


                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="flex-auto">

                                    <label htmlFor="integeronly" className="font-bold block mb-2">{product.title}</label>
                                    <InputNumber inputId="integeronly" value={product.price} onChange={(e) => {
                                
                                        let product2 = { ...product, price: e.value }
                                   

                                        if (product2) {
                                      
                                            let p2 = products
                                            for (let i = 0; i <= p2.length; i += 1)
                                                if (product && p2[i]) if (product.title === p2[i].title) {
                                                    console.log(product.title, p2[i].title)
                                                    p2[i] = product2
                                                }
                                        
                                            setProducts(p2)



                                            let s = products.reduce(function (accumulator, currentValue) {
                                                return accumulator + currentValue.price;
                                            }, 0)
                                            setSum1(s)


                                        }

                                    }} />
                                </div>


                            </div>

                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span className="text-2xl font-semibold">₹{product.price}</span>

                            </div>
                        </div>
                    </div>

                </form>
            </div>

        );
    };

    return (
        <div className="card">
            <DataView value={products} itemTemplate={itemTemplate} />
            {console.log("sdeeee", products)}
            <Box>
                <label>Enter the Labour Charge</label>:₹
                <InputNumber inputId="integeronly" onChange={
                    (e) => {

                        setLabour(e.value)

                    }} value={labour} style={{ paddingLeft: "10px", paddingTop: "5px" }} />
            </Box>

            <p>Total Amount:₹{sum1 + labour}</p>
            <Button onClick={
                final} >Generate</Button>
        </div>
    )
}
