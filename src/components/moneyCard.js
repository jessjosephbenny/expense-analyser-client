import React from 'react';
import { Card } from '@blueprintjs/core';
export default function MoneyCard(props){
    const{header,value} = props;
    return(
        <Card className="text-center" interactive={true} elevation={1}>
        <h5 className="h1">{header}</h5>
        <h5 className="display-4">₹{value}</h5>
        </Card>
    )
}