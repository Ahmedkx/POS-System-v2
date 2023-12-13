import React, { useState } from "react";
import "../styles/Nav.css"
import { useLocation } from 'react-router-dom'
import useAddModal from "./Custom Hooks/useAddModal";
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';

export default function Nav(props){
    const navigate = useNavigate();
    const [addModal,setAddModal] = useAddModal()
    const location = useLocation().pathname;

    const [show,setShow] = useState(false)
    const [loginData, setLoginData] = React.useState({username:"admin",password:"admin"})

    function handleChange(e){
        setLoginData(prev=>({...prev, [e.target.name]: (e.target.value)}))
    }
    function handleSubmit(e){
        e.preventDefault()
        if(loginData.username == "admin" && loginData.password == "admin"){
            props.handleLogin(true)
            setShow(false)
        }
    }
    return(
        <>
            {addModal}
            {(show && 
            <div className="modal">
                <div className="overlay" onClick={()=>setShow(false)}></div>
                <div className="modal-content">
                    <div className="header">
                        <div className="close-btn" onClick={()=>setShow(false)}></div>
                        <div className="title">تسجيل الدخول</div>
                    </div>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <input type="text" name="username" className="input" placeholder="اسم المستخدم" autoComplete="off" value={loginData.username} onChange={(e)=>handleChange(e)} required/>
                        <input type="password" name="password" className="input" placeholder="كلمة المرور" autoComplete="off" value={loginData.password} onChange={(e)=>handleChange(e)} required/>
                        <button className="btn">تسجيل الدخول</button>
                    </form>
                </div>
            </div>
        )}
            <nav>
                {location === "/products" ? 
                !props.isLogin ? <div></div> : <div className="btn add-btn" onClick={()=>setAddModal(props.settings)}>
                    <div className="add-btn-img"></div>
                    <span>اضافة منتج</span>
                </div> :
                location === "/buyinvoices" ? 
                props.isLogin && <div className="btn add-btn" onClick={()=>navigate("/addbuyinvoice")}>
                    <div className="add-btn-img"></div>
                    <span>اضافة فاتورة شركة</span>
                </div>:
                // location === "/sellinvoices" ? 
                // <div className="btn add-btn" onClick={()=>navigate("/addsellinvoice")}>
                //     <div className="add-btn-img"></div>
                //     <span>اضافة فاتورة بيع</span>
                // </div>:
                <div></div>}

                {location === "/products" && <TextField id="outlined-basic" label="البحث" variant="outlined" size="small" onChange={(e)=>props.handleSearch(e.target.value)} autoComplete="off" />}

                {!props.isLogin ? <div className="btn login-btns" onClick={()=>setShow(true)}>
                    <div className="login-btn-img"></div>
                    {/* <span>تسجيل الدخول</span> */}
                </div> :
                <div className="btn login-btns" onClick={()=>{props.handleLogin(false);navigate("/")}}>
                    <div className="logout-btn-img"></div>
                    <span>تسجيل الخروج</span>
                </div>}
            </nav>
        </>
    )
}
