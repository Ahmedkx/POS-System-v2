import React from 'react'
import { useLocation } from "react-router-dom";

export default function BuyInvoicesView() {
    const location = useLocation();
    
    const invoice = location.state.invoice;

    return (
        <div className="buy-invoice">
            <div>فاتورة شركة</div>
                <div className="header">
                <div>التاريخ : {invoice.invoiceData.date}</div>
                <span>الموزع : {invoice.invoiceData.distributorName}</span>
                </div>
            <div className="item-header">
                <div className="cell">الاسم</div>
                <div className="cell">الكمية</div>
                <div className="cell">السعر</div>
                <div className="cell">الاجمالى</div>
            </div>
            
            {invoice.items.map (item=>
            <div key={item.id} className="item">
                <span type="text" className="cell" >{item.name}</span>
                <span type="text" className="cell" >{item.quantity}</span>
                <span type="text" className="cell" >{item.buyPrice}</span>
                <div className="cell">{item.total}</div>
            </div>)}

            <div className="item">
                <div className="cell">اجمالى الفاتورة</div>
                <div className="cel">{invoice.invoiceData.totalPrice}</div>
            </div>
        </div>
        
    )
}