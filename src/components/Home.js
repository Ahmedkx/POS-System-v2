import React,{useRef,useEffect} from "react";
import "../styles/Home.css";
import BarcodeReader from 'react-barcode-reader'
import {useNavigate} from 'react-router-dom';

export default function Home(){
    const navigate = useNavigate();

    return(
        <div className="home">
            <BarcodeReader onScan={(barcode)=>navigate("/addsellinvoice", { state: {barcode:barcode} })}/>
            <p>اقرأ الباركود لانشاء فاتورة بيع جديدة</p>
        </div>
    )
}