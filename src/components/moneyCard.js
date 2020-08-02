import React from 'react';
import { Card } from '@blueprintjs/core';
import paycard from '../styles/images/pay-card.svg'
export default function MoneyCard(props) {
    const { header, value } = props;
    return (
        <Card className="bg-card" interactive={true} elevation={1} style={{ width: 400, height: 272 }}>
            <div className="d-flex flex-column h-100">
                <div className="d-flex justify-content-end mt-4">
                    <h5 className="display-5">₹{value}</h5>
                </div>
                <div className="d-flex mt-auto mt-2">
                    <h5 className="h2">{header}</h5>
                </div>
            </div>
        </Card>
    )
}