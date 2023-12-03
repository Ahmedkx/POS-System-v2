import React, { useEffect, useState } from 'react'

export default function useLoginModal() {
    const [show,setShow] = useState(false)
    const [loginData, setLoginData] = React.useState({username:"",password:""})

    function setLoginModal(){
        setShow(true)
    }

    function handleChange(e){
        setLoginData(prev=>({...prev, [e.target.name]: (e.target.value)}))
    }
    function handleSubmit(e){
        e.preventDefault()
        if(loginData.username == "1" && loginData.password == "1"){
            sessionStorage.setItem("l",true)
            setShow(false)
        }
    }

        const loginModal = (show && 
            <div className="modal">
                <div className="overlay" onClick={()=>setShow(false)}></div>
                <div className="modal-content">
                    <div className="header">
                        <div className="close-btn" onClick={()=>setShow(false)}></div>
                        <div className="title">تسجيل الدخول</div>
                    </div>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <input type="text" name="username" className="input" placeholder="اسم المستخدم" autoComplete="off" onChange={(e)=>handleChange(e)} value="1" required />
                        <input type="password" name="password" className="input" placeholder="كلمة المرور" autoComplete="off" onChange={(e)=>handleChange(e)} value="123" required/>
                        <button className="btn">تسجيل الدخول</button>
                    </form>
                </div>
            </div>
        )


    return [loginModal, setLoginModal]
}
