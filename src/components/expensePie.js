import React from 'react';
import {ResponsivePie } from '@nivo/pie';
import { connect } from 'react-redux';
import D3Pie from './d3Pie';

const generateClassificationData = (classification) => {
    return (
        Object.keys(classification).map(key => (
            {
                "name": classification[key].name,
                "label": classification[key].name,
                "value": classification[key].totalExpense
            }
        )
        )
    )
}
class ExpensePie extends React.Component {
    render() {
        return (
            <D3Pie data = {this.props.classification} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        classification: generateClassificationData(state.expenseState.classification)
    }
}
export default connect(mapStateToProps, null)(ExpensePie);