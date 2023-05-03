import React from 'react'
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
function Estamount({product, setProduct}) {
    console.log("peoduct",product, setProduct, setProduct({...product, price:27}))
    return (
        <div className="col-8">

            <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">


                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        {product.title}
                        <div className="flex-auto">
                            <label htmlFor="integeronly" className="font-bold block mb-2">Integer Only</label>
                            <InputNumber inputId="integeronly" value={product.price} onValueChange={(e) => {
                                console.log('value changed')
                                
                                setProduct({...product, price:e.target.value})}} />
                        </div>
               


                    </div>

                    <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>

        </div>
    );

}

export default Estamount