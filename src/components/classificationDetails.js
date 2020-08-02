import React from 'react'
import ExpenseBar from './expenseBar';

class ClassificationDetails extends React.Component {
    render() {
        const  {Classification} = this.props;
        return (
            <>
            <ExpenseBar/>
            </>
        )
    }
}
export default ClassificationDetails;