import React from 'react';
import { Card } from '@blueprintjs/core';
import paycard from '../styles/images/pay-card.svg'
export default function MoneyCard(props) {
    const { header, value } = props;
    return (
        <Card className="bg-card" interactive={true} elevation={1} style={{ width: 298, height: 196 }}>
            <div className="d-flex flex-column h-100">
                <div className="d-flex justify-content-end" style={{marginTop:'1.7rem'}}>
                    <h5 className="h2">{header}</h5>
                </div>
                <div className="d-flex mt-auto" style={{marginBottom:'-1.0rem'}}>
                    <h5 className="display-5">₹{value}</h5>
                </div>
            </div>
        </Card>
    )
}