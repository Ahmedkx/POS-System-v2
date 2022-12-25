import React from 'react'
import { updateData } from '../../Firebase-config'
import { v4 as uuidv4 } from 'uuid';

export default function useAddSettingsModal() {
    const [show,setShow] = React.useState(false)
    const [modal,setModal] = React.useState({})
    const [modalData, setModalData] = React.useState({id:0,name:""})

    function setAddSettings(title,button,documentName,distributorsNamesArray){
        setShow(true)
        setModal({title:title,button:button,documentName:documentName,distributorsNamesArray:distributorsNamesArray})
    }

    function handleChange(e){
        setModalData(prev=>({...prev, [e.target.name]: (e.target.value)}))
    }
    
    function handleSubmit(e){
        e.preventDefault()
        let newArray = modal.distributorsNamesArray
        newArray.push({id:uuidv4(),name:modalData.name})
        updateData("Settings",modal.documentName,{data: newArray})
        setShow(false)
    }

    const addSettings = (show && 
        <div className="modal">
            <div className="overlay" onClick={()=>setShow(false)}></div>
            <div className="modal-content">
                <div className="header">
                    <div className="close-btn" onClick={()=>setShow(false)}></div>
                    <div className="title">{modal.title}</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="input" name="name" placeholder="الاسم" onChange={handleChange} autoComplete="off" required/>
                    <button type="submit" className="btn">{modal.button}</button>
                </form>
            </div>
        </div>
        )

    return ([addSettings,setAddSettings])
}
