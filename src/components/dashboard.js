import React from 'react';
import MoneyCard from './moneyCard';
import { connect } from 'react-redux';

import HeaderLabel from './headerLabel';
import MagicTable from './magicTable';
import { WATCH_GET_EXPENSE_DATA } from '../reduxflow/watcherActionTypes/expenseWatcherActionTypes';
import Classification from './classification';
import ClassificationContainer from './classificationContainer';
import ExpenseLine from './expenseLine';
import { SegmentedControl } from 'evergreen-ui';
import MagicList from './magicList';

class Dashboard extends React.Component {
    componentDidMount(){
        this.props.getExpenseData();
    }
    render() {
        const{totalWithdrawal,totalDeposit,balance,average} = this.props.summary;
        const{transactionData} = this.props;
        return (
            <>
            <div className="container">
                <div className="row mt-3">
                    <div className="col-md-3 mb-2">
                        <MoneyCard header="Total Spent" value={totalWithdrawal} />
                    </div>
                    <div className="col-md-3 mb-2">
                        <MoneyCard header="Total Income" value={totalDeposit} />
                    </div>
                    <div className="col-md-3 mb-2">
                        <MoneyCard header="Balance" value={balance} />
                    </div>
                    <div className="col-md-3 mb-2">
                        <MoneyCard header="Avg Spent" value={average} />
                    </div>
                </div>
                <div className="row mt-3 h-100">
                    <ClassificationContainer/>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        
                    </div>
                    <div className="col-md-6" style={{height:550}}>
                        <ExpenseLine/>
                    </div>
                </div>
            </div>
            </>
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