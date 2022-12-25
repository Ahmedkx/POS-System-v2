import { Button } from '@mui/material';
import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { createProduct,updateData } from "../Firebase-config"
import usePrintBarcode from './Custom Hooks/usePrintBarcode';

export default function AddBuyInvoice2({settings}) {
        const [setPrintBarcode] = usePrintBarcode();
        const location = useLocation();
        const navigate = useNavigate();

        const [items,setItems] = React.useState(location.state.items)
        const [invoiceData,setInvoiceData] = React.useState(location.state.invoiceData)
        
        function handleChange(event,index){
            let newItem = items.filter((e)=>e.id == index)[0]
            newItem = {...newItem,price: +event.target.value}
            const newArray = items;
            const indexOfItem = items.findIndex(e => e.id == index)
            newArray[indexOfItem] = newItem
            setItems([...newArray])
        }

        function saveInvoice(e){
            e.preventDefault();
            let newObject = {items:items , invoiceData:invoiceData}
            createProduct("BuyInvoices",newObject)
            items.map((e)=>{
                updateData("Products",e.productId,{price: e.price})
                updateData("Products",e.productId,{quantity: e.oldQuantity + e.quantity})
            })
            navigate("/buyinvoices")
        }

    return (
        <form onSubmit={(e)=>saveInvoice(e)}>
            <div className="buy-invoice">
                <div>تحديد اسعار البيع</div>
                <div className="header">
                </div>
                <div className="item-header">
                    <div className="cell">الاسم</div>
                    <div className="cell">السعر القديم</div>
                    <div className="cell">السعر الجديد</div>
                    <div className="cell">سعر البيع</div>
                    <div className="cell">سعر الجمهور</div>
                    <div className="cell">طباعة الباركود</div>
                </div>
                {items.map((e)=>
                <div key={e.id} className="item">
                    <div className="cell">{e.name} {e.size}</div>
                    <div className="cell">{e.oldPrice}</div>
                    <div className="cell">{e.buyPrice}</div>
                    {/* <input className="cell" type="number" placeholder="ادخل السعر ..." min="1" value={e.price} onChange={(event)=>handleChange(event,e.id)} required/> */}
                    <input className="cell" type="number" placeholder="ادخل السعر ..." min={e.buyPrice} onChange={(event)=>handleChange(event,e.id)} required/>
                    <div className="cell">{Math.ceil((e.price + e.price * (settings[2].price1/100))/5)*5}</div>
                    {e.autobarcode ? <div className="cell image printbarcode" onClick={()=>setPrintBarcode(e.barcode,e.name)}></div> : <div className="cell">-</div>}
                </div>)}
                {/* <button className="btn" type="submit">حفظ الفاتورة</button> */}
                <Button variant='outlined' sx={{fontSize: 27,margin: "20px 0"}} type="submit">حفظ الفاتورة</Button>
            </div>
        </form>
        )
}
