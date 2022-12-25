import React from 'react'
import { updateData } from '../../Firebase-config'

export default function useChangeLowStock() {
    const [show,setShow] = React.useState(false)
    const [modal,setModal] = React.useState({})
    const [modalData, setModalData] = React.useState(0)

    function setChangeLowStock(title,button,documentName){
        setShow(true)
        setModal({title:title,button:button,documentName:documentName})
    }

    function handleChange(e){
        setModalData(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        updateData("Products",modal.documentName,{lowstock: modalData})
        setShow(false)
    }

    const changeLowStock = (show && 
        <div className="modal">
            <div className="overlay" onClick={()=>setShow(false)}></div>
            <div className="modal-content">
                <div className="header">
                    <div className="close-btn" onClick={()=>setShow(false)}></div>
                    <div className="title">{modal.title}</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="number" className="input" placeholder="النواقص" onChange={handleChange} min={0} autoComplete="off" required/>
                    <button type="submit" className="btn">{modal.button}</button>
                </form>
            </div>
        </div>
        )

    return ([changeLowStock,setChangeLowStock])
}
