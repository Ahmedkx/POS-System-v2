import React, { useEffect, useState } from "react";
import "../styles/Products.css"
import {useNavigate} from 'react-router-dom';
import usePrintBarcode from "./Custom Hooks/usePrintBarcode";
import Modal from "./Modal";
import Button from '@mui/material/Button';

export default function Products({data,search,settings,isLogin}){
    const navigate = useNavigate();
    const [setPrintBarcode] = usePrintBarcode()
    const [products, setProducts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [item, setItem] = useState({})

    const buttonStyle = {
        marginBottom: 2,fontWeight: "800",fontSize: 32
    }
    
    useEffect(()=>{
        search = ""
        setProducts(data)
    },[data])
    
    useEffect(()=>{
        function handleSearch(search){
            let filteredProducts = data.filter(item=>item.name.includes(search) || item.company.includes(search) || item.size.includes(search))
            setProducts([...filteredProducts])
        }
        handleSearch(search)
    },[search])
    
    let loading = false;
    if(products == false) {loading = true}
    
    function handleClick(id){
        setItem(products.filter(e=>e.id == id)[0])
        setShowModal(true)
    }

    return(
        <>
            <Modal 
            showModal={showModal} 
            setShowModal={setShowModal}
            title={item.name}
            >
                {item.autobarcode ? 
                <Button variant="outlined" sx={buttonStyle} fullWidth onClick={()=>setPrintBarcode(item.barcode,item.name)}>طباعة الباركود</Button> 
                : <Button color="error" sx={buttonStyle} fullWidth>الباركود مطبوع على العبوة</Button>}
                {isLogin && <Button variant="outlined" sx={buttonStyle} fullWidth color="primary" onClick={()=>navigate("./productbuyhistory" , { state: {itemId:item.id} })}>سجل الأسعار</Button>}
                {isLogin && <Button variant="outlined" sx={buttonStyle} fullWidth color="primary" onClick={()=>navigate("./productedit" , { state: {itemId:item.id} })}>تعديل البيانات</Button>}
            </Modal>
            <div className="products">

                <div className="background"></div>
                <div className="header">
                    <div className="name">الاسم</div>
                    <div className="price-2">الشركة</div>
                    <div className="price-2">العبوة</div>
                    {isLogin && <div className="price-2">السعر</div>}
                    <div className="price-1">سعر الجمهور</div>
                    {isLogin && <div className="price-1">سعر الطبيب</div>}
                    {isLogin && <div className="price-1">سعر المزرعة</div>}
                    {isLogin && <div className="price-2">الكمية</div>}
                </div>

            {!loading ? products.map((d)=>(
                <div key={d.id} className="item" onClick={() => handleClick(d.id)}>
                    <div>{d.name}</div>
                    <div>{d.company}</div>
                    <div>{d.size}</div>
                    {isLogin && <div>{d.price}</div>}
                    <div>{Math.ceil((d.price + d.price * (settings[2].price1/100))/5)*5}</div>
                    {isLogin && <div>{Math.ceil((d.price + d.price * (settings[2].price2/100))/5)*5}</div>}
                    {isLogin && <div>{Math.ceil((d.price + d.price * (settings[2].price3/100))/5)*5}</div>}
                    {isLogin && <div>{d.quantity}</div>}
                </div>)): <div className="spinner"></div>}
            </div>
        </>
    )
}