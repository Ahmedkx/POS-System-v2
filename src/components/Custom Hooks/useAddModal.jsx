import React, { useEffect, useState } from 'react'
import { createProduct } from "../../Firebase-config"
import "../../styles/Modal.css"
import { v4 as uuidv4 } from 'uuid';

export default function useAddModal() {
    const [show,setShow] = useState(false)
    const [formData, setFormData] = useState({name:"",price:0,company:"",size:"",lowstock:0,quantity:0,autobarcode:true,barcode:0})
    const [settings, setSettings] = React.useState([])

    function getBarcode(){
        return uuidv4().replace(/[^0-9]/g,'').slice(0,8)
    }

    function setAddModal(settings){
        setShow(true)
        setSettings(settings)
    }

    useEffect(()=>{
        if(formData.autobarcode){
            setFormData(prev=>({...prev, barcode:getBarcode()}))
        }
    },[formData.name ,formData.autobarcode])
    

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        createProduct("Products",formData)
        setShow(false)
    }
    const addModal = (show && 
    <div className="modal">
        <div className="overlay" onClick={()=>setShow(false)}></div>
        <div className="modal-content">
            <div className="header">
                <div className="close-btn" onClick={()=>setShow(false)}></div>
                <div className="title">اضافة منتج جديد</div>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" className="input" name="name" placeholder="الاسم" onChange={handleChange} autoComplete="off" required/>
                <select className="input" name="company" onChange={handleChange} autoComplete="off" required>
                    <option value="">--- اسم الشركة ---</option>
                    {settings.filter((e)=>e.id=="companyNames")[0].data.map((e)=><option key={e.id}>{e.name}</option>)}
                </select>
                <select className="input" name="size" onChange={handleChange} required>
                    <option value="">--- العبوة ---</option>
                    {settings.filter((e)=>e.id=="productSizes")[0].data.map((e)=><option key={e.id}>{e.name}</option>)}
                </select>
                <input type="number" className="input" name="lowstock" placeholder="النواقص" onChange={handleChange} min={0} autoComplete="off" required/>

                <div className='barcode'>
                    <input type="checkbox" name="autobarcode" id='barcode' checked={formData.autobarcode} onChange={handleChange}/>
                    <label htmlFor="barcode">باركود تلقائى</label>
                </div>

                {formData.autobarcode == false && <input type="number" className="input" name="barcode" placeholder="الباركود" onChange={handleChange} min={0} autoComplete="off" required/>}
                <button type="submit" className="btn">حفظ</button>
            </form>
        </div>
    </div>
    )

    return [addModal,setAddModal]
}
