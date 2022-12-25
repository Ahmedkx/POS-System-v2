import React , {useEffect, useState} from 'react'
import BarcodeReader from 'react-barcode-reader'
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { createProduct, updateData } from '../Firebase-config';


export default function AddSellInvoices({data,settings}) {
    const location = useLocation();
    const navigate = useNavigate();

    let date = new Date(new Date().toLocaleDateString()).toLocaleDateString('en-CA')
    let time = new Date().toLocaleTimeString()
    
    // const [items, setItems] = useState([{id:uuidv4(),productId:"", name:"",price:0,quantity:"",productQuantity:0,barcode:0,total:0}])
    const [items, setItems] = useState([])
    const [invoiceData, setinvoiceData] = useState({totalPrice:0,date:date,time:time})
    const [loading ,setLoading] = useState(false)
    // const selectOptions = data.map((e)=>({value:e.id, label:`${e.name} - ${e.size} - ${e.company}`}))

    useEffect(()=>{
        addNewBarcode(location.state.barcode)
    },[])

    useEffect(()=>{
        setinvoiceData((prev)=>({...prev,totalPrice:items.reduce((a,b)=>{return a + b.total},0)}))
    },[items])
    

    // function handleChange(event, index){
    //     let selectedProduct = data.filter((e)=>e.id == event.value)[0]
    //     const newItem = {
    //         id:index,
    //         productId:event.value,
    //         name:selectedProduct.name,
    //         barcode:selectedProduct.barcode,
    //         price:selectedProduct.price,
    //         quantity:1,
    //         productQuantity:selectedProduct.quantity,
    //         total:selectedProduct.price
    //     }
    //     const newArray = items;
    //     const indexOfItem = items.findIndex(e => e.id == index)
    //     newArray[indexOfItem] = newItem
    //     setItems([...newArray])
    // }

    // function handleChangeInput(event,index){
    //     event.preventDefault();
    //     const newItem = items.filter((e)=>e.id == index)[0]
    //     newItem.quantity = +event.target.value
    //     newItem.total = newItem.price * newItem.quantity
    //     const newArray = items;
    //     const indexOfItem = items.findIndex(e => e.id == index)
    //     newArray[indexOfItem] = newItem
    //     setItems([...newArray])
    // }

    function addNew(){
        setItems(prev=>[...prev,{id:uuidv4(),productId:"",name:"",company:"",size:"",price:0,quantity:0,productQuantity:0,barcode:0,total:0}])
    }

    function addNewBarcode(barcode){
        if(items.filter((e)=>e.barcode == barcode).length != 0){
            const selectedProduct = items.filter((e)=>e.barcode == barcode)[0]
            const newItem = {...selectedProduct,quantity: selectedProduct.quantity + 1,total:(selectedProduct.quantity+1)*selectedProduct.price}
            const index = items.findIndex(e => e.barcode == selectedProduct.barcode)
            const newArray = items;
            newArray[index] = newItem;
            setItems([...newArray])
        }else{
            const selectedProduct = data.filter((e)=>e.barcode == barcode)[0]
            if(selectedProduct != undefined){
                const newItem = {
                    id:uuidv4(),
                    productId:selectedProduct.id,
                    name:selectedProduct.name,
                    size:selectedProduct.size,
                    company:selectedProduct.company,
                    barcode:selectedProduct.barcode,
                    price:Math.ceil((selectedProduct.price + selectedProduct.price * (settings[2].price1/100))/5)*5,
                    quantity:1,
                    productQuantity:selectedProduct.quantity,
                    total:Math.ceil((selectedProduct.price + selectedProduct.price * (settings[2].price1/100))/5)*5
                }
                setItems(prev=>[...prev,newItem])
            }
        }
    }
    function handleDelete(index){
        const newArray = items.filter((e)=> e.id != index)
        setItems([...newArray])
    }

    function saveInvoice(e){
        e.preventDefault();
        if(items.length != 0){
            setLoading(true)
            items.map(e=>{
                updateData("Products",e.productId,{quantity: e.productQuantity - e.quantity > -1 ? e.productQuantity - e.quantity : 0})
            })
            let newObject = {items:items , invoiceData:invoiceData}
            createProduct("SellInvoices",newObject)
            setTimeout(()=>{
                navigate("/")
            },1000)
        }
    }

    return (
        <form onSubmit={(e)=>saveInvoice(e)}>
            <BarcodeReader onScan={(barcode)=>addNewBarcode(barcode)}/>
            <div className="buy-invoice">
                <div>فاتورة بيع</div>
                <div className="header">
                <div>التاريخ : {invoiceData.date}</div>
                <div>{invoiceData.time}</div>
                </div>
                <div className="item-header">
                    <div className="cell">الاسم</div>
                    <div className="cell">السعر</div>
                    <div className="cell">الكمية</div>
                    <div className="cell">الاجمالى</div>
                    <div className="cell">حذف</div>
                </div>
                {items.map((e)=>
                <div key={e.id} className="item">
                    <div className="cell">{e.name} {e.size} {e.company}</div>
                    <div className="cell">{e.price}</div>
                    {/* <input type="number" className="cell arrow" placeholder="ادخل الكمية ..." min="1" max="100" disabled={e.name ? false : true} value={e.quantity} onChange={(event)=>handleChangeInput(event,e.id,"quantity")} required/> */}
                    <div className="cell">{e.quantity}</div>
                    <div className="cell">{e.total}</div>
                    <div className="cell image delete" onClick={()=>handleDelete(e.id)}></div>
                </div>)}
                <div className="item">
                    <div className="cell">اجمالى الفاتورة</div>
                    <div className="cel">{invoiceData.totalPrice}</div>
                </div>
                {/* <button className="btn" type="button" onClick={()=>addNew()}>اضافة عنصر جديد</button> */}
                {/* <br /> */}
                {loading ? <div className="spinner-invoice"></div> : <button className="btn" type="submit">حفظ الفاتورة</button>}
            </div>
        </form>
    )
}