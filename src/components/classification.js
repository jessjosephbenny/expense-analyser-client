import React from 'react'
import ExpensePie from './expensePie'
import ClassificationDetails from './classificationDetails'

class Classification extends React.Component{
    state = {
        detailScreen:false,
        selectedClassification:null
    }
    onPieClick = (e,data) => {
        this.setState({
            detailScreen:true,
            selectedClassification:data.label
        })
        console.log(data)
    }
    render(){
        const {detailScreen,selectedClassification} = this.state;
        if(!detailScreen)
        return(
            <ExpensePie onClick={this.onPieClick}/>
        )
        else
        return(
            <ClassificationDetails Classification={selectedClassification}/>
        )
    }
}
export default Classification;