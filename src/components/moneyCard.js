import React from 'react';
import { Card } from '@blueprintjs/core';
export default function MoneyCard(props) {
    const { header, value } = props;
    return (
        <Card  interactive={true} elevation={1} className="w-100 bg-card">
            <div className="d-flex flex-column w-100 h-100">
                <div className="d-flex">
                    <h5 className="h4">{header}</h5>
                </div>
                <div className="d-flex mt-auto">
                    <h5 className="display-5">₹{value}</h5>
                </div>
            </div>
        </Card>
    )
}