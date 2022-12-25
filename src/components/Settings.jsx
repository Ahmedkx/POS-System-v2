import React, { useEffect } from "react";
import "../styles/Settings.css"
import { updateData } from "../Firebase-config";
import useAddSettingsModal from "./Custom Hooks/useAddSettingsModal";

export default function Settings({data,settings}){
    const [addSettings, setAddSettings] = useAddSettingsModal();
    const [pricesPercentages, setPricesPercentages] = React.useState({price1:0,price2:0,price3:0})
    const [companyNames, setCompanyNames] = React.useState([])
    const [distributorsNames, setDistributorsNames] = React.useState([])
    const [productSizes, setProductSizes] = React.useState([])

    useEffect(()=>{
        if(settings != false){
            const pricesPercentagesArray = settings.filter((e)=>e.id=="pricesPercentages")[0]

            setPricesPercentages({price1:pricesPercentagesArray.price1,price2:pricesPercentagesArray.price2,price3:pricesPercentagesArray.price3})
            setCompanyNames(settings.filter((e)=>e.id=="companyNames")[0].data)
            setDistributorsNames(settings.filter((e)=>e.id=="distributorsNames")[0].data)
            setProductSizes(settings.filter((e)=>e.id=="productSizes")[0].data)
        }
    },[settings])
    
    
    function handleChange(e){
        setPricesPercentages(prev=>({...prev, [e.target.name]: +(e.target.value)}))
    }

    function handleDelete(name,id){
        let newArray;
        name == "companyNames" ? newArray = companyNames.filter((e)=>e.id != id) :
        name == "distributorsNames" ? newArray = distributorsNames.filter((e)=>e.id != id) :
        name == "productSizes" ? newArray = productSizes.filter((e)=>e.id != id) : console.log("failed")
        updateData("Settings",name,{data:newArray})
    }
    
    function onSubmit(e){
        e.preventDefault()
        updateData("Settings","pricesPercentages",pricesPercentages)
    }
    
    let loading = false;
    if(data == false) {loading = true}

    return(
        <>
            {addSettings}
            {(!loading ? <div className="settings">

                    <form onSubmit={onSubmit}>
                        <div className="section1">
                            <h1>الأسعار</h1>
                            <div>
                                <div className="price">
                                    <span>سعر الجمهور</span>
                                        <input type="number" name="price1" value={pricesPercentages.price1} onChange={handleChange}/>
                                </div>
                                <div className="price">
                                    <span>سعر الطبيب</span>
                                    <input type="number" name="price2" value={pricesPercentages.price2} onChange={handleChange}/>
                                </div>
                                <div className="price">
                                    <span>سعر المزرعة</span>
                                    <input type="number" name="price3" value={pricesPercentages.price3} onChange={handleChange}/>
                                </div>
                            </div>
                        <button>حفظ</button>
                        </div>

                        <div className="section2">
                            <h1>أسماء الموزعين</h1>
                        </div>
                        <div>
                            {distributorsNames.map((e)=><div className="container">
                                <div key={e.id}>{e.name}</div>
                                <div className="delete" onClick={()=>handleDelete("distributorsNames",e.id)}></div>
                            </div>)}

                            <button onClick={()=>setAddSettings("اضافة موزع جديد","اضافة","distributorsNames",distributorsNames)}>اضافة موزع</button>
                        </div>

                        <div className="section3">
                            <h1>أسماء الشركات</h1>
                        </div>
                        <div>
                            {companyNames.map((e)=><div className="container">
                                <div key={e.id}>{e.name}</div>
                                <span className="delete" onClick={()=>handleDelete("companyNames",e.id)}></span>
                            </div>)}
                            
                            <button onClick={()=>setAddSettings("اضافة شركة جديد","اضافة","companyNames",companyNames)}>اضافة شركة</button>
                        </div>

                        <div className="section4">
                            <h1>حجم العبوة</h1>
                        </div>
                        <div>
                            {productSizes.map((e)=><div className="container">
                                <div key={e.id}>{e.name}</div>
                                <span className="delete" onClick={()=>handleDelete("productSizes",e.id)}></span>
                            </div>)}
                            <button onClick={()=>setAddSettings("اضافة حجم جديد","اضافة","productSizes",productSizes)}>اضافة حجم جديد</button>
                        </div>
                        
                    </form>
            </div> : <div className="spinner"></div>)}
        </>
    )
}