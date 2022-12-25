import React from 'react'

export default function Modal({showModal,setShowModal,title,children}) {
    return (showModal &&
        <div className="modal">
        <div className="overlay" onClick={()=>setShowModal(false)}></div>
        <div className="modal-content">
            <div className="header">
                <div className="close-btn" onClick={()=>setShowModal(false)}></div>
                <div className="title">{title}</div>
            </div>

            {children}

        </div>
    </div>
    )
}
