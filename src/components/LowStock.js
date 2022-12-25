import React from "react";
// import "../styles/LowStock.css"
import "../styles/Products.css"
import useChangeLowStock from "./Custom Hooks/useChangeLowStock";

export default function LowStock({data,isLogin}){
    const [changeLowStock,setChangeLowStock] = useChangeLowStock();

    let lowstockData = data.filter((e)=>{
        return e.quantity <= e.lowstock ;
    })

    let loading = false;
    if(data == false) {loading = true}
    return(
        <>
            {changeLowStock}
            <div className="products">

                <div className="background"></div>
                <div className="header">
                    <div className="name">الاسم</div>
                    <div>الشركة</div>
                    <div>العبوة</div>
                    {/* <div>سعر الجمهور</div> */}
                    <div>الكمية</div>
                    <div>النواقص</div>
                </div>

                {!loading ? lowstockData.map((e)=>(
                    <div key={e.id} className="item" onClick={()=>isLogin && setChangeLowStock(`تعديل نواقص ${e.name}`,"تعديل",e.id)}>
                        <div>{e.name}</div>
                        <div>{e.company}</div>
                        <div>{e.size}</div>
                        {/* <div>{e.price}</div> */}
                        <div>{e.quantity}</div>
                        <div>{e.lowstock}</div>
                    </div>)): <div className="spinner"></div>}
            </div>
        </>
    )
}