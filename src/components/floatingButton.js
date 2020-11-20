import React, { useState } from 'react'
import { IconButton } from 'evergreen-ui'

export default function FloatingButton({children}){
    const [popup,setPopup] = useState(false);
    return(
        <div className="btn-float-button-container" onMouseLeave={()=>setPopup(false)}>
        <div className="btn-float-button-container" style={{visibility:popup?'visible':'hidden'}}>
            {children}
        </div>
        <IconButton iconSize={32} appearance="primary" intent="danger" icon="add" className="btn-float" onClick={()=>setPopup(!popup)}/>
        </div>
    )
}   