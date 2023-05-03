import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { InputNumber } from 'primereact/inputnumber';
import 'primeflex/primeflex.css';
import axios from 'axios';
import BaseURL from '../../../Utils/baseUrl';




export default function Estimation(props) {
    console.log("props value",props);
    const [products, setProducts] = useState([]);
    const [sum1, setSum1] = useState(0);
    useEffect(() => {
        axios.get(`${BaseURL}/normalserviceslist`).then((resp) => {
           // const [products, setProducts] = useState([]);

   let v =props.jobstatus
   let h =[]
  for(const [key,value]of Object.entries(v)){
     h.push({[key]:value})
     }
    console.log("hooi hooi",h);
    console.log("ss",resp.data);
    console.log("props",props);

        setProducts(h)




        })

    }, []);




    const itemTemplate = (product, index) => {
        console.log(product, index)
        return (
            <div className="col-8">
                <form >
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">


                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            {product.title}
                            <div className="flex-auto">
                                <label htmlFor="integeronly" className="font-bold block mb-2">Integer Only</label>
                                <InputNumber inputId="integeronly" value={product.price} onChange={(e) => {
                                    console.log('value changed',product)
                                    let product2 = { ...product, price: e.value }
                                    console.log('got product', product2, 'with price', product2.price)
                                    if (product2) {
                                        console.log('a', products)
                                        let p2 = products
                                        for (let i = 0; i <= p2.length; i += 1)
                                            if (product && p2[i]) if (product._id == p2[i]._id) {
                                                p2[i] = product2
                                            }
                                        setProducts(p2)
                                        console.log("updated products ", p2, products)
                                    
                                        let s = products.reduce(function (accumulator, currentValue) {
                                            return accumulator + currentValue.price;
                                        },0)
                                          setSum1(s)
                                        console.log("sumsum", s);
                                        
                                    }
                                    
                                }} />
                            </div>
                            {/*  {products.map((item) => <div className="text-2xl font-bold text-900">{item.title}</div>)} */}

                        </div>

                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
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
            {console.log("sdeeee",products)}
            <p>total:{sum1}</p>

        </div>
    )
}