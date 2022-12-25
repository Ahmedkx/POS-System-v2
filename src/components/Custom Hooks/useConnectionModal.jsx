import React, { useEffect, useState } from 'react'
import "../../styles/Modal.css"

export default function useConnectionModal() {
    const [show,setShow] = useState(false)

    function setConnectionModal(val){
        setShow(val)
    }

    const connectionModal = (show && 
    <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content" style={{textAlign: "center"}}>
            انقطع الاتصال
        </div>
    </div>
    )

    return [connectionModal,setConnectionModal]
}
