import React from 'react'
import HeaderLabel from './headerLabel'

class ClassificationDetails extends React.Component{
    render(){
        return(
            <HeaderLabel text={this.props.Classification}></HeaderLabel>
        )
    }
}
export default ClassificationDetails;