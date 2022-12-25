import React, { useState } from 'react'
import "../styles/ProductEdit.css";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteData, updateData } from '../Firebase-config';
import usePrintBarcode from "./Custom Hooks/usePrintBarcode";

export default function ProductEdit({data}) {
    const location = useLocation();
    const navigate = useNavigate();
    const [setPrintBarcode] = usePrintBarcode()

    const [item,setItem] = useState(data.filter(e=>e.id == location.state.itemId)[0])

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setItem(item => {
            return {
                ...item,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        let itemObj = {
            name:item.name,
            autobarcode:item.autobarcode,
            barcode:item.barcode,
            price:+item.price,
            quantity:+item.quantity
        };
        updateData("Products",item.id,itemObj)
        navigate("/products")
    }

    function handleDelete(){
        deleteData("Products",item.id)
        navigate("/products")
    }

    return (
        <div>
            <form className='product-edit' onSubmit={handleSubmit}>
                {item.autobarcode ? <button type='button' onClick={()=>setPrintBarcode(item.barcode,item.name)}>طباعة الباركود</button> : <span style={{textAlign: "center"}}>الباركود مطبوع على العبوة</span>}
                <label htmlFor="">الاسم</label>
                <input type="text" value={item.name} name="name" onChange={handleChange}/>
                <label htmlFor="">السعر</label>
                <input type="number" name="price" id="" value={item.price} onChange={handleChange}/>
                <label htmlFor="">الكمية</label>
                <input type="number" name="quantity" id="" value={item.quantity} onChange={handleChange}/>
                <label htmlFor="">باركود</label>
                <input type="number" name="barcode" id="" value={item.barcode} onChange={handleChange}/>
                <div className='barcode'>
                    <input type="checkbox" name="autobarcode" id='barcode' checked={item.autobarcode} onChange={handleChange}/>
                    <label htmlFor="barcode">باركود تلقائى</label>
                </div>
                <button>تعديل</button>
            </form>
                <button onClick={handleDelete}>حذف المنتج</button>
        </div>
    )
}
