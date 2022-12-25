import React ,{ useState } from "react";
import "../styles/Invoices.css"
import Select from "react-select";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { Button } from "@mui/material";


import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';



export default function Invoices({data,settings}){
    const navigate = useNavigate();
    let date = new Date(new Date().toLocaleDateString()).toLocaleDateString('en-CA')
    
    const [items, setItems] = useState([{id:uuidv4(),productId:"",name:"",barcode:"",price:"",buyPrice:"",oldPrice:"",oldQuantity:0,quantity:"",autobarcode:true,total:0}])
    const [invoiceData, setinvoiceData] = useState({totalPrice:0,date:date,distributorName:""})
    const [disabled, setDisabled] = useState(false)
    const selectOptions = data.map((e)=>({value:e.id, label:`${e.name} ${e.size} ${e.company}`}))
    let distributorOptions;

    if(settings != false){
        distributorOptions = settings.filter((e)=>e.id=="distributorsNames")[0].data.map((e)=>({value:e.name, label:e.name}))
    }

    useEffect(()=>{
        if(invoiceData.distributorName == "" || items.filter((e)=> e.name == "").length != 0 || items.length == 0){
            setDisabled(true);
        }else{
            setDisabled(false);
        }
    },[items,invoiceData])

    useEffect(()=>{
        setinvoiceData((prev)=>({...prev,totalPrice:items.reduce((a,b)=>{return a + b.total},0)}))
    },[items])

    function handleChange(event , index){
            let selectedProduct = data.filter((e)=>e.id == event.value)[0]
            const newItem = {
                id:index,
                productId:event.value,
                name:selectedProduct.name,
                barcode:selectedProduct.barcode,
                price:"",
                buyPrice:"",
                oldPrice:selectedProduct.price,
                oldQuantity:+selectedProduct.quantity,
                quantity:"",
                autobarcode:selectedProduct.autobarcode,
                total:0
            }
            const newArray = items;
            const indexOfItem = items.findIndex(e => e.id == index)
            newArray[indexOfItem] = newItem
            setItems([...newArray])
    }

    function handleChangeInput(event,index,inputName){
        const newItem = items.filter((e)=>e.id == index)[0]
        if(inputName == "quantity"){
            newItem.quantity = +event.target.value
        }else {
            newItem.buyPrice = +event.target.value
            // newItem.price = +event.target.value
        }
        newItem.total = newItem.buyPrice * newItem.quantity
        const newArray = items;
        const indexOfItem = items.findIndex(e => e.id == index)
        newArray[indexOfItem] = newItem
        setItems([...newArray])
    }

    function handleDelete(index){
        const newArray = items.filter((e)=> e.id != index)
        setItems([...newArray])
    }

    function addNew(){
        setItems(prev=>[...prev,{id:uuidv4(),productId:"",name:"",barcode:"",price:"",buyPrice:"",oldPrice:0,oldQuantity:0,quantity:"",autobarcode:true,total:0}])
    }

    function saveInvoice(e){
        e.preventDefault();
        navigate("/AddBuyInvoice2", { state: {items:items,invoiceData:invoiceData} });
    }

    let loading = false;
    if(data == false) {loading = true}
    return(
        <form onSubmit={(e)=>saveInvoice(e)}>
            {loading && <div className="spinner"></div>}
            {!loading && 
            <div className="buy-invoice">
                <div>فاتورة شركة</div>
                <div className="header">
                <div>التاريخ : {invoiceData.date}</div>
                <Select className="cell" options={distributorOptions} placeholder="الموزع :" onChange={(e)=>setinvoiceData((prev)=>({...prev,distributorName:e.value}))} required/>
                </div>
                <div className="item-header">
                    <div className="cell">الاسم</div>
                    <div className="cell">الكمية</div>
                    <div className="cell">السعر</div>
                    <div className="cell">الاجمالى</div>
                    <div className="cell">حذف</div>
                </div>
                {items.map((e)=>
                <div key={e.id} className="item">
                    <Select className="cell" options={selectOptions} onChange={(event)=>handleChange(event,e.id,"name")} required/>
                    <input type="number" className="cell arrow" placeholder="ادخل الكمية ..." min="1" disabled={e.name ? false : true} value={e.quantity}  onChange={(event)=>handleChangeInput(event,e.id,"quantity")} required/>
                    <input type="number" className="cell" placeholder="ادخل السعر ..." disabled={e.name ? false : true} value={e.buyPrice} onChange={(event)=>handleChangeInput(event,e.id,"buyPrice")} required/>
                    <div className="cell">{e.total}</div>
                    <div className="cell image delete" onClick={()=>handleDelete(e.id)}></div>
                </div>)}
                <div className="item">
                    <div className="cell">اجمالى الفاتورة</div>
                    <div className="cel">{invoiceData.totalPrice}</div>
                </div>
                <Button variant="outlined" sx={{fontSize: "27px",margin: "20px 0"}} onClick={()=>addNew()}>اضافة عنصر جديد</Button>
                <br />
                <Button variant="outlined" sx={{fontSize: "27px"}} type={"submit"} disabled={disabled}>التالى</Button>
            </div>
            }
        </form>
    )
}