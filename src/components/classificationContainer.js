import React from 'react'
import HeaderLabel from './headerLabel'
import MagicTable from './magicTable'
import { connect } from 'react-redux'
import ExpensePie from './expensePie';
import ClassificationDetails from './classificationDetails';
import { Button } from '@blueprintjs/core';
import { SearchInput } from 'evergreen-ui';
import MagicList from './magicList';

const ClassificationContext = React.createContext('all');
class ClassificationContainer extends React.Component {
    state = {
        detailScreen: false,
        selectedClassification: 'all',
        searchkey:''
    }
    onPieClick = (e, data) => {
        this.setState({
            detailScreen: true,
            selectedClassification: data.label
        })
        console.log(data)
    }
    filterTable = (e) => {
        this.setState({
            searchkey:e.target.value
        })
    }
    render() {
        const { selectedClassification,searchkey } = this.state;
        const { transactionData,classification } = this.props;
        let tableData = selectedClassification==='all'?transactionData:classification[selectedClassification]['transactions'];
        console.log('searchkey',searchkey)
        tableData = searchkey===''?tableData:tableData.filter(value=>value['narration'].includes(searchkey));
        const columns = [
            {
                id: 'tDate',
                label: 'Date'
            },
            {
                id: 'narration',
                label: 'Narration'
            },
            {
                id: 'withdrawalAmount',
                label: 'Withdrawal Amount'
            },
            {
                id: 'depositAmount',
                label: 'Deposit Amount'
            },
            {
                id: 'ClosingBalance',
                label: 'Closing  Balance'
            }
        ]
        return (
            <ClassificationContext.Provider value={selectedClassification}>
                    <div className="col-md-6" >
                        <div className="d-flex flex-column h-100">
                            <div className="d-flex">
                            {selectedClassification!=='all'?<Button className="mr-2" icon="arrow-left" text="back" onClick={()=>this.setState({selectedClassification:'all'})} />:null}
                            <HeaderLabel text={selectedClassification==='all'?'All Transactions':selectedClassification}/>
                            </div>
                            {selectedClassification==='all'?<ExpensePie onClick={this.onPieClick} />:
                            <ClassificationDetails Classification={selectedClassification}/>}
                        </div>
                    </div>
                    <div className="col-md-6 h-100">
                            <div className="d-flex">
                            <SearchInput placeholder="Filter Transactions..." onChange={this.filterTable.bind(this)}/>
                            </div>
                            <MagicList data={new Array(...tableData.reverse())}/>
                            {/* <MagicTable className="mt-2" columns={columns} data={tableData} pagination={true} rowRenderProps={(row) => { return ({ intent: row['withdrawalAmount'] > 0 ? 'danger' : 'success' }) }} /> */}
                    </div>   
            </ClassificationContext.Provider>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        transactionData: state.expenseState.transactionData,
        classification: state.expenseState.classification
    }
}
export default connect(mapStateToProps, null)(ClassificationContainer);