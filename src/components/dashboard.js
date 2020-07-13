import React from 'react';
import MoneyCard from './moneyCard';
import { connect } from 'react-redux';
import ExpensePie from './expensePie';
import HeaderLabel from './headerLabel';
import MagicTable from './magicTable';
import { WATCH_GET_EXPENSE_DATA } from '../reduxflow/watcherActionTypes/expenseWatcherActionTypes';
import { Callout } from '@blueprintjs/core';
import Classification from './classification';

class Dashboard extends React.Component {
    componentDidMount(){
        this.props.getExpenseData();
    }
    render() {
        const{totalWithdrawal,totalDeposit,balance,average} = this.props.summary;
        const{transactionData} = this.props;
        const columns = [
            {
                id:'tDate',
                label:'Date'
            },
            {
                id:'narration',
                label:'Narration'
            },
            {
                id:'withdrawalAmount',
                label:'Withdrawal Amount'
            },
            {
                id:'depositAmount',
                label:'Deposit Amount'
            },
            {
                id:'ClosingBalance',
                label:'Closing  Balance'
            }
        ]
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-md-3">
                        <MoneyCard header="Total Spent" value={totalWithdrawal} />
                    </div>
                    <div className="col-md-3">
                        <MoneyCard header="Total Income" value={totalDeposit} />
                    </div>
                    <div className="col-md-3">
                        <MoneyCard header="Balance" value={balance} />
                    </div>
                    <div className="col-md-3">
                        <MoneyCard header="Avg Spent" value={average} />
                    </div>
                </div>
                <div className="row mt-3 h-100">
                    <div className="col-6" style={{height:500}}>
                        <Classification/>
                    </div>
                    <div className="col-6 h-100">
                        <div className="d-flex flex-column">
                        <HeaderLabel text={"All Transactions"} className="mb-2"/>
                        <MagicTable columns={columns} data={transactionData} pagination={true} rowRenderProps={(row)=> {return({intent:row['withdrawalAmount']>0?'danger':'success'})} }/>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        summary: state.expenseState.summary,
        transactionData: state.expenseState.transactionData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getExpenseData: () => dispatch({ type: WATCH_GET_EXPENSE_DATA })
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);