import React from 'react'
import {useNavigate} from 'react-router-dom';
import useGetDataLimit from './Custom Hooks/useGetDataLimit';

export default function BuyInvoices() {
    const navigate = useNavigate();

    const [data,loading] = useGetDataLimit("BuyInvoices","invoiceData.date",10);

    function handleClick(invoice){
        navigate("./buyinvoicesview", { state: {invoice:invoice} });
    }

    return (
            <div className="products">
                <div className="background"></div>
                <div className="header">
                    <div>الموزع</div>
                    <div>التاريخ</div>
                    <div>اجمالى الفاتورة</div>
                </div>
                {!loading ? data.map((d)=>(
                    <div key={d.id} className="item" onClick={()=>handleClick(d)}>
                        <div>{d.invoiceData.distributorName}</div>
                        <div>{d.invoiceData.date}</div>
                        <div>{d.invoiceData.totalPrice} جنيه</div>
                    </div>)): <div className="spinner"></div>}
            </div>
    )
}