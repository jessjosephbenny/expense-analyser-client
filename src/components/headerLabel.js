import React from 'react';

export default function HeaderLabel(props) {
    return(
        <div className={"d-flex "+props.className}>
            <div style={{width:4}} className="bg-primary"/>
            <h2 className="ml-2">{props.text}</h2>
        </div>
    )
}